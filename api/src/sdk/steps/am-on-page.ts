import { Guard } from '../../common/guard';
import { UIStep, StepContext } from '../command';
import { TestExecutionResult } from '../test-result';

export class AmOnPageStep implements UIStep {
  type: 'ui' = 'ui';
  
  constructor(
    private url: string
  ) {
    Guard.notEmpty(url, 'url');
  }

  execute(context: StepContext): TestExecutionResult {
    const { attempt, engine } = context;
    return attempt(() => engine.goto(this.url));
  }

  toString() {
    return `I am on page ${this.url}`;
  }
}