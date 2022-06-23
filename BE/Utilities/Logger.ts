import { LogLevelsEnum } from "../Models";
import Debug from 'debug';
import winston from "winston";
export class Logger {
    private ENVIRONMENT = process.env.ENVIRONMENT
    private logger: winston.Logger | undefined;
    private useDebug: boolean = false;
    private prefix: string | undefined;
    /**
     *
     */
    constructor(prefix: string) {
        // this.useDebug = process.env.DEBUG === 'true';
        // this.prefix = process.env.LOG_PREFIX;
        // this.logger = winston.createLogger({
        //     level: 'info',
        //     format: winston.format.json(),
        //     defaultMeta: { service: 'user-service' },
        //     transports: [
        //         new winston.transports.File({ filename: 'error.log', level: 'error' }),
        //         new winston.transports.File({ filename: 'combined.log' })
        //     ]
        // });
        // if (this.useDebug) {
        //     this.logger.add(new winston.transports.Console({
        //         format: winston.format.simple()
        //     }));
        // }
        this.init(prefix);
    }
    private async init(prefix: string)
    {
        this.prefix = prefix;
        if(this.ENVIRONMENT != 'local')
        {
            this.logger = winston.createLogger({
                level: 'info',
                format: winston.format.json(),
                defaultMeta: { service: prefix},
                transports: [
                  //
                  // - Write all logs with importance level of `error` or less to `error.log`
                  // - Write all logs with importance level of `info` or less to `combined.log`
                  //
                  new winston.transports.Console({ format: winston.format.simple() }),
                ],
              });
        }
        {
            this.useDebug = true;
        }
    }
    public async log(data: any, level: LogLevelsEnum = LogLevelsEnum.DEFAULT)
    {
        if(this.useDebug && !!this.prefix)
        {
            //console.log('Here')
            const DEBUG = Debug(`SERVER:${this.prefix.toUpperCase()}`);
            DEBUG(data);
        }
        else if(!this.logger) throw new Error('Logger not initialized');
        else {
            switch(level)
            {
                default: this.logger.log(level.toString(),data); break;
                                            break;
                case LogLevelsEnum.INFO: this.logger.info(level.toString(), data);
                                            break;
                case LogLevelsEnum.WARN: this.logger.warn(level.toString(), data);
                                            break;
                case LogLevelsEnum.ERROR: this.logger.error(level.toString(), data);
                                            break;
            }
        }
    }
}