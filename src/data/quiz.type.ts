export type Option = {
  id: string;
  content: string;
  isAnswer: boolean;
};

export type Question = {
  id: string;
  question: string;
  points: number;
  negativePoints: number;
  options: Array<Option>;
};

export type Quiz = {
  id: string;
  title: string;
  imageUrl: string;
  totalScore: number;
  questions: Array<Question>;
};

export const emptyQuiz: Quiz = {
  id: "",
  title: "",
  imageUrl: "",
  totalScore: 0,
  questions: [],
};
