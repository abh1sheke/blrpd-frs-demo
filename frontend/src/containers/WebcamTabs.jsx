import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import {
  selectImageState,
  setImageData,
  setReturnData,
} from "../store/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function WebcamButton({ capture }) {
  const base =
    "mx-auto px-6 py-2 font-roboto rounded transition-all drop-shadow-md flex items-center font-bold";
  const enabled =
    "text-zinc-300 bg-cgrey-900 hover:bg-cgrey-700 hover:ring-1 hover:ring-cgrey-700 cursor-pointer";
  return (
    <>
      <button className={`${base} ${enabled}`} onClick={capture}>
        Capture image
      </button>
    </>
  );
}

async function post_image(file, dispatch) {
  e.preventDefault();
  dispatch(setImageData({ ...imageData, loading: true }));
  let formData = new FormData();
  formData.append("image", file);
  formData.append("filename", "capture.jpeg");
  axios
    .post("http://localhost:8000/api/post_image/", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch(setImageData({ ...imageData, returnData: res.data, loading: false }));
    })
    .catch((err) => {
        alert(err);
        dispatch(setImageData({ ...imageData, loading: false }));
    });
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
            <WebcamButton capture={capture} />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
