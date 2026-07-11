export const FORM_ENDPOINT = "https://api.web3forms.com/submit";
export const FORM_TIMEOUT_MS = 15_000;

const PROVIDER_FIELDS = Object.freeze({
  contact: {
    formType: "contact",
    subject: "[Kontak ExcelGratis] Pesan baru",
  },
  request_template: {
    formType: "request_template",
    subject: "[Request Template ExcelGratis] Request baru",
  },
});

export function normalizeText(value) {
  return typeof value === "string" ? value.trim() : value;
}

export function validateTextValue(value, { required = false, minLength = 0, maxLength = Infinity } = {}) {
  const normalized = normalizeText(value);
  if (!normalized) return { valid: !required, value: "", reason: required ? "required" : null };
  if (normalized.length < minLength) return { valid: false, value: normalized, reason: "too_short" };
  if (normalized.length > maxLength) return { valid: false, value: normalized, reason: "too_long" };
  return { valid: true, value: normalized, reason: null };
}

/**
 * @param {FormData} source
 * @param {"contact" | "request_template"} formType
 */
export function prepareSubmissionData(source, formType) {
  const providerFields = PROVIDER_FIELDS[formType] || PROVIDER_FIELDS.contact;
  const prepared = new FormData();

  for (const [name, value] of source.entries()) {
    if (["form_type", "from_name", "subject"].includes(name)) continue;
    prepared.append(name, normalizeText(value));
  }

  prepared.set("form_type", providerFields.formType);
  prepared.set("from_name", "ExcelGratis Website");
  prepared.set("subject", providerFields.subject);
  return prepared;
}

export function createSubmissionGuard() {
  let active = false;
  return {
    begin() {
      if (active) return false;
      active = true;
      return true;
    },
    end() {
      active = false;
    },
    get active() {
      return active;
    },
  };
}

/**
 * @param {{ formType?: unknown, status?: unknown, errorCategory?: unknown, validationErrorCount?: unknown }} options
 * @returns {Record<string, string | number>}
 */
export function createFormEventParams({ formType, status, errorCategory, validationErrorCount } = {}) {
  /** @type {Record<string, string | number>} */
  const params = {};
  if (formType === "contact" || formType === "request_template") params.formType = formType;
  if (["started", "submitting", "success", "error"].includes(status)) params.status = status;
  if (typeof errorCategory === "string" && /^[a-z_]+$/.test(errorCategory)) params.errorCategory = errorCategory;
  if (Number.isInteger(validationErrorCount) && validationErrorCount >= 0) {
    params.validationErrorCount = validationErrorCount;
  }
  return params;
}

/**
 * @param {{
 *   formData: FormData,
 *   fetchImpl?: typeof fetch,
 *   timeoutMs?: number,
 *   externalSignal?: AbortSignal,
 *   isOnline?: boolean,
 * }} options
 */
export async function submitWeb3Form({
  formData,
  fetchImpl = fetch,
  timeoutMs = FORM_TIMEOUT_MS,
  externalSignal,
  isOnline = true,
}) {
  if (!isOnline) return { ok: false, errorCategory: "offline" };
  if (externalSignal?.aborted) return { ok: false, errorCategory: "cancelled" };

  const controller = new AbortController();
  let timedOut = false;
  const abortFromCleanup = () => controller.abort();
  externalSignal?.addEventListener("abort", abortFromCleanup, { once: true });
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetchImpl(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
      signal: controller.signal,
    });

    if (response.status === 400) return { ok: false, errorCategory: "bad_request" };
    if (response.status === 401) return { ok: false, errorCategory: "provider_configuration" };
    if (response.status === 429) return { ok: false, errorCategory: "rate_limited" };
    if (response.status >= 500) return { ok: false, errorCategory: "provider_unavailable" };
    if (!response.ok) return { ok: false, errorCategory: "http_error" };

    let data;
    try {
      data = await response.json();
    } catch {
      return { ok: false, errorCategory: "invalid_json" };
    }

    if (!data || typeof data !== "object" || typeof data.success !== "boolean") {
      return { ok: false, errorCategory: "unexpected_response" };
    }
    if (data.success !== true) return { ok: false, errorCategory: "provider_rejected" };
    return { ok: true, errorCategory: null };
  } catch {
    if (timedOut) return { ok: false, errorCategory: "timeout" };
    if (externalSignal?.aborted) return { ok: false, errorCategory: "cancelled" };
    return { ok: false, errorCategory: "network" };
  } finally {
    clearTimeout(timeout);
    externalSignal?.removeEventListener("abort", abortFromCleanup);
  }
}
