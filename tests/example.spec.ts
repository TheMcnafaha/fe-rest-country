import { test, expect } from "@playwright/test";
import softMatchChildParentStrg from "../src/utils/countries-search";

test("utils", async () => {
  expect(softMatchChildParentStrg("ello", "hello")).toBe(true)
  expect(softMatchChildParentStrg('abc', "hello")).toBe(false)
})
