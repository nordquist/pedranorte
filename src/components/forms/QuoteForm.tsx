"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { QuoteFormContent } from "@/content/types";
import { parseQuote, validateQuote, type QuoteErrors } from "@/lib/quote";
import { Button } from "@/components/ui/Button";
import { Checkbox, SelectField, TextAreaField, TextField } from "./Fields";

interface QuoteFormProps {
  locale: string;
  content: QuoteFormContent;
  workTypes: { value: string; label: string }[];
  privacyHref: string;
}

type Status = "idle" | "sending" | "success" | "error";

/** "Pedido de orçamento" form. Name, email and consent are required; it posts to /api/quote. */
export function QuoteForm({ locale, content, workTypes, privacyHref }: QuoteFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<QuoteErrors>({});
  const { fields } = content;

  const errorText = (field: keyof QuoteErrors) => {
    const error = errors[field];
    if (!error) return undefined;
    return error === "invalidEmail" ? content.invalidEmail : content.required;
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const quote = parseQuote({ ...Object.fromEntries(data), consent: data.get("consent") === "on", locale });
    const validation = validateQuote(quote);
    setErrors(validation);

    const firstInvalid = Object.keys(validation)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...quote, website: data.get("website") }),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col gap-md">
        <h3 className="type-mobile-h3 text-text-primary lg:type-h3">{content.success.title}</h3>
        <p className="type-body-m text-text-secondary">{content.success.description}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-md lg:gap-lg">
      <h3 className="type-mobile-h3 text-text-primary lg:type-h3">{content.title}</h3>

      <TextField id="quote-name" name="name" label={fields.name.label} placeholder={fields.name.placeholder} autoComplete="name" required error={errorText("name")} />

      <div className="flex flex-col gap-md md:flex-row">
        <TextField id="quote-email" name="email" type="email" label={fields.email.label} placeholder={fields.email.placeholder} autoComplete="email" required error={errorText("email")} className="flex-1" />
        <TextField id="quote-phone" name="phone" type="tel" label={fields.phone.label} placeholder={fields.phone.placeholder} autoComplete="tel" className="flex-1" />
      </div>

      <SelectField
        id="quote-work-type"
        name="workType"
        label={fields.workType.label}
        placeholder={fields.workType.placeholder}
        options={[...workTypes, { value: "other", label: fields.workType.otherOption }]}
      />

      <TextAreaField id="quote-message" name="message" label={fields.message.label} placeholder={fields.message.placeholder} />

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="quote-website">Website</label>
        <input id="quote-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Checkbox
        id="quote-consent"
        name="consent"
        required
        error={errorText("consent")}
        label={
          <>
            {content.consent.before}
            <Link href={privacyHref} className="rounded-sm text-text-primary underline underline-offset-2 hover:text-accent-default">
              {content.consent.link}
            </Link>
            {content.consent.after}
          </>
        }
      />

      <Button type="submit" withIcon fullWidth disabled={status === "sending"}>
        {status === "sending" ? content.sending : content.submit}
      </Button>

      {status === "error" && (
        <p role="alert" className="type-body-s text-feedback-error">
          {content.error}
        </p>
      )}
    </form>
  );
}
