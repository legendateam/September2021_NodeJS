import { Schema, model } from 'mongoose';

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    webStore: {
        type: String,
        trim: true,
        default: 'https://owu.com.ua/',
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

export const departmentModel = model('department', departmentSchema);
