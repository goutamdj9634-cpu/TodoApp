import { checkAuth, connectDB } from "@/utils/features";
import Task from "@/models/task";
import { asyncError, errorHandler } from "@/middlewares/error";


const handler = asyncError(async (req, res) => {
  await connectDB();

  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");

  const taskId = req.query.id;

  console.log("Task ID:", taskId);

  if (!taskId) return errorHandler(res, 400, "Task ID missing");

  const task = await Task.findById(taskId);

  if (!task) return errorHandler(res, 404, "Task not found");

  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
    });
  }

  if (req.method === "DELETE") {
    await task.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  }

  return errorHandler(res, 400, "This method is not available");
});

export default handler;
