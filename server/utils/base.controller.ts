import { Request, Response } from "express";
export default class BaseController {
  public objects: any;
  public constructor() {
    this.objects = "all data";
  }
  public all = async (req: Request, res: Response) => {
    if (req.method == "GET") return this.get(req, res);
    if (req.method == "POST") return this.post(req, res);
    if (req.method == "PUT") return this.update(req, res);
    if (req.method == "DELETE") return this.delete(req, res);
    return this.handleMethodNotAllowed(req, res);
  };

  public handleMethodNotAllowed = (req: Request, res: Response) => {
    return res.status(400).json("method not allowed");
  };
  public async get(req: Request, res: Response) {
    const data = await this.objects;

    return res.json(data);
  }
  public async post(req: Request, res: Response) {
    return res.json("base all created");
  }
  public async update(req: Request, res: Response) {
    return res.json("base all update");
  }
  public async delete(req: Request, res: Response) {
    return res.json("base class delete");
  }
}
