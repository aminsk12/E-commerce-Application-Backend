/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `RecentView` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `vendors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "RecentView" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "vendors" DROP COLUMN "isDeleted";
