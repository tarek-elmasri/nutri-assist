import React, { useEffect, useRef, useState } from 'react';
import './accordion.css';

const Accordion: React.FC<React.PropsWithChildren & { title: string }> = ({
  title,
  children
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (panelRef.current && controlRef.current) {
      if (isOpen) {
        controlRef.current.classList.add('active');
        panelRef.current.style.maxHeight = panelRef.current.scrollHeight + 'px';
      } else {
        controlRef.current.classList.remove('active');
        panelRef.current.style.maxHeight = '0';
      }
    }
  }, [isOpen]);

  return (
    <div className="accordion">
      <div
        ref={controlRef}
        className="accordion__control"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{title}</span>
      </div>
      <div ref={panelRef} className="accordion__panel">
        <div className="accordion__panel-content">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
