-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "installationNumber" TEXT NOT NULL,
    "monthReferring" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "amountToBePaid" TEXT NOT NULL,
    "quantityEnergy" TEXT,
    "priceEnergy" TEXT,
    "unityTariffEnergy" TEXT,
    "amountOfEnergyInject" TEXT,
    "priceOfEnergyInject" TEXT,
    "unityTariffOfEnergyInject" TEXT,
    "amountIcms" TEXT,
    "priceIcms" TEXT,
    "unityIcms" TEXT,
    "amountGDI" TEXT,
    "priceGDI" TEXT,
    "unityGDI" TEXT,
    "publicContribution" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
