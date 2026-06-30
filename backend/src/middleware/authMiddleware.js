import { clerkClient } from "@clerk/express";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const payload = await clerkClient.verifyToken(token);

    if (!payload || !payload.sub) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.userId = payload.sub;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ error: "Unauthorized: Token verification failed" });
  }
};

export default authMiddleware;