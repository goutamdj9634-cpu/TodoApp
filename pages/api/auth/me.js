import { asyncError, errorHandler } from "@/middlewares/error";
import { checkAuth } from "@/utils/features";

const handler = asyncError(async (req, res) => {
  // ✅ Method check
  if (req.method !== "GET") {
    return errorHandler(res, 405, "Only GET Method is allowed");
  }

  let user;

  try {
    // ✅ Safe auth call
    user = await checkAuth(req);
  } catch (err) {
    console.error("Auth Error:", err);
    return errorHandler(res, 500, "Authentication failed");
  }

  // ✅ Proper validation
  if (!user || !user._id) {
    return errorHandler(res, 401, "Login First");
  }

  // ✅ Success response
  return res.status(200).json({
    success: true,
    user,
  });
});

export default handler;
