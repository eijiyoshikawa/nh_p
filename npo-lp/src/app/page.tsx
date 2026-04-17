import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import CityData from "@/components/CityData";
import Solution from "@/components/Solution";
import Benefits from "@/components/Benefits";
import BusinessPlans from "@/components/BusinessPlans";
import Funding from "@/components/Funding";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import MemberCarousel from "@/components/MemberCarousel";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <CityData />
        <Solution />
        <Benefits />
        <BusinessPlans />
        <Funding />

        {/* Internal pages links */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            <a
              href="/grants"
              className="group rounded-2xl border-2 border-emerald-100 bg-white p-6 shadow-sm transition-all hover:border-accent-green hover:shadow-md"
            >
              <p className="text-2xl">📋</p>
              <h3 className="mt-2 text-base font-bold text-text-primary group-hover:text-accent-green">
                助成金・補助金リスト
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                枚方市で申請可能な20件の制度をカテゴリ別・優先度別に一覧化。公式サイトへのリンクも掲載。
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-accent-green">
                リストを見る →
              </span>
            </a>
            <a
              href="/funding-strategy"
              className="group rounded-2xl border-2 border-emerald-100 bg-white p-6 shadow-sm transition-all hover:border-accent-green hover:shadow-md"
            >
              <p className="text-2xl">📊</p>
              <h3 className="mt-2 text-base font-bold text-text-primary group-hover:text-accent-green">
                資金調達戦略
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                2029年末までに1,000万円を達成するための年次ロードマップとシミュレーション。
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-accent-green">
                戦略を見る →
              </span>
            </a>
            <a
              href="/glossary"
              className="group rounded-2xl border-2 border-emerald-100 bg-white p-6 shadow-sm transition-all hover:border-accent-green hover:shadow-md sm:col-span-2"
            >
              <p className="text-2xl">📖</p>
              <h3 className="mt-2 text-base font-bold text-text-primary group-hover:text-accent-green">
                用語集
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                NPO・助成金・子ども食堂に関する専門用語をわかりやすく解説。初めての方もここから。
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-accent-green">
                用語集を見る →
              </span>
            </a>
          </div>
        </section>

        <MemberCarousel />
        <CallToAction />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
