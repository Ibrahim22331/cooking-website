const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader); // ✅ move inside

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token format invalid" });
  }

  try {
    const decoded = jwt.verify(token, "secret123");

    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message); // ✅ helpful debug
    return res.status(401).json({ message: "Invalid token" });
  }
};