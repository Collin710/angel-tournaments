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
      {/* LOGIN */}

      {showLogin && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            backdropFilter: "blur(5px)",
          }}
        >
          <div
            style={{
              width: "450px",
              background:
                "linear-gradient(145deg, #11131a, #1a1d26)",
              borderRadius: "35px",
              padding: "45px",
              boxShadow: "0 0 40px rgba(0,0,0,0.6)",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontSize: "58px",
                fontWeight: "900",
                marginBottom: "40px",
              }}
            >
              ADMIN LOGIN
            </h1>

            <input
              type="text"
              value="AngelAdmin"
              readOnly
              style={{
                width: "100%",
                padding: "22px",
                borderRadius: "18px",
                background: "black",
                border: "2px solid #2b2f3d",
                color: "white",
                fontSize: "28px",
                marginBottom: "25px",
              }}
            />

            <input
              type="password"
              placeholder="Passwort"
              value={loginPassword}
              onChange={(e) =>
                setLoginPassword(e.target.value)
              }
              style={{
                width: "100%",
                padding: "22px",
                borderRadius: "18px",
                background: "black",
                border: "2px solid #2b2f3d",
                color: "white",
                fontSize: "28px",
                marginBottom: "30px",
              }}
            />

            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                background: "#f4f4f4",
                color: "black",
                border: "none",
                padding: "22px",
                borderRadius: "20px",
                fontSize: "30px",
                fontWeight: "900",
                cursor: "pointer",
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
    </div>
  );
}
