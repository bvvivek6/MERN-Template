const jwt = require("jsonwebtoken");

function auth(requiredRole) {
  return (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.substring(7) : null;
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
      req.user = decoded; // { id, email, role }
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (e) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

module.exports = auth;
