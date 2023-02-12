import { notFoundError } from "@/errors";
import { forbiddenError } from "@/errors/forbidden-error";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBooking(userId: number) {
  const booking = await bookingRepository.getBookingById(userId);
  if(!booking) {
    throw notFoundError();
  }

  return booking;
}

async function postBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if( !enrollment ) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if( !ticket ) {
    throw notFoundError();
  }

  if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status == "RESERVED") {
    throw forbiddenError("You ticket is remmote");
  }

  const room = await hotelRepository.findRoomById(roomId);

  if( !room ) {
    throw notFoundError();
  }

  const booking = await bookingRepository.postBooking(userId, roomId);

  return { bookingId: booking.id };
}

const bookingService = {
  getBooking,
  postBooking
};

export  { bookingService };
