import { useState } from "react";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [tournamentName, setTournamentName] =
    useState("");
  const [teamsInput, setTeamsInput] = useState("");

  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] =
    useState(null);

  const adminUser = "AngelAdmin";
  const adminPassword = "AT2026";

  const login = () => {
    if (
      username === adminUser &&
      password === adminPassword
    ) {
      setIsAdmin(true);
      setShowLogin(false);
      setUsername("");
      setPassword("");
    } else {
      alert("Falsche Daten");
    }
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const shuffleTeams = (teams) => {
    return [...teams].sort(() => Math.random() - 0.5);
  };

  const createTournament = () => {
    const teams = teamsInput
      .split("\n")
      .map((team) => team.trim())
      .filter((team) => team !== "");

    if (!tournamentName) {
      alert("Bitte Turniernamen eingeben");
      return;
    }

    if (teams.length < 2) {
      alert("Mindestens 2 Teams");
      return;
    }

    const shuffled = shuffleTeams(teams);

    const rounds = [];
    let firstRound = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      firstRound.push({
        team1: shuffled[i] || "Freilos",
        team2: shuffled[i + 1] || "Freilos",
      });
    }

    rounds.push(firstRound);

    let currentLength = firstRound.length;

    while (currentLength > 1) {
      currentLength = Math.ceil(currentLength / 2);

      const nextRound = [];

      for (let i = 0; i < currentLength; i++) {
        nextRound.push({
          team1: "TBD",
          team2: "TBD",
        });
      }

      rounds.push(nextRound);
    }

    const newTournament = {
      id: Date.now(),
      name: tournamentName,
      rounds,
      winner: null,
    };

    setTournaments([...tournaments, newTournament]);

    setTournamentName("");
    setTeamsInput("");
  };

  const advanceTeam = (
    tournamentIndex,
    roundIndex,
    matchIndex,
    team
  ) => {
    const updated = [...tournaments];

    const isFinal =
      roundIndex ===
      updated[tournamentIndex].rounds.length - 1;

    if (isFinal) {
      updated[tournamentIndex].winner = team;

      setTournaments(updated);

      setTimeout(() => {
        alert(
          `🏆 Herzlichen Glückwunsch an ${team}!`
        );
      }, 200);

      return;
    }

    const nextRound =
      updated[tournamentIndex].rounds[roundIndex + 1];

    const nextMatchIndex = Math.floor(matchIndex / 2);

    if (matchIndex % 2 === 0) {
      nextRound[nextMatchIndex].team1 = team;
    } else {
      nextRound[nextMatchIndex].team2 = team;
    }

    setTournaments(updated);
  };

  const deleteTournament = (id) => {
    const filtered = tournaments.filter(
      (t) => t.id !== id
    );

    setTournaments(filtered);
    setSelectedTournament(null);
  };

  const getRoundName = (totalRounds, index) => {
    const remaining = totalRounds - index;

    if (remaining === 1) return "🏆 Finale";
    if (remaining === 2) return "🔥 Halbfinale";
    if (remaining === 3) return "⚔ Viertelfinale";
    if (remaining === 4) return "🎯 Achtelfinale";

    return `Runde ${index + 1}`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #000000, #050816)",
        color: "white",
        padding: "25px",
        fontFamily: "Arial",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "58px",
              margin: 0,
              fontWeight: "900",
              letterSpacing: "2px",
            }}
          >
            ANGEL
          </h1>

          <p
            style={{
              letterSpacing: "8px",
              marginTop: "4px",
              fontSize: "13px",
              color: "#bbb",
            }}
          >
            TOURNAMENTS
          </p>
        </div>

        {!isAdmin ? (
          <button
            onClick={() => setShowLogin(true)}
            style={mainButton}
          >
            Admin Login
          </button>
        ) : (
          <button
            onClick={logout}
            style={mainButton}
          >
            Logout
          </button>
        )}
      </div>

      {/* HERO */}
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        <h1
          style={{
            fontSize: "62px",
            marginBottom: "20px",
            fontWeight: "900",
          }}
        >
          Willkommen bei Angel Tournaments 🏆
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "24px",
            lineHeight: "42px",
          }}
        >
          Die neue FC 26 Pro Clubs Plattform
          <br />
          für spannende Cups und echte Wettbewerbe.
        </p>
      </div>

      {/* LOGIN */}
      {showLogin && (
        <div style={loginBox}>
          <h1
            style={{
              textAlign: "center",
              fontSize: "55px",
              marginBottom: "30px",
            }}
          >
            ADMIN LOGIN
          </h1>

          <input
            type="text"
            placeholder="Benutzername"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={inputStyle}
          />

          <button
            onClick={login}
            style={{
              ...mainButton,
              width: "100%",
              marginTop: "25px",
              fontSize: "22px",
            }}
          >
            Einloggen
          </button>
        </div>
      )}

      {/* ADMIN PANEL */}
      {isAdmin && (
        <div style={adminBox}>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "45px",
            }}
          >
            🏆 Turnier erstellen
          </h1>

          <input
            type="text"
            placeholder="Turniername"
            value={tournamentName}
            onChange={(e) =>
              setTournamentName(e.target.value)
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Ein Team pro Zeile"
            value={teamsInput}
            onChange={(e) =>
              setTeamsInput(e.target.value)
            }
            style={{
              ...inputStyle,
              height: "220px",
              resize: "none",
            }}
          />

          <button
            onClick={createTournament}
            style={{
              ...mainButton,
              width: "100%",
              marginTop: "25px",
            }}
          >
            Teams auslosen
          </button>
        </div>
      )}

      {/* TOURNAMENTS */}
      <div
        style={{
          marginTop: "70px",
          maxWidth: "900px",
          marginInline: "auto",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            fontSize: "45px",
          }}
        >
          Laufende Turniere
        </h1>

        {tournaments.map((tournament, index) => (
          <div
            key={tournament.id}
            style={tournamentCard}
          >
            <div>
              <h2
                style={{
                  fontSize: "32px",
                  marginBottom: "15px",
                }}
              >
                {tournament.name}
              </h2>

              {tournament.winner && (
                <p
                  style={{
                    color: "#facc15",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  🏆 Sieger: {tournament.winner}
                </p>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() =>
                  setSelectedTournament(index)
                }
                style={mainButton}
              >
                Turnier öffnen
              </button>

              {isAdmin && (
                <button
                  onClick={() =>
                    deleteTournament(tournament.id)
                  }
                  style={deleteButton}
                >
                  Löschen
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* TOURNIERBAUM */}
      {selectedTournament !== null && (
        <div style={{ marginTop: "80px" }}>
          <button
            onClick={() =>
              setSelectedTournament(null)
            }
            style={{
              ...mainButton,
              marginBottom: "40px",
            }}
          >
            Ansicht schließen
          </button>

          <div
            style={{
              display: "flex",
              gap: "70px",
              overflowX: "auto",
              paddingBottom: "50px",
            }}
          >
            {tournaments[
              selectedTournament
            ].rounds.map((round, roundIndex) => (
              <div key={roundIndex}>
                <h1
                  style={{
                    marginBottom: "30px",
                    textAlign: "center",
                  }}
                >
                  {getRoundName(
                    tournaments[selectedTournament]
                      .rounds.length,
                    roundIndex
                  )}
                </h1>

                {round.map((match, matchIndex) => (
                  <div
                    key={matchIndex}
                    style={matchBox}
                  >
                    <div style={teamRow}>
                      <span>{match.team1}</span>

                      {isAdmin &&
                        match.team1 !== "TBD" && (
                          <button
                            style={smallButton}
                            onClick={() =>
                              advanceTeam(
                                selectedTournament,
                                roundIndex,
                                matchIndex,
                                match.team1
                              )
                            }
                          >
                            Weiter
                          </button>
                        )}
                    </div>

                    <hr style={lineStyle} />

                    <div style={teamRow}>
                      <span>{match.team2}</span>

                      {isAdmin &&
                        match.team2 !== "TBD" && (
                          <button
                            style={smallButton}
                            onClick={() =>
                              advanceTeam(
                                selectedTournament,
                                roundIndex,
                                matchIndex,
                                match.team2
                              )
                            }
                          >
                            Weiter
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const mainButton = {
  background:
    "linear-gradient(to right, #ffffff, #d1d5db)",
  color: "black",
  border: "none",
  padding: "14px 24px",
  borderRadius: "14px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
  transition: "0.2s",
};

const deleteButton = {
  background:
    "linear-gradient(to right, #ef4444, #dc2626)",
  color: "white",
  border: "none",
  padding: "14px 24px",
  borderRadius: "14px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
};

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginTop: "18px",
  background: "#000",
  border: "2px solid #222",
  borderRadius: "14px",
  color: "white",
  fontSize: "17px",
  boxSizing: "border-box",
};

const loginBox = {
  maxWidth: "520px",
  margin: "50px auto",
  background:
    "linear-gradient(to bottom, #151515, #0f0f0f)",
  padding: "35px",
  borderRadius: "30px",
  boxShadow: "0 0 30px rgba(255,255,255,0.08)",
};

const adminBox = {
  maxWidth: "750px",
  margin: "70px auto",
  background:
    "linear-gradient(to bottom, #0b1020, #111827)",
  padding: "40px",
  borderRadius: "30px",
  boxShadow: "0 0 30px rgba(59,130,246,0.15)",
};

const tournamentCard = {
  background:
    "linear-gradient(to right, #0f172a, #111827)",
  padding: "30px",
  borderRadius: "24px",
  marginBottom: "25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
  border: "1px solid #1e293b",
};

const matchBox = {
  background:
    "linear-gradient(to bottom, #0b1020, #111827)",
  padding: "22px",
  borderRadius: "22px",
  width: "340px",
  marginBottom: "45px",
  border: "2px solid #1e293b",
  boxShadow: "0 0 20px rgba(59,130,246,0.12)",
};

const teamRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  fontSize: "18px",
  fontWeight: "bold",
};

const smallButton = {
  background:
    "linear-gradient(to right, #ffffff, #d1d5db)",
  color: "black",
  border: "none",
  padding: "10px 15px",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
};

const lineStyle = {
  borderColor: "#243041",
  margin: "16px 0",
};
