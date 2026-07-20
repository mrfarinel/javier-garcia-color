"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  email: string;
};

export function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
    <form onSubmit={handleSubmit} aria-label="Contact form">
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
            onChange={(event) => setName(event.target.value)}
            className="h-10 w-full border border-line bg-[#0E0E10] px-3 text-sm text-main outline-none transition-colors focus:border-body"
            autoComplete="name"
          />
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
            onChange={(event) => setSenderEmail(event.target.value)}
            className="h-10 w-full border border-line bg-[#0E0E10] px-3 text-sm text-main outline-none transition-colors focus:border-body"
            autoComplete="email"
          />
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
          onChange={(event) => setSubject(event.target.value)}
          className="h-10 w-full border border-line bg-[#0E0E10] px-3 text-sm text-main outline-none transition-colors focus:border-body"
        />
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
          onChange={(event) => setMessage(event.target.value)}
          className="w-full resize-none border border-line bg-[#0E0E10] px-3 py-3 text-sm leading-7 text-main outline-none transition-colors focus:border-body"
        />
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
            status === "sent" ? "text-secondary" : "text-body"
          }`}
          role="status"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
