CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE "Lead" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "company" TEXT,
  "phone" TEXT,
  "source" TEXT NOT NULL,
  "siteVisits" INTEGER NOT NULL DEFAULT 1,
  "visitedDirectly" BOOLEAN NOT NULL DEFAULT false,
  "score" INTEGER NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'new',
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Lead_status_idx" ON "Lead"("status");
CREATE INDEX "Lead_score_idx" ON "Lead"("score");
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");
