import { Attempt } from '../sdk/attempt';
import { StatusReport } from '../sdk/report';
import { pass, TestExecutionResult } from '../sdk/test-result';
import { timeoutFail } from '../sdk/test-result';
import { unknownEngineError } from '../common/errors';
import * as playwright from 'playwright';

export function playwrightAttempt(count: number, report: StatusReport): Attempt {
  return async (method: () => Promise<void>): TestExecutionResult => {
    while (--count >= 0) {
      try {
        await method();
      }
      catch (ex) {
        if (ex instanceof playwright.errors.TimeoutError) {
          return timeoutFail(ex);
        }

        throw unknownEngineError(ex);
      }
    }

    report.pass();
    return pass();
  };
}