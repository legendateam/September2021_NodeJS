import mongoose, { Schema, model } from 'mongoose';

import { groupModel } from './Group.model';
import { addressSchema } from './address';
import { departmentModel } from './Department.model';
import { teacherModel } from './Teacher.model';
import { subjectModel } from './Subject.model';
import { ratingModel } from './Rating.model';
import { RoleEnum } from '../enums';
import { IHashPassword, IStudent, IStudentModel } from '../interfaces';
import { passwordService } from '../services';

const studentSchema = new Schema<IStudent, IStudentModel>({
    firstName: {
        type: String,
        require: true,
        trim: true,
    },

    lastName: {
        type: String,
        require: true,
        trim: true,
    },

    age: {
        type: Number,
        require: true,
        trim: true,
    },

    formOfEducation: {
        type: String,
        trim: true,
        required: true,
        default: 'daily',
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
    },

    address: addressSchema,

    role: {
        type: String,
        default: RoleEnum.STUDENT,
    },

    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: groupModel,
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

    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: ratingModel,
    }],

    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: teacherModel,
    }],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// eslint-disable-next-line func-names
studentSchema.pre('findOne', function () {
    this.populate('ratings');
    this.populate('group');
    this.populate('curator');
});

studentSchema.methods = {
    async compare({ password }: IHashPassword): Promise<boolean> {
        return passwordService.compare({ password, hashPassword: this.password });
    },
};

studentSchema.statics = {
    async hash(student: IStudent) : Promise<IStudent> {
        const { password } = student;
        const hashedPassword = await passwordService.hash({ password });

        return { ...student, password: hashedPassword };
    },
};

export const studentModel = model<IStudent, IStudentModel>('student', studentSchema);
