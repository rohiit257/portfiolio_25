import jwt from "jsonwebtoken";

export function verifyAdmin(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  try {
    if (!token || !process.env.JWT_SECRET) return false;
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch { return false; }
}
