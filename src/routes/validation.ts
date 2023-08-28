import { body, query } from "express-validator";

export class UserController {
  constructor() {}

  queryValidations = {
    username: query("username")
      .notEmpty()
      .withMessage("Username is required")
      .escape(),
    email: query("email")
      .isEmail()
      .withMessage("Invalid email address")
      .escape(),
    password: query("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .escape(),
    _id: query("_id")
      .isLength({ min: 6 })
      .withMessage("_id must be at least 6 characters long")
      .escape(),
    cmpId: query("cmpId").notEmpty().withMessage("must send cmpId"),
    domain: query("domain").notEmpty().withMessage("must send domain"),
    from: query("from").notEmpty().withMessage("must send from"),
    to: query("to").notEmpty().withMessage("must send to"),
    skip: query("skip").notEmpty().withMessage("must send skip"),
    cmp: query("cmp").notEmpty().withMessage("must send cmp"),
  };

  checkRequestBody(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
    next();
  }

  getUser() {
    return [this.queryValidations["_id"]];
  }

  getCmp() {
    return [this.queryValidations["cmpId"]];
  }
  getAvailableAliases() {
    return [this.queryValidations["_id"], this.queryValidations["domain"]];
  }
  getSnowData() {
    return [
      this.queryValidations["from"],
      this.queryValidations["to"],
      this.queryValidations["cmp"],
    ];
  }
}
