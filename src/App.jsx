import { useState } from "react";

export default function App() {
  const [adminMode, setAdminMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [teamsInput, setTeamsInput] = useState("");
  const [cupName, setCupName] = useState("");

  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const [semiFinals, setSemiFinals] = useState([]);
  const [finals, setFinals] = useState([]);
  const [winner, setWinner] = useState("");

  const ADMIN_USER = "AngelAdmin";
  const ADMIN_PASS = "AT2026";

  const login = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAdminMode(true);
      setShowLogin(false);
    }
  };

  const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const createCup = () => {
    const list = teamsInput
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    const shuffled = shuffle(list);

    const newTournament = {
      id: Date.now(),
      name: cupName,
      teams: shuffled,
    };

    setTournaments([...tournaments, newTournament]);

    setCupName("");
    setTeamsInput("");
  };

  const addSemi = (team) => {
    if (!semiFinals.includes(team) && semiFinals.length < 4) {
      setSemiFinals([...semiFinals, team]);
    }
  };

  const addFinal = (team) => {
    if (!finals.includes(team) && finals.length < 2) {
      setFinals([...finals, team]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-auto">

      {/* HEADER */}

      <div className="flex items-center justify-between px-10 py-8">

        <div>
          <h1 className="text-6xl font-black tracking-wide">
            ANGEL
          </h1>

          <p className="text-zinc-400 tracking-[0.5em] uppercase">
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
            className="bg-zinc-900 border border-zinc-700 text-white px-7 py-4 rounded-2xl font-black"
          >
            Logout
          </button>
        )}

      </div>

      {/* BIO */}

      <div className="text-center mt-10 px-6">

        <h2 className="text-5xl font-black">
          Willkommen bei Angel Tournaments 🏆
        </h2>

        <p className="text-zinc-400 text-2xl mt-6 max-w-4xl mx-auto leading-relaxed">
          Die neue FC 26 Pro Clubs Plattform für spannende Cups,
          starke Communities und echte Wettbewerbe.
        </p>

      </div>

      {/* LOGIN */}

      {showLogin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md">

            <h2 className="text-4xl font-black text-center mb-8">
              ADMIN LOGIN
            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl p-4"
              />

              <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl p-4"
              />

              <button
                onClick={login}
                className="w-full bg-white text-black p-4 rounded-xl font-black"
              >
                Einloggen
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ADMIN PANEL */}

      {adminMode && (

        <div className="max-w-3xl mx-auto mt-20 bg-[#0d1220] border border-white/10 rounded-[40px] p-10">

          <h2 className="text-5xl font-black text-center mb-10">
            Turnier erstellen
          </h2>

          <input
            type="text"
            placeholder="Turniername"
            value={cupName}
            onChange={(e) => setCupName(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-2xl p-5 mb-6"
          />

          <textarea
            placeholder="Ein Team pro Zeile"
            value={teamsInput}
            onChange={(e) => setTeamsInput(e.target.value)}
            className="w-full h-72 bg-black border border-zinc-700 rounded-2xl p-5"
          />

          <button
            onClick={createCup}
            className="w-full mt-8 bg-white text-black py-5 rounded-2xl text-xl font-black"
          >
            Turnier erstellen
          </button>

        </div>

      )}

      {/* TURNIERE */}

      <div className="mt-32 px-10">

        <h2 className="text-5xl font-black text-center mb-16">
          Laufende Turniere
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">

          {tournaments.map((tournament) => (

            <div
              key={tournament.id}
              className="bg-[#0d1220] border border-white/10 rounded-3xl p-8"
            >

              <h3 className="text-3xl font-black mb-6">
                {tournament.name}
              </h3>

              <button
                onClick={() => {
                  setSelectedTournament(tournament);
                  setSemiFinals([]);
                  setFinals([]);
                  setWinner("");
                }}
                className="bg-white text-black px-6 py-4 rounded-2xl font-black"
              >
                Turnier öffnen
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* TURNIERBAUM */}

      {selectedTournament && (

        <div className="min-w-[1800px] px-20 py-24">

          <h2 className="text-6xl font-black text-center mb-20">
            {selectedTournament.name}
          </h2>

          <div className="grid grid-cols-3 gap-24">

            {/* VIERTELFINALE */}

            <div>

              <h2 className="text-4xl font-black text-center mb-14">
                Viertelfinale
              </h2>

              <div className="space-y-12">

                {[0, 1, 2, 3].map((i) => (

                  <div
                    key={i}
                    className="bg-[#0d1220] border border-white/10 rounded-3xl p-6"
                  >

                    <div className="flex items-center justify-between pb-5">

                      <span className="text-2xl font-black">
                        {selectedTournament.teams[i * 2] || "TBD"}
                      </span>

                      {adminMode && selectedTournament.teams[i * 2] && (
                        <button
                          onClick={() => addSemi(selectedTournament.teams[i * 2])}
                          className="bg-white text-black px-5 py-3 rounded-xl font-black"
                        >
                          Weiter
                        </button>
                      )}

                    </div>

                    <div className="border-t border-white/10 pt-5 flex items-center justify-between">

                      <span className="text-2xl font-black">
                        {selectedTournament.teams[i * 2 + 1] || "TBD"}
                      </span>

                      {adminMode && selectedTournament.teams[i * 2 + 1] && (
                        <button
                          onClick={() => addSemi(selectedTournament.teams[i * 2 + 1])}
                          className="bg-white text-black px-5 py-3 rounded-xl font-black"
                        >
                          Weiter
                        </button>
                      )}

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* HALBFINALE */}

            <div>

              <h2 className="text-4xl font-black text-center mb-14">
                Halbfinale
              </h2>

              <div className="space-y-32 mt-24">

                {[0, 1].map((i) => (

                  <div
                    key={i}
                    className="bg-[#0d1220] border border-cyan-400 rounded-3xl p-6"
                  >

                    <div className="flex items-center justify-between pb-5">

                      <span className="text-2xl font-black">
                        {semiFinals[i * 2] || "TBD"}
                      </span>

                      {adminMode && semiFinals[i * 2] && (
                        <button
                          onClick={() => addFinal(semiFinals[i * 2])}
                          className="bg-white text-black px-5 py-3 rounded-xl font-black"
                        >
                          Weiter
                        </button>
                      )}

                    </div>

                    <div className="border-t border-white/10 pt-5 flex items-center justify-between">

                      <span className="text-2xl font-black">
                        {semiFinals[i * 2 + 1] || "TBD"}
                      </span>

                      {adminMode && semiFinals[i * 2 + 1] && (
                        <button
                          onClick={() => addFinal(semiFinals[i * 2 + 1])}
                          className="bg-white text-black px-5 py-3 rounded-xl font-black"
                        >
                          Weiter
                        </button>
                      )}

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* FINALE */}

            <div>

              <h2 className="text-4xl font-black text-center mb-14">
                Finale
              </h2>

              <div className="bg-[#0d1220] border border-yellow-400 rounded-3xl p-6 mt-56">

                <div className="flex items-center justify-between pb-5">

                  <span className="text-2xl font-black">
                    {finals[0] || "TBD"}
                  </span>

                  {adminMode && finals[0] && (
                    <button
                      onClick={() => setWinner(finals[0])}
                      className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-black"
                    >
                      Sieger?
                    </button>
                  )}

                </div>

                <div className="border-t border-white/10 pt-5 flex items-center justify-between">

                  <span className="text-2xl font-black">
                    {finals[1] || "TBD"}
                  </span>

                  {adminMode && finals[1] && (
                    <button
                      onClick={() => setWinner(finals[1])}
                      className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-black"
                    >
                      Sieger?
                    </button>
                  )}

                </div>

              </div>

              {winner && (

                <div className="text-center mt-12">

                  <div className="text-5xl font-black text-yellow-400">
                    🏆 {winner}
                  </div>

                  <p className="text-2xl text-zinc-300 mt-4">
                    gewinnt das Turnier!
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
