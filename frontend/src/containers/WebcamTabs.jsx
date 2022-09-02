import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import {
  selectImageState,
  setImageData,
  setReturnData,
} from "../store/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function blobCreationFromURL(inputURI) {
  var binaryVal;
  var inputMIME = inputURI.split(",")[0].split(":")[1].split(";")[0];
  if (inputURI.split(",")[0].indexOf("base64") >= 0)
    binaryVal = atob(inputURI.split(",")[1]);
  // Decoding of base64 encoded string
  else binaryVal = unescape(inputURI.split(",")[1]);
  var blobArray = [];
  for (var index = 0; index < binaryVal.length; index++) {
    blobArray.push(binaryVal.charCodeAt(index));
  }
  return new Blob([blobArray], {
    type: inputMIME,
  });
}

function blobToFile(blob, filename) {
  blob.lastModifiedDate = new Date();
  blob.name = filename;
  return blob;
}

async function post_image(file, dispatch) {
  const myFile = new File([file], file.filename, {
    type: file.type,
  });
  console.log(myFile);
  let formData = new FormData();
  formData.append("image", file);
  formData.append("filename", file.filename);
  axios
    .post("http://localhost:8000/api/post_image/", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch(setReturnData(res.data));
      console.log(res.data);
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
      })
    );
    let x = blobCreationFromURL(imageSrc, dispatch);
    let file = blobToFile(x, imageData.filename);
    post_image(file);
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
              className="rounded mt-3"
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
