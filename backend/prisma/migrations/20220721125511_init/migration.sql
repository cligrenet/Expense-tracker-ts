-- CreateEnum
CREATE TYPE "category" AS ENUM ('Bills', 'Business', 'Bank Fees', 'Car', 'Education/Training', 'Entertainment', 'Food/Grocery', 'Gifts', 'House', 'Investments', 'Interest', 'Insurance', 'Kid', 'Legal Fees', 'Medical', 'Online Services', 'Other', 'Pet', 'Phone/Internet', 'Post/Shipping', 'Rental', 'Repairs/Maintenance', 'Restaurant', 'Salary', 'Saving', 'Software', 'Shopping', 'Subscriptions/Memberships', 'Taxes', 'Transport', 'Travel');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "category" "category" NOT NULL DEFAULT 'Other',

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "isAdmin" BOOLEAN DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
