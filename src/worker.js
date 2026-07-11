export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/auth") {
      return handleAuth(request, env);
    }

    if (url.pathname === "/api/callback") {
      return handleCallback(request, env);
    }

    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || url.pathname === "/404" || url.pathname === "/404/") {
      return response;
    }

    const notFoundUrl = new URL("/404", url);
    const notFoundResponse = await env.ASSETS.fetch(new Request(notFoundUrl, request));

    if (!notFoundResponse.ok) {
      return response;
    }

    return new Response(notFoundResponse.body, {
      status: 404,
      statusText: "Not Found",
      headers: notFoundResponse.headers,
    });
  },
};

async function handleAuth(request, env) {
  if (!env.GITHUB_CLIENT_ID) {
    return oauthError("GITHUB_CLIENT_ID is not configured.", 500);
  }

  const url = new URL(request.url);
  const state = crypto.randomUUID();
  const redirectUrl = new URL("https://github.com/login/oauth/authorize");

  redirectUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  redirectUrl.searchParams.set("redirect_uri", `${url.origin}/api/callback`);
  redirectUrl.searchParams.set("scope", "repo user");
  redirectUrl.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      location: redirectUrl.toString(),
      "cache-control": "no-store",
      "set-cookie": `decap_oauth_state=${state}; Path=/api; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}

async function handleCallback(request, env) {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return oauthError("GitHub OAuth environment variables are not configured.", 500);
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = getCookie(request.headers.get("cookie"), "decap_oauth_state");

  if (!code) {
    return oauthError("GitHub did not return an authorization code.", 400);
  }

  if (!state || !cookieState || state !== cookieState) {
    return oauthError("OAuth state did not match. Please try logging in again.", 401);
  }

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "user-agent": "excelgratis-decap-cms",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/api/callback`,
    }),
  });

  const result = await response.json();

  if (!response.ok || result.error) {
    return oauthError(result.error_description || result.error || "GitHub OAuth failed.", 401);
  }

  return oauthPopupResponse("success", {
    token: result.access_token,
    provider: "github",
  });
}

function getCookie(cookieHeader, name) {
  if (!cookieHeader) return "";

  for (const cookie of cookieHeader.split(";")) {
    const [key, ...value] = cookie.trim().split("=");
    if (key === name) return value.join("=");
  }

  return "";
}

function oauthError(message, status = 500) {
  return oauthPopupResponse("error", { message }, status);
}

function oauthPopupResponse(status, content, responseStatus = 200) {
  const message = serializeForScript(`authorization:github:${status}:${JSON.stringify(content)}`);

  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>GitHub OAuth</title>
  </head>
  <body>
    <script>
      (function () {
        function receiveMessage(event) {
          window.opener.postMessage(${message}, event.origin);
          window.close();
        }

        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  </body>
</html>`,
    {
      status: responseStatus,
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "no-store",
        "set-cookie": "decap_oauth_state=; Path=/api; Max-Age=0; HttpOnly; Secure; SameSite=Lax",
      },
    },
  );
}

function serializeForScript(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
