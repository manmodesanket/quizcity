import { allQuizzes } from "../data/data";
import { Question, Quiz } from "../data/quiz.type";

export const getAllQuizzes = () => {
  return allQuizzes;
};

export async function getAllQuizesFromFirebase(): Promise<Quiz[]> {
  let firebase = window.firebase;
  let db = firebase.firestore();
  let quizList: Quiz[] = [];
  let data = await db
    .collection("quiz")
    .get()
    .then((snapshot: any) => snapshot);
  data.forEach((doc: any) => {
    quizList.push(doc.data());
  });
  return quizList;
}

export function getCorrectOption(question: Question): string {
  let optionId = "";
  question.options.forEach((option) => {
    if (option.isAnswer) {
      optionId = option.id;
    }
  });
  return optionId;
}
