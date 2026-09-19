import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { X, Clock, IndianRupee, Star, CheckCircle, RotateCw, Maximize2, Minimize2 } from 'lucide-react';
import { ServiceOption } from '../types';
import OptimizedImage from './OptimizedImage';

interface ProductDetailModalProps {
    option: ServiceOption | null;
    serviceImage: string;
    serviceName: string;
    priceIncludes: string[];
    isOpen: boolean;
    onClose: () => void;
    onAdd: () => void;
    isSelected: boolean;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
    option,
    serviceImage,
    serviceName,
    priceIncludes,
    isOpen,
    onClose,
    onAdd,
    isSelected,
    quantity,
    onIncrease,
    onDecrease,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    // Image viewer states
    const [rotation, setRotation] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    // Handle focus trap and body scroll
    useEffect(() => {
        if (isOpen) {
            previousFocusRef.current = document.activeElement as HTMLElement;
            modalRef.current?.focus();
            document.body.style.overflow = 'hidden';
            // Reset states when modal opens
            setRotation(0);
            setIsFullscreen(false);
        } else {
            document.body.style.overflow = '';
            previousFocusRef.current?.focus();
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isFullscreen) {
                    setIsFullscreen(false);
                } else {
                    onClose();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isFullscreen, onClose]);

    if (!isOpen || !option) return null;

    const optionImage = option.image || serviceImage;

    // Rotate image by 90 degrees
    const handleRotate = () => {
        setRotation((prev) => (prev + 90) % 360);
    };

    // Toggle fullscreen
    const handleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // Handle magnifier mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = imageContainerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Position as percentage
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        setCursorPos({ x, y });
        setMagnifierPos({ x: xPercent, y: yPercent });
    };

    // Generate description
    const getDescription = (): string => {
        if (option.description) return option.description;
        return `Professional ${serviceName.toLowerCase()} service for your ${option.name.toLowerCase()}. Our skilled craftsmen use premium materials and techniques to restore and enhance your furniture's natural beauty with a lasting finish.`;
    };

