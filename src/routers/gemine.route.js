import { Router } from "express";
import GemineController from "../controllers/gemine.controller.js";

const gemineRouter = Router();
const gemineController = new GemineController();

gemineRouter.post("/generate", gemineController.generate);

export default gemineRouter;