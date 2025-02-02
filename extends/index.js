import { test as base } from '@playwright/test';
import { ai } from './ai';

export const expect = base.expect;
export const devices = base.devices;
export const test = base.test.extend({
  ai: ai,
});