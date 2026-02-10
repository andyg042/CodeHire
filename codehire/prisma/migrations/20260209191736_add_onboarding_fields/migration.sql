-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "codingLanguages" TEXT[],
ADD COLUMN     "graduationMonth" TEXT,
ADD COLUMN     "major" TEXT,
ALTER COLUMN "jobStatus" SET DEFAULT 'ACTIVE';
