
import { Reservation } from '../types';

export const isDateRangeAvailable = (
  roomId: string,
  checkIn: string,
  checkOut: string,
  reservations: Reservation[]
): boolean => {
  const startB = new Date(checkIn);
  const endB = new Date(checkOut);

  // Filter reservations for this room that are active (pending or accepted)
  const roomReservations = reservations.filter(
    r => r.roomId === roomId && (r.status === 'pending' || r.status === 'accepted')
  );

  for (const reservation of roomReservations) {
    const startA = new Date(reservation.checkIn);
    const endA = new Date(reservation.checkOut);

    // Check for overlap: (StartA < EndB) and (EndA > StartB)
    // Note: This logic allows a Check-in on the same day as a previous Check-out
    if (startA < endB && endA > startB) {
      return false; // Overlap found
    }
  }
  return true;
};

export const getBookedRanges = (roomId: string, reservations: Reservation[]) => {
    return reservations
        .filter(r => r.roomId === roomId && (r.status === 'pending' || r.status === 'accepted'))
        .map(r => ({ start: r.checkIn, end: r.checkOut }))
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
};
