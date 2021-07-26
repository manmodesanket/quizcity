import { useState, useEffect, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../context/datacontext";
import { emptyQuiz, Question, Quiz } from "../data/quiz.type";
import { quizInitialState } from "../reducers/quiz.reducer";

function QuizPage() {
  const urlParam: any = useParams();
  const {
    state: { allQuizzes },
  } = useData();
  const [count, setCount] = useState(0);
  const [quiz, setQuiz] = useState(emptyQuiz);
  const [selectedOption, setSelectedOption] = useState("");
  const id = urlParam.quizId;
  console.log(id);

  useEffect(() => {
    const quiz = allQuizzes?.find((item) => item.id === id)!;
    setQuiz(quiz);
  }, [urlParam]);

  const updateOption = (action: string) => {
    if (count + 1 < quiz.questions.length && action === "INC") {
      setCount(count + 1);
    } else if (count > 0 && action === "DESC") {
      setCount(count - 1);
    }
  };

  return quiz.title ? (
    <div className="mx-auto px-5 sm:px-40 flex flex-col">
      <h1 className="text-4xl text-center mt-4">{quiz.title}</h1>
      <div>
        <div className="w-full flex justify-between mt-8">
          <div>
            {" "}
            Question: {count + 1}/{quiz.questions.length}
          </div>
          <div>Points: 5</div>
        </div>
        <div className="my-4">{quiz.questions[count].question}</div>
        <ul>
          {quiz.questions[count].options.map((option) => (
            <li
              className={`mb-4 text-center w-full p-4 border-2 rounded-xl cursor-pointer ${
                selectedOption === option.id
                  ? "bg-green-300 border-green-300"
                  : "hover:bg-green-600"
              }`}
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
            >
              {option.content}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-white hover:bg-blue-200 rounded border-2 border-blue-500 text-blue-500 font-bold py-2 px-4 rounded"
          onClick={() => updateOption("DESC")}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => updateOption("INC")}
        >
          Next
        </button>
      </div>
    </div>
  ) : (
    <div>Hello</div>
  );
}

export default QuizPage;
