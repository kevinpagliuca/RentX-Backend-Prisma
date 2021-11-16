-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "driver_license" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "daily_rate" DECIMAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "license_plate" TEXT NOT NULL,
    "fine_amount" DECIMAL NOT NULL,
    "brand" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "max_velocity" DECIMAL,
    "fuel_type" TEXT NOT NULL,
    "transmission_type" TEXT NOT NULL,
    "horse_power" INTEGER,
    "category_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cars_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "rentals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME,
    "expected_return_date" DATETIME NOT NULL,
    "total" DECIMAL,
    "isPaid" BOOLEAN DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    CONSTRAINT "rentals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rentals_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cars_license_plate_key" ON "cars"("license_plate");
