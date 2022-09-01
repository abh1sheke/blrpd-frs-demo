import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function WebcamTab() {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState(null);
  const capture = useCallback(() => {
    const imageSrc =
      webcamRef.current !== null
        ? webcamRef.current.getScreenshot()
        : console.log("webcam err");
    setImgSrc(imgSrc);
  }, [webcamRef, setImgSrc]);
  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture Image</button>
    </>
  );
}
