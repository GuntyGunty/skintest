import { KeyboardKey } from '../integration/keyboard';


export interface Engine {
  goto(url: string): Promise<void>;
  waitForNavigation(url: string): Promise<void>;

  click(query: string): Promise<void>;
  fill(query: string, value: string): Promise<void>;
  focus(query: string): Promise<void>;
  drag(query: string, x: number, y: number): Promise<void>

  press(key: KeyboardKey): Promise<void>;

  // TODO: define file type
  attachFile(from: string, file: any): Promise<void>;

  select<T>(query: string): T | null;
  selectAll<T>(query: string): T[];

  pause(): Promise<void>;
}
