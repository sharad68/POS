import { useState } from "react";
import Login from "./views/Login";
import Sidebar from "./components/Sidebar";
import { loadLocal, saveLocal } from "./utils/helpers";
import { INITIAL_PRODUCTS } from "./data/products";

export default function App() {
  const [user,     setUser]     = useState(null);
  const [view,     setView]     = useState("pos");
  const [products, setProducts] = useState(() => loadLocal("pos:products", INITIAL_PRODUCTS));

  // count products that are low stock or out of stock
  const alertCount = products.filter(
    p => p.stock === 0 || p.stock <= p.minStock
  ).length;

  const handleLogin  = (u) => setUser(u);
  const handleLogout = () => { setUser(null); setView("pos"); };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={styles.app}>

      <Sidebar
        view={view}
        setView={setView}
        user={user}
        onLogout={handleLogout}
        alertCount={alertCount}
      />

      {/* Main content area — screens go here */}
      <div style={styles.main}>
        <div style={{ color: "white", padding: 20 }}>
          <h2>Current view: {view}</h2>
          <p style={{ color: "#6b7280", marginTop: 8 }}>
            Screens will appear here as we build them
          </p>
        </div>
      </div>

    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    background: "#0a0e17",
  },
  main: {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
};