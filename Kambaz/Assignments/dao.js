import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  return model.create(newAssignment);
}

export function findAllAssignments() {
  return model.find();
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
}

export function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
}
