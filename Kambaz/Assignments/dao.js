import assignments from "../../Database/assignments.js";
import { v4 as uuidv4 } from "uuid";

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  assignments.push(newAssignment);
  return newAssignment;
}

export function findAllAssignments() {
  return assignments;
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const index = assignments.findIndex((a) => a._id === assignmentId);
  if (index === -1) return null;
  assignments[index] = { ...assignments[index], ...assignmentUpdates };
  return assignments[index];
}

export function deleteAssignment(assignmentId) {
  const index = assignments.findIndex((a) => a._id === assignmentId);
  if (index !== -1) {
    assignments.splice(index, 1);
  }
}
