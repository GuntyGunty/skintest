import { elementNotFoundError } from '@skintest/common';
import { DOMElement, ElementRef, ElementRefList, KeyboardKey, Page } from '@skintest/sdk';
import * as playwright from 'playwright';
import { PlaywrightElement } from './playwright-element';

export class PlaywrightPage implements Page {
  constructor(private page: playwright.Page) {
  }

  close(): Promise<void> {
    return this.page.close();
  }

  goBack(): Promise<void> {
    return this.page.goBack() as Promise<any>;
  }

  goForward(): Promise<void> {
    return this.page.goForward() as Promise<any>;
  }

  reload(): Promise<void> {
    return this.page.reload() as Promise<any>;
  }

  dblclick(selector: string): Promise<void> {
    return this.page.dblclick(selector);
  }

  type(selector: string, value: string): Promise<void> {
    return this.page.type(selector, value);
  }

  check(selector: string): Promise<void> {
    return this.page.check(selector);
  }

  uncheck(selector: string): Promise<void> {
    return this.page.uncheck(selector);
  }

  selectOption(selector: string, label: string): Promise<void> {
    return this.page.selectOption(selector, { label }) as Promise<any>;
  }

  async selectText(selector: string): Promise<void> {
    const element = await this.page.waitForSelector(selector);
    // todo: add timeout option
    return element.selectText();
  }

  goto(url: string): Promise<void> {
    return this.page.goto(url) as Promise<any>;
  }

  waitForNavigation(url: string): Promise<void> {
    return this.page.waitForNavigation({ url }) as Promise<any>;
  }

  click(selector: string): Promise<void> {
    return this.page.click(selector);
  }

  hover(selector: string): Promise<void> {
    return this.page.hover(selector);
  }

  keyPress(key: KeyboardKey): Promise<void> {
    return this.page.keyboard.press(key);
  }

  fill(selector: string, value: string): Promise<void> {
    return this.page.fill(selector, value);
  }

  async focus(selector: string): Promise<void> {
    return this.page.focus(selector);
  }

  // todo: implement
  drag(target: string, x: number, y: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  attachFile(target: string, file: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  pause(): Promise<void> {
    return this.page.pause();
  }

  async query<T extends DOMElement>(selector: string): Promise<ElementRef<T>> {
    const handle = await this.page.waitForSelector(selector);
    if (handle) {
      return new PlaywrightElement<T>(handle, this.page, selector);
    }

    throw elementNotFoundError(selector);
  }

  async queryList<T extends DOMElement>(selector: string): Promise<ElementRefList<T>> {
    // todo: how to wait for $$?
    return (await this.page.$$(selector))
      .map(handle => new PlaywrightElement(handle, this.page, selector));
  }

  async dbgQuery<T extends DOMElement>(selector: string): Promise<ElementRef<T> | null> {
    const handle = await this.page.$(selector);
    if (handle) {
      return new PlaywrightElement<T>(handle, this.page, selector);
    }

    return null;
  }

  async dbgQueryList<T extends DOMElement>(selector: string): Promise<ElementRefList<T>> {
    return (await this.page.$$(selector))
      .map(handle => new PlaywrightElement(handle, this.page, selector));
  }
}