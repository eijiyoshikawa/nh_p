import { cta, lineUrl } from "@/lib/content";

export default function CallToAction() {
  return (
    <section
      id="cta"
      className="bg-gradient-to-b from-orange-50 to-orange-100 px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-xl font-extrabold leading-snug text-text-primary sm:text-2xl md:text-3xl">
          {cta.sectionTitle}
        </h2>
        <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-accent-orange" />
        <p className="mt-6 text-sm leading-relaxed text-text-secondary sm:text-base">
          {cta.description}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {cta.roles.map((role) => (
            <span
              key={role}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-accent-orange shadow-sm sm:px-4 sm:py-2 sm:text-sm"
            >
              {role}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[#06C755] px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#05b04c] sm:px-10 sm:py-4 sm:text-lg"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINEで問い合わせる
          </a>
          <p className="mt-4 text-xs text-text-secondary">
            公式LINEから気軽にご連絡ください。24時間受付中
          </p>
        </div>
      </div>
    </section>
  );
}
