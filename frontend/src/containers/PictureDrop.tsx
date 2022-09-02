import { FileInput } from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import { FormEvent } from "react";
import {
  selectImageState,
  setImageData,
} from "../store/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import FormButton from "../components/FormButton";

export default function PictureDrop() {
  const [img, setImg] = useState<Blob | string>("");
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
    e.preventDefault();

    dispatch(setImageData({ ...imageData, loading: true }));
    let formData = new FormData();
    formData.append("image", img);
    formData.append("filename", imageData?.filename as string);
    formData.append("type", "file");
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
