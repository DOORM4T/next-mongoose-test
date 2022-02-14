import { Schema, model, connect, ValidateOpts, models } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface UserType {
    name: string;
    email: string;
    avatar?: string;
}

const emailValidate: ValidateOpts<string> = { validator: (value: string) => value.includes('@'), message: ({ value }) => `email \`${value}\` is not a valid email` }

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<UserType>({
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, validate: emailValidate },
    avatar: { type: String, required: false }
});

// 3. Create a Model.
export default models.User || model<UserType>('User', schema);