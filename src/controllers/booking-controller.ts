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
