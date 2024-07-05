/*
  Warnings:

  - Added the required column `description` to the `Art` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Art` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Art" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "media" TEXT[],
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Art" ADD CONSTRAINT "Art_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
