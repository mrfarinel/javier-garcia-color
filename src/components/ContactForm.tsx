"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  email: string;
};

type FormErrors = Partial<Record<"name" | "senderEmail" | "subject" | "message", string>>;

const errorText = "This field is required.";
const emailErrorText = "Please enter a valid email address.";
const errorClassName = "mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#A85E5E]";

export function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name = errorText;
    }

    if (!senderEmail.trim()) {
      nextErrors.senderEmail = errorText;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      nextErrors.senderEmail = emailErrorText;
    }

    if (!subject.trim()) {
      nextErrors.subject = errorText;
    }

    if (!message.trim()) {
      nextErrors.message = errorText;
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      setStatus("error");
      setFeedback("Please complete the required fields.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: senderEmail,
          subject,
          message,
          company,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "The message could not be sent.");
      }

      setName("");
      setSenderEmail("");
      setSubject("");
      setMessage("");
      setCompany("");
      setStatus("sent");
      setFeedback("Message sent. Thank you.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "The message could not be sent.");
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Contact form" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            className="mb-2 block text-[0.62rem] uppercase leading-5 tracking-[0.24em] text-minimal"
            htmlFor="contact-name"
          >
            <span className="mr-3 text-[#5A5A5A]">01</span>Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setErrors((current) => ({ ...current, name: undefined }));
            }}
            className={`h-10 w-full border bg-[#0E0E10] px-3 text-sm text-main outline-none transition-colors focus:border-body ${
              errors.name ? "border-[#5F3535]" : "border-line"
            }`}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name ? (
            <p id="contact-name-error" className={errorClassName}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="mb-2 block text-[0.62rem] uppercase leading-5 tracking-[0.24em] text-minimal"
            htmlFor="contact-email"
          >
            <span className="mr-3 text-[#5A5A5A]">02</span>Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={senderEmail}
            onChange={(event) => {
              setSenderEmail(event.target.value);
              setErrors((current) => ({ ...current, senderEmail: undefined }));
            }}
            className={`h-10 w-full border bg-[#0E0E10] px-3 text-sm text-main outline-none transition-colors focus:border-body ${
              errors.senderEmail ? "border-[#5F3535]" : "border-line"
            }`}
            autoComplete="email"
            aria-invalid={Boolean(errors.senderEmail)}
            aria-describedby={errors.senderEmail ? "contact-email-error" : undefined}
          />
          {errors.senderEmail ? (
            <p id="contact-email-error" className={errorClassName}>
              {errors.senderEmail}
            </p>
          ) : null}
        </div>
      </div>

      <input
        className="hidden"
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
      />

      <div className="mt-5">
        <label
          className="mb-2 block text-[0.62rem] uppercase leading-5 tracking-[0.24em] text-minimal"
          htmlFor="contact-subject"
        >
          <span className="mr-3 text-[#5A5A5A]">03</span>Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          value={subject}
          onChange={(event) => {
            setSubject(event.target.value);
            setErrors((current) => ({ ...current, subject: undefined }));
          }}
          className={`h-10 w-full border bg-[#0E0E10] px-3 text-sm text-main outline-none transition-colors focus:border-body ${
            errors.subject ? "border-[#5F3535]" : "border-line"
          }`}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
        />
        {errors.subject ? (
          <p id="contact-subject-error" className={errorClassName}>
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <label
          className="mb-2 block text-[0.62rem] uppercase leading-5 tracking-[0.24em] text-minimal"
          htmlFor="contact-message"
        >
          <span className="mr-3 text-[#5A5A5A]">04</span>Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setErrors((current) => ({ ...current, message: undefined }));
          }}
          className={`w-full resize-none border bg-[#0E0E10] px-3 py-3 text-sm leading-7 text-main outline-none transition-colors focus:border-body ${
            errors.message ? "border-[#5F3535]" : "border-line"
          }`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message ? (
          <p id="contact-message-error" className={errorClassName}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group text-[0.68rem] uppercase tracking-[0.24em] text-main transition-colors hover:text-body disabled:cursor-wait disabled:text-minimal"
        >
          {status === "sending" ? "Sending" : "Send Message"}{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      {feedback ? (
        <p
          className={`mt-4 text-right text-[0.68rem] uppercase tracking-[0.18em] ${
            status === "sent" ? "text-[#6FA99A]" : "text-[#A85E5E]"
          }`}
          role="status"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
