// AboutPortal.jsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import About from './About'; 
import './About.css';

export default function AboutPortal({ about, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // trigger slide‑in animation and scroll
    setVisible(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  function handleClose() {
    // slide out, then unmount
    setVisible(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(onClose, 300);
  }

  return createPortal(
    <div className={`about-portal ${visible ? 'visible' : ''}`}>
      <button className="about-portal__close" onClick={handleClose}>
        ← Return
      </button>
      <About about={about} buttonClick={handleClose} />
    </div>,
    document.body
  );
}
