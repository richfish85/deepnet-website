import React, { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();
  const prefilledDescription = useMemo(() => {
    if (location.state?.offerName) {
      return location.state.offerName;
    }
    const params = new URLSearchParams(location.search || "");
    const offerSlug = params.get("offer");
    if (!offerSlug) return "";
    return productNameFromSlug(offerSlug);
  }, [location]);
  const [description, setDescription] = useState(prefilledDescription || "");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (prefilledDescription) {
      setDescription(prefilledDescription);
    }
  }, [prefilledDescription]);

  function validate() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mblyoebn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          description,
          message
        })
      });

      if (response.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
        setDescription(prefilledDescription || "");
        setErrors({});
      } else {
        alert("There was a problem sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unexpected error occurred.");
    }

    setSubmitting(false);
  }

  return (
    <section className="py-20 bg-white min-h-[60vh]">
      <div className="max-w-xl mx-auto px-6">
        <h1 className="font-display text-3xl font-semibold mb-8">Contact Us</h1>
        {success ? (
          <div className="p-4 bg-green-100 text-green-700 rounded">
            Thank you! Your message has been sent successfully.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="w-full border border-neutral-70 rounded-md p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-neutral-70 rounded-md p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description
              </label>
              <input
                id="description"
                className="w-full border border-neutral-70 rounded-md p-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Which service or issue should we focus on?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full border border-neutral-70 rounded-md p-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function productNameFromSlug(slug) {
  const map = {
    "front-door-scan": "Front Door™ Scan",
    "cyberguard-core": "CyberGuard Core™",
    "cybershield-360": "CyberShield 360™",
    "deepnet-infrastructure": "DeepNet Infrastructure™"
  };
  return map[slug] || slug;
}
