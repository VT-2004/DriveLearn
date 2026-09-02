import { useState } from 'react';
import { ShieldCheck, PhoneCall, Share2, AlertTriangle, CheckCircle2, UserCheck, HeartHandshake } from 'lucide-react';
import './SafetyShieldCard.css';

export default function SafetyShieldCard({ learnerName, instructorName, vehicleNo }) {
  const [copied, setCopied] = useState(false);

  const handleShareLiveSession = () => {
    const shareText = `DriveLearn India Live Session: ${learnerName || 'Pooja Kulkarni'} is currently on a practical driving session with certified trainer ${instructorName || 'Sunita Deshmukh'} in vehicle ${vehicleNo || 'MH-12-CD-8812'} on Karve Road, Pune. Academy Dispatch: +91 98230 99887.`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    alert('Live session tracking link copied to clipboard! You can paste and send it to your family on WhatsApp.');
  };

  return (
    <div className="safety-shield-card">
      <div className="safety-shield-header">
        <div className="safety-title-left">
          <div className="safety-shield-icon">
            <ShieldCheck size={20} color="#ffffff" />
          </div>
          <div>
            <h3>DriveLearn Women & Learner Safety Shield</h3>
            <span className="safety-sub">Verified Dual-Control Fleet • RTO Police Background Audited</span>
          </div>
        </div>

        <div className="sos-pill">
          <span>24x7 HELPLINE 112 & ACADEMY DISPATCH</span>
        </div>
      </div>

      <div className="safety-features-grid">
        <div className="safety-item">
          <CheckCircle2 size={16} color="#15803D" />
          <div>
            <strong>Certified Female Instructor</strong>
            <p>{instructorName || 'Sunita Deshmukh'} • Verified background check & RTO license MH-12-INS-2019-332.</p>
          </div>
        </div>

        <div className="safety-item">
          <CheckCircle2 size={16} color="#15803D" />
          <div>
            <strong>Dual-Control Vehicle Safety</strong>
            <p>{vehicleNo || 'MH-12-CD-8812'} • Auxiliary brake inspected Aug 2026. Instructor can halt vehicle instantly.</p>
          </div>
        </div>

        <div className="safety-item">
          <CheckCircle2 size={16} color="#15803D" />
          <div>
            <strong>Designated Public Transit Hubs</strong>
            <p>Pickups restricted to well-lit metro pillars and public RTO test grounds (Garware Metro Pillar 42).</p>
          </div>
        </div>
      </div>

      <div className="safety-card-actions">
        <button 
          type="button" 
          onClick={handleShareLiveSession} 
          className="btn-share-session"
        >
          <Share2 size={14} />
          <span>{copied ? 'Copied to Clipboard!' : 'Share Live Session with Family (WhatsApp)'}</span>
        </button>

        <a 
          href="tel:+919823099887" 
          className="btn-emergency-dispatch"
          title="Direct dial academy control room"
        >
          <PhoneCall size={14} />
          <span>Emergency Dispatch (+91 98230 99887)</span>
        </a>
      </div>
    </div>
  );
}
