"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [piLoaded, setPiLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.onload = () => setPiLoaded(true);
    document.body.appendChild(script);
  }, []);

  const login = async () => {
    if (!piLoaded) return alert("Pi SDK loading...");

    const scopes = ["username", "payments"];
    const auth = await window.Pi.authenticate(scopes);

    setUser(auth.user);

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auth)
    });

    const data = await res.json();
    setVerified(data);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>PiSDK Vercel Demo (CDN版)</h1>

      <button onClick={login} style={{ padding: 10, fontSize: 18 }}>
        Login with Pi
      </button>

      {user && (
        <div style={{ marginTop: 20 }}>
          <h2>User Info</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}

      {verified && (
        <div style={{ marginTop: 20 }}>
          <h2>Server Verification</h2>
          <pre>{JSON.stringify(verified, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
