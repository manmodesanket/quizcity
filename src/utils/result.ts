export function addResultToBackend(data: any) {
  const { total, userId, title, db } = data;
  db.collection("quiz-result")
    .doc(userId)
    .set({
      [title]: total,
    });
}
