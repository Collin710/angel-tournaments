import { useState } from "react";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const [tournamentName, setTournamentName] = useState("");
  const [teamsInput, setTeamsInput] = useState("");

  const adminPassword = "angel123";

  function login() {
    if (password === adminPassword) {
      setIsAdmin(true);
      alert("Admin Login erfolgreich");
    } else {
      alert("Falsches Passwort");
    }
  }

  function logout() {
    setIsAdmin(false);
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

    const matches = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      matches.push({
        team1: shuffled[i],
        team2: shuffled[i + 1] || "Freilos",
        winner: "",
      });
    }

    const newTournament = {
      id: Date.now(),
      name: tournamentName,
      matches,
    };

    setTournaments([...tournaments, newTournament]);

    setTournamentName("");
    setTeamsInput("");
  }

  function selectWinner(tournamentId, matchIndex, winner) {
    const updated = tournaments.map((tournament) => {
      if (tournament.id !== tournamentId) return tournament;

      const updatedMatches = [...tournament.matches];

      updatedMatches[matchIndex].winner = winner;

      return {
        ...tournament,
        matches: updatedMatches,
      };
    });

    setTournaments(updated);

    const updatedTournament = updated.find(
      (t) => t.id === tournamentId
    );

    setSelectedTournament(updatedTournament);
  }

  function deleteTournament(id) {
    const filtered = tournaments.filter((t) => t.id !== id);

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
            onClick={() => {
              const pw = prompt("Admin Passwort");

              if (pw === adminPassword) {
                setIsAdmin(true);
              } else {
                alert("Falsches Passwort");
              }
            }}
            style={{
              background: "white",
              color: "black",
              border: "none",
              padding: "15px 30px",
              borderRadius: "20px",
              fontWeight: "bold",
              height: "60px",
              cursor: "pointer",
            }}
          >
            Admin Login
          </button>
        ) : (
          <button
            onClick={logout}
            style={{
              background: "white",
              color: "black",
              border: "none",
              padding: "15px 30px",
              borderRadius: "20px",
              fontWeight: "bold",
              height: "60px",
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
          marginBottom: "70px",
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
            fontSize: "30px",
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
            background: "#050b2c",
            padding: "40px",
            borderRadius: "30px",
            maxWidth: "900px",
            margin: "auto",
            marginBottom: "80px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "55px",
              marginBottom: "40px",
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
              background: "#050b2c",
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

      {/* TURNIERBAUM */}
      {selectedTournament && (
        <div
          style={{
            marginTop: "100px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "50px",
            }}
          >
            <h1
              style={{
                fontSize: "60px",
              }}
            >
              {selectedTournament.name}
            </h1>

            <button
              onClick={() => setSelectedTournament(null)}
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
              Ansicht schließen
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "80px",
            }}
          >
            {/* Viertelfinale */}
            <div>
              <h2
                style={{
                  fontSize: "45px",
                  marginBottom: "40px",
                }}
              >
                Viertelfinale
              </h2>

              {selectedTournament.matches.map(
                (match, index) => (
                  <div
                    key={index}
                    style={{
                      background: "#050b2c",
                      padding: "25px",
                      borderRadius: "25px",
                      marginBottom: "40px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <span>{match.team1}</span>

                      {isAdmin && (
                        <button
                          onClick={() =>
                            selectWinner(
                              selectedTournament.id,
                              index,
                              match.team1
                            )
                          }
                        >
                          Weiter
                        </button>
                      )}
                    </div>

                    <hr />

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <span>{match.team2}</span>

                      {isAdmin && (
                        <button
                          onClick={() =>
                            selectWinner(
                              selectedTournament.id,
                              index,
                              match.team2
                            )
                          }
                        >
                          Weiter
                        </button>
                      )}
                    </div>

                    {match.winner && (
                      <div
                        style={{
                          marginTop: "25px",
                          color: "#00ff99",
                          fontWeight: "bold",
                        }}
                      >
                        Gewinner: {match.winner}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Halbfinale */}
            <div>
              <h2
                style={{
                  fontSize: "45px",
                  marginBottom: "40px",
                }}
              >
                Halbfinale
              </h2>

              <div
                style={{
                  background: "#050b2c",
                  padding: "25px",
                  borderRadius: "25px",
                  marginBottom: "40px",
                  border: "2px solid cyan",
                }}
              >
                TBD
              </div>

              <div
                style={{
                  background: "#050b2c",
                  padding: "25px",
                  borderRadius: "25px",
                  border: "2px solid cyan",
                }}
              >
                TBD
              </div>
            </div>

            {/* Finale */}
            <div>
              <h2
                style={{
                  fontSize: "45px",
                  marginBottom: "40px",
                }}
              >
                Finale
              </h2>

              <div
                style={{
                  background: "#050b2c",
                  padding: "25px",
                  borderRadius: "25px",
                  border: "2px solid gold",
                }}
              >
                TBD
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
