import { useState } from "react";
import { Tabs } from "@mantine/core";
import PictureDrop from "./PictureDrop";
import WebcamCapture from "./WebcamTab";

export default function UplaodTabgroup() {
  const [activeTab, setActiveTab] = useState<string | null>("upload");
  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List position="center">
        <Tabs.Tab value="upload">Upload Image</Tabs.Tab>
        <Tabs.Tab value="webcam">Use Webcam</Tabs.Tab>
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
