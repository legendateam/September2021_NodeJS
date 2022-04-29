import mongoose, { Schema, model } from 'mongoose';

import { departmentModel } from './Department.model';
import { ISubject } from '../interfaces';

const subjectSchema = new Schema<ISubject>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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

// eslint-disable-next-line func-names
subjectSchema.pre('findOne', function (): void {
    this.populate('department');
});

export const subjectModel = model<ISubject>('subject', subjectSchema);
