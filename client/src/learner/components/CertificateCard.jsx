import { Award, Download, Share2, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import './CertificateCard.css';

export default function CertificateCard({ 
  courseName = '2-Wheeler Special (Scooter/MCWG)',
  schoolName = 'Sai Motor & 2-Wheeler Academy, Pune',
  learnerName = 'Pooja Kulkarni',
  completionDate = '28 Aug 2026',
  certificateNo = 'DL-MH-2026-88421-MCWG',
  isUnlocked = false,
  progress = 80
}) {
  if (!isUnlocked) {
    return (
      <div className="certificate-locked-card">
        <div className="locked-icon-bubble">
          <Lock size={28} color="var(--admin-text-subtle, #94a3b8)" />
        </div>
        <div className="locked-info-text">
          <h3>Official Driving Completion Certificate</h3>
          <p>
            Your digitally verifiable Smart Certificate from <strong>{schoolName}</strong> will unlock automatically upon completing all 10 on-track lessons and passing the pre-RTO trial test.
          </p>
          <div className="locked-progress-wrap">
            <div className="locked-progress-bar">
              <div className="locked-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="locked-percent-lbl tabular-nums">{progress}% Completed (8 of 10 Lessons)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="certificate-unlocked-card">
      <div className="cert-watermark-bg">
        <Award size={180} />
      </div>

      <div className="cert-top-row">
        <div className="cert-badge-wrap">
          <div className="cert-seal">
            <Award size={22} color="#ffffff" />
          </div>
          <div>
            <span className="cert-authority">Govt Approved RTO Network</span>
            <strong className="cert-title">Certificate of Driving Competence</strong>
          </div>
        </div>

        <div className="cert-qr-box">
          <ShieldCheck size={20} color="var(--admin-success-text, #15803D)" />
          <span className="qr-text">Digitally Verified</span>
        </div>
      </div>

      <div className="cert-body-content">
        <p className="cert-presented-text">This is proudly presented to</p>
        <h2 className="cert-recipient-name">{learnerName}</h2>
        <p className="cert-desc-text">
          for successfully completing the <strong>{courseName}</strong> practical curriculum, adhering to Central Motor Vehicles Rules (CMVR 1989) at <strong>{schoolName}</strong>.
        </p>

        <div className="cert-meta-grid tabular-nums">
          <div className="cert-meta-item">
            <span className="lbl">Certificate No:</span>
            <strong>{certificateNo}</strong>
          </div>
          <div className="cert-meta-item">
            <span className="lbl">Issue Date:</span>
            <strong>{completionDate}</strong>
          </div>
          <div className="cert-meta-item">
            <span className="lbl">RTO Authority:</span>
            <strong>MH-12 Pune</strong>
          </div>
        </div>
      </div>

      <div className="cert-actions-footer">
        <button 
          onClick={() => alert(`Downloading High-Resolution PDF Certificate:\nRecipient: ${learnerName}\nCertificate No: ${certificateNo}`)}
          className="btn-download-cert"
        >
          <Download size={14} />
          <span>Download PDF Certificate</span>
        </button>

        <button 
          onClick={() => alert(`Certificate verification link copied to clipboard!\nhttps://drivelearn.in/verify/${certificateNo}`)}
          className="btn-share-cert"
        >
          <Share2 size={14} />
          <span>Share Verification Link</span>
        </button>
      </div>
    </div>
  );
}
