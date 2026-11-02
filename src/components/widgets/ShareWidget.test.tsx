import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { betterSide, expectedReturn, noPrice, returnIfRight, ShareWidget, shareValue } from "./ShareWidget";

describe("the post's numbers", () => {
  it("has NO at 0.38 when YES is at 0.62", () => {
    expect(noPrice(0.62)).toBeCloseTo(0.38);
  });

  it("calls a 75% belief a good bet at 62 cents", () => {
    expect(betterSide(0.62, 0.75)).toBe("YES");
    expect(shareValue("YES", 0.75)).toBe(0.75);
    expect(expectedReturn(0.62, 0.75)).toBeCloseTo(0.2097, 4);
  });

  it("pays about 61% on a right YES at 62 cents", () => {
    expect(returnIfRight(0.62)).toBeCloseTo(0.6129, 4);
  });

  it("pays little near 1: an 85 cent share returns under 18%", () => {
    expect(returnIfRight(0.85)).toBeCloseTo(0.1765, 4);
  });
});

describe("choosing a side", () => {
  it("buys NO when the belief is under the price", () => {
    expect(betterSide(0.62, 0.5)).toBe("NO");
    expect(shareValue("NO", 0.5)).toBe(0.5);
    expect(expectedReturn(noPrice(0.62), 0.5)).toBeCloseTo(0.3158, 4);
  });

  it("has no trade when the belief matches the price", () => {
    expect(betterSide(0.62, 0.62)).toBeNull();
  });
});

describe("ShareWidget", () => {
  it("opens on the post's example", () => {
    render(<ShareWidget />);
    expect(screen.getByText("Buy YES: 13¢ of edge.")).toBeInTheDocument();
    expect(screen.getByText("YES costs").nextSibling).toHaveTextContent("62¢");
    expect(screen.getByText("If right").nextSibling).toHaveTextContent("+61%");
  });

  it("switches side when the belief drops under the price", () => {
    render(<ShareWidget />);
    fireEvent.change(screen.getByLabelText(/Your belief/), { target: { value: "50" } });
    expect(screen.getByText("Buy NO: 12¢ of edge.")).toBeInTheDocument();
    expect(screen.getByText("NO costs").nextSibling).toHaveTextContent("38¢");
  });

  it("warns about lopsided prices", () => {
    render(<ShareWidget />);
    fireEvent.change(screen.getByLabelText(/YES price/), { target: { value: "85" } });
    expect(screen.getByText(/earns little/)).toBeInTheDocument();
  });
});
