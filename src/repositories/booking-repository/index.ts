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

const bookingRepository = {
  getBookingById
};

export default bookingRepository;
