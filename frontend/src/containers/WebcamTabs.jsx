import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import {
  selectImageState,
  setImageData,
  setReturnData,
} from "../store/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


async function post_image(file, dispatch) {
  let formData = new FormData();
  formData.append("image", file);
  formData.append("filename", 'capture.jpeg');  
  axios
    .post("http://localhost:8000/api/post_image/", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch(setReturnData(res.data));
    })
    .catch((err) => alert(err));
}

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function WebcamTab() {
  const webcamRef = useRef(null);
  const imageData = useSelector(selectImageState);
  const dispatch = useDispatch();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    dispatch(
      setImageData({
        ...imageData,
        blob: imageSrc,
        filename: "webcam_screenshot.jpeg",
        tab: "webcam",
        loading: true,
      })
    );
    post_image(imageSrc, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);
  return (
    <>
      {imageData.tab === "webcam" ? (
        <>
          <div className="flex flex-col">
            <Webcam
              audio={false}
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1280}
              videoConstraints={videoConstraints}
              className="rounded mt-3 mb-2"
            />
            <button
              onClick={capture}
              className="mx-auto px-6 py-2 font-roboto rounded transition-all drop-shadow-md text-zinc-300 bg-black hover:bg-zinc-700 hover:ring-1 hover:ring-zinc-800 cursor-pointer"
            >
              Capture Image
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
