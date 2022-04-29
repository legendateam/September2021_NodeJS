import mongoose, { Schema, model } from 'mongoose';

import { teacherModel } from './Teacher.model';
import { departmentModel } from './Department.model';
import { subjectModel } from './Subject.model';
import { corpusModel } from './Corpus.model';
import { IGroup } from '../interfaces';

const groupSchema = new Schema<IGroup>({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    course: {
        type: Number,
        required: true,
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: departmentModel,
    },

    curator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: teacherModel,
    },

    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: subjectModel,
    }],

    corpus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: corpusModel,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// eslint-disable-next-line func-names
groupSchema.pre('findOne', function () {
    this.populate('department');
    this.populate('corpus');
    this.populate('subjects');
});

export const groupModel = model<IGroup>('group', groupSchema);
