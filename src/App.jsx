import { useState } from "react";

export default function App() {
  const [adminMode, setAdminMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [teamsInput, setTeamsInput] = useState("");

  const [quarterFinals, setQuarterFinals] = useState([]);
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

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const createCup = () => {
    const teamList = teamsInput
      .split("\n")
      .map((team) => team.trim())
      .filter(Boolean);

    const shuffled = shuffleArray(teamList);

    const quarters = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      quarterFinals.push([shuffled[i], shuffled[i + 1]]);
    }

    setQuarterFinals(quarters);
    setSemiFinals([]);
    setFinals([]);
    setWinner("");
  };

  const advanceToSemi = (team) => {
    if (semiFinals.length < 4) {
      setSemiFinals([...semiFinals, team]);
    }
  };

  const advanceToFinal = (team) => {
    if (finals.length < 2) {
      setFinals([...finals, team]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-auto">

      {/* HEADER */}

      <div className="flex items-center justify-between px-10 py-6">

        <div className="flex items-center gap-5">

          <img
            src="/logo.png"
            alt="Angel Tournaments"
            className="w-24 h-24 object-contain"
          />

          <div>

            <h1 className="text-5xl font-black leading-none">
              ANGEL
            </h1>

            <p className="text-zinc-400 tracking-[0.45em] text-sm mt-2">
              TOURNAMENTS
            </p>

          </div>

        </div>

        <button
          onClick={() => {
            if (adminMode) {
              setAdminMode(false);
            } else {
              setShowLogin(true);
            }
          }}
          className="bg-white text-black px-7 py-4 rounded-2xl font-black"
        >
          {adminMode ? "Ausloggen" : "Admin Login"}
        </button>

      </div>

      {/* BIO */}

      <div className="text-center mt-10 px-6">

        <h2 className="text-6xl font-black">
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

          <div className="bg-[#0d1220] p-10 rounded-[35px] w-full max-w-md">

            <h2 className="text-4xl font-black text-center mb-8">
              ADMIN LOGIN
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
                className="w-full bg-white text-black p-4 rounded-2xl font-black"
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
            Welcome Cup erstellen
          </h2>

          <textarea
            placeholder="Ein Team pro Zeile"
            value={teamsInput}
            onChange={(e) => setTeamsInput(e.target.value)}
            className="w-full h-72 bg-black border border-zinc-700 rounded-3xl p-5"
          />

          <button
            onClick={createCup}
            className="w-full mt-8 bg-white text-black py-5 rounded-3xl text-xl font-black"
          >
            Teams auslosen
          </button>

        </div>

      )}

      {/* TURNIERBAUM */}

      {quarterFinals.length > 0 && (

        <div className="px-20 py-24 min-w-[1800px]">

          <div className="grid grid-cols-3 gap-24">

            {/* VIERTELFINALE */}

            <div>

              <h2 className="text-4xl font-black text-center mb-14">
                Viertelfinale
              </h2>

              <div className="space-y-10">

                {quarterFinals.map((match, index) => (

                  <div
                    key={index}
                    className="bg-[#0d1220] border border-white/10 rounded-3xl p-6"
                  >

                    {match.map((team, idx) => (

                      <div
                        key={idx}
                        className={`flex items-center justify-between ${
                          idx === 0
                            ? "pb-4"
                            : "pt-4 border-t border-white/10"
                        }`}
                      >

                        <span className="text-2xl font-black">
                          {team}
                        </span>

                        {adminMode && (

                          <button
                            onClick={() => advanceToSemi(team)}
                            className="bg-white text-black px-5 py-3 rounded-xl font-black"
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

            {/* HALBFINALE */}

            <div>

              <h2 className="text-4xl font-black text-center mb-14">
                Halbfinale
              </h2>

              <div className="space-y-24 mt-24">

                {[0, 1].map((i) => (

                  <div
                    key={i}
                    className="bg-[#0d1220] border border-cyan-400 rounded-3xl p-6"
                  >

                    {[semiFinals[i * 2], semiFinals[i * 2 + 1]].map((team, idx) => (

                      <div
                        key={idx}
                        className={`flex items-center justify-between ${
                          idx === 0
                            ? "pb-4"
                            : "pt-4 border-t border-white/10"
                        }`}
                      >

                        <span className="text-2xl font-black">
                          {team || "TBD"}
                        </span>

                        {adminMode && team && (

                          <button
                            onClick={() => advanceToFinal(team)}
                            className="bg-white text-black px-5 py-3 rounded-xl font-black"
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

            {/* FINALE */}

            <div>

              <h2 className="text-4xl font-black text-center mb-14">
                Finale
              </h2>

              <div className="bg-[#0d1220] border border-yellow-400 rounded-3xl p-6 mt-52">

                {[finals[0], finals[1]].map((team, idx) => (

                  <div
                    key={idx}
                    className={`flex items-center justify-between ${
                      idx === 0
                        ? "pb-4"
                        : "pt-4 border-t border-white/10"
                    }`}
                  >

                    <span className="text-2xl font-black">
                      {team || "TBD"}
                    </span>

                    {adminMode && team && (

                      <button
                        onClick={() => setWinner(team)}
                        className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-black"
                      >
                        Sieger?
                      </button>

                    )}

                  </div>

                ))}

              </div>

              {winner && (

                <div className="text-center mt-12">

                  <div className="text-5xl font-black text-yellow-400">
                    🏆 {winner}
                  </div>

                  <p className="text-2xl text-zinc-300 mt-4">
                    gewinnt den Angel Welcome Cup!
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
