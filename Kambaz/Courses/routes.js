import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js"
export default function CourseRoutes(app) {
    app.post("/api/courses", async (req, res) => {
   const course = await dao.createCourse(req.body);
   const currentUser = req.session["currentUser"];
   if (currentUser) {
     await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
   }
   res.json(course);
 });
 const findUsersForCourse = async (req, res) => {
   const { cid } = req.params;
   const users = await enrollmentsDao.findUsersForCourse(cid);
   res.json(users);
 };
 app.get("/api/courses/:cid/users", findUsersForCourse);
    app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });
  app.post("/api/courses/:courseId/modules", async (req, res) => {
   const { courseId } = req.params;
   const module = {
     ...req.body,
     course: courseId,
   };
   const newModule = await modulesDao.createModule(module);
   res.send(newModule);
 });


}
