export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactMessage(formData: ContactFormData) {
  const res = await fetch("/api/contact/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Failed to send message");
  }

  return json;
}
