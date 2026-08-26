import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import {
    Star, MapPin, Phone, ShieldCheck, Clock,
    Award, CheckCircle2, User, Wallet, ArrowLeft
} from 'lucide-react';
import './SchoolDetail.css';

// Rich Authentic Maharashtra Schools Data
const SCHOOLS_DATABASE = {
    'school-1': {
        id: 'school-1',
        name: 'Sai Motor & 2-Wheeler Training School',
        tagline: 'RTO-Approved training on Karve Road with specialized 8-track ground practice',
        rating: 4.9,
        reviewCount: 420,
        rtoApprovalNo: 'MH-12/DS/2014/889',
        establishedYear: 2014,
        phone: '+91 98230 45678',
        email: 'saimotors.pune12@gmail.com',
        address: 'Plot 14, Opposite Garware College Metro Station, Karve Road, Kothrud',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411038',
        featuredImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&auto=format&fit=crop&q=80',
        facilities: [
            'Dedicated RTO "8" & "H" ground track practice near Warje',
            'Dual-brake control Swift & WagonR safety cars',
            'Certified women instructors for female students',
            'Parivahan Sarathi Form 2 online filing assistance',
            'Doorstep pickup & drop available in Kothrud, Deccan & Karve Nagar',
        ],
        packages: [
            {
                id: 'pkg-1',
                name: 'Two-Wheeler Complete Course (MCWG / Scooty)',
                duration: '10 Days (45 mins/day)',
                popular: true,
                originalPrice: 1800,
                price: 999,
                walletDiscount: 15,
                features: [
                    'Clutch biting point & gear downshift control',
                    'RTO "8" figure ground test practice without foot down',
                    'Slope stopping & half-clutch hill start',
                    'Live traffic road confidence training on Karve Road',
                    'School bike provided at Alandi Road RTO on test day',
                ],
            },
            {
                id: 'pkg-2',
                name: 'Four-Wheeler Car Training (Swift / WagonR)',
                duration: '15 Days (1 hour/day)',
                popular: false,
                originalPrice: 5500,
                price: 3999,
                walletDiscount: 15,
                features: [
                    'Dual-brake control Maruti Swift / WagonR',
                    'Reverse "S" track & parallel parking between cones',
                    '1 Night driving session & highway overtaking',
                    'Basic bonnet opening, coolant & tyre puncture guide',
                    'Permanent DL test car provided on RTO test day',
                ],
            },
            {
                id: 'pkg-3',
                name: 'Two-Wheeler + Car Super Combo Track',
                duration: '21 Days Total',
                popular: false,
                originalPrice: 7000,
                price: 4499,
                walletDiscount: 15,
                features: [
                    'Full 2-wheeler AND 4-wheeler practical syllabus',
                    'Single RTO slot coordination for both licenses on Sarathi',
                    'Flexible early morning (6:30 AM) or weekend batch options',
                    'Free access to RTO theory mock questions app',
                ],
            },
        ],
        instructors: [
            {
                name: 'Sunita Deshmukh',
                role: 'Senior Instructor (Scooty & EV Specialist)',
                experience: '8+ Years Exp',
                rating: 4.95,
                badge: 'Certified Female Trainer',
            },
            {
                name: 'Sachin Shinde',
                role: 'Head Instructor (4-Wheeler & Highway Specialist)',
                experience: '12+ Years Exp',
                rating: 4.9,
                badge: 'Govt Certified RTO Examiner',
            },
        ],
        reviews: [
            {
                user: 'Pooja Kulkarni',
                date: '2 days ago',
                rating: 5,
                course: 'Scooty & EV Training',
                comment: 'Sunita ma’am taught me how to balance an Activa in just 3 days! She is very patient. The ₹999 launch fee is really helpful for college students.',
            },
            {
                user: 'Aditya Patil',
                date: '1 week ago',
                rating: 5,
                course: 'Two-Wheeler + Car Combo',
                comment: 'Passed my test at Alandi Road RTO on my first try! Sachin sir taught me the exact reference point to turn the steering on the 8-track.',
            },
        ],
    },
    'school-2': {
        id: 'school-2',
        name: 'Apex Rider & Motor Driving Academy',
        tagline: 'Special 8-figure ground training for Mumbai RTO test confidence',
        rating: 4.8,
        reviewCount: 312,
        rtoApprovalNo: 'MH-02/DS/2016/412',
        establishedYear: 2016,
        phone: '+91 99201 88345',
        email: 'apexdriving.mumbai02@gmail.com',
        address: 'Shop 4, Greenfield Heights, Link Road, Andheri West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400053',
        featuredImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&auto=format&fit=crop&q=80',
        facilities: [
            'Dedicated RTO 8-track test practice ground',
            'Dual-brake Swift & i10 training cars',
            'Special Sunday-only working professional batches',
            'Andheri RTO (MH-02) test center support',
        ],
        packages: [
            {
                id: 'pkg-1',
                name: 'Two-Wheeler Rider Course (MCWG)',
                duration: '10 Days',
                popular: true,
                originalPrice: 1800,
                price: 999,
                walletDiscount: 15,
                features: ['Clutch & gear shifting', 'RTO 8 figure test practice', 'Andheri RTO test support'],
            },
            {
                id: 'pkg-2',
                name: 'Four-Wheeler Car Training (LMV)',
                duration: '15 Days',
                popular: false,
                originalPrice: 5800,
                price: 4200,
                walletDiscount: 15,
                features: ['Dual control car', 'City traffic & parking', 'DL test car included'],
            },
        ],
        instructors: [
            {
                name: 'Rohan Mehta',
                role: 'Lead Instructor',
                experience: '10+ Years',
                rating: 4.8,
                badge: 'Mumbai RTO Certified',
            },
        ],
        reviews: [
            {
                user: 'Sneha Rane',
                date: '3 days ago',
                rating: 5,
                course: 'Two-Wheeler Course',
                comment: 'Clean training bikes and very polite trainers. Cleared my test at Andheri RTO smoothly!',
            },
        ],
    },
};

