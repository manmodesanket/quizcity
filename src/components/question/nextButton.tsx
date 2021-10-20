function NextButton({
  updateOption,
}: {
  updateOption: (action: string) => void;
}) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => updateOption("INC")}
    >
      Next
    </button>
  );
}

export default NextButton;
