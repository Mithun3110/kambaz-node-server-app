import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.post("/api/assignments", async (req, res) => {
    const newAssignment = await dao.createAssignment(req.body);
    res.json(newAssignment);
  });

  app.get("/api/assignments", async (req, res) => {
    const allAssignments = await dao.findAllAssignments();
    res.json(allAssignments);
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const updates = req.body;
    const updated = await dao.updateAssignment(assignmentId, updates);
    res.send(updated);
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    await dao.deleteAssignment(assignmentId);
    res.sendStatus(200);
  });
}