import mongoose, { Schema, model } from 'mongoose';

import { addressSchema } from './address';
import { departmentModel } from './Department.model';
import { subjectModel } from './Subject.model';

const corpusSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },

    number: {
        type: Number,
        required: true,
        trim: true,
    },

    address: addressSchema,

    departments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: departmentModel,
    },

    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: subjectModel,
    }],

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

export const corpusModel = model('corpus', corpusSchema);
