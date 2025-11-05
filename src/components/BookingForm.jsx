import { useState, useMemo } from "react";
import { CalendarPlus, Users, Clock } from "lucide-react";

export default function BookingForm({ players, onCreateBooking }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [court, setCourt] = useState("1");
  const [selected, setSelected] = useState([]); // 4 player ids
  const [pointsA, setPointsA] = useState("");
  const [pointsB, setPointsB] = useState("");

  const canSubmit = useMemo(() => {
    return date && time && selected.length === 4;
  }, [date, time, selected]);

  const handleSelect = (e) => {
    const value = e.target.value;
    const exists = selected.includes(value);
    if (exists) {
      setSelected(selected.filter((id) => id !== value));
    } else {
      if (selected.length < 4) setSelected([...selected, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const payload = {
      date,
      time,
      court,
      players: selected,
      result: pointsA !== "" && pointsB !== "" ? { a: Number(pointsA), b: Number(pointsB) } : null,
    };
    onCreateBooking(payload);
    // reset
    setDate("");
    setTime("");
    setCourt("1");
    setSelected([]);
    setPointsA("");
    setPointsB("");
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <CalendarPlus className="w-5 h-5 text-teal-600" />
        <h2 className="text-lg font-semibold">Prenota Campo e (opzionale) Registra Risultato</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 md:col-span-2"
        />
        <div className="flex items-center gap-2 md:col-span-1">
          <Clock className="w-4 h-4 text-slate-500" />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <select
          value={court}
          onChange={(e) => setCourt(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="1">Campo 1</option>
          <option value="2">Campo 2</option>
          <option value="3">Campo 3</option>
          <option value="4">Campo 4</option>
        </select>

        <div className="md:col-span-6">
          <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" /> Seleziona 4 giocatori (clicca per aggiungere/rimuovere)
          </label>
          <div className="flex flex-wrap gap-2">
            {players.length === 0 ? (
              <p className="text-slate-500 text-sm">Nessun giocatore registrato.</p>
            ) : (
              players.map((p) => {
                const active = selected.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    value={p.id}
                    onClick={handleSelect}
                    className={`px-3 py-1 rounded-full border text-sm transition ${
                      active
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    {p.name} <span className="text-xs text-slate-500">({p.level})</span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-slate-700 mb-1">Punti Squadra A (opzionale)</label>
          <input
            type="number"
            min="0"
            value={pointsA}
            onChange={(e) => setPointsA(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-slate-700 mb-1">Punti Squadra B (opzionale)</label>
          <input
            type="number"
            min="0"
            value={pointsB}
            onChange={(e) => setPointsB(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="md:col-span-6 flex justify-end">
          <button
            type="submit"
            disabled={!canSubmit}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white transition ${
              canSubmit ? "bg-teal-600 hover:bg-teal-700" : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            <CalendarPlus className="w-4 h-4" />
            Salva prenotazione
          </button>
        </div>
      </form>
    </section>
  );
}
