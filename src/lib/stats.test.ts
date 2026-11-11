import { describe, expect, it } from "vitest";
import { dayRange, fillDays, productionUrl, tracksAnalytics, weekChange } from "./stats";

describe("stats", () => {
  it("covers the last N days, ending today", () => {
    const days = dayRange(new Date("2026-11-11T15:00:00Z"), 3);
    expect(days).toEqual(["2026-11-09", "2026-11-10", "2026-11-11"]);
  });

  it("fills missing days with zero", () => {
    const days = ["2026-11-09", "2026-11-10", "2026-11-11"];
    const rows = [{ timestamp: "2026-11-10T00:00:00.000Z", visitors: 4, pageviews: 5 }];
    expect(fillDays(rows, days)).toEqual([0, 4, 0]);
  });

  it("prefers a custom domain over vercel.app", () => {
    const project = {
      id: "p",
      name: "triplan",
      targets: { production: { alias: ["triplan-six.vercel.app", "triplan.ink"] } },
    };
    expect(productionUrl(project)).toBe("https://triplan.ink");
    expect(productionUrl({ id: "q", name: "q" })).toBeUndefined();
  });

  it("only counts projects with Web Analytics on", () => {
    expect(tracksAnalytics({ id: "a", name: "a", webAnalytics: { enabledAt: 1 } })).toBe(true);
    expect(tracksAnalytics({ id: "b", name: "b", webAnalytics: { enabledAt: 1, disabledAt: 2 } })).toBe(false);
    expect(tracksAnalytics({ id: "c", name: "c" })).toBe(false);
  });

  it("compares the last week with the one before", () => {
    const daily = [...Array(7).fill(10), ...Array(7).fill(15)];
    expect(weekChange(daily)).toBe(50);
    expect(weekChange(Array(14).fill(0))).toBeNull();
  });
});
