import { Trophy } from "lucide-react";

export default function RankingsTable({ players }) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-amber-600" />
        <h2 className="text-lg font-semibold">Classifica Giocatori</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-700">
              <th className="text-left px-4 py-2">Pos</th>
              <th className="text-left px-4 py-2">Giocatore</th>
              <th className="text-left px-4 py-2">Livello</th>
              <th className="text-right px-4 py-2">Punti</th>
              <th className="text-right px-4 py-2">Vittorie</th>
              <th className="text-right px-4 py-2">Sconfitte</th>
            </tr>
          </thead>
          <tbody>
            {players.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                  Nessun giocatore ancora in classifica.
                </td>
              </tr>
            ) : (
              players.map((p, idx) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2 font-medium">{p.name}</td>
                  <td className="px-4 py-2">{p.level}</td>
                  <td className="px-4 py-2 text-right font-semibold">{p.points}</td>
                  <td className="px-4 py-2 text-right">{p.wins}</td>
                  <td className="px-4 py-2 text-right">{p.losses}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
