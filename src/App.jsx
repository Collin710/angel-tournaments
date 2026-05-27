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
    if (username === adminUser && password === adminPassword) {
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
    let currentRound = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      currentRound.push({
        team1: shuffled[i] || "Freilos",
        team2: shuffled[i + 1] || "Freilos",
        winner: null,
      });
    }

    rounds.push(currentRound);

    let nextSize = Math.ceil(currentRound.length / 2);

    while (nextSize >= 1) {
      const nextRound = [];

      for (let i = 0; i < nextSize; i++) {
        nextRound.push({
          team1: "TBD",
          team2: "TBD",
          winner: null,
        });
      }

      rounds.push(nextRound);
      nextSize = Math.ceil(nextSize / 2);

      if (nextSize === 1 && rounds[rounds.length - 1].length === 1) {
        break;
      }
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

    updated[tournamentIndex].rounds[roundIndex][matchIndex].winner = team;

    if (
      updated[tournamentIndex].rounds[roundIndex + 1]
    ) {
      const nextMatch = Math.floor(matchIndex / 2);

      if (matchIndex % 2 === 0) {
        updated[tournamentIndex].rounds[roundIndex + 1][
          nextMatch
        ].team1 = team;
      } else {
        updated[tournamentIndex].rounds[roundIndex + 1][
          nextMatch
        ].team2 = team;
      }
    }

    setTournaments(updated);
  };

  const deleteTournament = (id) => {
    const filtered = tournaments.filter((t) => t.id !== id);
    setTournaments(filtered);
    setSelectedTournament(null);
  };

  const roundNames = [
    "Finale",
    "Halbfinale",
    "Viertelfinale",
    "Achtelfinale",
    "Runde",
  ];

  const getRoundName = (rounds, index) => {
    const remaining = rounds.length - index - 1;

    if (remaining === 0) return "Finale";
    if (remaining === 1) return "Halbfinale";
    if (remaining === 2) return "Viertelfinale";
    if (remaining === 3) return "Achtelfinale";

    return `Runde ${index + 1}`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "60px", margin: 0 }}>
            ANGEL
          </h1>
          <p
            style={{
              letterSpacing: "8px",
              marginTop: "-10px",
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

      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1 style={{ fontSize: "70px" }}>
          Willkommen bei Angel Tournaments 🏆
        </h1>

        <p
          style={{
            color: "#aaa",
            fontSize: "30px",
          }}
        >
          Die neue FC 26 Pro Clubs Plattform
        </p>
      </div>

      {showLogin && (
        <div style={loginBox}>
          <h1 style={{ textAlign: "center" }}>
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
              marginTop: "20px",
            }}
          >
            Einloggen
          </button>
        </div>
      )}

      {isAdmin && (
        <div style={adminBox}>
          <h1 style={{ textAlign: "center" }}>
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
              height: "250px",
              resize: "none",
            }}
          />

          <button
            onClick={createTournament}
            style={{
              ...buttonStyle,
              width: "100%",
            }}
          >
            Teams auslosen
          </button>
        </div>
      )}

      <div style={{ marginTop: "80px" }}>
        <h1>Laufende Turniere</h1>

        {tournaments.map((tournament, index) => (
          <div
            key={tournament.id}
            style={{
              background: "#0b1020",
              padding: "20px",
              borderRadius: "20px",
              marginBottom: "20px",
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
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                }}
              >
                Turnier löschen
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedTournament !== null && (
        <div style={{ marginTop: "100px" }}>
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
            }}
          >
            {tournaments[
              selectedTournament
            ].rounds.map((round, roundIndex) => (
              <div key={roundIndex}>
                <h1 style={{ marginBottom: "30px" }}>
                  {getRoundName(
                    tournaments[selectedTournament]
                      .rounds,
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
  padding: "15px 25px",
  borderRadius: "15px",
  fontWeight: "bold",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "20px",
  marginTop: "20px",
  background: "black",
  border: "2px solid #333",
  borderRadius: "15px",
  color: "white",
  fontSize: "18px",
  boxSizing: "border-box",
};

const loginBox = {
  maxWidth: "500px",
  margin: "50px auto",
  background: "#111",
  padding: "40px",
  borderRadius: "30px",
};

const adminBox = {
  maxWidth: "700px",
  margin: "80px auto",
  background: "#0b1020",
  padding: "40px",
  borderRadius: "30px",
};

const matchBox = {
  background: "#0b1020",
  padding: "20px",
  borderRadius: "20px",
  width: "350px",
  marginBottom: "40px",
  border: "2px solid #1e293b",
};

const teamRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px 0",
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
