const prisma = require('./prisma')

// Path: server\database\prisma.js
// Compare this snippet from server\index.js:
const { PrismaClient } = require('@prisma/client');
const Prisma = new PrismaClient();



module.exports = Prisma;
