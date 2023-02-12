import { AuthenticatedRequest, handleApplicationErrors } from "@/middlewares";
import { bookingService } from "@/services";
import { Response } from "express"; 

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(Number(userId));

    res.status(200).send(booking);
  } catch (error) {
    handleApplicationErrors(error, req, res);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const  { roomId } = req.body;

  if(!roomId) {
    res.sendStatus(400);
    return;
  }

  try {
    const post = await bookingService.postBooking(Number(userId), Number(roomId));

    res.send(post).status(200);
  } catch (error) {
    if(error.name == "NotFoundError") {
      res.sendStatus(404);
      return;
    }
    if(error.name == "ForbiddenError") {
      res.sendStatus(403);
      return;
    }
    res.sendStatus(500);
  }
}
