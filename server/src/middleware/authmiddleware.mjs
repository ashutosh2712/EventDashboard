import jwt from "jsonwebtoken";

const jwtsecret =
  "20741f1747b01f13a45dfcac48dcf33a96d242a8a365b0edc20c92d3a4936c21";

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(401).send("Unauthorized!");
  }

  jwt.verify(token, jwtsecret, (error, user) => {
    if (error) return response.status(403).send("Invalid token");

    request.user = user;
    next();
  });
};

export default authenticateToken;
