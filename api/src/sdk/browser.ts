import { Page } from './page';

export interface Browser {
  openPage(id: string): Promise<void>;
  getCurrentPage(): Page;
}
