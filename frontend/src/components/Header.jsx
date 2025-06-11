import technovaLogo from "../assets/technova-logo-200x200.png";

function Header() {
  return (
    <div className="inline" style={{ alignItems: 'center' }}>
      <a href="https://www.technovacollege.nl/" target="_blank">
        <img src={technovaLogo} className="logo" alt="Technova logo" />
      </a>
      <h1>PWA basis</h1>
    </div>
  );
}

export default Header;
