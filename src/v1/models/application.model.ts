import { Schema, model } from 'mongoose';
import { ApplicationInterface } from '../interfaces/application.interface';
import { ApplicationModel } from '../interfaces/applicationMode.interface';

const applicationSchema = new Schema<ApplicationInterface, ApplicationModel>(
  {
    appId: {
      type: String,
      index: true,
      required: true,
    },
    appName: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
    apiSecret: {
      type: String,
      required: true,
    },
    appMinVersion: {
      type: String,
      required: true,
    },
    appUser: {
      type: String,
    },
    origin: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: '_version',
  },
);

applicationSchema.static('appNameExists', function (appName: string) {
  return this.findOne({ appName: appName });
});

applicationSchema.static('appIdExists', function (appId: string) {
  return this.findOne({ appId: appId });
});

export const Application = model<ApplicationInterface, ApplicationModel>(
  'Application',
  applicationSchema,
);
