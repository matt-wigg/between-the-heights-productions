'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

import { site } from '@/lib/site';
import type { TContactFormRequestBody } from '@/types/contactFormRequestBody';
import styles from './ContactForm.module.css';

type FormData = Required<TContactFormRequestBody>;

interface ApiResponse {
  message?: string;
  error?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const emptyForm: FormData = { name: '', email: '', phone: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sentName, setSentName] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setError('Name, email and project details are needed to send.');
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError('That email address does not look right.');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone: form.phone.trim(), message }),
      });
      const data = (await res.json().catch(() => ({}))) as ApiResponse;

      if (!res.ok || data.error) {
        setError(data.error || 'Your message failed to send. Please try again, or email us directly.');
        return;
      }

      setSentName(name.split(' ')[0]);
    } catch {
      setError('There was a problem reaching the server. Please try again, or email us directly.');
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setForm(emptyForm);
    setError('');
    setSentName(null);
  };

  if (sentName !== null) {
    return (
      <div className={styles.sent} role="status" aria-live="polite">
        <span className="rule" />
        <h3 className={styles.sentTitle}>Message sent</h3>
        <p className={styles.sentBody}>Thanks {sentName}, we will be in touch shortly.</p>
        <button type="button" onClick={reset} className={styles.sentAgain}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="bth-name" className={styles.label}>
          Name
        </label>
        <input
          id="bth-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          disabled={sending}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="bth-email" className={styles.label}>
          Email
        </label>
        <input
          id="bth-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange}
          disabled={sending}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="bth-phone" className={styles.label}>
          Phone, optional
        </label>
        <input
          id="bth-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(+1) 000-000-0000"
          value={form.phone}
          onChange={handleChange}
          disabled={sending}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="bth-msg" className={styles.label}>
          Project details
        </label>
        <textarea
          id="bth-msg"
          name="message"
          placeholder="What you are making, and when you need it"
          value={form.message}
          onChange={handleChange}
          disabled={sending}
          required
          className={`${styles.input} ${styles.textarea}`}
        />
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={sending}>
        {sending ? 'Sending…' : 'Send message'}
      </button>

      <p className={styles.note}>Email works just as well: {site.email}</p>
    </form>
  );
}
