import { useEffect, useState } from "react";

function Counter({ apiUrl, id }) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/increment/${id}`)
      .then((res) => res.json())
      .then((data) => setCount(data.value))
      .catch((err) => console.error("Fout bij ophalen:", err))
      .finally(() => setLoading(false));
  }, [id, apiUrl]);

  const handleIncrement = () => {
    setLoading(true);
    fetch(`${apiUrl}/increment/${id}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setCount(data.value))
      .catch((err) => console.error("Fout bij posten:", err))
      .finally(() => setLoading(false));
  };

  const handleRefresh = () => {
    setLoading(true);
    fetch(`${apiUrl}/increment/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setCount(data.value))
      .catch((err) => console.error("Fout bij posten:", err))
      .finally(() => setLoading(false));
  };

  return (
      <>
        <p>Test hier de verbinding met de backend</p>
        
        <button onClick={handleIncrement} disabled={loading}>
          {loading ? "⏳ Laden..." : `Count: ${count}`}
        </button>

        <button onClick={handleRefresh} disabled={loading} style={{ marginLeft: '10px' }}>
          ↺
        </button>
      </>
  );
}

export default Counter;
