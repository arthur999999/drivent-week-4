import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express"; 

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
}
