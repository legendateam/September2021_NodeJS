import mongoose, { Schema, model } from 'mongoose';

import { departmentModel } from './Department.model';

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: departmentModel,
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

export const subjectModel = model('subject', subjectSchema);
