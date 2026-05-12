const NAV = [
  { id: "pos",      emoji: "🛒", label: "POS"      },
  { id: "stock",    emoji: "📦", label: "Stock"    },
  { id: "receive",  emoji: "⬇️",  label: "Receive" },
  { id: "history",  emoji: "📋", label: "History"  },
  { id: "report",   emoji: "📊", label: "Reports"  },
  { id: "settings", emoji: "⚙️",  label: "Settings" },
];

export default function Sidebar({ view, setView, user, onLogout, alertCount }) {
  // filter out Reports for cashier role
  const navItems = NAV.filter(item => {
    if (item.id === "report" && user.role !== "owner") return false;
    return true;
  });

  return (
    <div style={styles.sidebar}>

      {/* ── Logo ── */}
      <div style={styles.logo}>HS</div>

      {/* ── Nav Items ── */}
      <div style={styles.navList}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            style={{
              ...styles.navBtn,
              background: view === item.id ? "rgba(16,185,129,0.15)" : "transparent",
            }}
          >
            {/* Red badge for stock alerts */}
            {item.id === "stock" && alertCount > 0 && (
              <div style={styles.badge}>
                {alertCount > 9 ? "9+" : alertCount}
              </div>
            )}

            <span style={styles.navEmoji}>{item.emoji}</span>
            <span style={{
              ...styles.navLabel,
              color: view === item.id ? "#10b981" : "#6b7280",
            }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Spacer pushes user + logout to bottom ── */}
      <div style={{ flex: 1 }} />

      {/* ── User Avatar ── */}
      <div style={styles.userSection}>
        <div style={styles.avatar}>{user.initial}</div>
        <p style={styles.userName}>{user.name.split(" ")[0]}</p>
      </div>

      {/* ── Logout ── */}
      <button onClick={onLogout} style={styles.logoutBtn}>
        <span style={styles.navEmoji}>🚪</span>
        <span style={styles.navLabel}>Exit</span>
      </button>

    </div>
  );
}

// ── Styles ──
const styles = {
  sidebar: {
    width: 72,
    flexShrink: 0,
    height: "100vh",
    background: "#111827",
    borderRight: "1px solid #1f2937",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
  },
  logo: {
    width: 42,
    height: 42,
    background: "linear-gradient(135deg, #10b981, #059669)",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 900,
    color: "#fff",
    marginBottom: 16,
    boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
    flexShrink: 0,
  },
  navList: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
    alignItems: "center",
  },
  navBtn: {
    position: "relative",
    width: 56,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    background: "#ef4444",
    borderRadius: "50%",
    color: "#fff",
    fontSize: 8,
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  navEmoji: {
    fontSize: 18,
    lineHeight: 1,
  },
  navLabel: {
    fontSize: 9,
    fontWeight: 600,
  },
  userSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#1f2937",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9ca3af",
    fontSize: 13,
    fontWeight: 700,
  },
  userName: {
    fontSize: 9,
    color: "#6b7280",
  },
  logoutBtn: {
    width: 56,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
  },
};