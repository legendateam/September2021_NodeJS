import mongoose, { Schema, model } from 'mongoose';

import { addressSchema } from './address';
import { departmentModel } from './Department.model';
import { subjectModel } from './Subject.model';
import { corpusModel } from './Corpus.model';
import { passwordService } from '../services';
import { IHashPassword, ITeacherModel, ITeacher } from '../interfaces';
import { RoleEnum } from '../enums';

const teacherSchema = new Schema<ITeacher, ITeacherModel>({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
        trim: true,
    },

    age: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    address: addressSchema,

    role: {
        type: String,
        default: RoleEnum.TEACHER,
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: departmentModel,
    },

    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: subjectModel,
    }],

    corpus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: corpusModel,
    }],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// eslint-disable-next-line func-names
teacherSchema.pre('findOne', function () {
    this.populate('department');
    this.populate('corpus');
    this.populate('subjects');
});

teacherSchema.methods = {
    async comparePassword({ password }: IHashPassword): Promise<boolean> {
        return passwordService.compare({ password, hashPassword: this.password });
    },
};

teacherSchema.statics = {
    async hashPassword(teacher : ITeacher): Promise<ITeacher> {
        const { password } = teacher;
        const hashedPassword = await passwordService.hash({ password });

        return { ...teacher, password: hashedPassword };
    },
};

export const teacherModel = model<ITeacher, ITeacherModel>('teacher', teacherSchema);
