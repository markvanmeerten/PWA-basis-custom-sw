import { useEffect, useState } from "react";

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    console.log("Installatie-uitkomst:", outcome);

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  return (
    <>
      <p>
        Installeer hier de PWA
      </p>
      
      <button 
        onClick={handleInstallClick}
        disabled={!showInstallButton}
      >
        📲 Installeer deze app
      </button>
    </>
  );
}

export default InstallPrompt;
