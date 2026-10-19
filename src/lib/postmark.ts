import "server-only";

/**
 * Minimal Postmark client using the REST API directly (no SDK needed).
 * Docs: https://postmarkapp.com/developer/user-guide/send-email-with-api
 *
 * Environment:
 * - POSTMARK_SERVER_TOKEN  Server API token
 * - POSTMARK_SENDER        Verified sender signature, e.g. "Pedra Norte <geral@pedranorte.eu>"
 * - POSTMARK_RECIPIENT     Inbox that receives quote requests (defaults to POSTMARK_SENDER)
 */
const POSTMARK_API_URL = "https://api.postmarkapp.com/email";

export interface EmailMessage {
  subject: string;
  textBody: string;
  replyTo?: string;
}

export class EmailConfigError extends Error {}

export async function sendEmail({ subject, textBody, replyTo }: EmailMessage): Promise<void> {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  const from = process.env.POSTMARK_SENDER;
  if (!token || !from) {
    throw new EmailConfigError("POSTMARK_SERVER_TOKEN and POSTMARK_SENDER must be set");
  }

  const response = await fetch(POSTMARK_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify({
      From: from,
      To: process.env.POSTMARK_RECIPIENT || from,
      ReplyTo: replyTo,
      Subject: subject,
      TextBody: textBody,
      MessageStream: "outbound",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Postmark responded ${response.status}: ${await response.text()}`);
  }
}
