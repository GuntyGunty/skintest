import { Guard } from '@skintest/common';
import { InfoStep, StepContext } from '../command';
import { StepMeta } from '../meta';
import { asTest, TestExecutionResult } from '../test-result';

export class SayStep implements InfoStep {
  type: 'info' = 'info';

  constructor(
    public getMeta: () => Promise<StepMeta>,
    private message: string
  ) {
    Guard.notNull(getMeta, 'getMeta');
  }

  execute(context: StepContext): Promise<TestExecutionResult> {
    return asTest(Promise.resolve());
  }

  toString(): string {
    return `I say ${this.message}`;
  }
}