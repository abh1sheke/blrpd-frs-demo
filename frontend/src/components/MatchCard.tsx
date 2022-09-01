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
      <div className="match-card flex bg-zinc-800 rounded p-3 shandow-lg">
        <Image
          src={`http://localhost:8000/media/images/${matchFile}`}
          width={100}
          height={100}
          fit="cover"
          radius="md"
        />
        <div className='flex flex-col ml-2 text-left'>
          <h1>Name: {name}</h1>
          <h1>Probability: {similarity}</h1>
        </div>
      </div>
    </>
  );
}
