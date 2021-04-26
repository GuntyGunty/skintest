import { Guard } from '../../utils/guard';
import { Select } from '../selector';
import { Step, StepContext } from '../step';
import { TestExecutionResult } from '../test-result';

export class ClickStep implements Step {
  constructor(
    private selector: Select<any>
  ) {
    Guard.notNull(selector, 'selector');
  }

  execute(context: StepContext): TestExecutionResult {
    const { attempt, engine } = context;
    return attempt(() => engine.click(this.selector.query));
  }

  toString() {
    return `click ${this.selector.query}`;
  }
}
