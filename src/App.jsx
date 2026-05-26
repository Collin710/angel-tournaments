import { useState } from "react";

export default function App() {
  const [adminMode, setAdminMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [teamsInput, setTeamsInput] = useState("");
  const [quarterFinals, setQuarterFinals] = useState([]);

  const [cupCreated, setCupCreated] = useState(false);

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

    const matches = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      matches.push([
        shuffled[i] || "TBD",
        shuffled[i + 1] || "TBD",
      ]);
    }

    setQuarterFinals(matches);
    setCupCreated(true);
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}

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
            }}
          >
            ANGEL
          </h1>

          <p
            style={{
              margin: "0",
              color: "#999",
              letterSpacing: "8px",
              fontSize: "14px",
            }}
          >
            TOURNAMENTS
          </p>
        </div>

        {!adminMode ? (
          <button
            onClick={() => setShowLogin(true)}
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
            Admin Login
          </button>
        ) : (
          <button
            onClick={() => setAdminMode(false)}
            style={{
              background: "#111",
              color: "white",
              border: "1px solid #444",
              padding: "15px 30px",
              borderRadius: "15px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* BIO */}

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
      </div>

      {/* LOGIN */}

      {showLogin && (
        <div
          style={{
            position: "fixed",
            inset: "0",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "999",
          }}
        >
          <div
            style={{
              background: "#111",
              padding: "40px",
              borderRadius: "25px",
              width: "400px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "35px",
                marginBottom: "30px",
              }}
            >
              ADMIN LOGIN
            </h2>

            <input
              type="text"
              placeholder="Benutzername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "12px",
                border: "1px solid #333",
                background: "#000",
                color: "white",
              }}
            />

            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "12px",
                border: "1px solid #333",
                background: "#000",
                color: "white",
              }}
            />

            <button
              onClick={login}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                border: "none",
                background: "white",
                color: "black",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Einloggen
            </button>
          </div>
        </div>
      )}

      {/* ADMIN PANEL */}

      {adminMode && (
        <div
          style={{
            maxWidth: "900px",
            margin: "100px auto",
            background: "#111",
            padding: "40px",
            borderRadius: "30px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "45px",
              marginBottom: "30px",
            }}
          >
            Turnier erstellen
          </h2>

          <textarea
            placeholder="Ein Team pro Zeile"
            value={teamsInput}
            onChange={(e) => setTeamsInput(e.target.value)}
            style={{
              width: "100%",
              height: "250px",
              background: "#000",
              color: "white",
              border: "1px solid #333",
              borderRadius: "20px",
              padding: "20px",
              fontSize: "18px",
            }}
          />

          <button
            onClick={createCup}
            style={{
              marginTop: "25px",
              width: "100%",
              padding: "18px",
              borderRadius: "20px",
              border: "none",
              background: "white",
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Teams auslosen & Cup speichern
          </button>
        </div>
      )}

      {/* CUP */}

      {cupCreated && (
        <div
          style={{
            marginTop: "80px",
            padding: "40px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "50px",
              marginBottom: "50px",
            }}
          >
            ANGEL WELCOME CUP
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "25px",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {quarterFinals.map((match, index) => (
              <div
                key={index}
                style={{
                  background: "#111",
                  padding: "25px",
                  borderRadius: "20px",
                  border: "1px solid #333",
                }}
              >
                <div
                  style={{
                    paddingBottom: "15px",
                    borderBottom: "1px solid #333",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {match[0]}
                </div>

                <div
                  style={{
                    paddingTop: "15px",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {match[1]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
