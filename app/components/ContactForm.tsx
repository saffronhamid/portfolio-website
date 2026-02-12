export default function ContactForm() {
  return (
    <form
      className="glass-card grid gap-4 p-6"
      aria-label="Contact form"
      action="https://formspree.io/f/xdaaodyn"
      method="POST"
    >
      <input type="hidden" name="_subject" value="New portfolio message" />
      <label className="grid gap-2 text-sm text-muted">
        Name
        <input
          type="text"
          name="name"
          className="rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none transition focus:border-[color:var(--accent)]"
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </label>
      <label className="grid gap-2 text-sm text-muted">
        Email
        <input
          type="email"
          name="email"
          className="rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none transition focus:border-[color:var(--accent)]"
          placeholder="you@email.com"
          autoComplete="email"
          required
        />
      </label>
      <label className="grid gap-2 text-sm text-muted">
        Message
        <textarea
          rows={4}
          name="message"
          className="rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none transition focus:border-[color:var(--accent)]"
          placeholder="Tell me about your project..."
          required
        />
      </label>
      <button
        type="submit"
        className="btn-primary px-5 py-3 text-sm"
        aria-label="Send message"
      >
        Send Message
      </button>
    </form>
  );
}
