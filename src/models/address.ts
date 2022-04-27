import { Schema } from 'mongoose';

export const addressSchema = new Schema({
    city: {
        type: String,
        required: true,
        trim: true,
    },

    oblast: {
        type: String,
        required: true,
        trim: true,
    },

    street: {
        type: String,
        required: true,
        trim: true,
    },

    buildingNumber: {
        type: Number,
        required: true,
    },

    app: {
        type: Number,
    },
});
