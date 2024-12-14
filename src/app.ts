import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



async function insertUser(name: string, password: string, firstname: string, email: string) {
    const res = await prisma.user.create({
        data: {
            name,
            password,
            firstname,
            email
        }
    })
    console.log(res)
}

async function updateUser(name: string, password: string, firstname: string, email: string) {
    const res = await prisma.user.update({
        where: {
            id: 1
        },
        data: {
            name,
            password,
            firstname,
            email
        }
    })
    console.log(res)
}

async function getUser(email: string) {
    const res = await prisma.user.findFirst({
        where: {
            email: email
        },

    })
    console.log(res)
}

getUser('Khari@gmail.com')