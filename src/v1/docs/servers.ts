import { AppConfig } from '../configs/app.config';

export = {
  servers: [
    {
      url: `${AppConfig.protocol}://${AppConfig.host}:${AppConfig.port}/api/v1`,
      // url: 'http://localhost:3030/api/v1',
      description: 'Docs of Development server',
    },
  ],
};
