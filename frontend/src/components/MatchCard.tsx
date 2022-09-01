import { Image } from "@mantine/core";

export default function MatchCard({
  name,
  similarity,
  matchFile,
}: {
  name: string;
  similarity: number;
  matchFile: string;
}) {
  return (
    <>
      <div className="my-5 match-card flex bg-zinc-800 rounded p-3 drop-shadow-sm w-[400px] items-center mx-auto">
        <Image
          src={`http://localhost:8000/media/images/${matchFile}`}
          width={75}
          height={75}
          fit="cover"
          radius="md"
        />
        <div className="flex flex-col ml-6 text-left text-zinc-300 font-light">
          <span className="text-2xl font-roboto">
            Name: <span className="text-lg font-medium text-white">{name}</span>
          </span>
          <span className="text-2xl">
            Probability: <span className="text-lg font-medium text-white">{similarity}% match</span>
          </span>
        </div>
      </div>
    </>
  );
}
