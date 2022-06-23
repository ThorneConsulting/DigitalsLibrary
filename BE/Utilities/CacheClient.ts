import { RedisClientType } from '@node-redis/client';
import { createClient, RedisModules, RedisScripts } from 'redis';
import { LogLevelsEnum } from '../Models';
import { Logger } from './Logger';
export class CacheClient {
    private readonly cacheClient;
    private logger = new Logger('CacheClient'); 
    /**
     *
     */
    constructor() {
        if(!!this.cacheClient)
        {
            this.cacheClient = createClient();
            this.cacheClient.on('error', (error) => {
                let errorToLog = {
                    data: error,
                    message: 'Error creating cache client'
                }
                this.logger.log(errorToLog,LogLevelsEnum.ERROR)
            })
        }     
    }
    public async initCacheClientAsync() {
        if(process.env.ENVIRONMENT == 'local')
        {
            await this.addCacheEventListeners();
            await this.cacheClient?.connect();
        }
    }

    private async addCacheEventListeners() {
        this.cacheClient?.on('connect', () => {
            this.logger.log('Connected to Redis');
        });
        this.cacheClient?.on('reconnecting', () => {
            this.logger.log('Reconnecting to Redis');
        });
        this.cacheClient?.on('error', (error: any) => {
            this.logger.log(error,LogLevelsEnum.ERROR);
        });
        this.cacheClient?.on('end', () => {
            this.logger.log('Disconnected from Redis');
        });
    }
}