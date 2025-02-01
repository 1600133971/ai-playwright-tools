import { test, expect } from '../extends/index';

//const options = undefined;
const options = {
  model: "deepseek-chat",
  apiKey: "sk-xxx",
  baseURL: "https://api.deepseek.com",
  debug: true,
};

test("ai: get the header text", async ({ page, ai }) => {
  await page.goto("/");

  const headerText = await ai.auto("get the header text", page, options);

  expect(headerText).toBe("Hello, Rayrun!");
});

test("ai: get the first letter of the header text", async ({ page, ai }) => {
  await page.goto("/");

  const headerText = await ai.auto("get the first letter of the header text", page, options);

  expect(headerText).toBe("H");
});

test("ai: get the second letter of the header text", async ({ page, ai }) => {
  await page.goto("/");

  const headerText = await ai.auto("get the second letter of the header text", page, options);

  expect(headerText).toBe("e");
});

test("ai: get the last letter of the header text", async ({ page, ai }) => {
  await page.goto("/");

  const headerText = await ai.auto("get the last letter of the header text", page, options);

  expect(headerText).toBe("n");
});

test("ai: executes query using locator_evaluate - last punctuation", async ({ page, ai }) => {
  await page.goto("/");

  const headerText = await ai.auto("get the last punctuation mark of the header text", page, options);

  expect(headerText).toBe("!");
});

test("ai: executes query using locator_evaluate - first punctuation", async ({ page, ai }) => {
  await page.goto("/");

  const headerText = await ai.auto("get the first punctuation mark of the header text", page, options);

  expect(headerText).toBe(",");
});

test("ai: executes action", async ({ page, ai }) => {
  await page.goto("/");

  await ai.auto(`Type "foo" in the search box`, page, options);

  await expect(page.getByTestId("search-input")).toHaveValue("foo");
});

test("ai: executes click", async ({ page, ai }) => {
  await page.goto("/");

  await ai.auto("Click the button until the counter value is equal to 2", page, options);

  await expect(page.getByTestId("current-count")).toHaveText("2");
});

test("ai: asserts (toBe)", async ({ page, ai }) => {
  await page.goto("/");

  const searchInputHasHeaderText = await ai.auto(
    `Is the contents of the header equal to "Hello, Rayrun!"?`, page, options);

  expect(searchInputHasHeaderText).toBe(true);
});

test("ai: asserts (not.toBe)", async ({ page, ai }) => {
  await page.goto("/");

  const searchInputHasHeaderText = await ai.auto(
    `Is the contents of the header equal to "Flying Donkeys"?`, page, options);

  expect(searchInputHasHeaderText).toBe(false);
});

test("ai: executes query, action and assertion", async ({ page, ai }) => {
  await page.goto("/");

  const headerText = await ai.auto("get the header text", page, options);

  await ai.auto(`type "${headerText}" in the search box`, page, options);

  const searchInputHasHeaderText = await ai.auto(
    `is the contents of the search box equal to "${headerText}"?`, page, options);

  expect(searchInputHasHeaderText).toBe(true);
});

import { createFunctions } from "../extends/functions";
test("finds element using a CSS locator and returns elementId", async ({ page, ai }) => {
  await page.goto("/");

  const actions = createFunctions(page);

  const result = await actions.locateElement.function(
    {
      cssSelector: "h1",
    }
  );

  expect(result).toStrictEqual({
    elementId: expect.any(String),
  });
});

test("ai: take a snapshot (page_screenshot)", async ({ page, ai }) => {
  await page.goto("/");

  await ai.auto(`take a snapshot with path "./snapshot.png" and fullPage "true"`, page, options);
});

test("ai: navigate to (page_goto)", async ({ page, ai }) => {
  await ai.auto(`navigate to "http://127.0.0.1:3000/"`, page, options);
});

test("ai: select option example (page_screenshot)", async ({ page, ai }) => {
  await page.goto("/");

  await ai.auto(`Select color option with label "Red"`, page, options);
});

