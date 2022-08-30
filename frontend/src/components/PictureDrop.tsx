import { useRef } from "react";
import {
  Button,
  Group,
  useMantineTheme,
  Text,
  Image,
  ScrollArea,
} from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import { useState } from "react";
import AnalysisArea from "./AnalysisArea";

export default function PictureDrop() {
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        width={250}
        height={250}
        src={imageUrl}
        radius="sm"
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  return (
    <>
      <Dropzone
        onDrop={setFiles}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={{
          "image/*": [".jpg", ".png", ".jpeg"],
        }}
        openRef={openRef}
        sx={(theme) => ({
          backgroundColor: theme.colors.zinc[8],
          border: `dashed 1px ${theme.colors.zinc[4]}`,
          "&:hover": {
            backgroundColor: theme.colors.zinc[7],
          },
        })}
      >
        <Group
          position="center"
          spacing="sm"
          style={{ minHeight: 110, pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={50} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag image here or click to select file
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              File should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Group position="center" mt="md">
        <button
          onClick={() =>
            openRef.current !== null
              ? openRef.current()
              : console.log("Ref null")
          }
          className="px-8 py-3 rounded bg-black font-semibold text-zinc-200 font-roboto hover:bg-zinc-800"
        >
          Select files
        </button>
      </Group>
      <AnalysisArea previews={previews}/>
    </>
  );
}
