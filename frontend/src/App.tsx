import {
  MantineProvider,
  MantineThemeOverride,
  Tuple,
  Image,
} from "@mantine/core";
import { colors } from "./colors";
import { selectImageState } from "./store/sessionSlice";
import { useSelector } from "react-redux";
import AnalysisArea from "./containers/AnalysisArea";
import Uplaodtabgroup from "./containers/UploadTabgroup";
import NavbarMain from "./containers/NavbarMain";

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
      <div className="overflow-x-hidden bg-neutral-900 h-screen w-screen">
        <NavbarMain />
        <div className="app-main flex flex-col text-zinc-200 font-roboto">
          <div className="fileinput-container mt-[70px] w-[400px] sm:w-[500px] md:w-[650] mx-auto">
            <Uplaodtabgroup />
          </div>
          <div>
            {imageData.blob ? (
                <Image
                  src={imageData.blob}
                  width={450}
                  height={275}
                  fit="cover"
                  radius="sm"
                  alt="upload.jpg"
                  caption={`Source image - ${imageData.filename}`}
                  className="shadow-md mx-auto my-5 mb-[60px]"
                />
            ) : (
              ""
            )}
            {imageData.returnData ? <AnalysisArea /> : <></>}
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}
