import { useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchBookings = async () => {
    setHasSearched(true);
    const res = await API.get(`/bookings?email=${email}`);
    setBookings(res.data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Track Sessions</p>
          <h1 className="mt-2 text-3xl font-serif text-slate-900">My Bookings</h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter your email to fetch upcoming and past expert sessions.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 sm:w-80"
            />
            <button
              onClick={fetchBookings}
              className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
            >
              Search
            </button>
          </div>
        </header>

        <section className="mt-8 space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Expert</p>
                  <p className="mt-2 text-xl font-serif text-slate-900">{b.expert.name}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    {b.date} • {b.timeSlot}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {b.status}
                </span>
              </div>
            </div>
          ))}

          {hasSearched && bookings.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 p-6 text-sm text-slate-600">
              No bookings found for this email.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MyBookings;