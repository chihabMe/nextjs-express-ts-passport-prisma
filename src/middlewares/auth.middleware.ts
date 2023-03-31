import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.session.isAuthenticated);
  console.log("run");
  if (req.session.views == undefined) req.session.views = 0;
  else req.session.views = req.session.views + 1;
  console.log("--", req.session.views, "--");
  next();
};

export default authMiddleware;
