import mongoose, { Schema, model } from 'mongoose';

import { addressSchema } from './address';
import { departmentModel } from './Department.model';
import { subjectModel } from './Subject.model';
import { ICorpus } from '../interfaces';

const corpusSchema = new Schema<ICorpus>({
    number: {
        type: Number,
        required: true,
    },

    address: addressSchema,

    department: {
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

corpusSchema.pre('findOne', function () {
    this.populate('department');
    this.populate('subjects');
});

export const corpusModel = model<ICorpus>('corpus', corpusSchema);
