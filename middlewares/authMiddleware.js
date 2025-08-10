const jwt = require("jsonwebtoken");

const RequiredSign = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "No token" });

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
   
    next();
  } catch (err) {
    res.status(403).json({ msg: "Invalid token" });
  }
};


module.exports = { RequiredSign };
