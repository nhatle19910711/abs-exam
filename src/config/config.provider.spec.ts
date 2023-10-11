import { IConfig } from 'config';
import { Test, TestingModule } from '@nestjs/testing';

import { CONFIG, configProvider } from './config.provider';

describe('Config', () => {
  let provider: IConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [configProvider],
    }).compile();

    provider = module.get(CONFIG);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();

    expect(provider.get('server.host')).toBe('127.0.0.1');
    expect(provider.get('server.port')).toBe(3000);
  });
});
