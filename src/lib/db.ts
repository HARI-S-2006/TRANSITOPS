import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

let dbUrl = "file:./dev.db"

if (process.env.NODE_ENV === 'production') {
  // On Netlify (Serverless), the filesystem is read-only.
  // We must copy the SQLite db to the writable /tmp directory.
  const tmpPath = '/tmp/dev.db'
  const localPath = path.join(process.cwd(), 'prisma', 'dev.db')
  
  try {
    if (!fs.existsSync(tmpPath)) {
      if (fs.existsSync(localPath)) {
        fs.copyFileSync(localPath, tmpPath)
        console.log("Successfully copied SQLite database to /tmp")
      } else {
        console.log("Could not find local dev.db at:", localPath)
      }
    }
  } catch (e) {
    console.error("Failed to copy SQLite database to /tmp:", e)
  }
  
  // Update the url to point to the writable /tmp file
  dbUrl = `file:${tmpPath}`
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
