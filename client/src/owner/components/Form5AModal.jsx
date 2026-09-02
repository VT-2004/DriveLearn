import { X, Printer, Download, ShieldCheck, Building2, CheckCircle2, FileText } from 'lucide-react';
import './Form5AModal.css';

const FORM_5A_STUDENT_REGISTER = [
  {
    srNo: 1,
    enrollmentNo: 'ENR-2026-0881',
    name: 'Pooja Kulkarni',
    phone: '+91 98230 11223',
    llNumber: 'MH-12/LL/2026/088192',
    llValidity: '05 Nov 2026',
    vehicleClass: 'MCWG (Two-Wheeler)',
    admissionDate: '01 Aug 2026',
    theoryHours: '10 hrs',
    practicalHours: '12 hrs',
    vehicleRegNo: 'MH-12-CD-8812',
    trainerName: 'Sunita Deshmukh (MH-12-INS-2019-332)',
    form5Issued: 'In-Progress (Session 8/10)',
  },
  {
    srNo: 2,
    enrollmentNo: 'ENR-2026-0842',
    name: 'Aarav Patil',
    phone: '+91 98230 33445',
    llNumber: 'MH-12/LL/2026/077219',
    llValidity: '28 Oct 2026',
    vehicleClass: 'MCWG (Two-Wheeler)',
    admissionDate: '28 Jul 2026',
    theoryHours: '10 hrs',
    practicalHours: '10 hrs',
    vehicleRegNo: 'MH-12-CD-8812',
    trainerName: 'Sunita Deshmukh (MH-12-INS-2019-332)',
    form5Issued: 'In-Progress (Session 6/10)',
  },
  {
    srNo: 3,
    enrollmentNo: 'ENR-2026-0810',
    name: 'Neha Shinde',
    phone: '+91 98230 44556',
    llNumber: 'MH-12/LL/2026/066102',
    llValidity: '15 Dec 2026',
    vehicleClass: 'MCWG (Two-Wheeler)',
    admissionDate: '20 Jul 2026',
    theoryHours: '10 hrs',
    practicalHours: '15 hrs',
    vehicleRegNo: 'MH-12-CD-8812',
    trainerName: 'Sunita Deshmukh (MH-12-INS-2019-332)',
    form5Issued: 'FORM 5 ISSUED (CERT-MH12-9921)',
  },
  {
    srNo: 4,
    enrollmentNo: 'ENR-2026-0790',
    name: 'Siddharth More',
    phone: '+91 98230 55667',
    llNumber: 'MH-12/LL/2026/055410',
    llValidity: '12 Jan 2027',
    vehicleClass: 'LMV (Four-Wheeler Car)',
    admissionDate: '15 Jul 2026',
    theoryHours: '10 hrs',
    practicalHours: '15 hrs',
    vehicleRegNo: 'MH-12-DE-4419',
    trainerName: 'Rahul Shinde (MH-12-INS-2017-104)',
    form5Issued: 'FORM 5 ISSUED (CERT-MH12-9844)',
  },
  {
    srNo: 5,
    enrollmentNo: 'ENR-2026-0765',
    name: 'Sneha Joshi',
    phone: '+91 98230 77889',
    llNumber: 'MH-12/LL/2026/044192',
    llValidity: '22 Dec 2026',
    vehicleClass: 'LMV (Four-Wheeler Car)',
    admissionDate: '10 Jul 2026',
    theoryHours: '10 hrs',
    practicalHours: '14 hrs',
    vehicleRegNo: 'MH-12-DE-4419',
    trainerName: 'Rahul Shinde (MH-12-INS-2017-104)',
    form5Issued: 'FORM 5 ISSUED (CERT-MH12-9812)',
  }
];

