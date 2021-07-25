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
  totalScore: number;
  questions: Array<Question>;
};
