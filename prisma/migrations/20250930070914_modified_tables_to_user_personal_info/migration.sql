/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Entry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resume` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[personalInfoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Entry] DROP CONSTRAINT [Entry_sectionId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Resume] DROP CONSTRAINT [Resume_templateId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Resume] DROP CONSTRAINT [Resume_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Section] DROP CONSTRAINT [Section_resumeId_fkey];

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_email_key];

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [email],
[fullName];
ALTER TABLE [dbo].[User] ADD [personalInfoId] NVARCHAR(1000);

-- DropTable
DROP TABLE [dbo].[Entry];

-- DropTable
DROP TABLE [dbo].[Resume];

-- DropTable
DROP TABLE [dbo].[Section];

-- DropTable
DROP TABLE [dbo].[Template];

-- CreateTable
CREATE TABLE [dbo].[PersonalInfo] (
    [id] NVARCHAR(1000) NOT NULL,
    [firstName] NVARCHAR(1000) NOT NULL,
    [secondName] NVARCHAR(1000),
    [email] NVARCHAR(1000) NOT NULL,
    [phoneNumber] NVARCHAR(1000),
    [homeTown] NVARCHAR(1000),
    [dateOfBirth] DATETIME2 NOT NULL,
    CONSTRAINT [PersonalInfo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_personalInfoId_key] UNIQUE NONCLUSTERED ([personalInfoId]);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_personalInfoId_fkey] FOREIGN KEY ([personalInfoId]) REFERENCES [dbo].[PersonalInfo]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
