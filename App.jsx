import { useState } from "react";

export default function App() {
  const [adminMode, setAdminMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [teamsInput, setTeamsInput] = useState("");
  const [teams, setTeams] = useState([]);
  const [semi, setSemi] = useState([]);
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

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const createCup = () => {
    const list = teamsInput
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    setTeams(shuffle(list));
    setSemi([]);
    setFinals([]);
    setWinner("");
  };

  const addSemi = (team) => {
    if (!semi.includes(team)) setSemi([...semi, team]);
  };

  const addFinal = (team) => {
    if (!finals.includes(team)) setFinals([...finals, team]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-6xl font-black">ANGEL</h1>
          <p className="text-zinc-400 tracking-[0.4em]">TOURNAMENTS</p>
        </div>

        <button
          onClick={() => {
            if (adminMode) {
              setAdminMode(false);
            } else {
              setShowLogin(true);
            }
          }}
          className="bg-white text-black px-6 py-3 rounded-2xl font-bold"
        >
          {adminMode ? "Ausloggen" : "Admin Login"}
        </button>
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md">
            <h2 className="text-3xl font-black mb-6 text-center">
              Admin Login
            </h2>

            <div className="space-y-4">
              <input
                className="w-full bg-black border border-zinc-700 rounded-xl p-4"
                placeholder="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                className="w-full bg-black border border-zinc-700 rounded-xl p-4"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

      {adminMode && (
        <div className="bg-zinc-900 p-8 rounded-3xl mb-16 max-w-2xl">
          <h2 className="text-4xl font-black mb-6">
            Welcome Cup erstellen
          </h2>

          <textarea
            className="w-full h-56 bg-black border border-zinc-700 rounded-2xl p-4"
            placeholder="Ein Team pro Zeile"
            value={teamsInput}
            onChange={(e) => setTeamsInput(e.target.value)}
          />

          <button
            onClick={createCup}
            className="mt-6 bg-white text-black px-8 py-4 rounded-2xl font-black"
          >
            Teams auslosen
          </button>
        </div>
      )}

      {teams.length > 0 && (
        <div className="grid grid-cols-3 gap-16">
          <div>
            <h2 className="text-3xl font-black mb-8 text-center">
              Viertelfinale
            </h2>

            <div className="space-y-8">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                >
                  {[teams[i * 2], teams[i * 2 + 1]].map((team, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-center ${
                        idx === 0 ? "pb-4" : "pt-4 border-t border-zinc-700"
                      }`}
                    >
                      <span className="font-bold text-xl">{team || "TBD"}</span>

                      {adminMode && team && (
                        <button
                          onClick={() => addSemi(team)}
                          className="bg-white text-black px-4 py-2 rounded-xl font-bold"
                        >
                          Weiter
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black mb-8 text-center">
              Halbfinale
            </h2>

            <div className="space-y-16 mt-24">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                >
                  {[semi[i * 2], semi[i * 2 + 1]].map((team, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-center ${
                        idx === 0 ? "pb-4" : "pt-4 border-t border-zinc-700"
                      }`}
                    >
                      <span className="font-bold text-xl">{team || "TBD"}</span>

                      {adminMode && team && (
                        <button
                          onClick={() => addFinal(team)}
                          className="bg-white text-black px-4 py-2 rounded-xl font-bold"
                        >
                          Weiter
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black mb-8 text-center">
              Finale
            </h2>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mt-40">
              {[finals[0], finals[1]].map((team, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between items-center ${
                    idx === 0 ? "pb-4" : "pt-4 border-t border-zinc-700"
                  }`}
                >
                  <span className="font-bold text-2xl">{team || "TBD"}</span>

                  {adminMode && team && (
                    <button
                      onClick={() => setWinner(team)}
                      className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-black"
                    >
                      Sieger?
                    </button>
                  )}
                </div>
              ))}
            </div>

            {winner && (
              <div className="mt-10 text-center">
                <div className="text-4xl font-black text-yellow-400">
                  🏆 {winner}
                </div>

                <p className="text-xl mt-2">
                  gewinnt den Angel Welcome Cup!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
