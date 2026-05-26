export default function App() {
  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hintergrund Logo */}
      <img
        src="/logo.png"
        alt="Angel Logo"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          opacity: "0.08",
          zIndex: "0",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "30px 50px",
          position: "relative",
          zIndex: "2",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "58px",
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
          marginTop: "140px",
          position: "relative",
          zIndex: "2",
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
    </div>
  );
}
