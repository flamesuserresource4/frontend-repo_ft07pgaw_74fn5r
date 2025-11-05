import { useState } from "react";
import { UserPlus } from "lucide-react";

export default function PlayerRegistration({ onAddPlayer }) {
  const [form, setForm] = useState({ name: "", email: "", level: "Intermedio" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    onAddPlayer({ ...form });
    setForm({ name: "", email: "", level: "Intermedio" });
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="w-5 h-5 text-emerald-600" />
        <h2 className="text-lg font-semibold">Registrazione Giocatori</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nome e Cognome"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option>Principiante</option>
          <option>Intermedio</option>
          <option>Avanzato</option>
        </select>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-emerald-700 transition"
        >
          <UserPlus className="w-4 h-4" />
          Aggiungi
        </button>
      </form>
    </section>
  );
}
