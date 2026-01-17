export default function ContactForm() {
  return (
    <form
      className="glass-card grid gap-4 p-6"
      aria-label="Contact form"
      action="https://formspree.io/f/xdaaodyn"
      method="POST"
    >
      <input type="hidden" name="_subject" value="New portfolio message" />
      <label className="grid gap-2 text-sm text-zinc-300">
        Name
        <input
          type="text"
          name="name"
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-300"
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </label>
      <label className="grid gap-2 text-sm text-zinc-300">
        Email
        <input
          type="email"
          name="email"
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-300"
          placeholder="you@email.com"
          autoComplete="email"
          required
        />
      </label>
      <label className="grid gap-2 text-sm text-zinc-300">
        Message
        <textarea
          rows={4}
          name="message"
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-300"
          placeholder="Tell me about your project..."
          required
        />
      </label>
      <button
        type="submit"
        className="btn-primary rounded-xl px-5 py-3 text-sm"
        aria-label="Send message"
      >
        Send Message
      </button>
    </form>
  );
}
