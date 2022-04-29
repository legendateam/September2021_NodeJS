import mongoose, { Schema, model } from 'mongoose';

import { subjectModel } from './Subject.model';
import {IRating} from "../interfaces";

const ratingSchema = new Schema<IRating>({
    rating: {
        type: Number,
        require: true,
    },

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: subjectModel,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// eslint-disable-next-line func-names
ratingSchema.pre('find', function () {
    this.populate('subject');
});

// eslint-disable-next-line func-names
ratingSchema.pre('findOne', function () {
    this.populate('subject');
});

export const ratingModel = model<IRating>('rating', ratingSchema);
