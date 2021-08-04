import { useLocation } from "react-router-dom";
import { Location } from "history";
import { Quiz, Result } from "../data/quiz.type";
import { useState } from "react";
import { useEffect } from "react";

export default function ResultPage() {
  const { state } = useLocation();
  const [total, setTotal] = useState(0);
  const { answers, quiz } = state as Result;
  console.log(answers);

  useEffect(() => {
    let sum = 0;
    quiz.questions.forEach((item) => {
      const answer = answers.filter(
        (answerItem) => answerItem.questionId === item.id
      );
      item.options.forEach((option) => {
        sum += answer[0].optionId === option.id && !option.isAnswer ? 10 : 0;
      });
    });
    setTotal(sum);
  }, []);

  return (
    <div className="mx-auto px-5 sm:px-40 flex flex-col">
      <h1 className="text-4xl text-center mt-4 font-bold">
        {quiz.title} Quiz Result
      </h1>
      <div className="">
        {quiz.questions.map((item) => {
          const answer = answers.filter(
            (answerItem) => answerItem.questionId === item.id
          );

          return (
            <div key={item.id}>
              <div className="my-4 font-bold text-lg bg-yellow-400 rounded p-4">
                {item.question}
              </div>
              <ul>
                {item.options.map((option, i) => (
                  <li
                    className={`mb-4 text-center w-full p-4 border-2 rounded-xl cursor-pointer font-bold ${
                      option.isAnswer ? `bg-green-600` : null
                    }

                    ${
                      answer[0].optionId === option.id && !option.isAnswer
                        ? `bg-red-500`
                        : null
                    }`}
                    key={option.id}
                  >
                    {option.content}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        <div className="text-4xl text-center mt-4 font-bold">
          Total Score: {total}
        </div>
      </div>
    </div>
  );
}
