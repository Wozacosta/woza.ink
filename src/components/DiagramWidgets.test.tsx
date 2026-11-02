import fs from "fs";
import path from "path";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { diagramWidgets, fittsBits, hickCost } from "./DiagramWidgets";

describe("the formulas", () => {
  it("matches the worked numbers in the Laws of UX post", () => {
    expect(fittsBits(300, 20)).toBeCloseTo(4, 0);
    expect(fittsBits(300, 60)).toBeCloseTo(fittsBits(100, 20));
    expect(hickCost(16, 1)).toBeCloseTo(4.09, 2);
    expect(hickCost(16, 2)).toBeCloseTo(4.64, 2);
  });
});

describe("widgets", () => {
  afterEach(() => vi.useRealTimers());

  it.each(Object.keys(diagramWidgets))("%s has a static diagram for feeds and no-JS readers", (name) => {
    expect(fs.existsSync(path.join(process.cwd(), "public/diagrams", `${name}.svg`))).toBe(true);
  });

  it("recomputes Fitts difficulty when a slider moves", () => {
    const Fitts = diagramWidgets["ux-fitts"];
    render(<Fitts />);
    expect(screen.getByText("4.0 bits.")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Width/), { target: { value: "60" } });
    expect(screen.getByText("2.6 bits.")).toBeInTheDocument();
  });

  it("compares Hick costs across step counts", () => {
    const Hick = diagramWidgets["ux-hick"];
    render(<Hick />);
    expect(screen.getByText("One step of 16")).toBeInTheDocument();
    expect(screen.getByText("4.6")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Options/), { target: { value: "4" } });
    expect(screen.getByText("One step of 4")).toBeInTheDocument();
  });

  it("answers after the chosen delay", () => {
    vi.useFakeTimers();
    const Delay = diagramWidgets["ux-response"];
    render(<Delay />);
    fireEvent.click(screen.getByRole("button", { name: "400 ms" }));
    expect(screen.getByText("Waiting…")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(399);
    });
    expect(screen.getByText("Waiting…")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByText("Done.")).toBeInTheDocument();
  });
});
