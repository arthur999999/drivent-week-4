import { prisma } from "@/config";

async function getBookingById(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId
    },
    select: {
      id: true,
      Room: true
    }
  });
}

async function postBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId
    }
  });
}

async function getBookingByRoomId(roomId: number) {
  return prisma.booking.findFirst({
    where: {
      roomId: roomId
    }
  });
}

async function updateBooking(roomId: number, bookingId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      roomId: roomId
    }
  });
}

const bookingRepository = {
  getBookingById,
  postBooking,
  getBookingByRoomId,
  updateBooking
};

export default bookingRepository;
