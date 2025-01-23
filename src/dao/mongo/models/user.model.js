import mongoose from 'mongoose';

const userColl = "users";
const userSchema = mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        email: {
            type: String,
            unique: true
        },
        age: Number,
        password: String,
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cart"
        },
        role: {
            type: String,
            default: "user"
        }
    }
);

export const userModel = mongoose.model(userColl, userSchema);
