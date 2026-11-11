import { describe, expect, it } from "vitest";
import { authorized } from "./proxy";

const basic = (user: string, pass: string) => `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;

describe("stats auth", () => {
  it("accepts the right password with any username", () => {
    expect(authorized(basic("me", "s3cret"), "s3cret")).toBe(true);
    expect(authorized(basic("", "s3cret"), "s3cret")).toBe(true);
  });

  it("rejects a wrong or missing password", () => {
    expect(authorized(basic("me", "nope"), "s3cret")).toBe(false);
    expect(authorized(null, "s3cret")).toBe(false);
  });

  it("stays locked when no password is configured", () => {
    expect(authorized(basic("me", ""), undefined)).toBe(false);
    expect(authorized(basic("me", ""), "")).toBe(false);
  });
});
