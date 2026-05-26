export default function App() {
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

        <button
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
      </div>

      {/* Hauptbereich */}
      <div
        style={{
          textAlign: "center",
          marginTop: "150px",
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

        <button
          style={{
            marginTop: "60px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            padding: "18px 40px",
            borderRadius: "15px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Turnier erstellen
        </button>
      </div>
    </div>
  );
}
