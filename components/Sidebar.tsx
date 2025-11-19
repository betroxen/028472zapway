
import React, { useContext, useState } from 'react';
import { Icons } from './icons';
import { AppContext } from '../context/AppContext';
import { sidebarNavItems, SidebarItem } from '../constants/sidebar';
import { Button } from './Button';
import { Input } from './Input';
import { ProgressBar } from './ProgressBar';
import { ZapLogo } from './ZapLogo';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

// --- TOOLTIP COMPONENT ---
const SimpleTooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative flex items-center" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            {show && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 bg-[#1A1A1A] border border-[#333] text-white text-xs rounded whitespace-nowrap z-50 shadow-[0_0_10px_rgba(0,0,0,0.5)] animate-fadeIn font-jetbrains-mono">
                    {text}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-[#333]"></div>
                </div>
            )}
        </div>
    );
};

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
    const appContext = useContext(AppContext);
    const [openGroups, setOpenGroups] = useState<string[]>(['play', 'analyze', 'earn', 'trust', 'command', 'support']);

    const handleNavClick = (e: React.MouseEvent, page: string) => {
        e.preventDefault();
        if (appContext?.setCurrentPage) {
            appContext.setCurrentPage(page);
        }
        setIsMobileOpen(false);
    }

    const toggleGroup = (id: string) => {
        setOpenGroups(prev => 
            prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
        );
    };

    const renderSidebarLink = (item: SidebarItem, isMobile: boolean = false) => {
        const isActive = appContext?.currentPage === item.title;
        
        const content = (
            <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.title)}
                className={`group relative flex items-center gap-3 transition-all duration-300 ease-out overflow-hidden rounded-r-lg
                ${isCollapsed && !isMobile
                    ? 'justify-center w-10 h-10 p-0 mx-auto rounded-lg' 
                    : 'px-4 py-3 w-full'
                }
                ${isActive 
                    ? 'text-white bg-gradient-to-r from-neon-surge/10 to-transparent' 
                    : 'text-[#8d8c9e] hover:text-white hover:bg-white/5'
                }`}
            >
                {/* Cyber-Swipe Active Border Effect */}
                {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-neon-surge shadow-[0_0_15px_#00FFC0] animate-pulse"></div>
                )}
                
                <item.icon 
                    className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110 text-neon-surge' : 'group-hover:scale-110 group-hover:text-neon-surge'}`} 
                    aria-hidden="true" 
                />
                
                {(!isCollapsed || isMobile) && (
                    <>
                        <span className={`text-sm tracking-wide transition-all duration-300 ${isActive ? 'font-bold text-shadow-neon transform translate-x-1' : 'font-medium'}`}>
                            {item.title}
                        </span>
                        {item.badge && (
                            <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider border ${isActive ? 'bg-neon-surge text-black border-neon-surge' : 'bg-transparent text-neon-surge border-neon-surge/30'}`}>
                                {item.badge}
                            </span>
                        )}
                    </>
                )}
            </a>
        );

        if (isCollapsed && !isMobile && item.tooltip) {
            return <SimpleTooltip key={item.title} text={item.tooltip}>{content}</SimpleTooltip>;
        }

        return <div key={item.title}>{content}</div>;
    };


    // Mobile-specific Pilot Summary
    const MobilePilotSummary = () => (
        <div className="p-6 bg-[#0c0c0e] border-b border-[#333]">
             <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                    <img
                    src="https://placehold.co/56x56/00FFC0/000000?text=DG"
                    alt="Profile"
                    className="h-14 w-14 rounded-xl border border-[#333] shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    />
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#08F7D0] rounded-full border-4 border-[#0c0c0e]"></div>
                </div>
                <div>
                    <div className="font-orbitron text-white uppercase text-sm tracking-wider font-bold">DegenGambler</div>
                    <div className="text-[10px] font-jetbrains-mono text-[#08F7D0] flex items-center gap-2 mt-1">
                        <Icons.Shield className="h-3 w-3" /> LVL 42 OPERATOR
                    </div>
                </div>
            </div>
            <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] font-jetbrains-mono text-[#666] uppercase">
                    <span>XP TO NEXT LEVEL</span>
                    <span className="text-white">4,250 / 5,000</span>
                </div>
                <ProgressBar progress={85} className="h-1 bg-[#1A1A1A]" />
            </div>

             <Button 
                onClick={() => { appContext?.openReviewModal(); setIsMobileOpen(false); }} 
                className="w-full flex items-center justify-center gap-2 font-orbitron uppercase tracking-wider text-xs bg-neon-surge text-black hover:bg-white shadow-neon-glow-sm"
            >
                <Icons.Edit className="h-4 w-4" /> WRITE VPR REPORT
            </Button>
        </div>
    );

    return (
    <>
      {/* === MOBILE DRAWER === */}
      <div 
        className={`fixed inset-0 top-16 z-[80] bg-black/90 backdrop-blur-md md:hidden transition-opacity duration-300 ease-in-out ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsMobileOpen(false)} 
        aria-hidden="true" 
      />

      <div className={`fixed left-0 top-16 bottom-0 z-[90] w-[85vw] max-w-[320px] md:hidden transform transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="h-full flex flex-col bg-[#050505] border-r border-neon-surge/20 shadow-2xl">

             <div className="shrink-0">
                 {appContext?.isLoggedIn && <MobilePilotSummary />}
             </div>

             <div className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3 space-y-2">
                {sidebarNavItems.map((group) => {
                    const isOpen = openGroups.includes(group.id);
                    return (
                        <div key={group.id} className="border-b border-[#222] last:border-0 pb-2">
                             <button 
                                onClick={() => toggleGroup(group.id)}
                                className="w-full flex items-center justify-between py-3 px-2 group text-left focus:outline-none"
                            >
                                 <h3 className={`font-orbitron text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-colors ${isOpen ? 'text-neon-surge' : 'text-text-tertiary group-hover:text-white'}`}>
                                     <group.icon className={`h-4 w-4 ${isOpen ? 'text-neon-surge' : 'text-[#444] group-hover:text-white'}`} /> 
                                     {group.label}
                                </h3>
                                <Icons.ChevronDown className={`h-4 w-4 text-[#444] transition-transform duration-300 ${isOpen ? 'rotate-180 text-neon-surge' : 'group-hover:text-white'}`} />
                            </button>
                            
                             <div 
                                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                            >
                                 <div className="overflow-hidden">
                                    <div className="flex flex-col gap-1 pl-4 border-l border-[#222] ml-2 mb-2">
                                        {group.items.map((item) => renderSidebarLink(item, true))}
                                    </div>
                                 </div>
                            </div>
                        </div>
                    );
                })}
             </div>

             <div className="shrink-0 p-4 border-t border-[#333] bg-[#0A0A0F] pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <Button
                    variant="ghost"
                    className="w-full font-orbitron uppercase text-xs tracking-wider text-[#8d8c9e] hover:text-white border border-[#333] hover:bg-[#1A1A1A] h-12"
                    onClick={() => setIsMobileOpen(false)}
                >
                    <Icons.X className="h-4 w-4 mr-2" /> CLOSE TERMINAL
                </Button>
             </div>
         </div>
      </div>

      {/* === DESKTOP SIDEBAR === */}
      <aside 
        className={`hidden md:flex fixed left-0 top-0 bottom-0 flex-col flex-shrink-0 border-r border-[#333] bg-[#050505] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] z-40
        ${isCollapsed ? 'w-[72px]' : 'w-[256px]'}`}
      >
        <div className="flex items-center h-16 shrink-0 px-4 border-b border-[#333] bg-[#080808]">
          <button onClick={() => appContext?.setCurrentPage('Dashboard')} className={`flex items-center gap-3 group w-full ${isCollapsed ? 'justify-center' : ''}`}>
            <ZapLogo iconClassName="h-6 w-6" className="p-1.5 rounded-lg"/>
            {!isCollapsed && <span className="font-orbitron text-xl font-bold text-white tracking-wider group-hover:text-neon-surge transition-colors">ZAP</span>}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-3 space-y-2">
            {!isCollapsed && (
                <div className="mb-6 px-2">
                     <div className="relative group">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666] h-4 w-4 group-focus-within:text-neon-surge transition-colors" />
                        <Input placeholder="SEARCH INTEL..." className="pl-9 bg-[#111] border-[#333] text-xs font-jetbrains-mono h-10 rounded-md focus:border-neon-surge transition-all placeholder:text-[#444]" />
                    </div>
                </div>
            )}
             {isCollapsed && (
                <div className="flex justify-center mb-6">
                    <button className="w-10 h-10 flex items-center justify-center text-[#8d8c9e] hover:text-white bg-[#111] rounded-lg border border-[#333] hover:border-neon-surge transition-all group">
                         <Icons.Search className="h-4 w-4 group-hover:text-neon-surge" />
                    </button>
                </div>
            )}

            {sidebarNavItems.map((group) => {
                const isOpen = openGroups.includes(group.id);
                
                // Collapsed View: Just show items directly, grouped visually by spacing
                if (isCollapsed) {
                    return (
                        <div key={group.id} className="mb-4 flex flex-col gap-2 border-b border-[#222] pb-4 last:border-0">
                             {group.items.map((item) => renderSidebarLink(item))}
                        </div>
                    );
                }

                // Expanded View: Accordion
                return (
                    <div key={group.id} className="mb-1">
                         <button
                            onClick={() => toggleGroup(group.id)}
                            className="flex items-center justify-between w-full text-[#666] hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/5 group"
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-jetbrains-mono text-[10px] uppercase tracking-[0.2em] group-hover:text-neon-surge transition-colors">
                                    {group.label}
                                </span>
                            </div>
                            <Icons.ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180 text-neon-surge' : 'text-[#444]'}`} />
                        </button>

                        <div 
                            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out`}
                            style={{ maxHeight: isOpen ? '500px' : '0px', opacity: isOpen ? 1 : 0.5 }}
                        >
                             <div className="mt-1 space-y-0.5 pb-2">
                                {group.items.map((item) => renderSidebarLink(item))}
                             </div>
                        </div>
                    </div>
                );
            })}
        </div>

        <div className={`shrink-0 border-t border-[#333] bg-[#080808] p-4 flex ${isCollapsed ? 'justify-center' : 'justify-start'} items-center`}>
             <Button
                variant="ghost"
                size="sm"
                className={`text-[#666] hover:text-white border border-transparent hover:border-[#333] hover:bg-[#111] transition-all h-10 rounded-lg ${isCollapsed ? 'px-0 w-10 flex items-center justify-center' : 'w-full flex items-center justify-between px-4'}`}
                onClick={() => setIsCollapsed(!isCollapsed)}
                title={isCollapsed ? "Expand" : "Collapse"}
            >
                {isCollapsed ? (
                    <Icons.ChevronRight className="h-5 w-5" />
                ) : (
                    <>
                        <span className="font-orbitron uppercase text-xs tracking-wider">COLLAPSE VIEW</span>
                        <Icons.ChevronLeft className="h-4 w-4" />
                    </>
                )}
            </Button>
        </div>
      </aside>
    </>
  );
};
