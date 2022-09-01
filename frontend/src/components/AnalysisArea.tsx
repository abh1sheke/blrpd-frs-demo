import { Image, ScrollArea } from "@mantine/core";
import { selectImageState } from "../store/sessionSlice";
import { useSelector } from "react-redux";
import MatchCard from "./MatchCard";

export default function AnalysisArea() {
  const imageData = useSelector(selectImageState);
  const matches = imageData.returnData?.matches;
  console.log(matches);
  return (
    <>
      <div className="app-analysis mt-10 text-zinc-300">
        <h1 className="text-center font-roboto font-semibold">
          Face Analysis Result
        </h1>
        <ScrollArea style={{ height: "530px" }}>
          <div className="scroll-container flex flex-col justify-between pb-2">
            <div className="source-section mt-3 mx-auto">
              <Image
                src={imageData.blob}
                width={600}
                height={400}
                fit="cover"
                radius="md"
                alt="upload.jpg"
                caption={`Source image - ${imageData.filename}`}
              />
            </div>
            <div className="matches-section mt-14 text-center">
              <h3 className="text-2xl font-medium">Face Matches</h3>
              <div className='match-list mt-3'>
                {matches?.map((obj) => {
                  if (obj !== null) {
                    return (
                      <MatchCard
                        name={obj.FaceId.Item.FullName.S}
                        similarity={
                          Math.round(
                            (obj.Match.Similarity + Number.EPSILON) * 100
                          ) / 100
                        }
                        matchFile={obj.MatchFile}
                      />
                    );
                  } return <>No matches!</>
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
