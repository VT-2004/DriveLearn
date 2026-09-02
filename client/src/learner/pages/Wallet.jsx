import { useState } from 'react';
import { Wallet as WalletIcon, Sparkles, ArrowDownLeft, ArrowUpRight, Download, FileText, CheckCircle2, Info } from 'lucide-react';
import WalletLedgerRow from '../components/WalletLedgerRow';
import StatusPill from '../../admin/components/StatusPill';
import { learnerWalletData } from '../data/dummyData';
import './Wallet.css';

export default function Wallet() {
  const [wallet, setWallet] = useState(learnerWalletData);

  return (
    <div className="learner-wallet-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Learner In-App Wallet & Payments</h1>
          <p>
            Track your introductory signup credits, course enrollment deductions, and official GST tax invoices.
          </p>
        </div>
      </div>

      {/* Sub-section A: Wallet Balance Hero Card */}
      <div className="wallet-balance-hero">
        <div className="balance-left-col">
          <div className="wallet-icon-badge">
            <WalletIcon size={24} color="#ffffff" />
          </div>
          <div>
            <span className="balance-eyebrow">Available Wallet Balance</span>
            <div className="balance-amount-row tabular-nums">
              <span className="cur">₹</span>
              <strong className="amt">{wallet.currentBalance.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <div className="balance-right-col">
          <div className="bonus-earned-chip tabular-nums">
            <Sparkles size={14} color="#b45309" />
            <span>₹15.00 Total Signup Bonus Deposited & Applied</span>
          </div>
        </div>
      </div>

      {/* Explanatory Banner */}
      <div className="wallet-info-note">
        <Info size={18} color="var(--color-primary, #B91C1C)" style={{ flexShrink: 0 }} />
        <div>
          <strong>How your ₹15 in-app wallet bonus worked:</strong>
          <p>
            When you signed up on DriveLearn, ₹15 was instantly credited to your wallet. At course checkout for the <em>2-Wheeler Special</em> (₹999), this credit was automatically applied, reducing your net payable amount to <strong>₹984.00</strong>.
          </p>
        </div>
      </div>

      {/* Sub-section B: Wallet Ledger (Credits & Debits) */}
      <div className="admin-card-panel">
        <div className="panel-header">
          <div>
            <h3>Wallet Transaction Ledger</h3>
            <p>Complete history of promo credits, referral bonuses, and course payments</p>
          </div>
          <span className="txn-count-tag tabular-nums">{wallet.transactions.length} Records</span>
        </div>

        <div className="wallet-ledger-stack">
          {wallet.transactions.map((txn) => (
            <WalletLedgerRow key={txn.id} transaction={txn} />
          ))}
        </div>
      </div>

      {/* Sub-section C: Course Payment History Table */}
      <div className="admin-card-panel">
        <div className="panel-header">
          <div>
            <h3>Course Payment & Tax Invoices</h3>
            <p>Official payment receipts for your driving training packages</p>
          </div>
        </div>

        <div className="payments-history-table-wrap">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Course Package</th>
                <th>Course Fee</th>
                <th>Wallet Credit</th>
                <th>You Paid</th>
                <th>Date</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {wallet.coursePaymentHistory.map((item) => (
                <tr key={item.id}>
                  <td><strong className="tabular-nums">{item.id}</strong></td>
                  <td><span>{item.course}</span></td>
                  <td className="tabular-nums">₹{item.stickerPrice.toFixed(2)}</td>
                  <td className="wallet-deduct-cell tabular-nums">-₹{item.walletBonusDeducted.toFixed(2)}</td>
                  <td><strong className="paid-val-cell tabular-nums">₹{item.amountPaid.toFixed(2)}</strong></td>
                  <td className="tabular-nums">{item.date}</td>
                  <td><StatusPill status={item.status} /></td>
                  <td>
                    <button 
                      onClick={() => alert(`Downloading GST Tax Invoice for ${item.id}\nPackage: ${item.course}\nNet Paid: ₹${item.amountPaid}`)}
                      className="btn-download-inv"
                      title="Download GST Invoice"
                    >
                      <Download size={13} />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
