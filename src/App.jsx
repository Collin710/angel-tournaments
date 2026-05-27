import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";



// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "HIER_DEIN_API_KEY",
  authDomain: "HIER_DEIN_AUTH_DOMAIN",
  projectId: "angel-tournaments",
  storageBucket: "angel-tournaments.appspot.com",
  messagingSenderId: "HIER_DEIN_SENDER_ID",
  appId: "HIER_DEIN_APP_ID",
};



// FIREBASE STARTEN
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// LOGIN DATEN
const ADMIN_USER = "AngelAdmin";
const ADMIN_PASS = "AT2026";



export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [tournamentName, setTournamentName] = useState("");
  const [teamsInput, setTeamsInput] = useState("");

  const [tournaments, setTournaments] = useState([]);

  const [selectedTournament, setSelectedTournament] = useState(null);



  // TURNIERE LADEN
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tournaments"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTournaments(data);
    });

    return () => unsub();
  }, []);




  // LOGIN
  const handleLogin = () => {
    if (
      username === ADMIN_USER &&
      password === ADMIN_PASS
    ) {
      setIsAdmin(true);
      setShowLogin(false);
    } else {
      alert("Falsche Daten");
    }
  };



  // TURNIER ERSTELLEN
  const createTournament = async () => {
    const teams = teamsInput
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    if (!tournamentName || teams.length < 2) {
      alert("Bitte Namen + Teams eingeben");
      return;
    }

    const shuffled = [...teams].sort(() => Math.random() - 0.5);

    const matches = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      matches.push({
        team1: shuffled[i] || "Freilos",
        team2: shuffled[i + 1] || "Freilos",
        winner: null,
      });
    }

    await addDoc(collection(db, "tournaments"), {
      name: tournamentName,
      matches,
      createdAt: Date.now(),
    });

    setTournamentName("");
    setTeamsInput("");
  };



  // TURNIER LÖSCHEN
  const deleteTournament = async (id) => {
    await deleteDoc(doc(db, "tournaments", id));
  };



  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
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
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "55px",
              margin: 0,
              fontWeight: "900",
            }}
          >
            ANGEL
          </h1>

          <p
            style={{
              margin: 0,
              letterSpacing: "6px",
              color: "#aaa",
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
            onClick={() => setIsAdmin(false)}
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
          marginTop: "80px",
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
            fontSize: "24px",
          }}
        >
          Die neue FC 26 Pro Clubs Plattform
        </p>
      </div>



      {/* LOGIN */}
      {showLogin && (
        <div
          style={{
            maxWidth: "450px",
            margin: "40px auto",
            background: "#111",
            padding: "40px",
            borderRadius: "25px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "50px",
            }}
          >
            ADMIN LOGIN
          </h1>

          <input
            placeholder="Benutzername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={handleLogin}
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



      {/* ADMIN PANEL */}
      {isAdmin && (
        <div
          style={{
            maxWidth: "700px",
            margin: "60px auto",
            background: "#07112c",
            padding: "40px",
            borderRadius: "25px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "45px",
            }}
          >
            Turnier erstellen
          </h1>

          <input
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



      {/* TURNIERE */}
      <div
        style={{
          maxWidth: "900px",
          margin: "80px auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "50px",
          }}
        >
          Laufende Turniere
        </h1>

        {tournaments.map((t) => (
          <div
            key={t.id}
            style={{
              background: "#07112c",
              padding: "25px",
              borderRadius: "20px",
              marginTop: "20px",
            }}
          >
            <h2>{t.name}</h2>

            <button
              onClick={() => setSelectedTournament(t)}
              style={buttonStyle}
            >
              Turnier öffnen
            </button>

            {isAdmin && (
              <button
                onClick={() =>
                  deleteTournament(t.id)
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



      {/* TURNIERBAUM */}
      {selectedTournament && (
        <div
          style={{
            maxWidth: "1200px",
            margin: "100px auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "40px",
            }}
          >
            <h1>{selectedTournament.name}</h1>

            <button
              onClick={() =>
                setSelectedTournament(null)
              }
              style={buttonStyle}
            >
              Ansicht schließen
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
            }}
          >
            {selectedTournament.matches.map(
              (match, index) => (
                <div
                  key={index}
                  style={{
                    background: "#07112c",
                    padding: "25px",
                    borderRadius: "20px",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    {match.team1}
                  </div>

                  <div>{match.team2}</div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}



// STYLES
const buttonStyle = {
  background: "white",
  color: "black",
  border: "none",
  padding: "16px 30px",
  borderRadius: "16px",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "18px",
};

const inputStyle = {
  width: "100%",
  background: "black",
  border: "1px solid #333",
  borderRadius: "16px",
  padding: "18px",
  color: "white",
  fontSize: "18px",
  marginTop: "20px",
  boxSizing: "border-box",
};
