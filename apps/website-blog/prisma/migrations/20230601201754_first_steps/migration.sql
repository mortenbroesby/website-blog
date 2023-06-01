-- CreateTable
CREATE TABLE "ViewCounter" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ViewCounter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ViewCounter_ipAddress_slug_key" ON "ViewCounter"("ipAddress", "slug");
