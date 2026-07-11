import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  createFormEventParams,
  createSubmissionGuard,
  prepareSubmissionData,
  submitWeb3Form,
  validateTextValue,
} from "../src/lib/form-submission.mjs";

function response({ status = 200, body = { success: true }, jsonError = false } = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() {
      if (jsonError) throw new SyntaxError("mock invalid JSON");
      return body;
    },
  };
}

async function submitWith(mockResponse, options = {}) {
  return submitWeb3Form({
    formData: new FormData(),
    fetchImpl: async () => mockResponse,
    ...options,
  });
}

assert.deepEqual(await submitWith(response()), { ok: true, errorCategory: null });
assert.equal((await submitWith(response({ status: 400 }))).errorCategory, "bad_request");
assert.equal((await submitWith(response({ status: 401 }))).errorCategory, "provider_configuration");
assert.equal((await submitWith(response({ body: { success: false } }))).errorCategory, "provider_rejected");
assert.equal((await submitWith(response({ status: 429 }))).errorCategory, "rate_limited");
assert.equal((await submitWith(response({ status: 500 }))).errorCategory, "provider_unavailable");
assert.equal((await submitWith(response({ jsonError: true }))).errorCategory, "invalid_json");
assert.equal((await submitWith(response({ body: { accepted: true } }))).errorCategory, "unexpected_response");

let offlineFetchCalled = false;
const offline = await submitWeb3Form({
  formData: new FormData(),
  isOnline: false,
  fetchImpl: async () => { offlineFetchCalled = true; return response(); },
});
assert.equal(offline.errorCategory, "offline");
assert.equal(offlineFetchCalled, false);

const network = await submitWeb3Form({
  formData: new FormData(),
  fetchImpl: async () => { throw new TypeError("mock offline request"); },
});
assert.equal(network.errorCategory, "network");

const timeout = await submitWeb3Form({
  formData: new FormData(),
  timeoutMs: 5,
  fetchImpl: async (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(new DOMException("mock abort", "AbortError")), { once: true });
  }),
});
assert.equal(timeout.errorCategory, "timeout");

const cleanupController = new AbortController();
const cleanupPromise = submitWeb3Form({
  formData: new FormData(),
  externalSignal: cleanupController.signal,
  fetchImpl: async (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(new DOMException("mock cleanup", "AbortError")), { once: true });
  }),
});
cleanupController.abort();
assert.equal((await cleanupPromise).errorCategory, "cancelled");

const guard = createSubmissionGuard();
assert.equal(guard.begin(), true);
assert.equal(guard.begin(), false);
assert.equal(guard.active, true);
guard.end();
assert.equal(guard.begin(), true);
guard.end();

assert.deepEqual(validateTextValue("   ", { required: true }), { valid: false, value: "", reason: "required" });
assert.equal(validateTextValue("ab", { minLength: 3 }).reason, "too_short");
assert.equal(validateTextValue("abcdef", { maxLength: 5 }).reason, "too_long");
assert.deepEqual(validateTextValue("  valid  ", { required: true, minLength: 3, maxLength: 10 }), {
  valid: true,
  value: "valid",
  reason: null,
});

const unsafeEvent = createFormEventParams({
  formType: "contact",
  status: "error",
  errorCategory: "validation",
  validationErrorCount: 2,
  name: "Nama Pengguna",
  email: "user@example.com",
  message: "Isi pesan",
  subject: "Subjek pengguna",
  company: "Nama perusahaan",
});
assert.deepEqual(unsafeEvent, {
  formType: "contact",
  status: "error",
  errorCategory: "validation",
  validationErrorCount: 2,
});

const sourceData = new FormData();
sourceData.set("name", "  Pengguna  ");
sourceData.set("user_subject", "  Subjek pengguna  ");
sourceData.set("subject", "Subjek yang dimanipulasi");
const prepared = prepareSubmissionData(sourceData, "contact");
assert.equal(prepared.get("name"), "Pengguna");
assert.equal(prepared.get("user_subject"), "Subjek pengguna");
assert.equal(prepared.get("subject"), "[Kontak ExcelGratis] Pesan baru");
assert.equal(prepared.get("form_type"), "contact");
assert.equal(prepared.get("from_name"), "ExcelGratis Website");

const component = readFileSync(new URL("../src/components/ContactForm.astro", import.meta.url), "utf8");
assert.match(component, /name="botcheck"[^>]*tabindex="-1"[^>]*aria-hidden="true"/);
assert.match(component, /name="user_subject"[^>]*maxlength="160"/);
assert.match(component, /name="masalah"[^>]*minlength="10"[^>]*maxlength="5000"/);
assert.match(component, /name="fitur"[^>]*minlength="3"[^>]*maxlength="3000"/);
assert.doesNotMatch(component, /h-captcha|hcaptcha\.com|HCAPTCHA_SITE_KEY/i);

console.log("Form validation passed. Mocked reliability, privacy, spam, and field scenarios verified.");