export default function Form5AModal({ onClose }) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    const headers = 'Sr,EnrollmentNo,Name,Phone,LL_Number,LL_Validity,Class,TheoryHours,PracticalHours,VehicleReg,Instructor,Form5Status\n';
    const rows = FORM_5A_STUDENT_REGISTER.map((r) =>
      `"${r.srNo}","${r.enrollmentNo}","${r.name}","${r.phone}","${r.llNumber}","${r.llValidity}","${r.vehicleClass}","${r.theoryHours}","${r.practicalHours}","${r.vehicleRegNo}","${r.trainerName}","${r.form5Issued}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Parivahan_Form_5A_Register_Sai_Motors_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="learner-modal-backdrop" onClick={onClose}>
      <div className="form5a-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Top Controls Bar */}
        <div className="form5a-top-bar">
          <div className="top-bar-left">
            <ShieldCheck size={18} color="#15803D" />
            <span>Central Motor Vehicles Rules 1989 • Statutory Gazette Audit Format</span>
          </div>

          <div className="top-bar-actions">
            <button type="button" onClick={handleDownloadCsv} className="btn-form5a-download">
              <Download size={14} />
              <span>Download CSV</span>
            </button>
            <button type="button" onClick={handlePrint} className="btn-form5a-print">
              <Printer size={14} />
              <span>Print Official Register</span>
            </button>
            <button onClick={onClose} className="btn-close-modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Official Gazette Layout Scroll */}
        <div className="form5a-printable-sheet">
          {/* Government Emblem & Header */}
          <div className="gazette-header">
            <h3>GOVERNMENT OF MAHARASHTRA • MOTOR VEHICLES DEPARTMENT</h3>
            <h4>FORM 5A</h4>
            <span className="gazette-rule">[See Rule 27(1) of Central Motor Vehicles Rules, 1989]</span>
            <h2>REGISTER TO BE MAINTAINED BY MOTOR DRIVING TRAINING SCHOOL</h2>
          </div>

          {/* School Compliance Metadata Box */}
          <div className="gazette-school-info">
            <div className="g-cell">
              <span className="g-lbl">Name of Driving School:</span>
              <strong className="g-val">Sai Motor & 2-Wheeler Academy</strong>
            </div>
            <div className="g-cell">
              <span className="g-lbl">RTO Approval License No:</span>
              <strong className="g-val tabular-nums">MH-12-DS-2018-0911</strong>
            </div>
            <div className="g-cell">
              <span className="g-lbl">Jurisdiction & Testing Ground:</span>
              <strong className="g-val">Pune RTO (Alandi Road & Warje 8-Track)</strong>
            </div>
            <div className="g-cell">
              <span className="g-lbl">Principal / School Owner:</span>
              <strong className="g-val">Rajesh Kadam (Sai Motors)</strong>
            </div>
          </div>

          {/* Official Form 5A Table */}
          <div className="gazette-table-wrap">
            <table className="form5a-table">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Enrollment No. & Date</th>
                  <th>Trainee Name & Mobile</th>
                  <th>Learner License (LL) No. & Expiry</th>
                  <th>Class of Vehicle</th>
                  <th>Hours (Theory + Track)</th>
                  <th>Training Vehicle Reg. No.</th>
                  <th>Certified Instructor & Lic No.</th>
                  <th>Form 5 Passing Status</th>
                </tr>
              </thead>
              <tbody>
                {FORM_5A_STUDENT_REGISTER.map((row) => (
                  <tr key={row.srNo}>
                    <td className="text-center font-bold tabular-nums">{row.srNo}</td>
                    <td>
                      <strong className="tabular-nums">{row.enrollmentNo}</strong>
                      <span className="sub-txt tabular-nums">{row.admissionDate}</span>
                    </td>
                    <td>
                      <strong>{row.name}</strong>
                      <span className="sub-txt tabular-nums">{row.phone}</span>
                    </td>
                    <td>
                      <strong className="tabular-nums">{row.llNumber}</strong>
                      <span className="sub-txt tabular-nums">Valid: {row.llValidity}</span>
                    </td>
                    <td><span className="class-pill">{row.vehicleClass}</span></td>
                    <td className="tabular-nums">
                      {row.theoryHours} + {row.practicalHours}
                    </td>
                    <td><strong className="tabular-nums">{row.vehicleRegNo}</strong></td>
                    <td style={{ fontSize: '11px' }}>{row.trainerName}</td>
                    <td>
                      <span className={`f5-status ${row.form5Issued.includes('ISSUED') ? 'issued' : 'progress'}`}>
                        {row.form5Issued}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Official Gazette Footer Signatures */}
          <div className="gazette-footer">
            <div className="sign-box">
              <div className="sign-line"></div>
              <span>Signature of Authorized Driving Instructor</span>
              <span className="sub-sign">Sunita Deshmukh (Lic: MH-12-INS-2019-332)</span>
            </div>

            <div className="stamp-box">
              <div className="official-circle-stamp">
                <span>SAI MOTOR ACADEMY</span>
                <span>RTO PUNE • MH-12</span>
                <span>AUDITED REGISTER</span>
              </div>
            </div>

            <div className="sign-box">
              <div className="sign-line"></div>
              <span>Signature of Motor Driving School Principal</span>
              <span className="sub-sign">Rajesh Kadam (Lic: MH-12-DS-2018-0911)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
