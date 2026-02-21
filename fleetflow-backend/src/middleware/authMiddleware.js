const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Access denied" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecret"
    );

    req.user = decoded;
    next();

  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};