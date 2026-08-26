import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck, 
  Sparkles, CheckCircle2, AlertCircle, Clock 
} from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './LearnerWallet.css';

export default function LearnerWallet() {
  const { user } = useAuth();

  // Ledger transactions
  const [transactions] = useState([
    {
      id: 'tx-001',
      type: 'CREDIT',
      amount: 15.0,
      description: '🎉 Introductory Signup Bonus credited to Wallet',
      date: '20 Aug 2026, 05:40 PM',
      status: 'SUCCESS',
    },
  ]);

  return (
    <div className="learner-wallet-page">
      {/* 1. Wallet Header Banner */}
      <div className="wallet-hero-banner">
        <div className="wallet-hero-left">
          <div className="wallet-badge-pill">
            <Sparkles size={14} />
            <span>Maharashtra Launch Introductory Offer</span>
          </div>
          <span className="balance-label">Total In-App Wallet Balance</span>
          <div className="balance-amount-row">
            <h1>₹{user?.wallet?.balance?.toFixed(2) || '15.00'}</h1>
            <span className="balance-curr">INR</span>
          </div>
          <p className="wallet-hero-note">
            Credited directly to your account. This amount is automatically deducted at checkout whenever you reserve a 2-wheeler or car course slot.
          </p>
        </div>

        <div className="wallet-hero-right">
          <div className="wallet-promo-card">
            <ShieldCheck size={28} color="#166534" />
            <div>
              <strong>100% Instant Discount Guarantee</strong>
              <p>No promo code required. Valid on all RTO-approved training schools across Maharashtra.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Wallet Guidelines & How It Works */}
      <div className="wallet-info-grid">
        <div className="wallet-info-card">
          <div className="info-num">1</div>
          <div>
            <h4>Auto-Applied at Booking</h4>
            <p>When selecting any course batch, ₹15 is subtracted from your payable fee automatically.</p>
          </div>
        </div>
        <div className="wallet-info-card">
          <div className="info-num">2</div>
          <div>
            <h4>Non-Expiring Launch Bonus</h4>
            <p>Your launch bonus remains valid for the entire 2-month promotional period.</p>
          </div>
        </div>
        <div className="wallet-info-card">
          <div className="info-num">3</div>
          <div>
            <h4>Direct Partner Settlement</h4>
            <p>DriveLearn India reimburses the ₹15 difference directly to the partner driving school.</p>
          </div>
        </div>
      </div>

      {/* 3. Transaction History Ledger */}
      <div className="wallet-ledger-card">
        <div className="ledger-header">
          <div>
            <h3>Wallet Transaction History</h3>
            <p>Immutable audit ledger of your credits and discounts</p>
          </div>
          <span className="tx-count-pill">{transactions.length} Transaction</span>
        </div>

        <div className="transactions-list">
          {transactions.map((tx) => (
            <div key={tx.id} className="tx-row">
              <div className="tx-icon-wrap credit">
                <ArrowDownLeft size={20} color="#166534" />
              </div>

              <div className="tx-info">
                <strong>{tx.description}</strong>
                <span className="tx-date">
                  <Clock size={13} /> {tx.date}
                </span>
              </div>

              <div className="tx-amount-col">
                <span className="tx-amount-credit">+₹{tx.amount.toFixed(2)}</span>
                <span className="tx-status-badge">
                  <CheckCircle2 size={12} /> Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
