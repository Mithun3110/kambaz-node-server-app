import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    course: String,
    title: String,
    description: String,
    points: Number,
    group: String,
    displayGrade: String,
    submissionType: String,
    assignTo: String,
    dueDate: String,
    availableFrom: String,
    availableUntil: String,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
