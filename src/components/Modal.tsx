import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(4, 5, 8, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
      <div
        className="glass-panel"
        style={{
          width: '90%',
          maxWidth: '640px',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative',
          cursor: 'default',
          animation: 'scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px -10px var(--primary-glow)',
          borderColor: 'var(--card-border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--card-border)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--primary)';
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'var(--card-border)';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          <X size={20} />
        </button>

        <h3
          className="gradient-text"
          style={{
            fontSize: '1.75rem',
            marginBottom: '1.5rem',
            paddingRight: '2rem',
            fontWeight: '700',
          }}
        >
          {title}
        </h3>

        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.975rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
