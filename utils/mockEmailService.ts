
import { Reservation } from '../types';

export const sendConfirmationEmail = async (reservation: Reservation): Promise<boolean> => {
  // Simulate network request delay (e.g., 2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.group('📧 Mock Email Service - Sending Confirmation');
  console.log(`To: ${reservation.guestEmail}`);
  console.log(`Subject: Booking Confirmation - ${reservation.roomName}`);
  console.log('----------------------------------------');
  console.log(`Dear ${reservation.guestName},`);
  console.log('');
  console.log('Thank you for booking with Hostal Elizabeta!');
  console.log('We have received your reservation request.');
  console.log('');
  console.log('Booking Details:');
  console.log(`- Room: ${reservation.roomName}`);
  console.log(`- Check-in: ${reservation.checkIn}`);
  console.log(`- Check-out: ${reservation.checkOut}`);
  console.log(`- Guests: ${reservation.guests}`);
  console.log(`- Contact Phone: ${reservation.guestPhone}`);
  console.log('');
  console.log(`Reference ID: ${reservation.id}`);
  console.log('----------------------------------------');
  console.groupEnd();

  return true;
};

export const sendAcceptanceEmail = async (reservation: Reservation): Promise<boolean> => {
  // Simulate network request delay (e.g., 2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.group('📧 Mock Email Service - Sending Acceptance');
  console.log(`To: ${reservation.guestEmail}`);
  console.log(`Subject: Reservation Accepted - ${reservation.roomName}`);
  console.log('----------------------------------------');
  console.log(`Dear ${reservation.guestName},`);
  console.log('');
  console.log('Great news! Your reservation at Hostal Elizabeta has been ACCEPTED.');
  console.log('We are preparing for your arrival and look forward to hosting you.');
  console.log('');
  console.log('Booking Details:');
  console.log(`- Room: ${reservation.roomName}`);
  console.log(`- Check-in: ${reservation.checkIn}`);
  console.log(`- Check-out: ${reservation.checkOut}`);
  console.log(`- Guests: ${reservation.guests}`);
  console.log('');
  console.log(`Reference ID: ${reservation.id}`);
  console.log('----------------------------------------');
  console.groupEnd();

  return true;
};
