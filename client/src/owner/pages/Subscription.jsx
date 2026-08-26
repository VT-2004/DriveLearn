import { useState } from 'react';
import { 
  ShieldCheck, Check, Sparkles, AlertCircle, ArrowRight, 
  CreditCard, Calendar, Clock, Ticket, AlertOctagon 
} from 'lucide-react';
import { saasPlansData, schoolProfileData } from '../data/dummyData';
import './Subscription.css';

export default function Subscription() {
  const [plans, setPlans] = useState(saasPlansData);
  const [selectedPlanToSwitch, setSelectedPlanToSwitch] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [subscriptionLapsed, setSubscriptionLapsed] = useState(false); // Gap Audit

  const handleSelectPlan = (plan) => {
    setSelectedPlanToSwitch(plan);
    setShowConfirmModal(true);
  };

  const handleConfirmSwitch = () => {
    setPlans((prev) =>
      prev.map((p) => ({
        ...p,
        isCurrent: p.id === selectedPlanToSwitch.id,
      }))
    );
    setSubscriptionLapsed(false);
    setShowConfirmModal(false);
    alert(`Successfully switched driving school subscription to ${selectedPlanToSwitch.name}!`);
  };

  return (
    <div className="owner-subscription-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Driving School SaaS Subscription</h1>
          <p>
            Manage your school’s platform features, certified instructor capacity, and RTO directory listing tier.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748b' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={subscriptionLapsed}
              onChange={(e) => setSubscriptionLapsed(e.target.checked)}
              style={{ accentColor: '#B91C1C' }}
            />
            <span>Preview Lapsed Subscription State</span>
          </label>
        </div>
      </div>

      {/* Subscription-Lapsed Alert Banner (Gap Audit) */}
      {subscriptionLapsed && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '2px solid #ef4444',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertOctagon size={24} color="#dc2626" />
            </div>
            <div>
              <strong style={{ fontSize: '14px', color: '#991b1b', display: 'block' }}>
                Your SaaS Plan Has Lapsed — School Hidden from Public Directory!
              </strong>
              <p style={{ fontSize: '12px', color: '#b91c1c', margin: '2px 0 0 0' }}>
                Renew now to reactivate online student enrollments, instant slot reservations, and certified RTO badge visibility.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleSelectPlan(plans[1])}
            style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Renew Professional Tier</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* 2. Active Subscription Summary Card */}
      <div className="active-sub-banner">
        <div className="sub-banner-left">
          <div className="sub-plan-badge" style={{ backgroundColor: subscriptionLapsed ? '#dc2626' : undefined }}>
            <ShieldCheck size={20} color="#ffffff" />
          </div>
          <div>
            <h3>
              {subscriptionLapsed
                ? 'Subscription Expired: Professional Tier'
                : 'Active Subscription: Professional Tier (₹2,500 / month)'}
            </h3>
            <p>
              {subscriptionLapsed
                ? 'Expired on 15 Aug 2026. Payment retry failed via HDFC NetBanking.'
                : `Next automated renewal on ${schoolProfileData.renewalDate} via HDFC NetBanking (•••• 4491).`}
            </p>
          </div>
        </div>

        <div className="sub-status-pill tabular-nums" style={{
          backgroundColor: subscriptionLapsed ? '#fef2f2' : undefined,
          color: subscriptionLapsed ? '#dc2626' : undefined,
          borderColor: subscriptionLapsed ? '#fecaca' : undefined
        }}>
          <span className="sub-dot" style={{ backgroundColor: subscriptionLapsed ? '#dc2626' : undefined }}></span>
          <span>{subscriptionLapsed ? 'Lapsed / Inactive' : 'Active & Verified'}</span>
        </div>
      </div>

      {/* 3. 3-Tier SaaS Plan Comparison Grid */}
      <div className="saas-plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`saas-plan-card ${plan.isCurrent && !subscriptionLapsed ? 'is-current-card' : ''} ${plan.popularBadge ? 'is-popular' : ''}`}
          >
            {plan.popularBadge && (
              <div className="plan-popular-ribbon">
                <Sparkles size={12} />
                <span>Most Popular for Established Schools</span>
              </div>
            )}

            <div className="plan-card-header">
              <h4>{plan.name}</h4>
              <p className="plan-desc">{plan.description}</p>
            </div>

            <div className="plan-price-box tabular-nums">
              <span className="currency">₹</span>
              <span className="price-num">{plan.price.toLocaleString('en-IN')}</span>
              <span className="period">/{plan.billingPeriod}</span>
            </div>

            <div className="plan-features-list">
              {plan.features.map((feat, idx) => (
                <div key={idx} className="plan-feat-item">
                  <Check size={14} color="var(--admin-success-text, #15803D)" flexShrink={0} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="plan-card-footer">
              {plan.isCurrent && !subscriptionLapsed ? (
                <button disabled className="btn-current-plan">
                  <Check size={14} />
                  <span>Current Active Plan</span>
                </button>
              ) : (
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className="btn-switch-plan"
                >
                  <span>{subscriptionLapsed ? `Renew with ${plan.name}` : `Switch to ${plan.name}`}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedPlanToSwitch && (
        <div className="owner-modal-backdrop">
          <div className="owner-modal-dialog">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Ticket size={18} color="var(--color-primary, #B91C1C)" />
                <h3>Confirm Subscription Plan Activation</h3>
              </div>
            </div>

            <div className="modal-body-content" style={{ padding: '20px' }}>
              <p>
                Are you sure you want to activate <strong>{selectedPlanToSwitch.name} (₹{selectedPlanToSwitch.price.toLocaleString('en-IN')}/mo)</strong> for Sai Motor Academy?
              </p>
              <div className="modal-alert-note" style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#b45309',
                marginTop: '12px'
              }}>
                <AlertCircle size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Your school will immediately be active on the Maharashtra search directory with all plan features.
              </div>
            </div>

            <div className="modal-footer" style={{ padding: '16px 20px' }}>
              <button onClick={() => setShowConfirmModal(false)} className="btn-cancel-modal">
                Cancel
              </button>
              <button onClick={handleConfirmSwitch} className="btn-submit-modal">
                Confirm & Activate Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
