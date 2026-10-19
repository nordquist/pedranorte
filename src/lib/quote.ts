/**
 * Quote request contract and validation, shared by the form (client) and the
 * API route (server). Only name, email and consent are required.
 */
export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  workType: string;
  message: string;
  consent: boolean;
  locale: string;
}

export type QuoteField = "name" | "email" | "consent";
export type QuoteError = "required" | "invalidEmail";
export type QuoteErrors = Partial<Record<QuoteField, QuoteError>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTH = { name: 200, email: 320, phone: 50, workType: 100, message: 5000, locale: 5 };

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function parseQuote(input: unknown): QuoteRequest {
  const data = (input ?? {}) as Record<string, unknown>;
  return {
    name: text(data.name, MAX_LENGTH.name),
    email: text(data.email, MAX_LENGTH.email),
    phone: text(data.phone, MAX_LENGTH.phone),
    workType: text(data.workType, MAX_LENGTH.workType),
    message: text(data.message, MAX_LENGTH.message),
    consent: data.consent === true,
    locale: text(data.locale, MAX_LENGTH.locale),
  };
}

export function validateQuote(quote: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!quote.name) errors.name = "required";
  if (!quote.email) errors.email = "required";
  else if (!EMAIL_PATTERN.test(quote.email)) errors.email = "invalidEmail";
  if (!quote.consent) errors.consent = "required";
  return errors;
}
