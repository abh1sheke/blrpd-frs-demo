import { FileInput } from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import { FormEvent } from "react";
import { selectImageState, setImageData } from "../store/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { ImageData } from "../store/sessionSlice";
import { useState } from "react";
import axios from "axios";

function FormButton({ imageData }: { imageData?: ImageData }) {
  const base = "mx-auto px-6 py-2 font-roboto rounded transition-all";
  const enabled =
    "text-zinc-300 bg-black hover:bg-zinc-700 hover:ring-1 hover:ring-zinc-800 cursor-pointer";
  const disabled = "text-zinc-300 bg-black opacity-40";
  return (
    <>
      {imageData ? (
        <>
          <button className={`${base} ${enabled}`} type="submit">
            Find match
          </button>
        </>
      ) : (
        <>
          <button className={`${base} ${disabled}`} disabled type="submit">
            Find match
          </button>
        </>
      )}
    </>
  );
}

export default function PictureDrop() {
  const [img, setImg] = useState<Blob | string>('');
  const imageData = useSelector(selectImageState);
  const dispatch = useDispatch();
  const handleChange = (file: File | null) => {
    file !== null ? setImg(file as Blob) : console.log("err");
    file !== null
      ? dispatch(
          setImageData({
            ...imageData,
            blob: URL.createObjectURL(file),
            filename: file.name,
          })
        )
      : console.log("err");
  };
  const handleSubmit = async (e: FormEvent) => {
    console.log("submitted");
    e.preventDefault();
    let formData = new FormData();
    console.log(img);
    formData.append("image", img);
    formData.append("filename", imageData?.filename as string);
    axios
      .post("http://localhost:8000/api/post_image/", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <FileInput
          className="my-5"
          placeholder="Upload image"
          icon={<IconUpload size={14} />}
          accept="image/png, image/jpeg"
          onChange={(file) => handleChange(file)}
        />
        <FormButton imageData={imageData} />
      </form>
    </>
  );
}
