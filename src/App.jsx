import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGgFkiRgBKLSkPZF4OH4liGuIzUas-nr4",
  authDomain: "angel-tournaments.firebaseapp.com",
  projectId: "angel-tournaments",
  storageBucket: "angel-tournaments.firebasestorage.app",
  messagingSenderId: "36676575179",
  appId: "1:36676575179:web:4704d579925b0166e0204e",
  measurementId: "G-5WNR7HP93P",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [admin, setAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [cupName, setCupName] = useState("");
  const [teamsInput, setTeamsInput] = useState("");

  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

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

  const login = () => {
    if (username === "AngelAdmin" && password === "AT2026") {
      setAdmin(true);
      setShowLogin(false);
    } else {
      alert("Falsche Daten");
    }
  };

  const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const createTournament = async () => {
    const teams = teamsInput
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    if (teams.length < 2) {
      alert("Mindestens 2 Teams");
      return;
    }

    const shuffled = shuffle(teams);

    const quarterfinals = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      quarterfinals.push({
        team1: shuffled[i] || "TBD",
        team2: shuffled[i + 1] || "TBD",
      });
    }

    await addDoc(collection(db, "tournaments"), {
      name: cupName,
      quarterfinals,
      semifinals: [
        { team1: "TBD", team2: "TBD" },
        { team1: "TBD", team2: "TBD" },
      ],
      final: { team1: "TBD", team2: "TBD" },
      winner: "",
    });

    setCupName("");
    setTeamsInput("");
  };

  const advanceQuarter = async (tournament, matchIndex, winner) => {
    const semis = [...tournament.semifinals];

    if (matchIndex === 0) semis[0].team1 = winner;
    if (matchIndex === 1) semis[0].team2 = winner;
    if (matchIndex === 2) semis[1].team1 = winner;
    if (matchIndex === 3) semis[1].team2 = winner;

    await updateDoc(doc(db, "tournaments", tournament.id), {
      semifinals: semis,
    });
  };

  const advanceSemi = async (tournament, matchIndex, winner) => {
  const updatedFinal = {
    ...tournament.final,
  };

  if (matchIndex === 0) {
    updatedFinal.team1 = winner;
  }

  if (matchIndex === 1) {
    updatedFinal.team2 = winner;
  }

  await updateDoc(doc(db, "tournaments", tournament.id), {
    final: updatedFinal,
  });

  // SOFORT AKTUALISIEREN
  setSelectedTournament({
    ...tournament,
    final: updatedFinal,
  });

  // TURNIERLISTE AKTUALISIEREN
  setTournaments((prev) =>
    prev.map((t) =>
      t.id === tournament.id
        ? {
            ...t,
            final: updatedFinal,
          }
        : t
    )
  );
};

  const setWinner = async (tournament, winner) => {
  await updateDoc(doc(db, "tournaments", tournament.id), {
    winner,
  });

  // SOFORT AKTUALISIEREN
  setSelectedTournament({
    ...tournament,
    winner,
  });

  setTournaments((prev) =>
    prev.map((t) =>
      t.id === tournament.id
        ? {
            ...t,
            winner,
          }
        : t
    )
  );

  // GLÜCKWUNSCH
  setTimeout(() => {
    alert(`🏆 Herzlichen Glückwunsch an ${winner}!`);
  }, 300);
};

  const deleteTournament = async (id) => {
    await deleteDoc(doc(db, "tournaments", id));
    setSelectedTournament(null);
  };

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
          alignItems: "start",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "70px",
              fontWeight: "900",
              lineHeight: "70px",
            }}
          >
            ANGEL
          </h1>

          <p
            style={{
              letterSpacing: "10px",
              color: "#aaa",
              marginTop: "-10px",
            }}
          >
            TOURNAMENTS
          </p>
        </div>

        {!admin ? (
          <button
            onClick={() => setShowLogin(true)}
            style={{
              padding: "15px 30px",
              borderRadius: "15px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Admin Login
          </button>
        ) : (
          <button
            onClick={() => setAdmin(false)}
            style={{
              padding: "15px 30px",
              borderRadius: "15px",
              border: "none",
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
          marginTop: "100px",
          marginBottom: "100px",
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
            marginTop: "20px",
          }}
        >
          Die neue FC 26 Pro Clubs Plattform für spannende Cups.
        </p>
      </div>

      {/* LOGIN */}

      {showLogin && (
        <div
          style={{
            width: "420px",
            margin: "0 auto 80px auto",
            background: "#111",
            padding: "40px",
            borderRadius: "30px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "50px",
            }}
          >
            ADMIN LOGIN
          </h1>

          <input
            placeholder="Benutzername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "15px",
              background: "black",
              color: "white",
              border: "1px solid #333",
            }}
          />

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "15px",
              background: "black",
              color: "white",
              border: "1px solid #333",
            }}
          />

          <button
            onClick={login}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "15px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Einloggen
          </button>
        </div>
      )}

      {/* ADMIN CREATE */}

      {admin && (
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            background: "#050d33",
            padding: "40px",
            borderRadius: "30px",
            marginBottom: "80px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "55px",
              marginBottom: "30px",
            }}
          >
            Cup erstellen
          </h1>

          <input
            placeholder="Turniername"
            value={cupName}
            onChange={(e) => setCupName(e.target.value)}
            style={{
              width: "100%",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "15px",
              background: "black",
              color: "white",
              border: "1px solid #333",
            }}
          />

          <textarea
            placeholder="Ein Team pro Zeile"
            value={teamsInput}
            onChange={(e) => setTeamsInput(e.target.value)}
            style={{
              width: "100%",
              height: "250px",
              padding: "20px",
              borderRadius: "15px",
              background: "black",
              color: "white",
              border: "1px solid #333",
            }}
          />

          <button
            onClick={createTournament}
            style={{
              width: "100%",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "15px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Teams auslosen
          </button>
        </div>
      )}

      {/* TURNIERE */}

      <h1
        style={{
          marginBottom: "30px",
          fontSize: "45px",
        }}
      >
        Laufende Turniere
      </h1>

      {tournaments.map((t) => (
        <div
          key={t.id}
          style={{
            background: "#111",
            padding: "30px",
            borderRadius: "25px",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            {t.name}
          </h2>

          <button
            onClick={() => setSelectedTournament(t)}
            style={{
              padding: "15px 30px",
              borderRadius: "15px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Öffnen
          </button>

          {admin && (
            <button
              onClick={() => deleteTournament(t.id)}
              style={{
                padding: "15px 30px",
                borderRadius: "15px",
                border: "none",
                background: "red",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Löschen
            </button>
          )}
        </div>
      ))}

      {/* TURNIERBAUM */}

      {selectedTournament && (
        <div style={{ marginTop: "100px" }}>
          <button
            onClick={() => setSelectedTournament(null)}
            style={{
              marginBottom: "50px",
              padding: "15px 30px",
              borderRadius: "15px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Ansicht schließen
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "50px",
            }}
          >
            {/* Viertelfinale */}

            <div>
              <h1 style={{ marginBottom: "40px" }}>Viertelfinale</h1>

              {selectedTournament.quarterfinals.map((match, index) => (
                <div
                  key={index}
                  style={{
                    background: "#050d33",
                    width: "350px",
                    padding: "25px",
                    borderRadius: "25px",
                    marginBottom: "40px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <span>{match.team1}</span>

                    {admin && (
                      <button
                        onClick={() =>
                          advanceQuarter(
                            selectedTournament,
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
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <span>{match.team2}</span>

                    {admin && (
                      <button
                        onClick={() =>
                          advanceQuarter(
                            selectedTournament,
                            index,
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

            {/* Halbfinale */}

            <div>
              <h1 style={{ marginBottom: "120px" }}>Halbfinale</h1>

              {selectedTournament.semifinals.map((match, index) => (
                <div
                  key={index}
                  style={{
                    background: "#071b55",
                    width: "350px",
                    padding: "25px",
                    borderRadius: "25px",
                    marginBottom: "140px",
                    marginTop: "120px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <span>{match.team1}</span>

                    {admin && (
                      <button
                        onClick={() =>
                          advanceSemi(
                            selectedTournament,
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
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <span>{match.team2}</span>

                    {admin && (
                      <button
                        onClick={() =>
                          advanceSemi(
                            selectedTournament,
                            index,
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

            {/* Finale */}

            <div>
              <h1 style={{ marginBottom: "260px" }}>Finale</h1>

              <div
                style={{
                  background: "#2b2200",
                  width: "350px",
                  padding: "25px",
                  borderRadius: "25px",
                  marginTop: "220px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <span>{selectedTournament.final.team1}</span>

                  {admin && (
                    <button
                      onClick={() =>
                        setWinner(
                          selectedTournament,
                          selectedTournament.final.team1
                        )
                      }
                    >
                      Sieger
                    </button>
                  )}
                </div>

                <hr />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <span>{selectedTournament.final.team2}</span>

                  {admin && (
                    <button
                      onClick={() =>
                        setWinner(
                          selectedTournament,
                          selectedTournament.final.team2
                        )
                      }
                    >
                      Sieger
                    </button>
                  )}
                </div>
              </div>

              {selectedTournament.winner && (
                <div
                  style={{
                    marginTop: "50px",
                    background: "#111",
                    padding: "30px",
                    borderRadius: "25px",
                    textAlign: "center",
                  }}
                >
                  <h1 style={{ fontSize: "70px" }}>🏆</h1>

                  <h2>
                    Herzlichen Glückwunsch an{" "}
                    {selectedTournament.winner}
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}