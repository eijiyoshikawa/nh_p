export default function BgIllustrations() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Top-right: house */}
      <svg className="animate-float-slow absolute -right-8 top-32 h-32 w-32 text-orange-100 opacity-40 sm:h-48 sm:w-48" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 10L10 45h10v40h60V45h10L50 10zM40 75V55h20v20H40z" />
      </svg>

      {/* Left: tree */}
      <svg className="animate-float absolute -left-4 top-[40%] h-40 w-40 text-green-100 opacity-30 sm:h-56 sm:w-56" viewBox="0 0 100 120" fill="currentColor">
        <ellipse cx="50" cy="40" rx="35" ry="38" />
        <rect x="45" y="75" width="10" height="30" rx="3" />
      </svg>

      {/* Center-right: heart */}
      <svg className="animate-pulse-soft absolute right-[10%] top-[55%] h-16 w-16 text-orange-200 sm:h-24 sm:w-24" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 88S10 60 10 35C10 15 30 5 50 25C70 5 90 15 90 35C90 60 50 88 50 88z" />
      </svg>

      {/* Bottom-left: plate & utensils (food) */}
      <svg className="animate-float-reverse absolute bottom-[20%] left-[5%] h-24 w-24 text-orange-100 opacity-40 sm:h-36 sm:w-36" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="55" r="30" />
        <circle cx="50" cy="55" r="22" fill="#FFFBF5" />
        <rect x="15" y="48" width="3" height="25" rx="1.5" />
        <rect x="82" y="48" width="3" height="25" rx="1.5" />
        <rect x="80" y="48" width="7" height="3" rx="1" />
      </svg>

      {/* Top-left: people */}
      <svg className="animate-drift absolute left-[15%] top-[15%] h-20 w-20 text-green-100 opacity-30 sm:h-28 sm:w-28" viewBox="0 0 100 80" fill="currentColor">
        <circle cx="30" cy="20" r="10" />
        <rect x="22" y="32" width="16" height="28" rx="6" />
        <circle cx="60" cy="15" r="8" />
        <rect x="53" y="25" width="14" height="24" rx="5" />
        <circle cx="80" cy="22" r="9" />
        <rect x="73" y="33" width="14" height="26" rx="5" />
      </svg>

      {/* Right-middle: recycle loop (BSF circulation) */}
      <svg className="animate-float absolute right-[5%] top-[75%] h-20 w-20 text-green-100 opacity-30 sm:h-28 sm:w-28" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 30 L28 22 M20 30 L28 38 M20 30 Q30 12 50 18" />
        <path d="M62 36 L60 46 M62 36 L54 40 M62 36 Q68 54 48 62" />
        <path d="M32 62 L22 58 M32 62 L30 52 M32 62 Q14 56 18 34" />
      </svg>

      {/* Dots pattern - scattered */}
      <div className="animate-pulse-soft absolute left-[30%] top-[25%] h-3 w-3 rounded-full bg-orange-200 opacity-20" />
      <div className="animate-pulse-soft absolute left-[60%] top-[45%] h-2 w-2 rounded-full bg-green-200 opacity-20" style={{ animationDelay: "1s" }} />
      <div className="animate-pulse-soft absolute left-[75%] top-[30%] h-4 w-4 rounded-full bg-orange-100 opacity-20" style={{ animationDelay: "2s" }} />
      <div className="animate-pulse-soft absolute left-[20%] top-[70%] h-3 w-3 rounded-full bg-green-100 opacity-20" style={{ animationDelay: "3s" }} />
    </div>
  );
}
