import { test, expect } from '../extends/index';
import { createFunctions } from "../extends/functions";

//const options = undefined;
const options = {
  model: "deepseek-chat",
  apiKey: "sk-xxx",
  baseURL: "https://api.deepseek.com",
  debug: true,
};

test("ai: get the header text (locator_innerText)", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  const headerText = await ai.auto("get the header text", page, options);

  expect(headerText).toBe("Hello, Rayrun!");
});

test("ai: get the first letter of the header text", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  const headerText = await ai.auto("get the first letter of the header text", page, options);

  expect(headerText).toBe("H");
});

test("ai: get the second letter of the header text", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  const headerText = await ai.auto("get the second letter of the header text", page, options);

  expect(headerText).toBe("e");
});

test("ai: get the last letter of the header text", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  const headerText = await ai.auto("get the last letter of the header text", page, options);

  expect(headerText).toBe("n");
});

test("ai: get the last punctuation mark of the header text", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  const headerText = await ai.auto("get the last punctuation mark of the header text", page, options);

  expect(headerText).toBe("!");
});

test("ai: get the first punctuation mark of the header text", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  const headerText = await ai.auto("get the first punctuation mark of the header text", page, options);

  expect(headerText).toBe(",");
});

test("ai: type foo in the search box (locator_fill)", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  await ai.auto(`type "foo" in the search box`, page, options);

  await expect(page.getByTestId("search-input")).toHaveValue("foo");
});

test("ai: click the button until the counter value is equal to 2 (locator_click)", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  await ai.auto("click the button until the counter value is equal to 2", page, options);

  await expect(page.getByTestId("current-count")).toHaveText("2");
});

test("ai: is the contents of the header equal to Hello, Rayrun!", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  const searchInputHasHeaderText = await ai.auto(
    `is the contents of the header equal to "Hello, Rayrun!"?`, page, options);

  expect(searchInputHasHeaderText).toBe(true);
});

test("ai: is the contents of the header equal to Flying Donkeys", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  const searchInputHasHeaderText = await ai.auto(
    `is the contents of the header equal to "Flying Donkeys"?`, page, options);

  expect(searchInputHasHeaderText).toBe(false);
});

test("ai: executes query, action and assertion", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  const headerText = await ai.auto("get the header text", page, options);

  await ai.auto(`type "${headerText}" in the search box`, page, options);

  const searchInputHasHeaderText = await ai.auto(
    `is the contents of the search box equal to "${headerText}"?`, page, options);

  expect(searchInputHasHeaderText).toBe(true);
});


test("ai: finds element using a CSS locator and returns elementId (createFunctions)", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  const actions = createFunctions(page);

  const result = await actions.locateElement.function({ cssSelector: "h1", });

  expect(result).toStrictEqual({elementId: expect.any(String), });
});

test("ai: take a snapshot (page_screenshot)", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  await ai.auto(`take a snapshot with path "./snapshot.png" and fullPage "true"`, page, options);
});

test("ai: navigate to (page_goto)", async ({ page, ai }) => {
  await ai.auto(`navigate to "http://127.0.0.1:3000/"`, page, options);
});

test("ai: select option example (page_screenshot)", async ({ page, ai }) => {
  await page.goto("http://127.0.0.1:3000");

  await ai.auto(`select color option with label "Red"`, page, options);
});
