import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Timer } from "../components";
import { Time } from "../components/timer/timer.types";
import { useData } from "../context/datacontext";
import { emptyQuiz, Question, Quiz } from "../data/quiz.type";

type answer = {
  questionId: string;
  optionId: string;
};

function QuizPage() {
  const urlParam: any = useParams();
  const {
    state: { allQuizzes },
    loading,
  } = useData();

  const id = urlParam.quizId;
  const [count, setCount] = useState(0);
  const [quiz, setQuiz] = useState(emptyQuiz);
  const [answers, setAnswers] = useState<Array<answer>>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeUp, setTimeUp] = useState(false);
  const minSec: Time = { minutes: 1, seconds: 0 };

  useEffect(() => {
    if (allQuizzes !== null && allQuizzes.length > 0) {
      const quiz = allQuizzes?.find((item) => item.id === id)!;
      setQuiz(quiz);
    }
  }, [id, allQuizzes]);

  useEffect(() => {
    const answer = answers.find(
      (item) => item.questionId === quiz.questions[count].id
    )!;
    setSelectedOption(answer?.optionId);
  }, [count, answers, quiz.questions]);

  const updateOption = (action: string) => {
    if (count + 1 < quiz.questions.length && action === "INC") {
      setCount(count + 1);
    } else if (count > 0 && action === "DESC") {
      setCount(count - 1);
    }
  };

  const updateAnswer = (questionId: string, optionId: string) => {
    const answerObj: answer = { questionId, optionId };
    let newAnswersArray = answers.filter(
      (item) => item.questionId !== quiz.questions[count].id
    )!;
    newAnswersArray = [...newAnswersArray, answerObj];
    setAnswers(newAnswersArray);
  };

  if (timeUp) {
    return (
      <div className="mx-auto px-4 sm:px-80 flex flex-col bg-gray-800 min-h-screen text-gray-100">
        <h2 className="mx-auto text-xl mb-4">Time is up</h2>
        <FinishButton quiz={quiz} answers={answers} />
      </div>
    );
  }

  return !(quiz === emptyQuiz) ? (
    <div className="mx-auto px-4 sm:px-80 flex flex-col bg-gray-800 min-h-screen text-gray-100">
      <h1 className="text-4xl text-center mt-4 font-bold">{quiz.title}</h1>
      <Timer minSec={minSec} setTimeUp={setTimeUp} />
      <QuestionComponent
        question={quiz.questions[count]}
        count={count}
        selectedOption={selectedOption}
        updateAnswer={updateAnswer}
      />
      <div className="flex justify-between">
        {count > 0 && <PrevButton updateOption={updateOption} />}
        <FinishButton quiz={quiz} answers={answers} />
        {count + 1 < quiz.questions.length && (
          <NextButton updateOption={updateOption} />
        )}
      </div>
    </div>
  ) : (
    <div>
      {loading && (
        <div className="mx-auto mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      )}
    </div>
  );
}

function QuestionComponent({
  question,
  count,
  selectedOption,
  updateAnswer,
}: {
  question: Question;
  count: number;
  selectedOption: string;
  updateAnswer: (questionId: string, optionId: string) => void;
}) {
  return (
    <div>
      <div className="w-full flex justify-between mt-8 p-4">
        <div className="font-bold text-lg rounded">
          {count + 1}. {question.question}
        </div>
        <div className="font-bold">Points: {question.points}</div>
      </div>

      <ul>
        {question.options.map((option) => (
          <li
            className={`mb-4 text-center w-full p-4 rounded-xl bg-gray-700 cursor-pointer font-bold ${
              selectedOption === option.id
                ? "bg-green-600"
                : "hover:bg-green-800"
            }`}
            key={option.id}
            onClick={() => updateAnswer(question.id, option.id)}
          >
            {option.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

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

function FinishButton({ quiz, answers }: { quiz: Quiz; answers: answer[] }) {
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

export default QuizPage;
