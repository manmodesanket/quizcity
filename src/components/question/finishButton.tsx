import { useHistory } from "react-router-dom";
import { Answer, Quiz } from "../../data/quiz.type";

function FinishButton({ quiz, answers }: { quiz: Quiz; answers: Answer[] }) {
  let history = useHistory();
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => history.push("/result", { quiz, answers })}
    >
      Finish Test
    </button>
  );
}

export default FinishButton;
