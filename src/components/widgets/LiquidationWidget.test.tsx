import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  bankruptcyPrice,
  canOpen,
  equityAtLiquidation,
  LiquidationWidget,
  liquidationDistance,
  liquidationPrice,
} from "./LiquidationWidget";

describe("the post's 10x long", () => {
  it("is bankrupt at $90,000", () => {
    expect(bankruptcyPrice(100_000, 10)).toBeCloseTo(90_000);
  });

  it("is liquidated near $92,300, a 7.7% fall", () => {
    expect(liquidationPrice(100_000, 10, 0.025)).toBeCloseTo(92_307.69, 2);
    expect(liquidationDistance(10, 0.025)).toBeCloseTo(0.0769, 4);
  });

  it("has $231 of equity left at liquidation, as the diagram says", () => {
    expect(equityAtLiquidation(1000, 10, 0.025)).toBeCloseTo(230.77, 2);
  });

  it("agrees with the liquidation formula in Hyperliquid's docs", () => {
    const [price, size, margin, l] = [100_000, 0.1, 1000, 0.025];
    const hyperliquid = price - (margin - l * size * price) / size / (1 - l);
    expect(liquidationPrice(price, 10, l)).toBeCloseTo(hyperliquid);
  });
});

describe("the edges", () => {
  it("wipes out a 100x long at a 1% move before any maintenance margin", () => {
    expect(liquidationDistance(100, 0)).toBeCloseTo(0.01);
  });

  it("won't open a position whose deposit is under maintenance", () => {
    expect(canOpen(39, 0.025)).toBe(true);
    expect(canOpen(40, 0.025)).toBe(false);
  });
});

describe("LiquidationWidget", () => {
  it("opens on the post's numbers", () => {
    render(<LiquidationWidget />);
    expect(screen.getByText("7.7% fall.")).toBeInTheDocument();
    expect(screen.getByText("$10,000")).toBeInTheDocument();
    expect(screen.getByText("Liquidated at").nextSibling).toHaveTextContent("$92,308");
    expect(screen.getByText("Bankruptcy at").nextSibling).toHaveTextContent("$90,000");
  });

  it("keeps the distance when only the margin moves", () => {
    render(<LiquidationWidget />);
    fireEvent.change(screen.getByLabelText(/Margin/), { target: { value: "2000" } });
    expect(screen.getByText("7.7% fall.")).toBeInTheDocument();
    expect(screen.getByText("Position").nextSibling).toHaveTextContent("$20,000");
  });

  it("says so when leverage leaves no room above maintenance", () => {
    render(<LiquidationWidget />);
    fireEvent.change(screen.getByLabelText(/Leverage/), { target: { value: "40" } });
    expect(screen.getByText("This one can't open.")).toBeInTheDocument();
  });
});
