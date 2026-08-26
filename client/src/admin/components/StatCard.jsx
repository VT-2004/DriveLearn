import React, { isValidElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, ShieldCheck, Clock, Users, UserCheck, 
  Wallet, Ticket, Award, RefreshCcw, CheckCircle2, ArrowUpRight,
  Bike, CreditCard, TrendingUp, Sparkles, Calendar, AlertCircle
} from 'lucide-react';
import './StatCard.css';

const ICON_MAP = {
  Building2,
  ShieldCheck,
  Clock,
  Users,
  UserCheck,
  Wallet,
  Ticket,
  Award,
  RefreshCcw,
  CheckCircle2,
  Bike,
  CreditCard,
  TrendingUp,
  Sparkles,
  Calendar,
  AlertCircle,
};

export default function StatCard({ label, value, trend, trendType = 'neutral', icon, link, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      navigate(link);
    }
  };

  // Render icon safely whether passed as a JSX element (<Users />), component function (Users), or string ('Users')
  const renderIcon = () => {
    if (!icon) return <Building2 size={16} />;
    
    // 1. If it's already a rendered JSX element like <Users size={18} />
    if (isValidElement(icon)) {
      return icon;
    }
    
    // 2. If it's a string key like 'Users'
    if (typeof icon === 'string') {
      const Comp = ICON_MAP[icon] || Building2;
      return <Comp size={16} />;
    }

    // 3. If it's a component function reference like Users
    if (typeof icon === 'function') {
      const Comp = icon;
      return <Comp size={16} />;
    }

    return null;
  };

  const isClickable = Boolean(link || onClick);

  return (
    <div 
      className={`admin-stat-card ${isClickable ? 'clickable' : ''}`}
      onClick={handleClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <div className="stat-card-header">
        <span className="stat-card-label">{label}</span>
        <div className="stat-card-icon-wrap">
          {renderIcon()}
        </div>
      </div>

      <div className="stat-card-body">
        <h3 className="stat-card-value tabular-nums">{value}</h3>
        <div className="stat-card-meta-row">
          {trend && (
            <span className={`stat-card-trend trend-${trendType} tabular-nums`}>
              {trend}
            </span>
          )}
          {isClickable && <ArrowUpRight size={13} className="stat-card-link-icon" />}
        </div>
      </div>
    </div>
  );
}
