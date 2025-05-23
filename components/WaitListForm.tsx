"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail("");
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("An error occured. Please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-3 pt-4">
      <input
        type="email"
        placeholder="Enter your Email address"
        className="p-2 border w-full max-w-sm text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={isSubmitting} className="max-w-sm bg-gradient-to-r from-primary-200 via-primary-100 to to-primary-100 w-auto px-8 ">
        { isSubmitting ?"Submitting":"Join Early Access List"}
      </button>
      {message && <p className="text-white">{message}</p>}
    </form>
  );
}
