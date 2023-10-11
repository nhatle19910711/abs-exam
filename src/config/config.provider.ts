import * as dotenv from 'dotenv';
import { Provider } from '@nestjs/common';
import * as config from 'config';

export const CONFIG = 'ConfigProviderToken';

export const configProvider: Provider = {
  provide: CONFIG,
  useFactory: async () => {
    dotenv.config();
    return import('config');
  },
};

export const getConfig = () => {
  return config;
};
