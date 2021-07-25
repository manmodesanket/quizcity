import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function Quiz() {
  const urlParam: any = useParams();
  const id = urlParam.quizId;
  console.log(id);
  return <div className="mx-auto px-20 sm:px-20">Quiz</div>;
}

export default Quiz;
