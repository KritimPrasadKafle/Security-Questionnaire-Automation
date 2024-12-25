import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import QuestionForm from "./QuestionForm";
import QuestionTable from "./QuestionTable";

const API_URL = "http://localhost:3000/questions";
const socket = io("http://localhost:3000");

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(API_URL);
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const addQuestion = async (newQuestion) => {
    try {
      await axios.post(API_URL, newQuestion);
      socket.emit("update");
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const deleteQuestion = async (question) => {
    try {
      await axios.delete(API_URL, { data: { question } });
      socket.emit("update");
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    socket.on("refresh", fetchQuestions);

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h1>Admin Panel - Security Questionnaire</h1>
      <QuestionForm onAdd={addQuestion} />
      <QuestionTable questions={questions} onDelete={deleteQuestion} />
    </div>
  );
};

export default AdminPanel;
