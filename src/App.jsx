import { useState } from "react";

export default function App() {
  const [adminMode, setAdminMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [cupName, setCupName] = useState("");
  const [teamCount, setTeamCount] = useState("");
  const [teamsInput, setTeamsInput] = useState("");

  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const ADMIN_USER = "AngelAdmin";
  const ADMIN_PASS = "AT2026";

  const login = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAdminMode(true);
      setShowLogin(false);
    }
  };

  const shuffleTeams = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const createTournament = () => {
    const teams = teamsInput
      .split("\n")
      .map((team) => team.trim())
      .filter(Boolean);

    if (teams.length < 2) return;

    const shuffledTeams = shuffleTeams(teams);

    let stage = "";

    if (teams.length <= 4) {
      stage = "Halbfinale";
    } else if (teams.length <= 8) {
      stage = "Viertelfinale";
    } else if (teams.length <= 16) {
      stage = "Achtelfinale";
    } else {
      stage = "Großturnier";
    }

    const matches = [];

    for (let i = 0; i < shuffledTeams.length; i += 2) {
      matches.push([
        shuffledTeams[i] || "TBD",
        shuffledTeams[i + 1] || "TBD",
      ]);
    }

    const tournament = {
      id: Date.now(),
      name: cupName,
      stage,
      matches,
    };

    setTournaments([...tournaments, tournament]);

    setCupName("");
    setTeamCount("");
    setTeamsInput("");
  };

  const deleteTournament = (id) => {
    setTournaments(tournaments.filter((t) => t.id !== id));

    if (selectedTournament?.id === id) {
      setSelectedTournament(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}

      <div className="flex justify-between items-center px-8 py-6">

        <div>
          <h1 className="text-6xl font-black">
            ANGEL
          </h1>

          <p className="tracking-[0.5em] text-zinc-400">
            TOURNAMENTS
          </p>
        </div>

        {!adminMode ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white text-black px-7 py-4 rounded-2xl font-black"
          >
            Admin Login
          </button>
        ) : (
          <button
            onClick={() => setAdminMode(false)}
            className="bg-zinc-900 border border-zinc-700 px-7 py-4 rounded-2xl font-black"
          >
            Logout
          </button>
        )}

      </div>

      {/* HERO */}

      <div className="text-center mt-12 px-6">

        <h2 className="text-5xl md:text-7xl font-black">
          Willkommen bei Angel Tournaments 🏆
        </h2>

        <p className="text-zinc-400 text-xl md:text-2xl mt-8 max-w-4xl mx-auto leading-relaxed">
          Die neue FC 26 Pro Clubs Plattform für spannende Cups,
          starke Communities und echte Wettbewerbe.
        </p>

      </div>

      {/* LOGIN */}

      {showLogin && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-[#081022] p-10 rounded-[40px] w-full max-w-md border border-white/10">

            <h2 className="text-4xl font-black text-center mb-8">
              Admin Login
            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
              />

              <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
              />

              <button
                onClick={login}
                className="w-full bg-white text-black py-4 rounded-2xl font-black"
              >
                Einloggen
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ADMIN PANEL */}

      {adminMode && (

        <div className="max-w-3xl mx-auto mt-24 bg-[#081022] border border-white/10 rounded-[40px] p-10">

          <h2 className="text-5xl font-black text-center mb-10">
            Turnier erstellen
          </h2>

          <input
            type="text"
            placeholder="Wie soll das Turnier heißen?"
            value={cupName}
            onChange={(e) => setCupName(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-2xl p-5 mb-6"
          />

          <input
            type="number"
            placeholder="Wie viele Teams?"
            value={teamCount}
            onChange={(e) => setTeamCount(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-2xl p-5 mb-6"
          />

          <textarea
            placeholder="Ein Team pro Zeile"
            value={teamsInput}
            onChange={(e) => setTeamsInput(e.target.value)}
            className="w-full h-72 bg-black border border-zinc-700 rounded-2xl p-5"
          />

          <button
            onClick={createTournament}
            className="w-full mt-8 bg-white text-black py-5 rounded-2xl text-xl font-black"
          >
            Teams auslosen
          </button>

        </div>

      )}

      {/* TURNIERE */}

      <div className="mt-32 px-10 pb-24">

        <h2 className="text-5xl font-black text-center mb-16">
          Laufende Turniere
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {tournaments.map((tournament) => (

            <div
              key={tournament.id}
              className="bg-[#081022] border border-white/10 rounded-[35px] p-8"
            >

              <h3 className="text-3xl font-black mb-4">
                {tournament.name}
              </h3>

              <p className="text-zinc-400 text-xl mb-8">
                {tournament.stage}
              </p>

              <div className="flex gap-4 flex-wrap">

                <button
                  onClick={() => setSelectedTournament(tournament)}
                  className="bg-white text-black px-6 py-4 rounded-2xl font-black"
                >
                  Turnier öffnen
                </button>

                {adminMode && (
                  <button
                    onClick={() => deleteTournament(tournament.id)}
                    className="bg-red-600 px-6 py-4 rounded-2xl font-black"
                  >
                    Turnier löschen
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* TURNIERBAUM */}

      {selectedTournament && (

        <div className="px-10 pb-32">

          <div className="max-w-[1700px] mx-auto">

            <div className="flex justify-between items-center mb-16">

              <div>
                <h2 className="text-5xl font-black">
                  {selectedTournament.name}
                </h2>

                <p className="text-zinc-400 text-2xl mt-3">
                  {selectedTournament.stage}
                </p>
              </div>

              <button
                onClick={() => setSelectedTournament(null)}
                className="bg-white text-black px-6 py-4 rounded-2xl font-black"
              >
                Ansicht schließen
              </button>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">

              {/* VIERTELFINALE */}

              <div>

                <h3 className="text-4xl font-black mb-12 text-center">
                  {selectedTournament.stage}
                </h3>

                <div className="space-y-10">

                  {selectedTournament.matches.map((match, index) => (

                    <div
                      key={index}
                      className="bg-[#081022] border border-white/10 rounded-[30px] p-6"
                    >

                      <div className="flex justify-between items-center border-b border-white/10 pb-5">

                        <span className="text-3xl font-black">
                          {match[0]}
                        </span>

                        <button className="bg-white text-black px-5 py-3 rounded-2xl font-black">
                          Weiter
                        </button>

                      </div>

                      <div className="flex justify-between items-center pt-5">

                        <span className="text-3xl font-black">
                          {match[1]}
                        </span>

                        <button className="bg-white text-black px-5 py-3 rounded-2xl font-black">
                          Weiter
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* HALBFINALE */}

              <div>

                <h3 className="text-4xl font-black mb-12 text-center">
                  Halbfinale
                </h3>

                <div className="space-y-24 mt-20">

                  <div className="bg-[#081022] border border-cyan-400 rounded-[30px] p-6">

                    <div className="border-b border-white/10 pb-5 text-3xl font-black">
                      TBD
                    </div>

                    <div className="pt-5 text-3xl font-black">
                      TBD
                    </div>

                  </div>

                  <div className="bg-[#081022] border border-cyan-400 rounded-[30px] p-6">

                    <div className="border-b border-white/10 pb-5 text-3xl font-black">
                      TBD
                    </div>

                    <div className="pt-5 text-3xl font-black">
                      TBD
                    </div>

                  </div>

                </div>

              </div>

              {/* FINALE */}

              <div>

                <h3 className="text-4xl font-black mb-12 text-center">
                  Finale
                </h3>

                <div className="mt-44">

                  <div className="bg-[#081022] border border-yellow-400 rounded-[30px] p-6">

                    <div className="border-b border-white/10 pb-5 text-3xl font-black">
                      TBD
                    </div>

                    <div className="pt-5 text-3xl font-black">
                      TBD
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
