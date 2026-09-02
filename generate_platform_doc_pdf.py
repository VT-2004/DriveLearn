import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(40, 810, "DriveLearn India — System Architecture & Portal Specifications")
            self.drawRightString(555, 810, "Maharashtra RTO (CMVR 1989)")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(40, 802, 555, 802)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(40, 42, 555, 42)
        
        self.drawString(40, 30, "Confidential — For Academic & Evaluation Review Only")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(555, 30, page_text)
        self.restoreState()

def build_pdf(filename="DriveLearn_India_Architecture_and_Features.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=50,
        bottomMargin=55
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    c_primary = colors.HexColor("#B91C1C")
    c_dark = colors.HexColor("#0F172A")
    c_slate = colors.HexColor("#334155")
    c_green = colors.HexColor("#15803D")
    c_bg_light = colors.HexColor("#F8FAFC")
    c_border = colors.HexColor("#E2E8F0")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=c_primary,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=c_slate,
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=c_dark,
        spaceBefore=12,
        spaceAfter=6
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=c_primary,
        spaceBefore=8,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=c_slate
    )

    diag_text = ParagraphStyle(
        'DiagramText',
        parent=styles['Normal'],
        fontName='Courier-Bold',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#0F172A")
    )

    tbl_header = ParagraphStyle(
        'TblHdr',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    tbl_cell = ParagraphStyle(
        'TblCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=c_slate
    )

    tbl_cell_bold = ParagraphStyle(
        'TblCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=c_dark
    )

    story = []

    # Title Block
    story.append(Paragraph("DriveLearn India", title_style))
    story.append(Paragraph("Multi-Portal System Architecture & Feature Specification Dossier", ParagraphStyle(
        'SubHead', fontName='Helvetica-Bold', fontSize=13, leading=16, textColor=c_dark
    )))
    story.append(Paragraph("Compliance with Central Motor Vehicles Rules (CMVR 1989) • Maharashtra RTO Digital Network", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_primary, spaceBefore=0, spaceAfter=12))

    # Executive Overview
    overview_text = (
        "<b>Executive Summary:</b> DriveLearn India is an end-to-end multi-portal motor driving academy "
        "ecosystem built for Maharashtra RTO jurisdictions (Pune MH-12, Mumbai MH-02, Nagpur MH-31, Nashik MH-15, Thane MH-04). "
        "The architecture unifies five dedicated role-based portals, resolving real-world logistical pain points such as "
        "dual-control car telemetry, monsoon weather delays, zero-phone-tag transit pickups, and official Form 5 certification."
    )
    story.append(Paragraph(overview_text, body_style))
    story.append(Spacer(1, 10))

    # Master Ecosystem Diagram
    story.append(Paragraph("Platform Ecosystem & Role Interconnection Architecture", h2_style))
    
    ecosystem_diag = """
+---------------------------------------------------------------------------------------------------+
|                                  DRIVELEARN STATE PLATFORM CLOUD                                  |
+---------------------------------+---------------------------------+-------------------------------+
                 |                                                  |
                 v                                                  v
     [ 1. PUBLIC WEBSITE ]                                 [ 5. SUPER ADMIN ]
      * School Search & GPS                                 * RTO Compliance Desk
      * Subsidized Rs.999 Offer                             * School Licensing Verification
      * Parivahan RTO Mock Test                             * Platform Wallet Subsidies
                 |
                 +--------------------------+
                 | Instant Student Onboard  |
                 v                          v
     [ 2. LEARNER HUB ]                            [ 3. INSTRUCTOR COCKPIT ]
      * Real-Time Dashboard                         * 45-Min In-Cockpit Console
      * Explore Courses & Schools                   * Live Dual-Control Drills
      * Interactive Slot Booking                    * Monsoon Rain Delay Broadcaster
      * Safety Shield (WhatsApp SOS)                * Student Skill Sign-Offs
      * CMVR Form 5 Passing Cert                    * Transit Landmark Pickups
                 ^                                                  ^
                 |                     Fleet & Roster               |
                 +------------------ [ 4. SCHOOL OWNER ] -----------+
                                      * Fleet Maintenance & RC Ledger
                                      * Fuel / CNG Operational Audit
                                      * Instructor Payroll & Batches
                                      * Form 5 Generation & Revenue
+---------------------------------------------------------------------------------------------------+
"""
    diag_box = Table(
        [[Paragraph(f"<pre>{ecosystem_diag.strip()}</pre>", diag_text)]],
        colWidths=[515]
    )
    diag_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(diag_box)
    story.append(Spacer(1, 14))

    # Helper function for sections
    def make_section(title, flow_diag, features_list):
        elements = []
        elements.append(Paragraph(title, h1_style))
        elements.append(HRFlowable(width="100%", thickness=0.75, color=c_border, spaceBefore=2, spaceAfter=8))
        
        # Diagram
        diag_t = Table(
            [[Paragraph(f"<b>Operational User Journey Flow:</b><br/><pre>{flow_diag.strip()}</pre>", diag_text)]],
            colWidths=[515]
        )
        diag_t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
            ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#CBD5E1")),
            ('PADDING', (0,0), (-1,-1), 6),
        ]))
        elements.append(diag_t)
        elements.append(Spacer(1, 8))

        # Features Table
        tbl_data = [[
            Paragraph("Module / Feature", tbl_header),
            Paragraph("Route / Component", tbl_header),
            Paragraph("One-Line Technical & Operational Purpose", tbl_header)
        ]]
        
        for item in features_list:
            tbl_data.append([
                Paragraph(item[0], tbl_cell_bold),
                Paragraph(item[1], tbl_cell),
                Paragraph(item[2], tbl_cell)
            ])

        ft_table = Table(tbl_data, colWidths=[125, 115, 275])
        ft_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), c_primary),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ('LEFTPADDING', (0,0), (-1,-1), 5),
            ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ]))
        elements.append(ft_table)
        elements.append(Spacer(1, 14))
        return elements

    # 1. Public Website
    flow_pub = """
[Prospective Student]
      |
      v
+---------------+      +----------------+      +----------------+      +-------------------+
|  Home Banner  | ---> | Find Schools   | ---> | School Profile | ---> | Reserve Package   | ---> [Login / Student Hub]
| (Launch Offer)|      | (GPS & RTO MH) |      | (Fleet & Revs) |      | (Apply Rs.15 Bonus)|
+---------------+      +----------------+      +----------------+      +-------------------+
"""
    feat_pub = [
        ("Landing Page", "/ (Home.jsx)", "Showcases Maharashtra subsidized Rs.999 launch, pass rates, and safety guarantees."),
        ("Find Driving Schools", "/find-school", "Geo-filtered directory searching RTO-certified schools with city and GPS radius filters."),
        ("School Dossier Profile", "/schools/:id", "Comprehensive school profile with RTO license, dual-brake fleet, and verified reviews."),
        ("Courses & Pricing", "/pricing", "Transparent fee cards comparing 2-Wheeler (MCWG), 4-Wheeler (LMV), and Combo tracks."),
        ("Parivahan Mock Test", "RTOQuiz.jsx", "Interactive 15-question road sign and traffic simulator with immediate score results."),
        ("Launch Offers & Terms", "/terms-and-offers", "Full terms of introductory Rs.15 wallet bonuses, student safety rules, and cancellations."),
        ("Authentication Gateway", "/login, /signup", "Role-based authentication routing users directly to their designated dashboard.")
    ]
    story.extend(make_section("1. Public Website & Discovery Portal", flow_pub, feat_pub))

    # Page Break for clean layout
    story.append(PageBreak())

    # 2. Learner Hub Portal
    flow_lrn = """
[Enrolled Student]
      |
      v
+------------------+      +-------------------+      +------------------+      +--------------------+
| Real-Time Hub    | ---> | Courses & Schools | ---> | Book Lesson      | ---> | RTO Exam Prep      | ---> [Form 5 License]
| (Monsoon Alerts) |      | (Explore & Enroll)|      | (Landmark Pickup)|      | (Parivahan Sarathi)|
+------------------+      +-------------------+      +------------------+      +--------------------+
"""
    feat_lrn = [
        ("Learner Dashboard", "/learner/dashboard", "Central cockpit displaying current drive, monsoon rain delay alerts, and trainer remarks."),
        ("Courses & Schools Hub", "/learner/courses", "Native course discovery page allowing students to explore, compare, and enroll in new tracks."),
        ("Course Enrollment Modal", "CourseEnrollModal.jsx", "Package reservation modal prefilled with Parivahan LL data, batch timing, and wallet bonus."),
        ("My Practical Bookings", "/learner/bookings", "Complete schedule table to view upcoming drives, reschedule conflicts, or cancel slots."),
        ("Interactive Slot Booking", "BookLessonModal.jsx", "1-click modal to book next practical lesson with verified landmark pickup selection."),
        ("Curriculum Progress", "/learner/progress", "Visual step-by-step milestone stepper tracking student progress from basics to permanent DL."),
        ("RTO Mock Exam Portal", "/learner/rto-mock-test", "Complete exam portal with question palette, review flags, and pass/fail analysis."),
        ("In-App Wallet", "/learner/wallet", "Displays current balance, introductory credit deposit, and course payment histories."),
        ("Form 5 Certificate", "/learner/certificates", "Official motor training certificate under CMVR Rule 27 with QR code and PDF download."),
        ("Family Safety Shield", "SafetyShieldCard.jsx", "1-click WhatsApp emergency trigger sharing live location, car number, and trainer details.")
    ]
    story.extend(make_section("2. Learner Hub Portal (/learner)", flow_lrn, feat_lrn))

    # 3. Instructor Cockpit Portal
    flow_ins = """
[Certified Instructor]
      |
      v
+------------------+      +-------------------+      +------------------+      +--------------------+
| Today's Schedule | ---> | Transit Landmark  | ---> | Live In-Cockpit  | ---> | Skill Checkpoint   | ---> [Lesson Completed]
| (Student Queue)  |      | (Pillar Pickup)   |      | (45-Min Timer)   |      | (8-Track & Clutch) |
+------------------+      +-------------------+      +------------------+      +--------------------+
"""
    feat_ins = [
        ("Instructor Dashboard", "/instructor/dashboard", "High-level cockpit showing today's teaching load, pass rate metrics, and student alerts."),
        ("Today's Schedule", "/instructor/schedule", "Chronological queue of scheduled sessions with student phone dialer and landmark details."),
        ("In-Cockpit Live Console", "StartLessonModal.jsx", "Real-time 45-min drive console with safety drill checkboxes, remarks, and timer."),
        ("Weather Delay Broadcast", "WeatherBroadcastModal", "Dual-authority monsoon alert tool allowing instructors to broadcast delay warnings."),
        ("Student Skill Roster", "/instructor/students", "Digital skill evaluation matrix grading students on clutch biting, 8-track, and parking."),
        ("Slot Availability Matrix", "/instructor/availability", "Weekly recurring calendar manager to configure open and blocked training slots."),
        ("Trainer Chat Inbox", "/instructor/messages", "Direct messaging channel between instructors, learners, and school management.")
    ]
    story.extend(make_section("3. Instructor Cockpit Portal (/instructor)", flow_ins, feat_ins))

    # Page Break
    story.append(PageBreak())

    # 4. School Owner Portal
    flow_own = """
[Driving School Owner]
      |
      v
+------------------+      +-------------------+      +------------------+      +--------------------+
| Fleet Operations | ---> | Vehicle Dossier   | ---> | Student KYC      | ---> | Fuel / CNG Ledger  | ---> [Revenue & P&L]
| (Dual-Control)   |      | (RC, RTO Fitness) |      | (Sarathi LL Form)|      | (KM / Liter Audit) |
+------------------+      +-------------------+      +------------------+      +--------------------+
"""
    feat_own = [
        ("Owner Overview", "/owner/dashboard", "High-level overview showing active learners, fleet health, monthly revenue, and weather controls."),
        ("Fleet & Vehicle Registry", "/owner/vehicles", "Registry tracking dual-control status, insurance expiry, and fitness certification."),
        ("Vehicle Dossier Modal", "VehicleDetailModal.jsx", "Printable vehicle compliance dossier with RC, chassis, dual-brake cert, and ledger."),
        ("Student Admissions", "/owner/students", "Enrollment registry tracking batch assignments, fees paid, and Parivahan Form 2 documents."),
        ("Instructor Management", "/owner/instructors", "Staff manager overseeing instructor salaries, assigned training cars, and ratings."),
        ("Course Builder", "/owner/courses", "Interface to create and edit subsidized 2-wheeler, 4-wheeler, and combo packages."),
        ("Operational Bookings", "/owner/bookings", "Fleet-wide calendar showing all live slots across grounds and transit pickup gates."),
        ("Fuel & Financial Ledger", "/owner/payments", "Financial system featuring a vehicle-by-vehicle fuel/CNG expense and efficiency audit."),
        ("SaaS Platform Billing", "/owner/subscription", "Manages the school's DriveLearn platform subscription plan, limits, and renewal dates."),
        ("Student Reviews Desk", "/owner/reviews", "Review moderation center allowing owners to monitor and reply to student feedback.")
    ]
    story.extend(make_section("4. School Owner Operations Portal (/owner)", flow_own, feat_own))

    # 5. Super Admin Portal
    flow_adm = """
[RTO Transport Regulator / Super Admin]
      |
      v
+------------------+      +-------------------+      +------------------+      +--------------------+
| Statewide State  | ---> | School Inspection | ---> | Wallet Subsidies | ---> | Audit Trail        | ---> [Dispute Closure]
| (5 Districts)    |      | (License Verify)  |      | (Rs.15 Launch)   |      | (Immutable Logs)   |
+------------------+      +-------------------+      +------------------+      +--------------------+
"""
    feat_adm = [
        ("State Command Center", "/admin/dashboard", "Statewide analytics tracking verified schools, registered learners, and platform revenue."),
        ("RTO Verification Desk", "/admin/verification", "Document inspection queue to verify and approve school licenses and dual-control certs."),
        ("Driving Schools List", "/admin/schools", "Full registry of driving schools across Maharashtra with operational status toggles."),
        ("Regional Coverage Hubs", "/admin/locations", "District management configuring Pune, Mumbai, Nagpur, Nashik, and Thane training zones."),
        ("Wallet & Subsidy Rules", "/admin/offers", "Central administration managing Rs.15 signup wallet credits and state launch discounts."),
        ("SaaS Subscriptions", "/admin/subscriptions", "Revenue engine tracking subscription tiers and payment status across all school owners."),
        ("Support & Disputes", "/admin/support", "Ticketing desk resolving student refund requests, trainer complaints, and RTO slot issues."),
        ("Compliance Audit Trail", "/admin/audit-log", "Immutable tamper-proof log recording all license approvals, payouts, and system edits.")
    ]
    story.extend(make_section("5. Super Admin Governance Portal (/admin)", flow_adm, feat_adm))

    # Page Break
    story.append(PageBreak())

    # 6. Real-World Engineering & Safety Innovations
    story.append(Paragraph("6. Hyper-Local Engineering & Real-World Safety Innovations", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=c_border, spaceBefore=2, spaceAfter=8))
    
    innovations = [
        ("Zero-Phone-Tag Transit Pickups (pickupLandmarks.js)", 
         "Solves the primary real-world friction of students and trainers missing each other by enforcing verified metro pillar and ground gate landmarks (e.g. Garware College Metro Pillar 42, Warje 8-Track Gate 1)."),
        ("Dual-Authority Monsoon Rain Delay System (weatherAlertState.js)", 
         "Addresses seasonal Maharashtra flooding by empowering both instructors and owners to trigger a real-time rain delay broadcast, giving learners 1-click slot adjustments without penalty."),
        ("Digital In-Cockpit Console (StartLessonModal.jsx)", 
         "Replaces paper punch cards with an active 45-minute cockpit timer, student Parivahan Sarathi LL verification badge, 5 mandatory drill checkboxes (helmet, clutch, 8-track), and instructor notes."),
        ("Family Reassurance Safety Shield (SafetyShieldCard.jsx)", 
         "Tailored for female and first-time learners, providing a single-tap WhatsApp broadcast transmitting instructor name, vehicle registration number, and live training ground location to parents."),
        ("Parivahan Sarathi Regulatory Alignment", 
         "Fully synchronized with Central Motor Vehicles Rules (CMVR 1989), supporting Form 2 learner license verification, simulated 8-track maneuvers, and official Form 5 completion certificates.")
    ]

    for title, desc in innovations:
        story.append(Paragraph(f"<b>• {title}</b>", ParagraphStyle('InnoTitle', fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=c_primary)))
        story.append(Paragraph(desc, ParagraphStyle('InnoDesc', fontName='Helvetica', fontSize=8.5, leading=12, textColor=c_slate, spaceAfter=8)))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated: {filename}")

if __name__ == "__main__":
    build_pdf()
