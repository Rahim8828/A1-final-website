import React, { useState, useRef, useEffect } from 'react';
import { X, Move } from 'lucide-react';

interface DraggablePricingModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const DraggablePricingModal: React.FC<DraggablePricingModalProps> = ({ 
  title, 
  content, 
  onClose 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  // Center modal on mount
  useEffect(() => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2,
      });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.modal-header')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.modal-header')) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
      return () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Draggable Modal */}
      <div
        ref={modalRef}
        className={`fixed z-50 bg-white rounded-3xl shadow-2xl overflow-hidden transition-transform ${
          isDragging ? 'cursor-grabbing scale-105' : 'cursor-default'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '90%',
          maxWidth: '600px',
          transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Header - Draggable Area */}
        <div className="modal-header bg-gradient-to-r from-amber-500 to-orange-600 p-6 cursor-grab active:cursor-grabbing">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Move className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-bold text-white">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-2">Drag to move this modal</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200">
            <p className="text-gray-700 text-lg leading-relaxed">{content}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <a
              href="tel:+918828709945"
              className="flex-1 flex items-center justify-center space-x-2 bg-amber-500 text-white px-6 py-4 rounded-xl hover:bg-amber-600 transition-all duration-300 font-semibold"
            >
              <span>Call for Details</span>
            </a>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default DraggablePricingModal;
