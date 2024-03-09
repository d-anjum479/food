import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // get token from user
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res
          .status(401)
          .send({ success: false, message: "Unauthorized user" });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(`AuthMiddleWare Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Please provide auth token",
      error,
    });
  }
};

export { authMiddleware };
