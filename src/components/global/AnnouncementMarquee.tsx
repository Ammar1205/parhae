'use client';
// Announcement Marquee - infinite scroll using CSS animation (60fps, no JS timers)
// animation.md: high-performance CSS keyframe animation to stay at 60fps
import React from 'react';

const ANNOUNCEMENTS = [
  '🚚 FREE Shipping on 2+ items',
  '🎉 Use code FUNKY10 for 10% off',
  '📚 New Prophet Stories just arrived!',
  '⭐ 50,000+ Happy Kids across Pakistan',
  '🕌 New Islamic Cards collection is here',
  '🎁 Bundle & save up to 35%',
  '✅ Cash on Delivery available nationwide',
  '💚 100% safe, child-friendly materials',
];

export default function AnnouncementMarquee() {
  const repeated = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];

  return (
    <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 overflow-hidden py-2 relative z-50">
      <div className="flex whitespace-nowrap animate-marquee">
        {repeated.map((text, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 text-white text-sm font-semibold mx-8 font-quicksand"
          >
            {text}
            <span className="text-emerald-300 mx-4">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
