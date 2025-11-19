
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

const CookiesPolicyPage: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
        <div className="animate-fadeIn max-w-4xl mx-auto text-text-secondary">
            {/* Summary Section */}
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                COOKIES POLICY: <span className="text-neon-surge">TACTICAL DATA POINTS</span>
            </h1>
            <p className="text-text-secondary text-lg text-center mt-4 font-bold">
                Directive: We only use data to fortify security and enhance your tactical advantage. No unnecessary tracking.
            </p>

            <div className="mt-8 mb-10 p-6 md:p-8 bg-gradient-to-br from-foundation-light to-[#0c0c0e] border border-neon-surge/20 rounded-xl space-y-5 font-rajdhani shadow-neon-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-surge/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.Cookie className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                         <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">TACTICAL NECESSITY</h3>
                        <p className="text-sm leading-relaxed">We use cookies to run a secure, efficient, and compliant platform. They are essential for session integrity, security, and performance.</p>
                    </div>
                </div>

                 <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.Settings className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">ABSOLUTE CONTROL</h3>
                        <p className="text-sm leading-relaxed">We classify cookies by function. You have granular control to accept or reject optional cookies via our consent manager.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                         <Icons.Lock className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                         <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">SECURITY MANDATE</h3>
                        <p className="text-sm leading-relaxed">Strictly Necessary cookies are mandatory for security and core functionality, like login sessions. Disabling these breaks the service.</p>
                    </div>
                </div>

                 <div className="flex items-start gap-4 relative z-10">
                     <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.FileCheck className="h-6 w-6 text-neon-surge" />
                    </div>
                     <div>
                         <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">TRANSPARENCY</h3>
                        <p className="text-sm leading-relaxed">Total transparency is our code. This policy details every aspect of how we handle your session data.</p>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <Button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    variant="ghost" 
                    className="h-12 px-8 border border-[#333] hover:border-neon-surge hover:bg-neon-surge/10 font-orbitron uppercase tracking-wider text-sm transition-all duration-300 w-full sm:w-auto"
                >
                    {isExpanded ? 'Hide Full Policy' : 'View Full Policy'}
                    <Icons.ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </Button>
            </div>
            
             {/* Full Policy Section (Collapsible) */}
            <div className={`policy-content-wrapper ${isExpanded ? 'expanded' : ''}`}>
                <div className="policy-content">
                    <div className="mt-12 space-y-8 text-sm leading-relaxed border-t border-[#333] pt-10">
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">1. INFORMATION ABOUT OUR USE OF COOKIES</h2>
                            <p>We use cookies on this website to differentiate you from other users and enhance your browsing experience. This is a requirement for maintaining session integrity, processing transactions, and ensuring compliance with regulatory mandates (GDPR, MiCA, CCPA). For additional information about how we manage personal data, including the use of XAI and VASP data, please refer to our Privacy Policy.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">2. WHAT ARE COOKIES?</h2>
                            <p>Cookies are small text files that a website stores on your computer or mobile device when you visit. These files may contain a unique identifier to distinguish your device from others. In this notice, the term "cookies" includes both traditional website cookies and similar technologies that collect information automatically when you visit our site, such as pixel tags and web beacons, which are essential for web service and security integrity.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">3. SOURCES AND TYPES OF COOKIES</h2>
                            <p>Cookies are categorized based on placement and duration:</p>
                             <div className="mt-4 space-y-3">
                                <div>
                                    <h3 className="font-bold text-text-primary">3.1. Classification by Source</h3>
                                     <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                        <li><strong className="text-text-primary">First-Party Cookies:</strong> Set by us (ZapWay) and the information collected is received by us. These are primarily used for site functionality, login state, and security integrity.</li>
                                        <li><strong className="text-text-primary">Third-Party Cookies:</strong> Set by external partners we work with (e.g., analytics providers, advertising networks). They may collect data about your use of our website and other online activities across different platforms. These third parties manage their own data under their respective privacy policies.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">3.2. Classification by Duration</h3>
                                     <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                        <li><strong className="text-text-primary">Persistent Cookies:</strong> These cookies remain on your device between browsing sessions and help remember your preferences or activities across websites. They may be used for purposes such as saving your settings or targeting advertising. They remain until their expiration date or manual deletion.</li>
                                        <li><strong className="text-text-primary">Session Cookies:</strong> These cookies are temporary and are deleted when you close your browser. They are critical for security and system efficiency, helping to manage your real-time session, ensuring consistent display, and verifying non-bot activity.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">4. COOKIE CATEGORIES AND PURPOSE</h2>
                            <p>In compliance with GDPR Article 32 and CCPA, we classify the cookies we deploy based on their necessity and function:</p>
                            <div className="mt-4 overflow-x-auto">
                                <table className="w-full text-left font-jetbrains-mono border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-neon-surge">
                                            <th className="p-3 text-xs text-white uppercase tracking-wider">Category</th>
                                            <th className="p-3 text-xs text-white uppercase tracking-wider">Purpose and Mandate</th>
                                            <th className="p-3 text-xs text-white uppercase tracking-wider">Necessity for Service</th>
                                            <th className="p-3 text-xs text-white uppercase tracking-wider">Retention Period</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#333]">
                                        <tr className="hover:bg-foundation-light/50">
                                            <td className="p-3 font-bold align-top">Strictly Necessary</td>
                                            <td className="p-3 align-top">Essential for fundamental website operations, security integrity, and session state management (e.g., user authentication, MPC custody handshake, transaction verification).</td>
                                            <td className="p-3 align-top">Mandatory. Cannot be disabled without compromising the Service.</td>
                                            <td className="p-3 align-top">Session to 1 year</td>
                                        </tr>
                                        <tr className="hover:bg-foundation-light/50">
                                            <td className="p-3 font-bold align-top">Performance/Analytics</td>
                                            <td className="p-3 align-top">Measures website performance, load times, and usage patterns. This data is used to optimize our ZK-Rollup proof submission efficiency and API calls.</td>
                                            <td className="p-3 align-top">Opt-in/Legitimate Interest.</td>
                                            <td className="p-3 align-top">Up to 2 years</td>
                                        </tr>
                                        <tr className="hover:bg-foundation-light/50">
                                            <td className="p-3 font-bold align-top">Functionality</td>
                                            <td className="p-3 align-top">Remembers User preferences (e.g., language settings, dark/light mode) to enhance user experience and personalized dashboard views.</td>
                                            <td className="p-3 align-top">Opt-in.</td>
                                            <td className="p-3 align-top">Up to 1 year</td>
                                        </tr>
                                        <tr className="hover:bg-foundation-light/50">
                                            <td className="p-3 font-bold align-top">Targeting/Advertising</td>
                                            <td className="p-3 align-top">Used to build a profile of your interests to show relevant advertisements or promotional content from us or third parties across other sites.</td>
                                            <td className="p-3 align-top">Opt-in/Consent.</td>
                                            <td className="p-3 align-top">Up to 1 year</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">5. USER CONTROL AND YOUR RIGHTS</h2>
                            <p>We are committed to providing you with full control over your data, in alignment with global privacy regulations (GDPR, CCPA/CPRA, etc.).</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                <li><strong className="text-text-primary">Consent Management:</strong> Upon your first visit, you will be presented with a Consent Management Platform (CMP) allowing you to accept or decline cookies by category (excluding Strictly Necessary cookies).</li>
                                <li><strong className="text-text-primary">Withdrawal of Consent:</strong> You have the right to withdraw your consent to the use of optional cookies at any time. This can typically be managed via the privacy settings link in the website footer or within your browser settings.</li>
                                <li><strong className="text-text-primary">Browser Controls:</strong> You can adjust your browser settings to reject or delete cookies. Note that disabling Strictly Necessary cookies will prevent you from accessing secure areas of the ZapWay platform, as we cannot verify your session integrity.</li>
                            </ul>
                        </section>
                        <div className="border-t border-[#333] pt-6 text-xs text-text-tertiary font-jetbrains-mono">
                            <p className="font-bold">Zapway Corp. LTD</p>
                            <p>Integrity is the Code.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookiesPolicyPage;
