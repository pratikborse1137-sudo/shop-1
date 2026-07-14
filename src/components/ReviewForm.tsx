"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ReviewForm({ productSlug }: { productSlug: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!author.trim() || !body.trim()) {
      setError("Please add your name and a review.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, author, rating, title, body }),
      });
      if (!res.ok) throw new Error("Failed");
      setDone(true);
      setAuthor("");
      setTitle("");
      setBody("");
      setRating(5);
      router.refresh();
      setTimeout(() => {
        setOpen(false);
        setDone(false);
      }, 1800);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border-2 border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
      >
        ✍️ Write a review
      </button>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm"
    >
      {done ? (
        <div className="flex flex-col items-center gap-2 py-6 text-center">
          <span className="animate-pop text-4xl">🎉</span>
          <p className="font-display text-lg font-bold text-brand-800">
            Thanks for your review!
          </p>
          <p className="text-sm text-brand-500">Your feedback is live.</p>
        </div>
      ) : (
        <>
          <h3 className="font-display text-lg font-bold text-brand-800">
            Share your thoughts
          </h3>
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-600">
                Your rating
              </label>
              <div className="flex gap-1 text-3xl">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHover(i + 1)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110"
                    aria-label={`${i + 1} stars`}
                  >
                    <span
                      className={
                        i < (hover || rating)
                          ? "text-amber-400"
                          : "text-amber-200"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                className="rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
              />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Review title (optional)"
                className="rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
              />
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell others what you loved…"
              rows={3}
              className="rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
            />
            {error && <p className="text-sm text-rose-500">{error}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit review"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-6 py-3 text-sm font-medium text-brand-500 hover:text-brand-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </form>
  );
}
