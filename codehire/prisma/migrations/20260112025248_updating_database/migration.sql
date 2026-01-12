/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "JobLevel" AS ENUM ('INTERN', 'JUNIOR', 'MID', 'SENIOR', 'LEAD');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('REMOTE', 'HYBRID', 'IN_PERSON');

-- CreateEnum
CREATE TYPE "PayPeriod" AS ENUM ('HOURLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "JobSearchStatus" AS ENUM ('ACTIVE', 'CASUAL', 'NOT_LOOKING');

-- CreateEnum
CREATE TYPE "CompanyStage" AS ENUM ('Early_Stage', 'Startups', 'Public_Tech', 'Faang');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "graduationYear" INTEGER,
    "skills" TEXT[],
    "jobLevels" "JobLevel"[],
    "employmentTypes" "EmploymentType"[],
    "workModes" "WorkMode"[],
    "preferredLocations" TEXT[],
    "companyStages" "CompanyStage"[],
    "jobRoles" TEXT[],
    "industries" TEXT[],
    "minimumPay" INTEGER,
    "payPeriod" "PayPeriod",
    "resumeUrl" TEXT,
    "jobStatus" "JobSearchStatus" NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
