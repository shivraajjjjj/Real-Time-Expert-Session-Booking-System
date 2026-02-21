import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";

function ExpertDetail() {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchExpert();

    socket.emit("joinExpertRoom", id);

    socket.on("slotBooked", (data) => {
      if (data.date && data.timeSlot) {
        setExpert((prev) => {
          const updated = { ...prev };
          updated.availableSlots = updated.availableSlots.map((d) => {
            if (d.date === data.date) {
              return {
                ...d,
                slots: d.slots.filter(
                  (slot) => slot !== data.timeSlot
                ),
              };
            }
            return d;
          });
          return updated;
        });
      }
    });

    return () => socket.off("slotBooked");
  }, []);

  const fetchExpert = async () => {
    const res = await API.get(`/experts/${id}`);
    setExpert(res.data);
  };

  const bookSlot = async (e) => {
    e.preventDefault();

    if (!selectedSlot) return;
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill name, email, and phone.");
      return;
    }

    setIsSubmitting(true);
    try {
      await API.post("/bookings", {
        expert: id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: selectedSlot.date,
        timeSlot: selectedSlot.timeSlot,
        notes: formData.notes
      });

      alert("Booked!");
      setSelectedSlot(null);
      setFormData({ name: "", email: "", phone: "", notes: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!expert) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-8 shadow-sm">
            <p className="text-lg font-serif text-slate-700">Loading expert profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Expert Profile</p>
                <h2 className="mt-2 text-3xl font-serif text-slate-900">
                  {expert.name}
                </h2>
                <p className="mt-2 text-base text-slate-600">
                  {expert.category} • {expert.experience}+ years
                </p>
              </div>
              <div className="rounded-2xl bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                Rating {expert.rating}
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {expert.availableSlots.map((d) => (
                <div key={d.date} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="text-lg font-semibold text-slate-800">{d.date}</h4>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Available</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {d.slots.map((slot) => {
                      const isSelected =
                        selectedSlot?.date === d.date &&
                        selectedSlot?.timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() =>
                            setSelectedSlot({ date: d.date, timeSlot: slot })
                          }
                          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                            isSelected
                              ? "border-teal-600 bg-teal-600 text-white shadow"
                              : "border-slate-200 bg-white text-slate-700 hover:border-teal-500 hover:text-teal-700"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Reserve</p>
                <h3 className="mt-2 text-2xl font-serif text-slate-900">
                  Book a Session
                </h3>
              </div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
                Step 2
              </span>
            </div>

            {!selectedSlot && (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-6 text-sm text-slate-600">
                Select a time slot on the left to unlock the booking form.
              </div>
            )}

            {selectedSlot && (
              <form onSubmit={bookSlot} className="mt-6 space-y-5">
                <div className="rounded-2xl bg-slate-50/80 p-4 text-sm text-slate-700">
                  Booking for <span className="font-semibold">{selectedSlot.date}</span> at{" "}
                  <span className="font-semibold">{selectedSlot.timeSlot}</span>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    placeholder="Phone number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    placeholder="Anything the expert should know ahead of time"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Booking..." : "Confirm Booking"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSlot(null)}
                    className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ExpertDetail;