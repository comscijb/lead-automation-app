import * as fs from 'fs';
import * as path from 'path';

const logFilePath = path.join(__dirname, '../../logs/runtime.log');

export class Logger {
    level: string;
    prettyPrint: boolean;
    timestamp: boolean;

    constructor(level: string, prettyPrint: boolean, timestamp: boolean) {
        this.level = level;
        this.prettyPrint = prettyPrint;
        this.timestamp = timestamp;
    }

    logToFile(level: string, message: string): void {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${level.toUpperCase()}: ${message}\n`;
        fs.appendFileSync(logFilePath, logEntry);
    }

    info(message: string): void {
        console.log(`INFO: ${message}`);
        this.logToFile('info', message);
    }

    error(message: string): void {
        console.error(`ERROR: ${message}`);
        this.logToFile('error', message);
    }

    warn(message: string): void {
        console.warn(`WARN: ${message}`);
        this.logToFile('warn', message);
    }

    debug(message: string): void {
        console.debug(`DEBUG: ${message}`);
        this.logToFile('debug', message);
    }
}
