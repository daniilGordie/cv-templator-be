/*
  Warnings:

  - You are about to drop the `ResumeTemplate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `templateId` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ResumeTemplate] DROP CONSTRAINT [ResumeTemplate_resumeId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ResumeTemplate] DROP CONSTRAINT [ResumeTemplate_templateId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Resume] ADD [templateId] NVARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE [dbo].[ResumeTemplate];

-- AddForeignKey
ALTER TABLE [dbo].[Resume] ADD CONSTRAINT [Resume_templateId_fkey] FOREIGN KEY ([templateId]) REFERENCES [dbo].[Template]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
