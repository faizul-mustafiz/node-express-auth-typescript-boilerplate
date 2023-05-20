import { HydratedDocument, Model } from 'mongoose';
import { ApplicationInterface } from './application.interface';

export interface ApplicationModel extends Model<ApplicationInterface> {
  appNameExists(
    appName: string,
  ): Promise<HydratedDocument<ApplicationInterface>>;
  appIdExists(appId: string): Promise<HydratedDocument<ApplicationInterface>>;
}
