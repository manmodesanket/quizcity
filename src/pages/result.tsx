import { useLocation } from "react-router-dom";
import { Result } from "../data/quiz.type";
import { useState } from "react";
import { useEffect } from "react";
import { getCorrectOption } from "../utils/quiz";
import { addResultToBackend } from "../utils/result";
import Navbar from "../components/navbar/navbar";

export default function ResultPage() {
  const { state } = useLocation();
  const [total, setTotal] = useState(0);
  const { answers, quiz } = state as Result;

  useEffect(() => {
    let sum = 0;
    quiz.questions.forEach((item) => {
      const answer = answers.filter(
        (answerItem) => answerItem.questionId === item.id
      );
      if (answer.length > 0) {
        let optionId = getCorrectOption(item);
        if (answer[0].optionId === optionId) {
          sum += 10;
        } else {
          sum -= 5;
        }
      }
    });
    setTotal(sum);
    let db = window.firebase.firestore();
    let data = {
      title: quiz.title,
      userId: window.firebase.auth().currentUser.displayName,
      db: db,
      total: sum,
    };
    addResultToBackend(data);
  }, [answers, quiz]);

  return (
    <>
      <Navbar />
      <main className="mx-auto px-4 sm:px-80 flex flex-col bg-gray-800 min-h-screen text-gray-100">
        <section>
          {" "}
          <h1 className="text-4xl text-center mt-4 font-bold">
            {quiz.title} Quiz Result
          </h1>
        </section>
        <section>
          {quiz.questions.map((item, i) => {
            const answer = answers.filter(
              (answerItem) => answerItem.questionId === item.id
            );

            return (
              <div className="my-16" key={item.id}>
                <div className="my-4 font-bold text-lg">
                  {i + 1}. {item.question}
                </div>
                <ul>
                  {item.options.map((option, i) => (
                    <li
                      className={`mb-4 text-center w-full p-4 rounded-xl cursor-pointer font-bold ${
                        option.isAnswer ? `bg-green-600` : `bg-gray-500`
                      }

                    ${
                      answer.length > 0 &&
                      (answer[0].optionId === option.id && !option.isAnswer
                        ? `bg-red-500`
                        : null)
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
        </section>
        <section className="text-4xl text-center my-4 font-bold">
          Total Score: {total}
        </section>
      </main>
    </>
  );
}
