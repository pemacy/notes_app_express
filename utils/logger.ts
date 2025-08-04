import chalk from 'chalk'

interface Logger {
  error: (...msgs: string[]) => void;
  info: (...msgs: string[]) => void;
  warning: (...msgs: string[]) => void;
}

const logger: Logger = {
  error(...msgs: string[]): void {
    console.error(chalk.red(msgs.join(' ')))
  },
  info(...msgs: string[]): void {
    console.error(chalk.blue(msgs.join(' ')))
  },
  warning(...msgs: string[]): void {
    console.log(chalk.yellow(msgs.join(' ')))
  }
}

export default logger
