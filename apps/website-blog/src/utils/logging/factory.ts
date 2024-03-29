import { noop } from "../misc"
import { createConsoleAdapter } from "./adapters"
import { Log, LogAdapter, Logger, LogLevel, LogOperation } from "./types"

type LoggerFactory = {
  createLogger: (namespace: string) => Logger
  attachAdapter(adapter: LogAdapter): void
  setLevel(level: LogLevel): void
}

function createLoggerFactory(): LoggerFactory {
  const adapters: Set<LogAdapter> = new Set()

  let minimumLogLevel: LogLevel = LogLevel.DEBUG

  const createLogger = (namespace: string): Logger => {
    const log = (level: LogLevel, override = false): Log => {
      const entryLevels: {
        [log in LogLevel]: keyof LogAdapter
      } = {
        [LogLevel.DEBUG]: "debug",
        [LogLevel.INFO]: "info",
        [LogLevel.WARN]: "warn",
        [LogLevel.ERROR]: "error",
      }

      return (message: string, ...data: unknown[]) => {
        if (level < minimumLogLevel && !override) {
          return
        }

        adapters.forEach((adapter) => {
          const logOperation: LogOperation = adapter[
            entryLevels[level]
          ] as LogOperation

          if (namespace) {
            logOperation(`[${namespace}]`, message, ...data)
          } else {
            logOperation(message, ...data)
          }
        })
      }
    }

    return {
      debug: log(LogLevel.DEBUG) as Log,
      info: log(LogLevel.INFO) as Log,
      warn: log(LogLevel.WARN) as Log,
      error: log(LogLevel.ERROR) as Log,
      global: {
        debug: log(LogLevel.DEBUG, true) as Log,
        info: log(LogLevel.INFO, true) as Log,
        warn: log(LogLevel.WARN, true) as Log,
        error: log(LogLevel.ERROR, true) as Log,
      },
    }
  }

  const attachAdapter = (adapter: LogAdapter): void => {
    adapters.add(adapter)
  }

  const setLevel = (level: LogLevel): void => {
    minimumLogLevel = level
  }

  return {
    createLogger,
    attachAdapter,
    setLevel,
  }
}

const loggerFactory: LoggerFactory = createLoggerFactory()

let log: Logger = {
  debug: noop,
  info: noop,
  warn: noop,
  error: noop,
  global: {
    debug: noop,
    info: noop,
    warn: noop,
    error: noop,
  },
}

type SetupLoggingProps = {
  logLevel: LogLevel
  adapters?: LogAdapter[]
}

const setupLogging = ({ logLevel, adapters = [] }: SetupLoggingProps) => {
  loggerFactory.setLevel(logLevel)

  adapters.forEach((adapter) => {
    loggerFactory.attachAdapter(adapter)
  })

  log = loggerFactory.createLogger("app")
}

export { setupLogging, log, loggerFactory, createConsoleAdapter }
