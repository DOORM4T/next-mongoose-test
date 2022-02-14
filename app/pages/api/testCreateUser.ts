// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel, { UserType } from '../../models/User';
import { HydratedDocument, Error as MongooseError } from 'mongoose';
import dbConnect from '../../lib/dbConnect';


type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await dbConnect()

    const doc: HydratedDocument<UserType> = new UserModel()
    Object.assign<typeof doc, UserType>(doc, {
      name: 'Bil',
      email: 'bill@initech.com',
    })
    await doc.save();
    return res.status(200).json({ message: `Successfully created user \`${doc.email}\`` })
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(400).json({ message: error.message })
    }
  }
  return res.status(500).json({ message: 'Server error' })
}
