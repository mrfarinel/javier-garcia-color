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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = [`Name: ${name}`, `Email: ${senderEmail}`, "", message].join("\n");
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
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
          className="group text-[0.68rem] uppercase tracking-[0.24em] text-main transition-colors hover:text-body"
        >
          Send Message <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </form>
  );
}
