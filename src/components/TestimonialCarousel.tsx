import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimer.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 7000);
    } else if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
    }

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isAutoPlaying, testimonials.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <div 
      className="relative mx-auto max-w-5xl px-4 py-8 border-y border-gold/15 bg-gradient-to-b from-[#0A192F]/40 to-transparent rounded shadow-2xl overflow-hidden" 
      id="testimonial-carousel-container"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Editorial Decorative Grid Backdrops */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      {/* Quote Symbol Decorative Grid */}
      <div className="absolute -top-6 -left-6 text-gold/5 pointer-events-none select-none">
        <Quote className="w-48 h-48 rotate-185" />
      </div>

      <div className="relative z-10 space-y-8">
        
        {/* Editorial Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-gold/5 border border-gold/20 text-[9px] font-mono font-bold text-gold uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-gold animate-pulse" />
            <span>EXECUTIVE TESTIMONY REGISTRY</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-tight text-white uppercase">
            Corporate, Legal &amp; Family Office Endorsements
          </h3>
          <div className="w-16 h-[1.5px] bg-gold/45 mx-auto mt-3"></div>
        </div>

        {/* Dynamic Carousel Slide Frame */}
        <div className="min-h-[220px] flex flex-col justify-center items-center text-center px-4 md:px-12 transition-all duration-500 ease-in-out">
          
          {/* Animated rating starts */}
          <div className="flex justify-center space-x-1.5 text-gold mb-5">
            {Array.from({ length: current.rating || 5 }).map((_, idx) => (
              <Star key={idx} className="w-4 h-4 fill-gold text-gold" />
            ))}
          </div>

          {/* Large Quote Content */}
          <blockquote className="font-sans text-base md:text-xl lg:text-2xl leading-relaxed text-[#CCD6F6]/95 max-w-3xl font-light italic">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          {/* Divider */}
          <div className="w-10 h-px bg-white/10 my-6"></div>

          {/* Author info & alignment */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-center space-x-2">
              <span className="font-display text-sm font-bold tracking-wider text-white uppercase">
                {current.author}
              </span>
              {current.isVerified && (
                <span className="inline-flex items-center space-x-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[8px] font-mono font-bold text-emerald-400 border border-emerald-500/25 uppercase">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  <span>Verified Forensic Case</span>
                </span>
              )}
            </div>
            <p className="text-xs text-[#8892B0] font-sans">
              {current.role} &bull; <strong className="text-gold-light/90">{current.company}</strong>
            </p>
          </div>

        </div>

        {/* Carousel Controls Panel */}
        <div className="flex items-center justify-between max-w-xs mx-auto border-t border-white/5 pt-4">
          
          {/* Left arrow trigger */}
          <button 
            onClick={handlePrev}
            className="p-2 border border-gold/15 rounded-sm hover:border-gold hover:bg-gold/5 text-gold hover:text-white transition group"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-4 h-4 transition group-hover:-translate-x-0.5" />
          </button>

          {/* Intermittent slide indicators dots */}
          <div className="flex space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx 
                    ? 'w-6 bg-gold' 
                    : 'bg-white/15 hover:bg-gold/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Right arrow trigger */}
          <button 
            onClick={handleNext}
            className="p-2 border border-gold/15 rounded-sm hover:border-gold hover:bg-gold/5 text-gold hover:text-white transition group"
            aria-label="Next story"
          >
            <ChevronRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
          </button>

        </div>

      </div>

      {/* Compliance seal line */}
      <div className="mt-6 text-center">
        <p className="text-[9px] font-mono text-[#8892B0]/60 tracking-widest uppercase">
          ✔ RECOVERIES EXECUTED UNDER EXCLUSIVE RETENTION AGUEMENTS • SOURCE IDENTITIES WITHHELD SECURELY BY SPECIAL PROTOCOLS
        </p>
      </div>

    </div>
  );
}
