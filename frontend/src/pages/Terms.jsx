import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldWarning, Cpu, FileText, CheckCircle } from '@phosphor-icons/react';
import Silk from '../components/Silk';
import PageReveal from '../components/PageReveal';
import './Legal.css';

export default function Terms() {
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
                        <h1 className="legal-title">Terms of Service</h1>
                        <div className="legal-meta">
                            Last Updated: October 14, 2026 • Effective Immediately
                        </div>
                    </div>

                    {/* Prominent Medical Disclaimer */}
                    <div className="legal-callout-warning">
                        <h3>
                            <ShieldWarning size={20} /> MEDICAL & HEALTH DISCLAIMER — READ CAREFULLY
                        </h3>
                        <p>
                            Iron Pulse is an AI-powered fitness and nutrition companion intended solely for recreational, 
                            educational, and motivational purposes. <strong>Iron Pulse is not a medical organization or clinical diagnostic device, 
                            and our software does not provide medical advice, cardiac monitoring, diagnosis, or treatment.</strong> Always 
                            consult a licensed physician or healthcare professional before beginning any exercise routine, 
                            strength training program, caloric adjustment, or nutritional plan.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            <strong>Cardiovascular & Heart Rate Telemetry:</strong> Heart rate metrics (BPM, resting heart rate, and cardiovascular zones) 
                            entered into or estimated by Iron Pulse are purely mathematical approximations for training intensity. 
                            Iron Pulse is not an electrocardiogram (ECG) and should never be used to evaluate cardiac health or diagnose arrhythmias. 
                            If you experience dizziness, chest tightness, irregular heartbeats, shortness of breath, or pain during exercise, 
                            cease activity immediately and seek emergency medical attention.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2><CheckCircle size={20} /> 1. Acceptance of Terms</h2>
                        <p>
                            By creating an account, accessing, or using Iron Pulse (the "Service"), you agree to be bound by these 
                            Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you must not use the Service.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2><Cpu size={20} /> 2. AI & Algorithmic Estimations</h2>
                        <p>
                            Iron Pulse incorporates machine learning algorithms and heuristic models for calorie expenditure, 
                            macronutrient distribution, workout recommendations, and muscle recovery scores:
                        </p>
                        <ul>
                            <li><strong>Predictive Models & Heart Rate:</strong> Active caloric burn and recovery readiness scores are generated via machine learning models based on your selected exercise modality (e.g., Running, Cycling, HIIT, Weightlifting, Swimming), workout duration, and cardiovascular heart rate metrics. These are statistical approximations, not clinical metabolic lab tests.</li>
                            <li><strong>Exercise Modality Risk:</strong> Different workout types carry inherent physical risks, including muscular tears, joint damage, or cardiovascular stress. You freely select and execute each exercise discipline at your own discretion.</li>
                            <li>Actual individual metabolic rates, muscle engagement, and recovery timelines vary based on genetics, health conditions, hydration, and sleep.</li>
                            <li>You acknowledge and accept full personal responsibility for your physical training, dietary decisions, and workout intensity.</li>
                        </ul>
                        <div className="legal-callout-info">
                            <h3><Cpu size={18} /> Algorithmic Guidance Notice</h3>
                            <p>
                                Automated AI suggestions should never supersede professional personal trainer guidelines, 
                                registered dietitian meal plans, or medical recommendations.
                            </p>
                        </div>
                    </div>

                    <div className="legal-section">
                        <h2><FileText size={20} /> 3. User Accounts & Security</h2>
                        <p>
                            When registering for Iron Pulse, you agree to:
                        </p>
                        <ul>
                            <li>Provide accurate, current, and complete information regarding your age, body metrics, and email.</li>
                            <li>Maintain the confidentiality of your login credentials and password.</li>
                            <li>Be at least 16 years of age (or the minimum legal age required in your jurisdiction) to use our platform.</li>
                            <li>Notify us immediately if you suspect unauthorized access or compromise of your account.</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2><FileText size={20} /> 4. Acceptable Use Policy</h2>
                        <p>
                            You agree not to misuse the Service. Specifically, you may not:
                        </p>
                        <ul>
                            <li>Reverse-engineer, decompile, or attempt to extract the source code or proprietary ML models of Iron Pulse.</li>
                            <li>Interfere with or disrupt the integrity, performance, or security of our servers and API endpoints.</li>
                            <li>Use automated scrapers, bots, or malicious scripts to query our database or endpoints.</li>
                            <li>Engage in abusive, harassing, or fraudulent behavior through our interactive tools or chatbot.</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2><FileText size={20} /> 5. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by applicable law, Iron Pulse, its developers, and affiliates shall not 
                            be liable for any indirect, incidental, consequential, special, or punitive damages, including without limitation 
                            personal injury, muscle strain, physical illness, loss of data, or goodwill resulting from:
                        </p>
                        <ul>
                            <li>Your access to or inability to access or use the Service.</li>
                            <li>Any physical exercise performed or nutritional plan followed in connection with our suggestions.</li>
                            <li>Any unauthorized access to our secure servers or alteration of your transmissions.</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2><FileText size={20} /> 6. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify or replace these Terms at any time. Continued use of Iron Pulse following any 
                            revisions constitutes acceptance of the modified Terms.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2><FileText size={20} /> 7. Contact Us</h2>
                        <p>
                            If you have questions about these Terms of Service, please contact us at:
                        </p>
                        <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                            support@ironpulse.fitness
                        </p>
                    </div>

                    <div className="legal-footer-nav">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/signup">Create Account</Link>
                        <Link to="/login">Log In</Link>
                    </div>
                </div>
            </div>
        </PageReveal>
    </>
    );
}
