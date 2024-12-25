const express = require("express");
const Question = require("../models/Question");

const questionRoutes = express.Router();

// Get all questions
questionRoutes.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions" });
  }
});

// Add a question
questionRoutes.post("/", async (req, res) => {
  const { question, answer } = req.body;
  try {
    const newQuestion = new Question({ question, answer });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: "Error adding question" });
  }
});

// Delete a question
questionRoutes.delete("/", async (req, res) => {
  const { question } = req.body;
  try {
    await Question.findOneAndDelete({ question });
    res.status(200).json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question" });
  }
});

module.exports = questionRoutes;
