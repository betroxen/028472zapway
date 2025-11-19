
import React, { createContext, useContext, useRef, useLayoutEffect, useState, ReactNode } from 'react';
import { Icons } from './icons';

interface AccordionContextType {
  openValues: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionItemContextType {
    value: string;
    isOpen: boolean;
}
const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

interface AccordionProps {
  children?: ReactNode;
  multiple?: boolean;
  defaultOpen?: string[];
}

export const Accordion: React.FC<AccordionProps> = ({ children, multiple = false, defaultOpen = [] }) => {
  const [openValues, setOpenValues] = useState<string[]>(defaultOpen);

  const toggleItem = (value: string) => {
    setOpenValues(prev => {
      if (multiple) {
        return prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
      } else {
        return prev.includes(value) ? [] : [value];
      }
    });
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggleItem }}>
      {children}
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  children?: ReactNode;
  value: string;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ children, value, className }) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  const isOpen = context.openValues.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div className={className !== undefined ? className : "border-b border-[#333] last:border-b-0"}>
            {children}
        </div>
    </AccordionItemContext.Provider>
  );
};

interface AccordionTriggerProps {
  children?: ReactNode;
  className?: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, className }) => {
  const context = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);
  
  if (!context || !itemContext) {
    throw new Error('AccordionTrigger must be used within an AccordionItem');
  }

  const { value, isOpen } = itemContext;

  return (
    <button
      className={className || "flex w-full items-center justify-between py-4 text-left group transition-colors focus:outline-none"}
      onClick={() => context.toggleItem(value)}
      aria-expanded={isOpen}
    >
      <div className="flex-1">
        {children}
      </div>
      <Icons.ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'} text-neon-surge`} />
    </button>
  );
};

interface AccordionContentProps {
  children?: ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ children, className }) => {
  const itemContext = useContext(AccordionItemContext);
   if (!itemContext) {
    throw new Error('AccordionContent must be used within an AccordionItem');
  }
  const { isOpen } = itemContext;

  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(isOpen ? 'auto' : '0px');

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, children]);

  return (
    <div
      ref={contentRef}
      style={{ height, transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
      className={`overflow-hidden ${className || ''}`}
    >
      {children}
    </div>
  );
};
