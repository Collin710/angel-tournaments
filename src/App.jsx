import { useState } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const teams = [
    "Real Madrid",
    "Manchester City",
    "Bayern München",
    "PSG",
    "Barcelona",
    "Inter Mailand",
    "Arsenal",
    "Liverpool",
  ];

  const [drawnTeams, setDrawnTeams] = useState([]);

  function drawTeams() {
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    setDrawnTeams(shuffled);
  }

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "30px 50px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "900",
              margin: "0",
              letterSpacing: "2px",
            }}
          >
            ANGEL
          </h1>

          <p
            style={{
              margin: "0",
              color: "#aaa",
              letterSpacing: "8px",
              fontSize: "14px",
            }}
          >
            TOURNAMENTS
          </p>
        </div>

        {!loggedIn ? (
          <button
            onClick={() => setLoggedIn(true)}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "none",
              padding: "15px 30px",
              borderRadius: "15px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Admin Login
          </button>
        ) : (
          <button
            onClick={() => setLoggedIn(false)}
            style={{
              backgroundColor: "#222",
              color: "white",
              border: "1px solid #555",
              padding: "15px 30px",
              borderRadius: "15px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* Hauptbereich */}
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            fontSize: "75px",
            fontWeight: "900",
            marginBottom: "30px",
          }}
        >
          Willkommen bei Angel Tournaments 🏆
        </h2>

        <p
          style={{
            fontSize: "28px",
            color: "#cfcfcf",
            maxWidth: "1100px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}
        >
          Die neue FC 26 Pro Clubs Plattform für spannende Cups,
          starke Communities und echte Wettbewerbe.
        </p>

        {/* Funktionen nach Login */}
        {loggedIn && (
          <div style={{ marginTop: "80px" }}>
            <h3
              style={{
                fontSize: "40px",
                marginBottom: "30px",
              }}
            >
              Team Auslosung 🎲
            </h3>

            <button
              onClick={drawTeams}
              style={{
                backgroundColor: "white",
                color: "black",
                border: "none",
                padding: "18px 40px",
                borderRadius: "15px",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "40px",
              }}
            >
              Teams auslosen
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                maxWidth: "1000px",
                margin: "0 auto",
              }}
            >
              {drawnTeams.map((team, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#111",
                    padding: "25px",
                    borderRadius: "15px",
                    border: "1px solid #333",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  {team}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
