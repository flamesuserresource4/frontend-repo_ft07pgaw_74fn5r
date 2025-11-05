import { useMemo, useState } from "react";
import Header from "./components/Header";
import PlayerRegistration from "./components/PlayerRegistration";
import BookingForm from "./components/BookingForm";
import RankingsTable from "./components/RankingsTable";
import { CalendarDays } from "lucide-react";

export default function App() {
  const [players, setPlayers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const addPlayer = ({ name, email, level }) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setPlayers((prev) => [
      ...prev,
      { id, name, email, level, points: 0, wins: 0, losses: 0 },
    ]);
  };

  const createBooking = ({ date, time, court, players: playerIds, result }) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const booking = { id, date, time, court, players: playerIds, result };
    setBookings((prev) => [booking, ...prev]);

    if (result && playerIds.length === 4) {
      const teamA = playerIds.slice(0, 2);
      const teamB = playerIds.slice(2, 4);
      const aWon = result.a > result.b;
      const bWon = result.b > result.a;

      setPlayers((prev) =>
        prev.map((p) => {
          if (teamA.includes(p.id)) {
            return {
              ...p,
              points: p.points + Number(result.a),
              wins: p.wins + (aWon ? 1 : 0),
              losses: p.losses + (bWon ? 1 : 0),
            };
          }
          if (teamB.includes(p.id)) {
            return {
              ...p,
              points: p.points + Number(result.b),
              wins: p.wins + (bWon ? 1 : 0),
              losses: p.losses + (aWon ? 1 : 0),
            };
          }
          return p;
        })
      );
    }
  };

  const ranking = useMemo(() => {
    return [...players].sort((a, b) => b.points - a.points || b.wins - a.wins);
  }, [players]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlayerRegistration onAddPlayer={addPlayer} />
          <BookingForm players={players} onCreateBooking={createBooking} />
        </div>

        <RankingsTable players={ranking} />

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="w-5 h-5 text-sky-600" />
            <h2 className="text-lg font-semibold">Ultime Prenotazioni</h2>
          </div>
          {bookings.length === 0 ? (
            <p className="text-slate-500 text-sm">Ancora nessuna prenotazione.</p>
          ) : (
            <ul className="space-y-3">
              {bookings.map((b) => (
                <li key={b.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-3">
                  <div className="text-slate-700">
                    <span className="font-medium">{b.date}</span> alle <span className="font-medium">{b.time}</span> – Campo {b.court}
                  </div>
                  <div className="text-sm text-slate-600">
                    Giocatori: {b.players.map((pid) => players.find((p) => p.id === pid)?.name || "-").join(", ")}
                  </div>
                  {b.result ? (
                    <div className="text-sm font-medium text-slate-800">
                      Risultato: A {b.result.a} – B {b.result.b}
                    </div>
                  ) : (
                    <div className="text-sm text-slate-500">Risultato non registrato</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="py-8 text-center text-slate-500">
        © {new Date().getFullYear()} Padel Club • Prototipo UI
      </footer>
    </div>
  );
}
