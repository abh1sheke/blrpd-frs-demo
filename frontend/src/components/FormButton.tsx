import { ImageData } from "../store/sessionSlice";

export default function FormButton({ imageData }: { imageData?: ImageData }) {
  const base =
    "mx-auto px-6 py-2 font-roboto rounded transition-all drop-shadow-md";
  const enabled =
    "text-zinc-300 bg-black hover:bg-zinc-700 hover:ring-1 hover:ring-zinc-800 cursor-pointer";
  const disabled = "text-zinc-300 bg-black opacity-40";
  return (
    <>
      {imageData?.blob ? (
        <>
          <button className={`${base} ${enabled}`} type="submit">
            Find match
          </button>
        </>
      ) : (
        <>
          <button className={`${base} ${disabled}`} disabled type="submit">
            Find match
          </button>
        </>
      )}
    </>
  );
}
