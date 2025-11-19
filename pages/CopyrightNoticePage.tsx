
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

const CopyrightNoticePage: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
        <div className="animate-fadeIn max-w-4xl mx-auto text-text-secondary">
             {/* Summary Section */}
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                INTELLECTUAL PROPERTY: <span className="text-neon-surge">OUR CODE, OUR FORTRESS</span>
            </h1>
            <p className="text-text-secondary text-lg text-center mt-4 font-bold">
                 Copyright © {new Date().getFullYear()} ZapWay Corp. All Rights Reserved. Our innovation is protected.
            </p>

            <div className="mt-8 mb-10 p-6 md:p-8 bg-gradient-to-br from-foundation-light to-[#0c0c0e] border border-neon-surge/20 rounded-xl space-y-5 font-rajdhani shadow-neon-card relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-neon-surge/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.FileText className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">PROPRIETARY ARCHITECTURE</h3>
                        <p className="text-sm leading-relaxed">All ZAP technology, code, branding, and content are the exclusive IP of ZapWay Corp. and are protected by international law.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                     <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                         <Icons.Terminal className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                         <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">TRADEMARK PROTECTION</h3>
                        <p className="text-sm leading-relaxed">"ZAPWAY", "ZAP POINTS", "ZP", and our logos are protected trademarks. Unauthorized use is strictly forbidden.</p>
                    </div>
                </div>

                 <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-warning-high/10 p-2 rounded-lg shrink-0 border border-warning-high/20">
                        <Icons.AlertTriangle className="h-6 w-6 text-warning-high" />
                    </div>
                    <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">ZERO TOLERANCE</h3>
                        <p className="text-sm leading-relaxed">Any attempt to copy, reverse-engineer, or misuse our IP will be met with swift legal action. Our code is our fortress.</p>
                    </div>
                </div>
            </div>
            
            <div className="text-center">
                <Button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    variant="ghost" 
                    className="h-12 px-8 border border-[#333] hover:border-neon-surge hover:bg-neon-surge/10 font-orbitron uppercase tracking-wider text-sm transition-all duration-300 w-full sm:w-auto"
                >
                    {isExpanded ? 'Hide Full Notice' : 'View Full Notice'}
                    <Icons.ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </Button>
            </div>
            
             {/* Full Policy Section (Collapsible) */}
            <div className={`policy-content-wrapper ${isExpanded ? 'expanded' : ''}`}>
                <div className="policy-content">
                    <div className="mt-12 space-y-8 text-sm leading-relaxed border-t border-[#333] pt-10">
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">1. COPYRIGHT OWNERSHIP</h2>
                            <p>All content, code, documentation, graphics, logos, designs, architecture, and technology, including but not limited to the Zap Rewards Protocol, the Protocol Scoreboard, the ZK-Rollup Integration methodology, and all related software source code (collectively, the "Proprietary Material"), are the exclusive property of ZapWay Corp., unless otherwise explicitly stated.</p>
                            <p className="mt-2">This Proprietary Material is protected by international copyright laws and treaties. Unauthorized reproduction, distribution, public display, or modification of this material is strictly prohibited and constitutes an infringement of ZapWay Corp.'s rights.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">2. TRADEMARKS</h2>
                            <p><strong className="text-text-primary">ZAPWAY®, ZAP POINTS™, ZP™,</strong> and the associated Zap logo and stylized names are registered or unregistered trademarks and service marks of ZapWay Corp.</p>
                            <p className="mt-2">The use of any ZapWay Corp. trademark or service mark without the express written permission of ZapWay Corp. is strictly prohibited. You may not use any of these trademarks in connection with any product or service that is not ZapWay Corp.'s or in any manner that is likely to cause confusion among customers or that disparages or discredits ZapWay Corp.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">3. RESERVATION OF RIGHTS</h2>
                            <p>ZapWay Corp. reserves all rights not expressly granted in and to the Proprietary Material and the trademarks. No license or right under any copyright, patent, trademark, or other intellectual property right of ZapWay Corp. or any third party is granted or conferred by the unauthorized use of any material within this domain or application.</p>
                            <p className="mt-2">Any attempt to reverse-engineer, decompile, or otherwise access the proprietary source code of the ZapWay Protocol without a signed institutional agreement is a direct violation of this notice.</p>
                        </section>
                        <div className="border-t border-[#333] pt-6 mt-12 text-xs text-text-tertiary font-jetbrains-mono">
                            <p className="font-bold">For inquiries regarding intellectual property licensing or permissions, please contact:</p>
                            <a href="mailto:compliance@zapway.gg" className="text-neon-surge hover:underline">compliance@zapway.gg</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CopyrightNoticePage;
