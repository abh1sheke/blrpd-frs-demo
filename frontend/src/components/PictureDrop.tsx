import React, { SyntheticEvent, useRef } from "react";
import { useMantineTheme, Image, FileInput } from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import { useState } from "react";
import AnalysisArea from "./AnalysisArea";

interface ImageData {
  file?: File;
  blob: string;
  filename: string;
}

export default function PictureDrop() {
  const [img, setImg] = useState<ImageData>({
    file: undefined,
    blob: "",
    filename: "",
  });
  const handleChange = (file: File | null) => {
    file !== null
      ? setImg((prev: ImageData) => ({
          file: file,
          blob: URL.createObjectURL(file),
          filename: file.name,
        }))
      : console.log("err");
  };
  return (
    <>
      <form>
        <FileInput
          placeholder="Upload image"
          icon={<IconUpload size={14} />}
          accept="image/png, image/jpeg"
          onChange={(file) => handleChange(file)}
        />
      </form>
    </>
  );
}
