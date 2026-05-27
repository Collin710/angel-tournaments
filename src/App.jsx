import { useState } from "react";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [tournamentName, setTournamentName] = useState("");
  const [teamsInput, setTeamsInput] = useState("");

  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

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

    const nextRound =
      updated[tournamentIndex].rounds[roundIndex + 1];

    if (!nextRound) return;

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

    if (remaining === 1) return "Finale";
    if (remaining === 2) return "Halbfinale";
    if (remaining === 3) return "Viertelfinale";
    if (remaining === 4) return "Achtelfinale";

    return `Runde ${index + 1}`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        padding: "20px",
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
              fontSize: "55px",
              margin: 0,
              lineHeight: "50px",
            }}
          >
            ANGEL
          </h1>

          <p
            style={{
              letterSpacing: "6px",
              marginTop: "5px",
              fontSize: "14px",
            }}
          >
            TOURNAMENTS
          </p>
        </div>

        {!isAdmin ? (
          <button
            onClick={() => setShowLogin(true)}
            style={buttonStyle}
          >
            Admin Login
          </button>
        ) : (
          <button
            onClick={logout}
            style={buttonStyle}
          >
            Logout
          </button>
        )}
      </div>

      {/* HERO */}
      <div
        style={{
          textAlign: "center",
          marginTop: "70px",
        }}
      >
        <h1
          style={{
            fontSize: "55px",
            marginBottom: "20px",
          }}
        >
          Willkommen bei Angel Tournaments 🏆
        </h1>

        <p
          style={{
            color: "#aaa",
            fontSize: "22px",
            lineHeight: "40px",
          }}
        >
          Die neue FC 26 Pro Clubs Plattform für spannende
          Cups, starke Communities und echte Wettbewerbe.
        </p>
      </div>

      {/* LOGIN */}
      {showLogin && (
        <div style={loginBox}>
          <h1
            style={{
              textAlign: "center",
              fontSize: "55px",
              marginBottom: "35px",
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
              ...buttonStyle,
              width: "100%",
              marginTop: "25px",
              padding: "18px",
              fontSize: "22px",
            }}
          >
            Einloggen
          </button>
        </div>
      )}

      {/* ADMIN */}
      {isAdmin && (
        <div style={adminBox}>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Turnier erstellen
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
              ...buttonStyle,
              width: "100%",
              marginTop: "20px",
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
        <h1>Laufende Turniere</h1>

        {tournaments.map((tournament, index) => (
          <div
            key={tournament.id}
            style={{
              background: "#0b1020",
              padding: "25px",
              borderRadius: "20px",
              marginTop: "20px",
            }}
          >
            <h2>{tournament.name}</h2>

            <button
              onClick={() =>
                setSelectedTournament(index)
              }
              style={buttonStyle}
            >
              Turnier öffnen
            </button>

            {isAdmin && (
              <button
                onClick={() =>
                  deleteTournament(tournament.id)
                }
                style={{
                  ...buttonStyle,
                  marginLeft: "15px",
                  background: "red",
                  color: "white",
                }}
              >
                Löschen
              </button>
            )}
          </div>
        ))}
      </div>

      {/* BRACKET */}
      {selectedTournament !== null && (
        <div style={{ marginTop: "80px" }}>
          <button
            onClick={() =>
              setSelectedTournament(null)
            }
            style={{
              ...buttonStyle,
              marginBottom: "40px",
            }}
          >
            Ansicht schließen
          </button>

          <div
            style={{
              display: "flex",
              gap: "60px",
              overflowX: "auto",
              paddingBottom: "40px",
            }}
          >
            {tournaments[
              selectedTournament
            ].rounds.map((round, roundIndex) => (
              <div key={roundIndex}>
                <h1 style={{ marginBottom: "30px" }}>
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

                    <hr
                      style={{
                        borderColor: "#333",
                        margin: "15px 0",
                      }}
                    />

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

const buttonStyle = {
  background: "white",
  color: "black",
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
  background: "black",
  border: "2px solid #333",
  borderRadius: "14px",
  color: "white",
  fontSize: "17px",
  boxSizing: "border-box",
};

const loginBox = {
  maxWidth: "520px",
  margin: "50px auto",
  background: "#111",
  padding: "35px",
  borderRadius: "30px",
};

const adminBox = {
  maxWidth: "700px",
  margin: "70px auto",
  background: "#0b1020",
  padding: "35px",
  borderRadius: "30px",
};

const matchBox = {
  background: "#0b1020",
  padding: "20px",
  borderRadius: "20px",
  width: "320px",
  marginBottom: "40px",
  border: "2px solid #1e293b",
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
  background: "white",
  color: "black",
  border: "none",
  padding: "10px 15px",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
};
