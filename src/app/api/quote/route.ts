import { getServices } from "@/content/repository";
import { EmailConfigError, sendEmail } from "@/lib/postmark";
import { parseQuote, validateQuote, type QuoteRequest } from "@/lib/quote";

/** Receives the "Pedido de orçamento" form and forwards it by email through Postmark. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots get no signal.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const quote = parseQuote(body);
  const errors = validateQuote(quote);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  try {
    await sendEmail({
      subject: `Pedido de orçamento — ${quote.name}`,
      textBody: await formatQuote(quote),
      replyTo: quote.email,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Quote request could not be sent", error);
    const status = error instanceof EmailConfigError ? 503 : 502;
    return Response.json({ ok: false, error: "send_failed" }, { status });
  }
}

/** Plain-text email in Portuguese for the internal inbox. */
async function formatQuote(quote: QuoteRequest): Promise<string> {
  const services = await getServices("pt");
  const workType =
    services.find((s) => s.slug === quote.workType)?.title ?? (quote.workType === "other" ? "Outro tipo de obra" : "—");

  return [
    "Novo pedido de orçamento recebido através de pedranorte.eu",
    "",
    `Nome: ${quote.name}`,
    `Email: ${quote.email}`,
    `Telefone: ${quote.phone || "—"}`,
    `Tipo de obra: ${workType}`,
    `Idioma do site: ${quote.locale.toUpperCase() || "—"}`,
    "",
    "Mensagem:",
    quote.message || "—",
    "",
    "O cliente aceitou a Política de Privacidade. Responda diretamente a este email para contactar o cliente.",
  ].join("\n");
}
