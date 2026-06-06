import { Logger } from '../classes/Logger'

const logger = new Logger('info', true, true)

export const log = (level: string, message: string) => {
    logger.logToFile(level, message)
}

export const info = (message: string) => {
    logger.info(message)
}

export const warn = (message: string) => {
    logger.warn(message)
}

export const error = (message: string) => {
    logger.error(message)
}

export const debug = (message: string) => {
    logger.debug(message)
}

export default logger