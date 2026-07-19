/*
  Warnings:

  - A unique constraint covering the columns `[sourceKey]` on the table `Material` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sourceKey` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "sourceKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Material_sourceKey_key" ON "Material"("sourceKey");
