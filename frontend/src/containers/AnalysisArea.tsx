import { Image, ScrollArea } from "@mantine/core";
import { selectImageState } from "../store/sessionSlice";
import { useSelector } from "react-redux";
import MatchCard from "../components/MatchCard";

export default function AnalysisArea() {
  const imageData = useSelector(selectImageState);
  const matches = imageData.returnData?.matches;
  return (
    <>
      <div className="app-analysis mt-5 text-zinc-300 mx-auto w-[800px] rounded bg-zinc-900 mb-5">
        <h1 className="mt-2 mb-1 text-center font-roboto font-semibold">
          Face Analysis Result
        </h1>
          <div className="scroll-container flex flex-col justify-between pb-5 p-2">
            <div className="source-section mx-auto">
              <Image
                src={imageData.blob}
                width={500}
                height={275}
                fit="cover"
                radius="md"
                alt="upload.jpg"
                caption={`Source image - ${imageData.filename}`}
                className='drop-shadow-sm'
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
      </div>
    </>
  );
}
