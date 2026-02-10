/*
  Warnings:

  - You are about to drop the column `jobStatus` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "jobStatus";

-- DropEnum
DROP TYPE "JobSearchStatus";
