import { checkAuth, connectDB } from "@/utils/features";
import Task from "@/models/task";
import { errorHandler } from "@/middlewares/error";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return errorHandler(res, 405, "Only POST Method Is allowed");
  }

  try {
    await connectDB();

    const { title, description } = req.body ?? {};

    if (!title || !description) {
      return errorHandler(res, 400, "Please enter all fields");
    }

    const user = await checkAuth(req);

    if (!user) {
      return errorHandler(res, 401, "Login First");
    }

    await Task.create({
      title,
      description,
      user: user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Task Created",
    });
  } catch (error) {
    console.error("newtask error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default handler;
