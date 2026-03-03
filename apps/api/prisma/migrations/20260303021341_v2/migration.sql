-- CreateEnum
CREATE TYPE "ReadinessRequirementKind" AS ENUM ('DOC_PRESENT', 'VERIFICATION_PASSED');

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "programKey" TEXT NOT NULL DEFAULT 'APACHE_DRIVEN_TRUCKING';

-- CreateTable
CREATE TABLE "ReadinessRequirement" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "programKey" TEXT NOT NULL,
    "kind" "ReadinessRequirementKind" NOT NULL,
    "label" TEXT NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "docType" TEXT,
    "verificationType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReadinessRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReadinessRequirement_organizationId_programKey_idx" ON "ReadinessRequirement"("organizationId", "programKey");

-- CreateIndex
CREATE INDEX "ReadinessRequirement_organizationId_programKey_kind_idx" ON "ReadinessRequirement"("organizationId", "programKey", "kind");
