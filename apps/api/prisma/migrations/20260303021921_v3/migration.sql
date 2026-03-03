-- CreateTable
CREATE TABLE "ProgramConfig" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "programKey" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProgramConfig_organizationId_idx" ON "ProgramConfig"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramConfig_organizationId_programKey_key" ON "ProgramConfig"("organizationId", "programKey");