export default function SchoolDetail() {
    const { id } = useParams();
    const school = SCHOOLS_DATABASE[id] || SCHOOLS_DATABASE['school-1'];
    const [selectedPackage, setSelectedPackage] = useState(school.packages[0].id);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const activePkg = school.packages.find((p) => p.id === selectedPackage) || school.packages[0];

    const handleBooking = (e) => {
        e.preventDefault();
        setBookingSuccess(true);
    };

    return (
        <div className="school-detail-page">
            {/* 1. Breadcrumb Bar */}
            <div className="detail-top-nav">
                <div className="container">
                    <Link to="/find-school" className="back-link">
                        <ArrowLeft size={16} />
                        <span>Back to all driving schools in Maharashtra</span>
                    </Link>
                </div>
            </div>

            {/* 2. School Hero Banner */}
            <section className="school-hero-header">
                <div className="container school-hero-grid">
                    <div className="school-hero-info">
                        <div className="hero-tags">
                            <span className="badge-rto-approved">
                                <ShieldCheck size={14} />
                                <span>RTO License: {school.rtoApprovalNo}</span>
                            </span>
                            <span className="badge-est">Est. {school.establishedYear}</span>
                        </div>

                        <h1 className="detail-school-name">{school.name}</h1>
                        <p className="detail-school-tagline">{school.tagline}</p>

                        <div className="school-meta-pills">
                            <div className="rating-pill">
                                <Star size={16} fill="#dc2626" color="#dc2626" />
                                <strong>{school.rating}</strong>
                                <span>({school.reviewCount} verified students)</span>
                            </div>
                            <div className="meta-divider"></div>
                            <div className="location-pill">
                                <MapPin size={16} color="#dc2626" />
                                <span>{school.address}, {school.city} - {school.pincode}</span>
                            </div>
                        </div>
                    </div>

                    <div className="school-hero-img-wrap">
                        <img src={school.featuredImage} alt={school.name} className="school-cover-img" />
                    </div>
                </div>
            </section>

            {/* 3. Main Content */}
            <div className="container detail-content-layout">
                <main className="detail-left-content">
                    {/* Key Facilities */}
                    <section className="detail-section-card">
                        <h3>Training Facilities & Features</h3>
                        <div className="facilities-grid">
                            {school.facilities.map((facility, i) => (
                                <div key={i} className="facility-item">
                                    <CheckCircle2 size={18} color="#16a34a" />
                                    <span>{facility}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Training Packages Selection */}
                    <section className="detail-section-card" id="packages-section">
                        <div className="packages-header">
                            <div>
                                <h3>Select Your Course Package</h3>
                                <p>Special subsidized launch fee for the first 2 months.</p>
                            </div>
                        </div>

                        <div className="packages-list">
                            {school.packages.map((pkg) => {
                                const isSelected = selectedPackage === pkg.id;
                                return (
                                    <div
                                        key={pkg.id}
                                        className={`package-card ${isSelected ? 'selected' : ''}`}
                                        onClick={() => setSelectedPackage(pkg.id)}
                                    >
                                        {pkg.popular && <span className="package-popular-tag">Most Enrolled</span>}

                                        <div className="package-card-header">
                                            <div className="package-title-wrap">
                                                <h4>{pkg.name}</h4>
                                                <span className="package-duration">
                                                    <Clock size={14} /> {pkg.duration}
                                                </span>
                                            </div>
                                            <div className="package-pricing">
                                                <span className="pkg-old-price">₹{pkg.originalPrice}</span>
                                                <span className="pkg-price">₹{pkg.price}</span>
                                            </div>
                                        </div>

                                        <ul className="package-features-list">
                                            {pkg.features.map((feat, idx) => (
                                                <li key={idx}>
                                                    <CheckCircle2 size={15} color="#dc2626" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Certified Instructors */}
                    <section className="detail-section-card">
                        <h3>Certified Instructors</h3>
                        <div className="instructors-grid">
                            {school.instructors.map((inst, i) => (
                                <div key={i} className="instructor-card">
                                    <div className="inst-avatar">
                                        <User size={28} color="#dc2626" />
                                    </div>
                                    <div>
                                        <h4>{inst.name}</h4>
                                        <p className="inst-role">{inst.role}</p>
                                        <div className="inst-meta">
                                            <span>{inst.experience}</span>
                                            <span>•</span>
                                            <span className="inst-badge">{inst.badge}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Real Student Reviews */}
                    <section className="detail-section-card">
                        <h3>Verified Student Reviews</h3>
                        <div className="reviews-list">
                            {school.reviews.map((rev, i) => (
                                <div key={i} className="review-item">
                                    <div className="review-header">
                                        <div>
                                            <strong>{rev.user}</strong>
                                            <span className="review-course-tag">{rev.course}</span>
                                        </div>
                                        <div className="review-stars">
                                            {[...Array(rev.rating)].map((_, idx) => (
                                                <Star key={idx} size={14} fill="#dc2626" color="#dc2626" />
                                            ))}
                                            <span className="review-date">{rev.date}</span>
                                        </div>
                                    </div>
                                    <p className="review-comment">"{rev.comment}"</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Right Sticky Booking Box */}
                <aside className="detail-sidebar-booking">
                    <div className="booking-card">
                        <div className="booking-header">
                            <h3>Reserve Your Batch Timing</h3>
                            <p>No advance payment needed to reserve your slot</p>
                        </div>

                        {bookingSuccess ? (
                            <div className="booking-success-box">
                                <CheckCircle2 size={48} color="#16a34a" />
                                <h4>Slot Reserved Successfully!</h4>
                                <p>
                                    <strong>{school.name}</strong> has received your request and will call/WhatsApp you within 2 hours to confirm your vehicle pickup point and start date.
                                </p>
                                <button onClick={() => setBookingSuccess(false)} className="btn-book-another">
                                    Book Another Slot
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleBooking} className="booking-form">
                                {/* Summary of Selected Package */}
                                <div className="selected-pkg-summary">
                                    <div className="summary-row">
                                        <span>Selected Course:</span>
                                        <strong>{activePkg.name}</strong>
                                    </div>
                                    <div className="summary-row">
                                        <span>Course Fee:</span>
                                        <strong>₹{activePkg.price}</strong>
                                    </div>
                                    <div className="summary-row wallet-discount-row">
                                        <span className="wallet-disc-label">
                                            <Wallet size={14} /> ₹15 Wallet Bonus Applied:
                                        </span>
                                        <strong className="wallet-disc-val">-₹15</strong>
                                    </div>
                                    <div className="summary-total-row">
                                        <span>Pay at Center:</span>
                                        <span className="final-price">₹{activePkg.price - 15}</span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Your Full Name</label>
                                    <input type="text" placeholder="e.g. Rahul Sharma" required className="booking-input" />
                                </div>

                                <div className="form-group">
                                    <label>Mobile Number (For WhatsApp Confirmation)</label>
                                    <input type="tel" placeholder="+91 98765 43210" required className="booking-input" />
                                </div>

                                <div className="form-group">
                                    <label>Preferred Batch Timing</label>
                                    <select className="booking-input">
                                        <option value="morning-early">Early Morning (6:30 AM - 8:00 AM)</option>
                                        <option value="morning-regular">Morning (8:30 AM - 10:30 AM)</option>
                                        <option value="afternoon">Afternoon (12:00 PM - 3:00 PM)</option>
                                        <option value="evening">Evening (5:00 PM - 7:30 PM)</option>
                                        <option value="weekend">Saturday & Sunday Only</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn-confirm-slot">
                                    <span>Reserve Slot & Apply ₹15 Wallet Bonus</span>
                                </button>

                                <p className="booking-guarantee">
                                    <ShieldCheck size={14} /> 100% Free Cancellation before 1st lesson
                                </p>
                            </form>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}
