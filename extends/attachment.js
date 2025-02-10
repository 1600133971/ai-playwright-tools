import { test as base } from '@playwright/test';
import { attachFixWithAI } from './fix-with-ai';

export const expect = base.expect;
export const devices = base.devices;
export const test = base.extend({
  fixWithAI: [async ({ page }, use, testInfo) => {
    await use();
    await attachFixWithAI(page, testInfo);
  }, { scope: 'test', auto: true }],
});
