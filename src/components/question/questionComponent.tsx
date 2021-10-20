import { Question } from "../../data/quiz.type";

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
    <section>
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
    </section>
  );
}

export default QuestionComponent;
