import { ScrollArea } from "@mantine/core";

export default function AnalysisArea({
  previews,
}: {
  previews: JSX.Element[];
}) {
  return (
    <>
      <ScrollArea>{previews}</ScrollArea>
    </>
  );
}
