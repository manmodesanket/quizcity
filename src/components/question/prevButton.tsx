function PrevButton({
  updateOption,
}: {
  updateOption: (action: string) => void;
}) {
  return (
    <button
      className="bg-white hover:bg-blue-200 rounded border-2 border-blue-500 text-blue-500 font-bold py-2 px-4 rounded"
      onClick={() => updateOption("DESC")}
    >
      Prev
    </button>
  );
}

export default PrevButton;
