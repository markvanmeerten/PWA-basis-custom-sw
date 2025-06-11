import { useEffect } from "react";

import Header from "./components/Header";
import Counter from "./components/Counter";
import InstallPrompt from "./components/InstallPrompt";
import Location from "./components/Location";

import "./App.css";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const id = 1;

  useEffect(() => {
    console.log(`apiUrl = ${apiUrl}, environment = ${import.meta.env.MODE}`);
  });

  return (
    <>
      <Header />

      <div className="inline">
        <div className="card" style={{ width: "50%" }}>
          <h2>Omschrijving</h2>

          <hr />

          <p>
            Gebruik dit project als basis of als voorbeeld voor een Progressive
            Web App (PWA). Het is zo ingericht dat je zonder problemen kunt
            samenwerken en testen op je laptop + telefoon. Ook kun je dit
            project automatisch deployen en hosten op{" "}
            <a href="https://render.com/">Render.com</a>
          </p>

          <ul>
            <li>
              <a href="https://www.docker.com/">Docker</a>
            </li>
            <li>
              <a href="https://react.dev/">React</a> &{" "}
              <a href="https://vite.dev/">Vite</a>
            </li>
            <li>
              <a href="https://laravel.com/">Laravel</a>
            </li>
            <li>
              <a href="https://www.postgresql.org/">PostgreSQL</a>
            </li>
            <li>
              <a href="https://vite-pwa-org.netlify.app/">PWA plugin Vite</a>
            </li>
          </ul>
        </div>

        <div className="card" style={{ width: "50%" }}>
          <h2>Test knoppen</h2>

          <hr />
          
          <ul>
            <li>
              <Counter apiUrl={apiUrl} id={id} />
            </li>
            <li>
              <InstallPrompt />
            </li>
            <li>
              <Location />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
