import { db } from './index';
import { bookings, users, holidayPackages, cruiseShips, carHire, NewBooking, NewUser, NewHolidayPackage, NewCruiseShip, NewCarHire } from './schema';
import { eq } from 'drizzle-orm';

/**
 * Database utility functions for common operations
 */

// Booking operations
export async function getAllBookings() {
  return await db.select().from(bookings);
}

export async function getBookingsByType(type: string) {
  return await db.select().from(bookings).where(eq(bookings.bookingType, type));
}

export async function getBookingById(id: number) {
  return await db.select().from(bookings).where(eq(bookings.id, id));
}

export async function createBooking(booking: NewBooking) {
  return await db.insert(bookings).values(booking).returning();
}

export async function updateBookingStatus(id: number, status: string) {
  return await db
    .update(bookings)
    .set({ status, updatedAt: new Date() })
    .where(eq(bookings.id, id))
    .returning();
}

export async function updateBooking(id: number, data: Partial<NewBooking>) {
  return await db
    .update(bookings)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(bookings.id, id))
    .returning();
}

export async function deleteBooking(id: number) {
  return await db.delete(bookings).where(eq(bookings.id, id));
}

// User operations
export async function getAllUsers() {
  return await db.select().from(users);
}

export async function getUserByEmail(email: string) {
  return await db.select().from(users).where(eq(users.email, email));
}

export async function createUser(user: NewUser) {
  return await db.insert(users).values(user).returning();
}

// Holiday Package operations
export async function getAllHolidayPackages() {
  return await db.select().from(holidayPackages);
}

export async function getHolidayPackageById(id: number) {
  return await db.select().from(holidayPackages).where(eq(holidayPackages.id, id));
}

export async function createHolidayPackage(holidayPackage: NewHolidayPackage) {
  return await db.insert(holidayPackages).values(holidayPackage).returning();
}

export async function updateHolidayPackage(id: number, data: Partial<NewHolidayPackage>) {
  return await db
    .update(holidayPackages)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(holidayPackages.id, id))
    .returning();
}

export async function deleteHolidayPackage(id: number) {
  return await db.delete(holidayPackages).where(eq(holidayPackages.id, id));
}

// Cruise Ship operations
export async function getAllCruiseShips() {
  return await db.select().from(cruiseShips);
}

export async function getCruiseShipById(id: number) {
  return await db.select().from(cruiseShips).where(eq(cruiseShips.id, id));
}

export async function createCruiseShip(cruiseShip: NewCruiseShip) {
  return await db.insert(cruiseShips).values(cruiseShip).returning();
}

export async function updateCruiseShip(id: number, data: Partial<NewCruiseShip>) {
  return await db
    .update(cruiseShips)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(cruiseShips.id, id))
    .returning();
}

export async function deleteCruiseShip(id: number) {
  return await db.delete(cruiseShips).where(eq(cruiseShips.id, id));
}

// Car Hire operations
export async function getAllCarHires() {
  return await db.select().from(carHire);
}

export async function getCarHireById(id: number) {
  return await db.select().from(carHire).where(eq(carHire.id, id));
}

export async function createCarHire(car: NewCarHire) {
  return await db.insert(carHire).values(car).returning();
}

export async function updateCarHire(id: number, data: Partial<NewCarHire>) {
  return await db
    .update(carHire)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(carHire.id, id))
    .returning();
}

export async function deleteCarHire(id: number) {
  return await db.delete(carHire).where(eq(carHire.id, id));
}