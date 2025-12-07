const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Student = require("./Student");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Establish MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/student_db")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));


// GET endpoint - Retrieve all student records
app.get("/api/students", async (req, res) => {
  try {
    const studentRecords = await Student.find();
    res.json(studentRecords);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students", details: err.message });
  }
});

// POST endpoint - Create new student record
app.post("/api/students", async (req, res) => {
  try {
    const createdStudent = await Student.create(req.body);
    res.status(201).json(createdStudent);
  } catch (err) {
    res.status(400).json({ error: "Failed to create student", details: err.message });
  }
});

// PUT endpoint - Update existing student data
app.put("/api/students/:id", async (req, res) => {
  try {
    const modifiedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!modifiedStudent) {
      return res.status(404).json({ error: "Student record not found" });
    }
    res.json(modifiedStudent);
  } catch (err) {
    res.status(400).json({ error: "Failed to update student", details: err.message });
  }
});

// DELETE endpoint - Remove student from database
app.delete("/api/students/:id", async (req, res) => {
  try {
    const removedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!removedStudent) {
      return res.status(404).json({ error: "Student record not found" });
    }
    res.json({ success: true, message: "Student deleted successfully", deletedId: removedStudent._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete student", details: err.message });
  }
});

app.get("/", (req, res) => {
  res.json({ 
    status: "active",
    message: "Student Information System API",
    version: "1.0.0",
    endpoints: [
      "GET /api/students",
      "POST /api/students",
      "PUT /api/students/:id",
      "DELETE /api/students/:id"
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
