import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, LockKey, Database, Cookie, EyeSlash, CheckCircle } from '@phosphor-icons/react';
import Silk from '../components/Silk';
import PageReveal from '../components/PageReveal';
import './Legal.css';

export default function Privacy() {
    return (
        <>
            <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={1.5} rotation={0} />
            <PageReveal>
                <div className="legal-page-container">
                    <div className="legal-card">
                    <div className="legal-header">
                        <Link to="/" className="legal-back-link">
                            <ArrowLeft size={16} /> Back to Iron Pulse
                        </Link>
                        <h1 className="legal-title">Privacy Policy</h1>
                        <div className="legal-meta">
                            Last Updated: October 14, 2026 • GDPR & Privacy Compliant
                        </div>
                    </div>

                    <div className="legal-callout-info">
                        <h3><ShieldCheck size={20} /> Your Privacy is Non-Negotiable</h3>
                        <p>
                            Iron Pulse was built on the core principle of digital sovereignty. <strong>We do not sell, rent, 
                            monetize, or trade your personal or biometric information with advertisers or data brokers.</strong> Your fitness 
                            data belongs strictly to you.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2><Database size={20} /> 1. Information We Collect</h2>
                        <p>
                            To deliver personalized fitness intelligence, Iron Pulse collects only the information necessary for algorithm execution:
                        </p>
                        <ul>
                            <li><strong>Account Identifiers:</strong> Your email address and username used for authentication and account verification.</li>
                            <li><strong>Physical & Anthropometric Metrics:</strong> Age, height, weight, gender, estimated body fat percentage, and activity levels needed for accurate BMR/TDEE calculations.</li>
                            <li><strong>Cardiovascular & Heart Rate Data:</strong> Average heart rate (BPM), minimum and maximum BPM, and resting heart rate (RHR) entered or recorded during training sessions and rest periods to gauge physical exertion zones.</li>
                            <li><strong>Exercise Types & Movement Activity:</strong> Specific exercise modalities (e.g., Running, Cycling, HIIT, Weightlifting, Swimming, Walking, Calisthenics), workout duration (minutes), perceived intensity levels (1–5), sets, reps, and dietary meal records.</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2><LockKey size={20} /> 2. Security & Storage Architecture</h2>
                        <p>
                            We employ modern industry standards to protect your data at rest and in transit:
                        </p>
                        <ul>
                            <li><strong>Cryptographic Password Hashing:</strong> Passwords are never stored in plaintext; they are salted and hashed using standard BCrypt encryption.</li>
                            <li><strong>HttpOnly Session Security:</strong> Authentication credentials use secure HttpOnly cookies, protecting your session tokens from client-side script interception (XSS).</li>
                            <li><strong>Self-Hosted Infrastructure:</strong> Fonts and visual assets are self-hosted directly within our bundle, eliminating third-party IP address tracking or data leaks.</li>
                            <li><strong>Encrypted Transport:</strong> All API communication between your browser and our backend is encrypted via HTTPS / TLS.</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2><CheckCircle size={20} /> 3. How We Use Your Data</h2>
                        <p>
                            Your information is exclusively utilized to power the core features of Iron Pulse:
                        </p>
                        <ul>
                            <li>Computing personalized macronutrient splits (protein, fats, carbohydrates) based on Mifflin-St Jeor formulas.</li>
                            <li><strong>Predictive ML Algorithms:</strong> Feeding cardiovascular heart rate metrics, exercise modalities, and body composition into our machine learning models to forecast accurate calorie burn and muscle recovery readiness scores.</li>
                            <li>Maintaining streak counters, cardiovascular strain trends, and workout completion logs on your private dashboard.</li>
                            <li><strong>Zero Third-Party Sharing:</strong> Your heart rate, physical activities, and biometric metrics are strictly private. They are never sold, rented, or shared with advertisers, data brokers, or health insurance companies.</li>
                            <li>Sending essential security notices, such as email verification and password reset links.</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2><Cookie size={20} /> 4. Cookies & Client-Side Storage</h2>
                        <p>
                            Iron Pulse uses minimal, privacy-first storage technologies:
                        </p>
                        <ul>
                            <li><strong>Authentication Cookies:</strong> Secure, HttpOnly session cookies used strictly to keep you authenticated across requests.</li>
                            <li><strong>Local Browser Storage:</strong> Used strictly to cache non-sensitive preferences (such as your macro targets and theme settings) for instant offline performance and zero layout flicker.</li>
                            <li><strong>No Tracking Cookies:</strong> We do not deploy third-party advertising cookies, Facebook Pixels, or cross-site tracking beacons.</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2><EyeSlash size={20} /> 5. Your Rights & Data Ownership</h2>
                        <p>
                            Regardless of your physical location, you maintain full control over your personal data:
                        </p>
                        <ul>
                            <li><strong>Access & Correction:</strong> You can view and edit your body metrics, fitness goals, and profile information at any time in your Profile settings.</li>
                            <li><strong>Account Deletion:</strong> You may request full account and data eradication by contacting our support team. Upon deletion, all workout records, dietary logs, and credentials are permanently purged.</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2><ShieldCheck size={20} /> 6. Contact Information</h2>
                        <p>
                            If you have any questions or data requests regarding this Privacy Policy, please reach out to us:
                        </p>
                        <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                            privacy@ironpulse.fitness
                        </p>
                    </div>

                    <div className="legal-footer-nav">
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/signup">Create Account</Link>
                        <Link to="/login">Log In</Link>
                    </div>
                </div>
            </div>
        </PageReveal>
    </>
    );
}
