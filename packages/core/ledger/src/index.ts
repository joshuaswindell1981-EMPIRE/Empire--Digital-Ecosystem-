export const manifest = {
  name: "ledger",
  version: "1.0.0",
  layer: "core",
  dependsOn: ["events"],
  events: ["LEDGER_ENTRY_POSTED", "BALANCE_CALCULATED"],
  cartridges: []
};

export interface LedgerEntry {
  accountId: string;
  debit: number;
  credit: number;
  timestamp: Date;
  description: string;
}

export interface Balance {
  accountId: string;
  balance: number;
  asOf: Date;
}
