import { OnStage, Plugin } from '@skintest/platform';
import { once } from 'events';
import * as readline from 'readline';
import { tty } from './tty';

const { stdin, stdout, stderr } = process;

export function ttyPause(): Plugin {
  tty.test(stdout);

  return async (stage: OnStage) => stage({
    'step:pass': async ({ step, browser }) => {
      if (step.type === 'dev' && step.toString() === '__pause') {
        tty.newLine(stdout, tty.dev(`- type a selector and hit ${tty.shortcut('ENTER')}`));
        tty.newLine(stdout, tty.dev(`- type ${tty.shortcut('CTRL+C')} to exit from pause`));
        tty.newLine(stdout, tty.PROMPT);

        const rl = readline.createInterface({
          input: stdin,
          output: stdout,
          crlfDelay: Infinity,
          prompt: '',
          tabSize: 2
        });

        const inspect =
          (selector: string) =>
            Promise
              .resolve()
              .then(() => browser.getCurrentPage())
              .then(page => page.immediateQueryList(selector))
              .then(target => tty.writeInspect(stdout, { selector, target }));

        rl.on('line', selector => {
          rl.pause();
          inspect(selector)
            .catch(ex => tty.writeError(stderr, ex))
            .finally(() => {
              rl.resume();
              tty.newLine(stdout, tty.PROMPT);
            });
        });

        rl.on('SIGINT', () => {
          rl.close();
        });

        await once(rl, 'close');
      }
    },
  });
}