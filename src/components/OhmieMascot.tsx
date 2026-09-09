import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';

interface OhmieMascotProps {
  mood?: 'happy' | 'cheering' | 'thinking' | 'tip' | 'excited';
  size?: 'sm' | 'md' | 'lg';
  speechText?: string;
  speechTitle?: string;
  className?: string;
}

export const OhmieMascot: React.FC<OhmieMascotProps> = ({
  mood = 'happy',
  size = 'md',
  speechText,
  speechTitle = 'Bé Ohmie mách nhỏ',
  className = '',
}) => {
  const sizeDims = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Cute SVG Character */}
      <div className={`relative shrink-0 ${sizeDims} select-none animate-bounce-gentle`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Subtle Outer Glow */}
          <circle cx="50" cy="52" r="38" fill="#fef08a" opacity="0.4" />

          {/* Body: Warm Golden-Amber Bulb / Cute Electric Drop */}
          <defs>
            <linearGradient id="ohmieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="blushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>

          {/* Lightning Antenna on top */}
          <path
            d="M 50 16 L 46 6 L 53 6 L 49 2 L 57 8 L 52 8 Z"
            fill="#ea580c"
            stroke="#c2410c"
            strokeWidth="1"
          />
          <circle cx="50" cy="18" r="3" fill="#fbbf24" />

          {/* Main Body */}
          <circle cx="50" cy="52" r="34" fill="url(#ohmieGrad)" stroke="#f59e0b" strokeWidth="2.5" />

          {/* Little Resistor Zig-Zag Pattern Belly Stamp */}
          <path
            d="M 40 68 L 44 64 L 48 70 L 52 64 L 56 70 L 60 66"
            fill="none"
            stroke="#b45309"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />

          {/* Rosy Cheeks */}
          <ellipse cx="32" cy="56" rx="5" ry="3.5" fill="url(#blushGrad)" opacity="0.65" />
          <ellipse cx="68" cy="56" rx="5" ry="3.5" fill="url(#blushGrad)" opacity="0.65" />

          {/* Eyes & Expressions */}
          {mood === 'happy' || mood === 'tip' ? (
            <>
              {/* Cute curved happy eyes */}
              <path
                d="M 32 46 Q 38 40 44 46"
                fill="none"
                stroke="#1e293b"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 56 46 Q 62 40 68 46"
                fill="none"
                stroke="#1e293b"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Sweet smile */}
              <path
                d="M 44 54 Q 50 61 56 54"
                fill="none"
                stroke="#1e293b"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </>
          ) : mood === 'cheering' || mood === 'excited' ? (
            <>
              {/* Sparkling star-eyes */}
              <circle cx="37" cy="45" r="4.5" fill="#1e293b" />
              <circle cx="39" cy="43" r="1.5" fill="#ffffff" />
              <circle cx="63" cy="45" r="4.5" fill="#1e293b" />
              <circle cx="65" cy="43" r="1.5" fill="#ffffff" />
              {/* Big open happy mouth */}
              <path
                d="M 43 53 Q 50 65 57 53 Z"
                fill="#dc2626"
                stroke="#1e293b"
                strokeWidth="2"
              />
              <path
                d="M 46 58 Q 50 63 54 58"
                fill="#fca5a5"
              />
            </>
          ) : (
            /* Thinking mood */
            <>
              <circle cx="38" cy="43" r="4" fill="#1e293b" />
              <circle cx="39.5" cy="41.5" r="1.5" fill="#ffffff" />
              <circle cx="62" cy="43" r="4" fill="#1e293b" />
              <circle cx="63.5" cy="41.5" r="1.5" fill="#ffffff" />
              {/* Wondering mouth */}
              <ellipse cx="50" cy="55" rx="3" ry="4" fill="#1e293b" />
            </>
          )}

          {/* Tiny Sparkle highlight */}
          <circle cx="34" cy="32" r="3" fill="#ffffff" opacity="0.8" />
          <circle cx="40" cy="27" r="1.5" fill="#ffffff" opacity="0.6" />
        </svg>
      </div>

      {/* Cute Speech Bubble if speechText is provided */}
      {speechText && (
        <div className="flex-1 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200/80 rounded-2xl p-3 sm:p-3.5 shadow-sm relative">
          {/* Triangular tail pointing to mascot */}
          <div className="absolute -left-2 top-4 w-3 h-3 bg-amber-50 border-b-2 border-l-2 border-amber-200/80 transform rotate-45" />

          <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 mb-0.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
            <span>{speechTitle}</span>
            <Sparkles className="w-3 h-3 text-amber-500 animate-spin-slow ml-auto" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed">
            {speechText}
          </p>
        </div>
      )}
    </div>
  );
};
