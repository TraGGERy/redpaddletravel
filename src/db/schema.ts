import { pgTable, serial, text, timestamp, varchar, integer, boolean, decimal, json } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// Define the unified bookings table schema
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  
  // Common fields
  bookingType: varchar('booking_type', { length: 50 }).notNull().default('flight'), // 'flight', 'car', 'hotel', 'package', 'cruise'
  status: varchar('status', { length: 50 }).default('pending'),
  price: decimal('price', { precision: 10, scale: 2 }),
  
  // Flight specific fields
  tripType: varchar('trip_type', { length: 50 }),
  cabinClass: varchar('cabin_class', { length: 50 }),
  fromLocation: varchar('from_location', { length: 255 }),
  toLocation: varchar('to_location', { length: 255 }),
  departureDate: timestamp('departure_date'),
  returnDate: timestamp('return_date'),
  passengerCount: integer('passenger_count'),
  
  // Car hire specific fields
  carMake: varchar('car_make', { length: 100 }),
  carModel: varchar('car_model', { length: 100 }),
  carCategory: varchar('car_category', { length: 50 }),
  pickupLocation: varchar('pickup_location', { length: 255 }),
  dropoffLocation: varchar('dropoff_location', { length: 255 }),
  pickupDate: timestamp('pickup_date'),
  dropoffDate: timestamp('dropoff_date'),
  
  // Hotel specific fields
  hotelName: varchar('hotel_name', { length: 255 }),
  roomType: varchar('room_type', { length: 100 }),
  checkInDate: timestamp('check_in_date'),
  checkOutDate: timestamp('check_out_date'),
  guestCount: integer('guest_count'),
  
  // Holiday package specific fields
  packageName: varchar('package_name', { length: 255 }),
  destination: varchar('destination', { length: 255 }),
  packageDuration: integer('package_duration'),
  
  // Cruise specific fields
  cruiseName: varchar('cruise_name', { length: 255 }),
  cruiseCompany: varchar('cruise_company', { length: 255 }),
  departurePort: varchar('departure_port', { length: 255 }),
  cruiseDuration: integer('cruise_duration'),
  
  // Common metadata
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Define the users table schema
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  role: varchar('role', { length: 50 }).default('user'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define holiday packages table schema
export const holidayPackages = pgTable('holiday_packages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  destination: varchar('destination', { length: 255 }).notNull(),
  description: text('description'),
  duration: integer('duration').notNull(), // in days
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  inclusions: json('inclusions').$type<string[]>(), // array of included services
  imageUrl: varchar('image_url', { length: 255 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Define cruise ships table schema
export const cruiseShips = pgTable('cruise_ships', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }).notNull(),
  capacity: integer('capacity').notNull(),
  route: varchar('route', { length: 255 }).notNull(),
  departurePort: varchar('departure_port', { length: 255 }).notNull(),
  duration: integer('duration').notNull(), // in days
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  amenities: json('amenities').$type<string[]>(), // array of amenities
  imageUrl: varchar('image_url', { length: 255 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Define car hire table schema
export const carHire = pgTable('car_hire', {
  id: serial('id').primaryKey(),
  make: varchar('make', { length: 100 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  year: integer('year').notNull(),
  category: varchar('category', { length: 50 }).notNull(), // economy, compact, luxury, etc.
  seats: integer('seats').notNull(),
  transmission: varchar('transmission', { length: 50 }).notNull(), // automatic, manual
  fuelType: varchar('fuel_type', { length: 50 }).notNull(),
  pricePerDay: decimal('price_per_day', { precision: 10, scale: 2 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  available: boolean('available').default(true),
  imageUrl: varchar('image_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Define types for the models
export type Booking = InferSelectModel<typeof bookings>;
export type NewBooking = InferInsertModel<typeof bookings>;

// Define booking type enum for type safety
export enum BookingType {
  FLIGHT = 'flight',
  CAR = 'car',
  HOTEL = 'hotel',
  PACKAGE = 'package',
  CRUISE = 'cruise'
}

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type HolidayPackage = InferSelectModel<typeof holidayPackages>;
export type NewHolidayPackage = InferInsertModel<typeof holidayPackages>;

export type CruiseShip = InferSelectModel<typeof cruiseShips>;
export type NewCruiseShip = InferInsertModel<typeof cruiseShips>;

export type CarHire = InferSelectModel<typeof carHire>;
export type NewCarHire = InferInsertModel<typeof carHire>;