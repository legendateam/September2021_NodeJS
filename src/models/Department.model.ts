import { Schema, model } from 'mongoose';

import { config } from '../configs';
import { IDepartment } from '../interfaces';

const departmentSchema = new Schema<IDepartment>({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    webStore: {
        type: String,
        trim: true,
        default: config.DOMAIN_NAME,
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

export const departmentModel = model<IDepartment>('department', departmentSchema);
