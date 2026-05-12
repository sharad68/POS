import { useState, useEffect } from "react";
import { USERS } from "../data/products";

export default function Login({ onLogin }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [pin, setPin]                   = useState("");
  const [error, setError]               = useState("");

  const padButtons = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

  // ── Auto-login when 4 digits entered ──
  useEffect(() => {
    if (pin.length === 4) {
      if (selectedUser && selectedUser.pin === pin) {
        onLogin(selectedUser);
      } else {
        setError("Wrong PIN, try again");
        setTimeout(() => {
          setPin("");
          setError("");
        }, 800);
      }
    }
  }, [pin]);

  // ── Handle pad button press ──
  const pressButton = (btn) => {
    if (btn === "⌫") {
      setPin(p => p.slice(0, -1));
      return;
    }
    if (pin.length < 4) {
      setPin(p => p + btn);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* ── Logo ── */}
        <div style={styles.logoWrap}>
          <div style={styles.logo}>HS</div>
          <h1 style={styles.storeName}>Himalaya Supermart</h1>
          <p style={styles.subtitle}>Point of Sale · Nepal</p>
        </div>

        {/* ── User Select ── */}
        <p style={styles.label}>Select Account</p>
        <div style={styles.userGrid}>
          {USERS.map(user => (
            <button
              key={user.id}
              onClick={() => { setSelectedUser(user); setPin(""); setError(""); }}
              style={{
                ...styles.userCard,
                border: selectedUser?.id === user.id
                  ? "2px solid #10b981"
                  : "2px solid #1f2937",
                background: selectedUser?.id === user.id
                  ? "rgba(16,185,129,0.1)"
                  : "#111827",
              }}
            >
              <div style={{
                ...styles.avatar,
                background: selectedUser?.id === user.id ? "#10b981" : "#1f2937",
              }}>
                {user.initial}
              </div>
              <p style={styles.userName}>{user.name}</p>
              <p style={styles.userRole}>{user.role}</p>
            </button>
          ))}
        </div>

        {/* ── PIN Section ── */}
        {selectedUser && (
          <div>
            <p style={styles.label}>Enter PIN</p>

            {/* 4 dots */}
            <div style={styles.dotsRow}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{
                  ...styles.dot,
                  background: pin.length > i ? "#10b981" : "#1f2937",
                  border: pin.length > i ? "2px solid #10b981" : "2px solid #374151",
                }}/>
              ))}
            </div>

            {/* Error message */}
            {error && <p style={styles.error}>{error}</p>}

            {/* Number pad */}
            <div style={styles.padGrid}>
              {padButtons.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => btn !== "" && pressButton(btn)}
                  style={{
                    ...styles.padBtn,
                    visibility: btn === "" ? "hidden" : "visible",
                    background: btn === "⌫" ? "rgba(239,68,68,0.1)" : "#111827",
                    color: btn === "⌫" ? "#f87171" : "#f9fafb",
                  }}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        )}

        <p style={styles.hint}>Demo: Owner 1234 · Cashier 5678</p>
      </div>
    </div>
  );
}

// ── Styles ──
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0e17",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 360,
  },
  logoWrap: {
    textAlign: "center",
    marginBottom: 32,
  },
  logo: {
    width: 64,
    height: 64,
    background: "linear-gradient(135deg, #10b981, #059669)",
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
    fontSize: 20,
    fontWeight: 900,
    color: "#fff",
    boxShadow: "0 8px 32px rgba(16,185,129,0.35)",
  },
  storeName: {
    fontSize: 22,
    fontWeight: 900,
    color: "#f9fafb",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  label: {
    fontSize: 11,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    textAlign: "center",
    marginBottom: 12,
  },
  userGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 24,
  },
  userCard: {
    padding: 16,
    borderRadius: 16,
    cursor: "pointer",
    textAlign: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 10px",
    fontSize: 18,
    fontWeight: 900,
    color: "#fff",
  },
  userName: {
    fontSize: 13,
    fontWeight: 700,
    color: "#f9fafb",
    marginBottom: 2,
  },
  userRole: {
    fontSize: 11,
    color: "#9ca3af",
    textTransform: "capitalize",
  },
  dotsRow: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginBottom: 8,
  },
  dot: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  error: {
    color: "#f87171",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 8,
  },
  padGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 10,
    marginTop: 16,
  },
  padBtn: {
    height: 58,
    borderRadius: 14,
    border: "1px solid #1f2937",
    fontSize: 20,
    fontWeight: 700,
    cursor: "pointer",
  },
  hint: {
    textAlign: "center",
    fontSize: 11,
    color: "#374151",
    marginTop: 24,
  },
};