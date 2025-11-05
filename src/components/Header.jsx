import { Trophy, Calendar, Users } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Padel Club – Prenotazioni & Classifiche
          </h1>
          <p className="mt-2 text-white/90 max-w-2xl">
            Gestisci prenotazioni dei campi, registra nuovi giocatori e tieni aggiornata
            la classifica in base ai risultati delle partite.
          </p>
        </div>
        <div className="flex items-center gap-4 text-white/95">
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Prenotazioni</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">Giocatori</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-medium">Classifica</span>
          </div>
        </div>
      </div>
    </header>
  );
}
