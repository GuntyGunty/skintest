import { MyStep } from './my-step';

export function feature(name: string): Feature {
  throw new Error('not implemented');
};

export interface Feature {
  before(what: 'feature' | 'scenario', ...steps: MyStep[]): Feature;
  after(what: 'feature' | 'scenario', ...steps: MyStep[]): Feature;

  scenario(name: string, ...steps: MyStep[]): Feature;
}
