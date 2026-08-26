import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import './WalletLedgerRow.css';

export default function WalletLedgerRow({ transaction }) {
  const isCredit = transaction.type === 'credit';

  return (
    <div className={`wallet-ledger-row ${isCredit ? 'is-credit' : 'is-debit'}`}>
      <div className="ledger-icon-box">
        {isCredit ? (
          <ArrowDownLeft size={16} color="var(--admin-success-text, #15803D)" />
        ) : (
          <ArrowUpRight size={16} color="var(--color-primary, #B91C1C)" />
        )}
      </div>

      <div className="ledger-info-box">
        <strong className="ledger-desc">{transaction.description}</strong>
        <span className="ledger-time tabular-nums">{transaction.date} • TXN: {transaction.id}</span>
      </div>

      <div className="ledger-amount-box tabular-nums">
        <strong className={`amount-val ${isCredit ? 'credit-val' : 'debit-val'}`}>
          {isCredit ? '+' : ''}₹{Math.abs(transaction.amount).toFixed(2)}
        </strong>
        <span className="balance-sub">Bal: ₹{transaction.runningBalance.toFixed(2)}</span>
      </div>
    </div>
  );
}
