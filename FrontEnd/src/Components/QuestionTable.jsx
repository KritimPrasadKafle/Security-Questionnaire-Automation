import React from "react";

const QuestionTable = ({ questions, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Question</th>
          <th>Answer</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q) => (
          <tr key={q._id}>
            <td>{q.question}</td>
            <td>{q.answer}</td>
            <td>
              <button onClick={() => onDelete(q.question)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuestionTable;
