import mongoose from 'mongoose'

declare global {
    var mongooseInst: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    namespace NodeJS {
        interface ProcessEnv extends ProcessEnv {
            MONGODB_URI: string
        }
    }
}

export { }