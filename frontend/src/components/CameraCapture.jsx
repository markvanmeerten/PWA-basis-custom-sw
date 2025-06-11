import React, { useEffect, useRef, useState } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    let streamRef = null;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        streamRef = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setError("Camera toegang mislukt of geweigerd.");
      }
    };

    startCamera();

    return () => {
      if (streamRef) {
        streamRef.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleTakePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      setError("Videobeeld of canvas niet beschikbaar.");
      return;
    }

    try {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const base64 = canvas.toDataURL("image/jpeg");
      setBase64Image(base64);

      console.log(base64);

      setError(null);
    } catch {
      setError("Fout bij het maken van de foto.");
    }
  };

  return (
    <>
      <p>Maak hier een foto (base64)</p>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", maxWidth: "400px", borderRadius: "8px", border: "1px solid #27316F" }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleTakePhoto}>Neem foto</button>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {base64Image && (
        <div>
          <img
            src={base64Image}
            alt="Preview"
          />
        </div>
      )}
    </>
  );
};

export default CameraCapture;