    // Fullscreen Image Viewer using Portal
    const FullscreenViewer = () => {
        if (typeof document === 'undefined') return null;

        return ReactDOM.createPortal(
            <div
                className="fixed inset-0 z-[9999] bg-black flex items-center justify-center animate-fade-in"
                onClick={() => setIsFullscreen(false)}
            >
                <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-[10000]"
                    aria-label="Close fullscreen"
                >
                    <Minimize2 className="w-6 h-6 text-white" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRotate();
                    }}
                    className="absolute top-4 left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-[10000]"
                    aria-label="Rotate image"
                >
                    <RotateCw className="w-6 h-6 text-white" />
                </button>
                <div
                    className="relative w-full h-full flex items-center justify-center p-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={optionImage}
                        alt={option.name}
                        className="max-w-full max-h-full object-contain select-none transition-transform duration-300"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    />
                </div>
            </div>,
            document.body
        );
    };

    const modalContent = (
        <div
            className="fixed inset-0 z-[99999] flex flex-col justify-end md:justify-center md:items-center p-0 md:p-6 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
        >
            {/* Backdrop - Standard dark overlay */}
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Dialog */}
            <div
                ref={modalRef}
                tabIndex={-1}
                className="relative w-full max-h-[85vh] sm:max-h-[88vh] md:max-h-[88vh] md:max-w-lg md:w-full 
               bg-gradient-to-b from-[#FDF8F3] to-[#F5EBE0]
               rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col z-10
               animate-slide-up md:animate-scale-in
               border border-[#D2B48C]/30 overflow-hidden"
            >
                        {/* Header - Teakwood Gradient */}
                        <div className="flex-shrink-0 bg-gradient-to-r from-[#5D3A1A] via-[#8B4513] to-[#A0522D] rounded-t-2xl">
                            <div className="flex items-center justify-between px-4 py-3">
                                <h2
                                    id="product-modal-title"
                                    className="text-lg font-semibold text-[#FDF8F3]"
                                >
                                    {option.name}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="flex items-center justify-center w-9 h-9 rounded-full 
                           bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-150
                           focus:outline-none focus:ring-2 focus:ring-white/50"
                                    aria-label="Close"
                                    type="button"
                                >
                                    <X className="w-5 h-5 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto overscroll-contain">
                            <div className="p-4 space-y-5">
                                {/* Product Image with Magnifier, Rotate & Fullscreen */}
                                <div
                                    ref={imageContainerRef}
                                    className="relative w-full aspect-[4/3] bg-gradient-to-br from-white to-[#FDF8F3] 
                             rounded-xl overflow-hidden border border-[#D2B48C]/30 shadow-inner
                             cursor-crosshair group"
                                    onMouseEnter={() => setShowMagnifier(true)}
                                    onMouseLeave={() => setShowMagnifier(false)}
                                    onMouseMove={handleMouseMove}
                                >
                                    {/* Main Image */}
                                    <div
                                        className="w-full h-full transition-transform duration-300"
                                        style={{ transform: `rotate(${rotation}deg)` }}
                                    >
                                        <OptimizedImage
                                            src={optionImage}
                                            alt={option.name}
                                            width={600}
                                            height={450}
                                            className="w-full h-full object-contain"
                                            loading="eager"
                                            objectFit="contain"
                                        />
                                    </div>

                                    {/* Magnifier Lens */}
                                    {showMagnifier && (
                                        <div
                                            className="absolute w-32 h-32 border-4 border-[#8B4513] rounded-full 
                                 pointer-events-none shadow-xl overflow-hidden"
                                            style={{
                                                left: `${cursorPos.x - 64}px`,
                                                top: `${cursorPos.y - 64}px`,
                                                backgroundImage: `url(${optionImage})`,
                                                backgroundPosition: `${magnifierPos.x}% ${magnifierPos.y}%`,
                                                backgroundSize: '300%',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                        />
                                    )}

                                    {/* Image Controls */}
                                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {/* Rotate Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRotate();
                                            }}
                                            className="w-10 h-10 bg-[#5D3A1A]/90 hover:bg-[#8B4513] rounded-lg 
                                 flex items-center justify-center transition-colors shadow-lg"
                                            aria-label="Rotate image"
                                            type="button"
                                        >
                                            <RotateCw className="w-5 h-5 text-white" />
                                        </button>
                                        {/* Fullscreen Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFullscreen();
                                            }}
                                            className="w-10 h-10 bg-[#5D3A1A]/90 hover:bg-[#8B4513] rounded-lg 
                                 flex items-center justify-center transition-colors shadow-lg"
                                            aria-label="View fullscreen"
                                            type="button"
                                        >
                                            <Maximize2 className="w-5 h-5 text-white" />
                                        </button>
                                    </div>

                                    {/* Magnifier hint */}
                                    <div className="absolute top-3 left-3 px-2 py-1 bg-[#5D3A1A]/80 rounded-md 
                                  text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        Hover to magnify
                                    </div>
                                </div>

                                {/* Pricing and Time Section - Teakwood Theme */}
                                <div className="flex items-center justify-between gap-3 p-4 
                                bg-gradient-to-r from-[#5D3A1A]/10 via-[#8B4513]/10 to-[#D2B48C]/20 
                                rounded-xl border border-[#D2B48C]/30">
                                    {/* Price */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#8B4513] to-[#5D3A1A] rounded-lg 
                                    flex items-center justify-center shadow-md">
                                            <IndianRupee className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#5D3A1A]/70 uppercase tracking-wide">Price</p>
                                            <p className="text-xl font-bold text-[#5D3A1A]">
                                                ₹{option.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Estimated Time */}
                                    {option.estimatedTime && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 bg-gradient-to-br from-[#8B4513] to-[#5D3A1A] rounded-lg 
                                      flex items-center justify-center shadow-md">
                                                <Clock className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#5D3A1A]/70 uppercase tracking-wide">Duration</p>
                                                <p className="text-lg font-semibold text-[#5D3A1A]">
                                                    {option.estimatedTime}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Rating */}
                                    {option.rating && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg 
                                      flex items-center justify-center shadow-md">
                                                <Star className="w-5 h-5 text-white fill-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#5D3A1A]/70 uppercase tracking-wide">Rating</p>
                                                <p className="text-lg font-semibold text-[#5D3A1A]">
                                                    {option.rating}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Description Section */}
                                <div className="space-y-2 p-4 bg-white/50 rounded-xl border border-[#D2B48C]/20">
                                    <h3 className="text-sm font-semibold text-[#5D3A1A] uppercase tracking-wide">
                                        About this service
                                    </h3>
                                    <p className="text-sm text-[#5D3A1A]/80 leading-relaxed">
                                        {getDescription()}
                                    </p>
                                </div>

                                {/* What's Included Section */}
                                <div className="space-y-3 p-4 bg-white/50 rounded-xl border border-[#D2B48C]/20">
                                    <h3 className="text-sm font-semibold text-[#5D3A1A] uppercase tracking-wide">
                                        What's included
                                    </h3>
                                    <div className="space-y-2">
                                        {priceIncludes.slice(0, 5).map((item, index) => (
                                            <div key={index} className="flex items-start gap-2.5">
                                                <CheckCircle className="w-4 h-4 text-[#8B4513] flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-[#5D3A1A]/80">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer - Teakwood Button */}
                        <div className="flex-shrink-0 bg-gradient-to-t from-[#F5EBE0] to-[#FDF8F3] 
                            border-t border-[#D2B48C]/30 px-4 py-3.5 pb-6 md:pb-4 rounded-b-3xl md:rounded-b-2xl shadow-inner">
                            {!isSelected ? (
                                <button
                                    onClick={() => {
                                        onAdd();
                                        onClose();
                                    }}
                                    className="w-full px-6 py-3.5 bg-gradient-to-r from-[#5D3A1A] via-[#8B4513] to-[#A0522D]
                             text-white font-semibold rounded-xl shadow-lg
                             hover:from-[#8B4513] hover:via-[#A0522D] hover:to-[#CD853F]
                             active:scale-[0.98] transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2"
                                    type="button"
                                >
                                    Add to Cart - ₹{option.price.toLocaleString()}
                                </button>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-[#5D3A1A]">
                                        Added to cart
                                    </span>
                                    <div className="flex items-center gap-3 border-2 border-[#8B4513] rounded-xl px-4 py-2 
                                  bg-white/70 shadow-sm">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDecrease();
                                            }}
                                            className="text-[#5D3A1A] font-bold text-xl w-8 h-8 
                                 flex items-center justify-center hover:bg-[#D2B48C]/30 rounded-lg transition-colors"
                                            aria-label="Decrease quantity"
                                            type="button"
                                        >
                                            -
                                        </button>
                                        <span className="font-bold text-[#5D3A1A] min-w-[24px] text-center text-lg">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onIncrease();
                                            }}
                                            className="text-[#5D3A1A] font-bold text-xl w-8 h-8
                                 flex items-center justify-center hover:bg-[#D2B48C]/30 rounded-lg transition-colors"
                                            aria-label="Increase quantity"
                                            type="button"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
        </div>
    );

    return (
        <>
            {ReactDOM.createPortal(modalContent, document.body)}
            {/* Fullscreen Viewer */}
            {isFullscreen && <FullscreenViewer />}
        </>
    );
};

export default ProductDetailModal;
