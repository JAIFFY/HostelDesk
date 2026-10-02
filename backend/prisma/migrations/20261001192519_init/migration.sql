-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('STUDENT', 'WARDEN', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."ComplaintStatus" AS ENUM ('Submitted', 'Assigned', 'InProgress', 'Resolved', 'Closed');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('Critical', 'High', 'Medium', 'Low');

-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('Electrical', 'Plumbing', 'WaterSupply', 'InternetWiFi', 'Cleaning', 'Furniture', 'FoodMess', 'Security', 'RoomMaintenance', 'Other');

-- CreateEnum
CREATE TYPE "public"."Team" AS ENUM ('ElectricalTeam', 'PlumbingTeam', 'Housekeeping', 'Security', 'HostelSupervisor');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'STUDENT',
    "studentId" TEXT,
    "roomNumber" TEXT,
    "hostelBlock" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Complaint" (
    "id" TEXT NOT NULL,
    "complaintCode" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "location" TEXT,
    "roomNumber" TEXT,
    "category" "public"."Category" NOT NULL,
    "priority" "public"."Priority" NOT NULL,
    "confidence" INTEGER NOT NULL,
    "assignedTeam" "public"."Team",
    "assignedToId" TEXT,
    "status" "public"."ComplaintStatus" NOT NULL DEFAULT 'Submitted',
    "affectedStudents" INTEGER NOT NULL DEFAULT 1,
    "hostelBlock" TEXT,
    "recommendedAction" TEXT NOT NULL,
    "expectedResponse" TEXT NOT NULL,
    "aiReasoning" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ComplaintHistory" (
    "id" TEXT NOT NULL,
    "complaintId" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "oldStatus" "public"."ComplaintStatus",
    "newStatus" "public"."ComplaintStatus",
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComplaintHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ComplaintComment" (
    "id" TEXT NOT NULL,
    "complaintId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "body" VARCHAR(1000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComplaintComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'info',
    "complaintId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Complaint_complaintCode_key" ON "public"."Complaint"("complaintCode");

-- CreateIndex
CREATE INDEX "Complaint_studentId_idx" ON "public"."Complaint"("studentId");

-- CreateIndex
CREATE INDEX "Complaint_status_priority_idx" ON "public"."Complaint"("status", "priority");

-- CreateIndex
CREATE INDEX "Complaint_category_idx" ON "public"."Complaint"("category");

-- CreateIndex
CREATE INDEX "Complaint_hostelBlock_idx" ON "public"."Complaint"("hostelBlock");

-- CreateIndex
CREATE INDEX "Complaint_createdAt_idx" ON "public"."Complaint"("createdAt");

-- CreateIndex
CREATE INDEX "ComplaintHistory_complaintId_createdAt_idx" ON "public"."ComplaintHistory"("complaintId", "createdAt");

-- AddForeignKey
ALTER TABLE "public"."Complaint" ADD CONSTRAINT "Complaint_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Complaint" ADD CONSTRAINT "Complaint_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ComplaintHistory" ADD CONSTRAINT "ComplaintHistory_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "public"."Complaint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ComplaintHistory" ADD CONSTRAINT "ComplaintHistory_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ComplaintComment" ADD CONSTRAINT "ComplaintComment_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "public"."Complaint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ComplaintComment" ADD CONSTRAINT "ComplaintComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
