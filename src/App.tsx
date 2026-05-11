/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, useMemo, RefObject } from 'react';
import { Palette, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

// --- Types ---
interface ArtPiece {
  id: string;
  title: string;
  description: string;
  artist: string;
  grade: string;
  gradient: string;
}

// --- Data ---
const modernArt: ArtPiece[] = [
  { id: 'm1', title: 'أضواء المدينة', description: 'يعبر عن صخب الحياة العصرية', artist: 'سارة أحمد', grade: 'الثالث ثانوي', gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' },
  { id: 'm2', title: 'الرقمي والروح', description: 'يعبر عن التوازن بين التكنولوجيا والإنسانية', artist: 'محمد الغامدي', grade: 'الثاني ثانوي', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)' },
  { id: 'm3', title: 'أكوان متوازية', description: 'يعبر عن الأحلام والخيال', artist: 'نورة السلمي', grade: 'الأول ثانوي', gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' },
  { id: 'm4', title: 'الذكاء والقلب', description: 'يعبر عن العلاقة بين الإنسان والآلة', artist: 'عبدالله الزهراني', grade: 'الثالث ثانوي', gradient: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)' },
  { id: 'm5', title: 'ألوان الصوت', description: 'يعبر عن تحويل الموسيقى لألوان', artist: 'ريم العتيبي', grade: 'الثاني متوسط', gradient: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)' },
  { id: 'm6', title: 'المستقبل ينظر إليك', description: 'يعبر عن جيل الغد', artist: 'فيصل الدوسري', grade: 'الثالث متوسط', gradient: 'linear-gradient(135deg, #1e293b 0%, #1e1b4b 100%)' },
];

const heritageArt: ArtPiece[] = [
  { id: 'h1', title: 'القهوة والكرم', description: 'يعبر عن ضيافة الجد', artist: 'عمر الرشيدي', grade: 'الثالث ثانوي', gradient: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)' },
  { id: 'h2', title: 'خيوط النسيج', description: 'يعبر عن تراث الأمهات', artist: 'هيا المطيري', grade: 'الأول ثانوي', gradient: 'linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)' },
  { id: 'h3', title: 'أسوار الطين', description: 'يعبر عن العمارة النجدية القديمة', artist: 'خالد العنزي', grade: 'الثاني ثانوي', gradient: 'linear-gradient(135deg, #a16207 0%, #ca8a04 100%)' },
  { id: 'h4', title: 'ليلة العيد', description: 'يعبر عن فرحة التراث', artist: 'منى الشمري', grade: 'الثاني متوسط', gradient: 'linear-gradient(135deg, #065f46 0%, #059669 100%)' },
  { id: 'h5', title: 'صوت الرحى', description: 'يعبر عن الحياة القروية', artist: 'ماجد الحربي', grade: 'الثالث متوسط', gradient: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)' },
  { id: 'h6', title: 'ظلال النخيل', description: 'يعبر عن الانتماء للأرض', artist: 'أسماء القحطاني', grade: 'الأول ثانوي', gradient: 'linear-gradient(135deg, #166534 0%, #15803d 100%)' },
];

export default function App() {
  const modernRef = useRef<HTMLElement>(null);
  const heritageRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [isDesert, setIsDesert] = useState(false);

  const scrollTo = (ref: RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate 200 stars with random positions, delays, and sizes
  const starsArray = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 200}%`,
      size: `${Math.random() * 2 + 1}px`,
    }));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.classList.add('desert-mode');
          setIsDesert(true);
        } else {
          document.body.classList.remove('desert-mode');
          setIsDesert(false);
        }
      },
      { threshold: 0.3 }
    );

    if (heritageRef.current) {
      observer.observe(heritageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div dir="rtl" className="relative min-h-screen">
      {/* Background Layer: Stars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {starsArray.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
            } as any}
          />
        ))}
        {/* Nebula Layer */}
        <div className={`nebula-modern transition-opacity duration-1000 ${isDesert ? 'opacity-0' : 'opacity-100'}`} />
        {/* Sand Texture Layer */}
        <div className="sand-texture" />
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full z-50 sticky-header h-20 px-6 md:px-12 flex items-center justify-between transition-all duration-500">
        <div className="flex items-center gap-3">
          <img 
            src="https://res.cloudinary.com/dozskgkr6/image/upload/v1778515533/ChatGPT_Image_May_11_2026_07_05_17_PM_el4fd7.png" 
            alt="Logo" 
            className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold section-title tracking-tight">معرض الفنون السنوي</span>
            <span className="text-[10px] opacity-70">مدارس أطياب الأهلية</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <span className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>الرئيسية</span>
          <span className="nav-link" onClick={() => scrollTo(modernRef)}>المعرض الحديث</span>
          <span className="nav-link" onClick={() => scrollTo(heritageRef)}>المعرض التراثي</span>
          <span className="nav-link" onClick={() => scrollTo(footerRef)}>تواصل معنا</span>
        </div>

        <div className="text-[10px] hidden lg:block opacity-50 max-w-[80px] text-left leading-tight">
          إحدى شركات قيم للتعليم
        </div>
      </nav>

      {/* Hero / Header Subtitle */}
      <header className="relative z-10 pt-40 pb-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-8xl font-bold section-title mb-4 drop-shadow-2xl">
            أطياب الفنون
          </h1>
          <p className="text-xl md:text-3xl opacity-90 max-w-3xl mx-auto px-4 font-light">
            رحلة بصرية مع إبداع طلابنا ومهاراتهم الفنية المتميزة.
          </p>
        </motion.div>
      </header>

      {/* Modern Section */}
      <section ref={modernRef} className="relative min-h-screen pt-20 pb-20 px-6 md:px-12 z-10 flex flex-col items-center">
        {/* Landmarks Background */}
        <div className="absolute inset-0 flex justify-between items-end px-4 md:px-20 overflow-hidden opacity-30">
          {/* Right Side: Riyadh */}
          <div className="flex items-end gap-10 translate-y-10">
            <div className="faisaliah-tower" />
            <div className="kingdom-tower" />
          </div>
          {/* Left Side: Makkah */}
          <div className="flex items-end gap-10 translate-y-10">
            <div className="clock-tower" />
            <div className="kaaba" />
          </div>
        </div>

        <h2 className="text-3xl md:text-6xl font-bold mb-16 section-title text-blue-100 drop-shadow-lg relative z-20">
          القسم الحديث — مهارات الغد
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {modernArt.map((art) => (
            <ArtCard key={art.id} art={art} mode="modern" />
          ))}
        </div>
      </section>

      {/* Visual Divider */}
      <div className="relative z-10 py-10 flex flex-col items-center">
        <div className="divider-glow" />
        <span className="text-xl font-amiri opacity-80 decoration-none">تناغم الفن والإبداع</span>
      </div>

      {/* Heritage Section */}
      <section
        ref={heritageRef}
        className="relative min-h-screen pt-24 pb-20 px-6 md:px-12 z-10 flex flex-col items-center"
      >
        <h2 className={`text-3xl md:text-6xl font-bold mb-16 section-title transition-colors duration-1000 ${isDesert ? 'text-[#2C1A05]' : 'text-transparent'}`}>
          القسم الفني — لمسات الأصالة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {heritageArt.map((art) => (
            <ArtCard key={art.id} art={art} mode="heritage" />
          ))}
        </div>
      </section>

      {/* Footer / Credits */}
      <footer ref={footerRef} className="credit-footer">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="credit-text mb-6">
              تم تنفيذ هذا العمل الفني الرقمي لمدارس أطياب الأهلية
            </p>
            <div className="h-px w-32 bg-current opacity-20 mx-auto mb-6" />
            <div className="flex items-center justify-center gap-6 mb-4">
              <img 
                src="https://res.cloudinary.com/dozskgkr6/image/upload/v1778515533/ChatGPT_Image_May_11_2026_07_05_17_PM_el4fd7.png" 
                alt="Logo" 
                className="h-20 w-auto object-contain drop-shadow-lg"
                referrerPolicy="no-referrer"
              />
              <h3 className="text-2xl md:text-4xl font-bold section-title">
                إعداد المهندس / صالح عبدالرحمن عادل
              </h3>
            </div>
            <p className="text-sm opacity-60">جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

interface ArtCardProps {
  art: ArtPiece;
  mode: 'modern' | 'heritage';
  key?: string | number;
}

function ArtCard({ art, mode }: ArtCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-2xl flex flex-col shadow-lg ${
        mode === 'modern' ? 'modern-card-bg' : 'heritage-card-bg'
      }`}
    >
      {/* Image Placeholder */}
      <div
        className="w-full h-64 md:h-72"
        style={{ background: art.gradient }}
      >
        <div className="w-full h-full flex items-center justify-center opacity-10">
          <Palette size={80} />
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col gap-3">
        <h3 className={`text-xl font-bold ${mode === 'modern' ? 'text-white' : 'text-[#2C1A05]'}`}>
          {art.title}
        </h3>
        <p className={`text-sm ${mode === 'modern' ? 'text-gray-300' : 'text-[#5C3D11]'}`}>
          {art.description}
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Palette size={16} className={mode === 'modern' ? 'text-blue-400' : 'text-[#8B5E1A]'} />
            <span className="font-semibold">الفنان: {art.artist}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap size={16} className={mode === 'modern' ? 'text-blue-400' : 'text-[#8B5E1A]'} />
            <span>الصف الدراسي: {art.grade}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
