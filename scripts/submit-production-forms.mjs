import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const reportPath = path.join(process.cwd(), "docs", "qa", "form-production-latest.json");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
const base = { generatedAt: new Date().toISOString(), endpoint: "https://api.web3forms.com/submit", submissions: [] };

if (process.env.RUN_PRODUCTION_FORM_SUBMISSIONS !== "1") {
  base.status = "not_run";
  base.notes = "Safe production submission is opt-in. Set RUN_PRODUCTION_FORM_SUBMISSIONS=1 and WEB3FORMS_ACCESS_KEY after confirming the provider accepts synthetic tests. No submission was sent.";
} else if (!accessKey) {
  base.status = "blocked_missing_owner_supplied_key";
  base.notes = "WEB3FORMS_ACCESS_KEY was not supplied. No submission was sent.";
} else {
  const cases = [
    { formType: "contact", subject: `[RUN6-CONTACT-${timestamp}] synthetic contact verification`, fields: { name: "Synthetic Contact Test", email: "run6-synthetic@example.invalid", jenis_pesan: "masukan-website", user_subject: `[RUN6-CONTACT-${timestamp}]`, message: "Synthetic production form verification only. No reply requested.", consent: "on" } },
    { formType: "request_template", subject: `[RUN6-REQUEST-${timestamp}] synthetic request verification`, fields: { name: "Synthetic Request Test", email: "run6-request@example.invalid", jenis_penggunaan: "lainnya", masalah: "Synthetic production form verification only.", fitur: "No real template request; verify provider acceptance.", aplikasi: "Microsoft Excel", consent: "on" } },
  ];
  for (const item of cases) {
    const form = new FormData();
    form.set("access_key", accessKey); form.set("form_type", item.formType); form.set("from_name", "ExcelGratis Website"); form.set("subject", item.subject);
    for (const [key, value] of Object.entries(item.fields)) form.set(key, value);
    try {
      const response = await fetch(base.endpoint, { method: "POST", headers: { Accept: "application/json" }, body: form, signal: AbortSignal.timeout(15000) });
      let json = null; try { json = await response.json(); } catch { /* provider response may not be JSON */ }
      base.submissions.push({ formType: item.formType, subjectPrefix: item.subject.split("]")[0] + "]", status: response.status, providerAccepted: response.ok && json?.success === true, visibleBrowserResult: "not_observed", mailboxDelivery: "not_verified" });
    } catch (error) {
      base.submissions.push({ formType: item.formType, subjectPrefix: item.subject.split("]")[0] + "]", providerAccepted: false, visibleBrowserResult: "blocked", mailboxDelivery: "not_verified", error: error.message });
    }
  }
  base.status = base.submissions.every((item) => item.providerAccepted) ? "provider_accepted_mailbox_pending" : "provider_result_failed_or_blocked";
  base.notes = "Provider acceptance is not mailbox delivery. Do not repeat submissions without owner approval.";
}
await mkdir(path.dirname(reportPath), { recursive: true });
await writeFile(reportPath, `${JSON.stringify(base, null, 2)}\n`, "utf8");
console.log(JSON.stringify(base, null, 2));
