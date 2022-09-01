import { MantineProvider, MantineThemeOverride, Tuple } from "@mantine/core";
import { colors } from "./colors";
import PictureDrop from "./components/PictureDrop";
import { selectImageState } from "./store/sessionSlice";
import { useSelector } from "react-redux";
import AnalysisArea from "./components/AnalysisArea";

type CustomColors = keyof typeof colors;
declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, Tuple<string, 10>>;
  }
}

const mantineColors = Object.fromEntries(
  Object.entries(colors)
    .filter(([k, v]) => typeof v !== "string")
    .map(([k, v]) => [k, Object.values(v)])
);

const themeConfig: MantineThemeOverride = {
  colors: mantineColors,
  colorScheme: "dark",
};

export default function App() {
  const imageData = useSelector(selectImageState);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={themeConfig}>
      <div className="app-main bg-zinc-800 h-screen w-screen flex flex-col text-zinc-200 font-roboto overflow-hidden">
        <div className="app-header text-center mt-[50px]">
          <h2 className="text-2xl font-medium">Bengaluru City Police</h2>
          <h1 className="text-3xl font-semibold">
            Facial Recognition System Demo
          </h1>
        </div>
        <div className="fileinput-container mt-[30px] px-[300px] py-[px]">
          <PictureDrop />
        </div>
        {imageData.returnData ? <AnalysisArea /> : <></>}
      </div>
    </MantineProvider>
  );
}
