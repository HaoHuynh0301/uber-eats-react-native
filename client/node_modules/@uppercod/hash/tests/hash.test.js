import test from "ava";
import { hash } from "../src/hash.js";

test("simple hash", async (t) => {
    t.is(hash("https://github.com/UpperCod"), "9a8-a0c-9a4");
    t.is(hash("UpperCod"), "2be-322-2cd");
    t.is(hash("abc"), "c3-126-c5");
    t.is(hash("a"), "0-61-0");
});
