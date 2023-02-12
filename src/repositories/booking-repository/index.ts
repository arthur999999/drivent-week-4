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

const bookingRepository = {
  getBookingById,
  postBooking
};

export default bookingRepository;
