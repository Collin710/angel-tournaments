import { useState } from "react";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");

  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const [tournamentName, setTournamentName] = useState("");
  const [teamsInput, setTeamsInput] = useState("");

  const adminPassword = "angel123";

  function handleLogin() {
    if (loginPassword === adminPassword) {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginPassword("");
    } else {
      alert("Falsches Passwort");
    }
  }

  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function createTournament() {
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

    const shuffled = shuffle(teams);

    const quarterFinals = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      quarterFinals.push({
        team1: shuffled[i],
        team2: shuffled[i + 1] || "Freilos",
        winner: "",
      });
    }

    const newTournament = {
      id: Date.now(),
      name: tournamentName,
      quarterFinals,
      semiFinals: [
        { team1: "", team2: "", winner: "" },
        { team1: "", team2: "", winner: "" },
      ],
      final: {
        team1: "",
        team2: "",
        winner: "",
      },
    };

    setTournaments([...tournaments, newTournament]);

    setTournamentName("");
    setTeamsInput("");
  }

  function advanceQuarterWinner(
    tournamentId,
    matchIndex,
    winner
  ) {
    const updated = tournaments.map((tournament) => {
      if (tournament.id !== tournamentId) return tournament;

      const updatedTournament = { ...tournament };

      updatedTournament.quarterFinals[matchIndex].winner =
        winner;

      if (matchIndex < 2) {
        if (!updatedTournament.semiFinals[0].team1) {
          updatedTournament.semiFinals[0].team1 = winner;
        } else {
          updatedTournament.semiFinals[0].team2 = winner;
        }
      } else {
        if (!updatedTournament.semiFinals[1].team1) {
          updatedTournament.semiFinals[1].team1 = winner;
        } else {
          updatedTournament.semiFinals[1].team2 = winner;
        }
      }

      return updatedTournament;
    });

    setTournaments(updated);

    const updatedTournament = updated.find(
      (t) => t.id === tournamentId
    );

    setSelectedTournament(updatedTournament);
  }

  function advanceSemiWinner(
    tournamentId,
    matchIndex,
    winner
  ) {
    const updated = tournaments.map((tournament) => {
      if (tournament.id !== tournamentId) return tournament;

      const updatedTournament = { ...tournament };

      updatedTournament.semiFinals[matchIndex].winner =
        winner;

      if (!updatedTournament.final.team1) {
        updatedTournament.final.team1 = winner;
      } else {
        updatedTournament.final.team2 = winner;
      }

      return updatedTournament;
    });

    setTournaments(updated);

    const updatedTournament = updated.find(
      (t) => t.id === tournamentId
    );

    setSelectedTournament(updatedTournament);
  }

  function selectChampion(tournamentId, winner) {
    const updated = tournaments.map((tournament) => {
      if (tournament.id !== tournamentId) return tournament;

      return {
        ...tournament,
        final: {
          ...tournament.final,
          winner,
        },
      };
    });

    setTournaments(updated);

    const updatedTournament = updated.find(
      (t) => t.id === tournamentId
    );

    setSelectedTournament(updatedTournament);
  }

  function deleteTournament(id) {
    const filtered = tournaments.filter(
      (t) => t.id !== id
    );

    setTournaments(filtered);

    setSelectedTournament(null);
  }

  return (
    <div
      style={{
        background: "black",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      {/* LOGIN MODAL */}

      {showLogin && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#061126",
              padding: "40px",
              borderRadius: "30px",
              width: "400px",
            }}
          >
            <h2
              style={{
                fontSize: "40px",
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              Admin Login
            </h2>

            <input
              type="password"
              placeholder="Passwort"
              value={loginPassword}
              onChange={(e) =>
                setLoginPassword(e.target.value)
              }
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "15px",
                background: "black",
                color: "white",
                border: "1px solid #333",
                marginBottom: "20px",
                fontSize: "18px",
              }}
            />

            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                background: "white",
                color: "black",
                border: "none",
                padding: "18px",
                borderRadius: "15px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              Einloggen
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "60px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "70px",
              margin: 0,
              fontWeight: "900",
            }}
          >
            ANGEL
          </h1>

          <p
            style={{
              letterSpacing: "10px",
              marginTop: "-10px",
            }}
          >
            TOURNAMENTS
          </p>
        </div>

        {!isAdmin ? (
          <button
            onClick={() => setShowLogin(true)}
            style={{
              background: "white",
              color: "black",
              border: "none",
              padding: "15px 30px",
              borderRadius: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Admin Login
          </button>
        ) : (
          <button
            onClick={() => setIsAdmin(false)}
            style={{
              background: "white",
              color: "black",
              border: "none",
              padding: "15px 30px",
              borderRadius: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* HERO */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "80px",
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            fontWeight: "900",
          }}
        >
          Willkommen bei Angel Tournaments 🏆
        </h1>

        <p
          style={{
            color: "#aaa",
            fontSize: "28px",
            maxWidth: "900px",
            margin: "auto",
            lineHeight: "1.6",
          }}
        >
          Die neue FC 26 Pro Clubs Plattform für spannende Cups,
          starke Communities und echte Wettbewerbe.
        </p>
      </div>

      {/* ADMIN PANEL */}

      {isAdmin && (
        <div
          style={{
            background: "#061126",
            padding: "40px",
            borderRadius: "30px",
            maxWidth: "900px",
            margin: "auto",
            marginBottom: "80px",
          }}
        >
          <h2
            style={{
              fontSize: "50px",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            Turnier erstellen
          </h2>

          <input
            value={tournamentName}
            onChange={(e) =>
              setTournamentName(e.target.value)
            }
            placeholder="Turniername"
            style={{
              width: "100%",
              padding: "20px",
              borderRadius: "20px",
              background: "black",
              color: "white",
              border: "1px solid #333",
              marginBottom: "25px",
              fontSize: "22px",
            }}
          />

          <textarea
            value={teamsInput}
            onChange={(e) =>
              setTeamsInput(e.target.value)
            }
            placeholder="Ein Team pro Zeile"
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "20px",
              background: "black",
              color: "white",
              border: "1px solid #333",
              padding: "20px",
              fontSize: "20px",
              marginBottom: "30px",
            }}
          />

          <button
            onClick={createTournament}
            style={{
              width: "100%",
              background: "white",
              color: "black",
              border: "none",
              padding: "22px",
              borderRadius: "20px",
              fontSize: "28px",
              fontWeight: "900",
              cursor: "pointer",
            }}
          >
            Teams auslosen
          </button>
        </div>
      )}

      {/* TURNIERE */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <h2
          style={{
            fontSize: "50px",
            marginBottom: "40px",
          }}
        >
          Laufende Turniere
        </h2>

        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            style={{
              background: "#061126",
              padding: "30px",
              borderRadius: "25px",
              marginBottom: "30px",
            }}
          >
            <h2
              style={{
                fontSize: "40px",
              }}
            >
              {tournament.name}
            </h2>

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() =>
                  setSelectedTournament(tournament)
                }
                style={{
                  background: "white",
                  color: "black",
                  border: "none",
                  padding: "15px 30px",
                  borderRadius: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Turnierbaum öffnen
              </button>

              {isAdmin && (
                <button
                  onClick={() =>
                    deleteTournament(tournament.id)
                  }
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "15px 30px",
                    borderRadius: "15px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Turnier löschen
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
