import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const jwtAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/login");
    }

    const userPayload = jwt.verify(token, process.env.TOKEN_SALT);
    if (!userPayload) {
      throw new Error("Invalid token payload");
    }

    const user = await User.query()
      .findById(userPayload.id)
      .withGraphFetched("role");

    if (!user) {
      return res.redirect("/login");
    }
    console.log(user);

    // set this in client's request
    req.user = user;
    return next();
  } catch (e) {
    console.log(e);
    return res.redirect("/login");
  }
};
