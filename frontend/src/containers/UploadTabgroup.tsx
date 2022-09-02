import { useState } from "react";
import { Tabs } from "@mantine/core";
import PictureDrop from "./PictureDrop";
import WebcamCapture from "./WebcamTabs";
import { selectImageState, setImageData } from "../store/sessionSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UplaodTabgroup() {
  const [activeTab, setActiveTab] = useState<string | null>("upload");
  const imageData = useSelector(selectImageState);
  const dispatch = useDispatch();
  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List position="center">
        <Tabs.Tab
          value="upload"
          onClick={() =>
            dispatch(setImageData({ ...imageData, tab: "upload" }))
          }
        >
          Upload Image
        </Tabs.Tab>
        <Tabs.Tab value="webcam" 
          onClick={() =>
            dispatch(setImageData({ ...imageData, tab: "webcam" }))
          }>Use Webcam</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="upload">
        <PictureDrop />
      </Tabs.Panel>
      <Tabs.Panel value="webcam">
        <WebcamCapture />
      </Tabs.Panel>
    </Tabs>
  );
}
