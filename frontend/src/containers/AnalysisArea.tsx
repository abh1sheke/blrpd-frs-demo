import { selectImageState } from "../store/sessionSlice";
import { useSelector } from "react-redux";
import MatchCard from "../components/MatchCard";
import { v4 as uuid } from "uuid";
import { ScrollArea } from "@mantine/core";

export default function AnalysisArea() {
  const imageData = useSelector(selectImageState);
  const matches = imageData.returnData?.matches;
  return (
    <>
      <div className="app-analysis text-zinc-300 mx-auto w-[600px] rounded bg-cgrey-900 drop-shadow-md">
        <div className="mt-10">
          <h1 className=" mb-1 pt-5 text-center font-pts font-semibold">
            Possible matches
          </h1>
        </div>
        <div className="scroll-container flex flex-col justify-between pb-5 p-2">
          <div className="source-section mx-auto"></div>
          <div className="matches-section text-center">
            <ScrollArea>
              <div className="match-list mt-3">
                {matches?.length === 0 ? (
                  <>
                    <h3>No matches!</h3>
                  </>
                ) : (
                  matches?.map((obj) => {
                    if (obj !== null && !obj.Error) {
                      return (
                        <MatchCard
                          key={uuid()}
                          name={obj.FaceId.Item.FullName.S}
                          similarity={
                            Math.round(
                              (obj.Match.Similarity + Number.EPSILON) * 100
                            ) / 100
                          }
                          matchFile={obj.MatchFile}
                        />
                      );
                    } else if (obj.Error) return null;
                    else return <>No matches!</>;
                  })
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
}
