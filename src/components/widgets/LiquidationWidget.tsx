"use client";

import { useState } from "react";
import { panel, Slider, Stat } from "./shared";

const ENTRY = 100_000;
/** The price strip runs from entry down to this share of it, the bankruptcy price at 2x */
const STRIP_FLOOR = 0.5;

/** Bankruptcy price of a long: the deposit is gone */
export function bankruptcyPrice(entry: number, leverage: number): number {
  return entry * (1 - 1 / leverage);
}

/** Price where a long's equity equals `maintenance` (a fraction) of the position's value */
export function liquidationPrice(entry: number, leverage: number, maintenance: number): number {
  return bankruptcyPrice(entry, leverage) / (1 - maintenance);
}

/** How far the price falls before liquidation, as a fraction of entry. It doesn't depend on the deposit. */
export function liquidationDistance(leverage: number, maintenance: number): number {
  return 1 - liquidationPrice(1, leverage, maintenance);
}

/** A position can only open if the deposit is more than the maintenance margin it would owe at entry */
export function canOpen(leverage: number, maintenance: number): boolean {
  return 1 / leverage > maintenance;
}

export function equityAtLiquidation(margin: number, leverage: number, maintenance: number): number {
  return margin * leverage * maintenance * (1 - liquidationDistance(leverage, maintenance));
}

const usd = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;
const stripX = (price: number) => 20 + (360 * (1 - price / ENTRY)) / (1 - STRIP_FLOOR);

export function LiquidationWidget() {
  const [leverage, setLeverage] = useState(10);
  const [maintenancePct, setMaintenancePct] = useState(2.5);
  const [margin, setMargin] = useState(1000);

  const maintenance = maintenancePct / 100;
  const open = canOpen(leverage, maintenance);
  const liquidation = liquidationPrice(ENTRY, leverage, maintenance);
  const bankruptcy = bankruptcyPrice(ENTRY, leverage);
  const liqX = open ? stripX(liquidation) : 20;
  const bankX = stripX(bankruptcy);

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-fg">Try your own long</p>
      <svg viewBox="0 0 400 62" role="img" aria-label={`Bitcoin price from $100,000 down to $50,000, with liquidation at ${usd(liquidation)} and bankruptcy at ${usd(bankruptcy)}`}>
        <rect x={20} y={20} width={Math.max(0, liqX - 20)} height={18} className="d-green d-fill" opacity="0.3" />
        <rect x={liqX} y={20} width={Math.max(0, bankX - liqX)} height={18} className="d-amber d-fill" opacity="0.6" />
        <rect x={bankX} y={20} width={380 - bankX} height={18} className="d-rose d-fill" opacity="0.3" />
        {open && (
          <text x={Math.min(Math.max(liqX, 42), 358)} y={13} className="d-s d-amber d-ct" textAnchor="middle">
            {usd(liquidation)}
          </text>
        )}
        {bankX > 96 && (
          <text x={20} y={53} className="d-s">
            {usd(ENTRY)}
          </text>
        )}
        <text x={Math.min(Math.max(bankX, 42), 358)} y={53} className="d-s d-rose d-ct" textAnchor="middle">
          {usd(bankruptcy)}
        </text>
      </svg>
      <Slider label="Leverage" value={leverage} min={2} max={100} suffix="x" onChange={setLeverage} />
      <Slider label="Maintenance" value={maintenancePct} min={0.5} max={5} step={0.1} suffix="%" onChange={setMaintenancePct} />
      <Slider label="Margin" value={margin} min={100} max={10000} step={100} prefix="$" onChange={setMargin} />
      <div aria-live="polite" className="space-y-3">
        {open ? (
          <>
            <p className="text-sm text-muted">
              <span className="font-mono text-base font-semibold text-fg">{(liquidationDistance(leverage, maintenance) * 100).toFixed(1)}% fall.</span>{" "}
              Margin only changes the dollars: leverage and maintenance set the distance.
            </p>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Position" value={usd(margin * leverage)} />
              <Stat label="Liquidated at" value={usd(liquidation)} />
              <Stat label="Bankruptcy at" value={usd(bankruptcy)} />
              <Stat label="Equity left" value={usd(equityAtLiquidation(margin, leverage, maintenance))} />
            </dl>
          </>
        ) : (
          <p className="text-sm text-muted">
            <span className="font-semibold text-fg">This one can&apos;t open.</span> At {leverage}x the deposit is {(100 / leverage).toFixed(1)}% of the
            position, and maintenance alone asks for {maintenancePct}%.
          </p>
        )}
      </div>
    </div>
  );
}
