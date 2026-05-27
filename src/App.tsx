import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { createClient } from "@supabase/supabase-js";
import { 
  Search, 
  ArrowUpRight, 
  Mail, 
  Linkedin, 
  Code2,
  Terminal,
  Cpu,
  Layers,
  Globe,
  Database,
  Monitor,
  Code,
  Briefcase,
  GraduationCap,
  User,
  Heart,
  Github,
  Sparkles,
  Atom,
  Trophy,
  Camera,
  Link,
  X,
  Menu,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit,
  LogOut,
  Lock
} from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";

// TypeScript workaround for projects without @types/react or when using the
// automatic JSX runtime. Declaring the module and a permissive JSX.IntrinsicElements
// prevents TS7016/TS7026 errors in this file.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // allow any element (e.g., div, img, custom) to be used without explicit typing
      [elemName: string]: any;
    }
  }
}

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
const supabaseClient = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const resolveLoginEmail = (username: string) => {
  if (username === "admin") {
    return (import.meta as any).env?.VITE_ADMIN_EMAIL || username;
  }
  return username;
};

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Java", icon: <img src="/image/java.png" alt="Java" className="w-9 h-9 object-contain" />, color: "bg-brand-green shadow-green-100/50" },
      { name: "JavaScript", icon: <img src="/image/js.png" alt="JavaScript" className="w-9 h-9 object-contain" />, color: "bg-brand-pink shadow-pink-100/50" },
      { name: "Python", icon: <img src="/image/python.png" alt="Python" className="w-9 h-9 object-contain" />, color: "bg-brand-blue shadow-blue-100/50" },
      { name: "PHP", icon: <img src="/image/php.png" alt="PHP" className="w-9 h-9 object-contain" />, color: "bg-brand-green shadow-green-100/50" },
    ]
  },
  {
    title: "Web Development",
    skills: [
      { name: "React", icon: <img src="/image/react.png" alt="React" className="w-9 h-9 object-contain" />, color: "bg-brand-purple shadow-purple-100/50" },
      { name: "HTML", icon: <img src="/image/html-5.png" alt="HTML" className="w-9 h-9 object-contain" />, color: "bg-brand-orange shadow-orange-100/50" },
      { name: "CSS", icon: <img src="/image/css-3.png" alt="CSS" className="w-9 h-9 object-contain" />, color: "bg-brand-purple shadow-purple-100/50" },
    ]
  },
  {
    title: "Data & Intelligence",
    skills: [
      { name: "SQL", icon: <img src="/image/database.png" alt="SQL" className="w-9 h-9 object-contain" />, color: "bg-brand-blue shadow-blue-100/50" },
      { name: "AI Fundamentals", icon: <img src="/image/deep-learning.png" alt="AI Fundamentals" className="w-9 h-9 object-contain" />, color: "bg-brand-pink shadow-pink-100/50" },
    ]
  },
  {
    title: "Infrastructure & OS",
    skills: [
      { name: "Linux", icon: <img src="/image/linux.png" alt="Linux" className="w-9 h-9 object-contain" />, color: "bg-brand-blue shadow-blue-100/50" },
    ]
  }
];

const PROJECTS = [
  {
    category: "INTRODUCTION TO ROBOTICS",
    title: "Mobile Robot Assembly & Navigation",
    description: "Assembled a four-wheel mobile robot with Arduino, implementing Python-based navigation algorithms for obstacle avoidance and goal tracking. Achieved high-precision sensing and documented full system performance.",
    link: "/projects/Robotics Lab Report_HeLingling.pdf",
    type: "VIEW PROJECT"
  },
  {
    category: "OBJECT-ORIENTED PROGRAMMING",
    title: "Horse Racing Simulator",
    description: "Developed a Java-based simulator utilizing OOP principles: encapsulation, inheritance, polymorphism. Built an interactive Swing GUI for real-time race tracking and horse statistics.",
    link: "https://github.com/OOOHC/HorseRaceSimulator",
    type: "VIEW PROJECT"
  },
  {
    category: "GAME DESIGN",
    title: "Hunt the Boggle Monster",
    description: "A maze exploration game concept where players collect magical objects and use powers.",
    link: "/projects/Level 5 mini project-Copy3.pdf",
    type: "OPEN PDF"
  },
  {
    category: "SOFTWARE SPECIFICATION",
    title: "Messaging App Specification",
    description: "Defining requirements, interactions, and system behavior for a messaging platform.",
    link: "/projects/Group1.8_ECS427U_assignment3.pdf",
    type: "OPEN PDF"
  },
  {
    category: "RESEARCH PRESENTATION",
    title: "Responsible Technology",
    description: "Exploring responsible technology decisions and sustainability in modern computing.",
    link: "/projects/Responsible & Sustainable Presentation.pdf",
    type: "OPEN PDF"
  }
];

const TECHNICAL_WORK = [
  {
    title: "T4",
    role: "Boba Barista",
    period: "Mar 2025",
    bullets: [
      "Collaborated with team members during peak periods to support efficient operations",
      "Prepared and served Urber Eats deliveries",
      "Maintained high quality hygiene and safety standards"
    ],
    icon: <Cpu className="w-4 h-4" />
  }
];

const VOLUNTARY_EXPERIENCES = [
  {
    title: "World Table Tennis London 2026",
    role: "FAN ZONE ACTIVATOR, MEDIA ASSISTANT, ANTI-DOPING ASSISTANT",
    period: "MAY 2026",
    bullets: [
      "Supported the setup and operation of the fan engagement zone, ensuring a smooth and engaging visitor experience",
      "Coordinated with media personnel and publishers to facilitate efficient content distribution and event coverage",
      "Assisted in the implementation of anti-doping procedures, maintaining compliance with official regulations and protocols"
    ],
    icon: <Briefcase className="w-4 h-4" />
  },
  {
    title: "Chinese New Year & Lantern Festival",
    role: "EVENT PHOTOGRAPHER",
    period: "FEB, MAR 2026",
    bullets: [
      "Captured high-quality event photography featured on official organiser media channels and People's Daily Online"
    ],
    icon: <Camera className="w-4 h-4" />
  },
  {
    title: "Thames Hospice",
    role: "RETAIL VOLUNTEER",
    period: "Feb 2024",
    bullets: [
      "Welcomed and assisted customers in a professional environment.",
      "Shared charity information and encouraged community support.",
      "Restocked and presented the shop floor."
    ],
    icon: <Briefcase className="w-4 h-4" />
  },
  {
    title: "Barnardo's",
    role: "RETAIL VOLUNTEER",
    period: "Feb 2023",
    bullets: [
      "Sorted and organised donated items for sale.",
      "Personalised assistance for customers finding items."
    ],
    icon: <Heart className="w-4 h-4" />
  },
  {
    title: "British Heart Foundation",
    role: "RETAIL VOLUNTEER",
    period: "Feb 2022",
    bullets: [
      "Responded to questions and supported daily retail operations."
    ],
    icon: <Heart className="w-4 h-4" />
  }
];

const POSTS = [
  {
    date: "OCT 24, 2024",
    title: "Exploring the Future of Generative AI",
    description: "Diving deep into the implications of large language models on creative workflows and technical problem-solving. How can we ensure these tools augment human potential effectively?",
    link: "#"
  },
  {
    date: "OCT 12, 2024",
    title: "My Journey into Robotics",
    description: "Reflecting on the challenges of bridging the gap between abstract algorithms and physical hardware. A look into the assembly and navigation of my first mobile robot.",
    link: "#"
  },
  {
    date: "SEP 18, 2024",
    title: "Optimizing Neural Networks",
    description: "Practical strategies for achieving high performance when working with limited datasets. Focus on data augmentation and transfer learning techniques in computer vision.",
    link: "#"
  }
];

const Typewriter = ({ text, onComplete }: { text: string; onComplete?: () => void; key?: any }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setComplete(true);
        if (onComplete) onComplete();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span className="relative">
      {displayedText}
      {!complete && (
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          className="inline-block w-[4px] h-[1.1em] bg-neutral-900 dark:bg-tech-green ml-1 translate-y-1 shadow-[0_0_8px_currentColor]"
        />
      )}
    </span>
  );
};

const WorkStatus = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="flex items-center gap-2">
    <div className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
    </div>
    <span className={`text-[16px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>OPEN FOR WORK</span>
  </div>
);

const ExperienceCarousel = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [activeTab, setActiveTab] = useState<'work' | 'voluntary'>('work');
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResettingRef = useRef(false);
  const isTeleportingRef = useRef(false);
  const currentList = activeTab === 'work' ? TECHNICAL_WORK : VOLUNTARY_EXPERIENCES;

  const isLooping = currentList.length > 3;

  // We add clones only if we have more than 3 cards to enable seamless looping
  const displayExperiences = isLooping
    ? [currentList[currentList.length - 1], ...currentList, currentList[0]]
    : currentList;

  const scrollToIndex = (idx: number, behavior: ScrollBehavior = 'smooth') => {
    const container = containerRef.current;
    if (container) {
      const items = container.children;
      const targetIdx = isLooping ? idx + 1 : idx;
      if (items[targetIdx]) {
        const item = items[targetIdx] as HTMLElement;
        container.scrollTo({
          left: item.offsetLeft - (container.offsetWidth - item.offsetWidth) / 2,
          behavior
        });
      }
    }
  };

  useEffect(() => {
    setActiveIdx(0);
    const container = containerRef.current;
    if (container) {
      isResettingRef.current = true;
      setIsPaused(true);

      const items = container.children;
      const targetIdx = isLooping ? 1 : 0;
      if (items[targetIdx]) {
        const item = items[targetIdx] as HTMLElement;
        container.scrollLeft = item.offsetLeft - (container.offsetWidth - item.offsetWidth) / 2;
      }

      const timer = setTimeout(() => {
        isResettingRef.current = false;
        setIsPaused(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeTab, isLooping]);

  useEffect(() => {
    if (isPaused || isResettingRef.current || currentList.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % currentList.length;
        scrollToIndex(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, currentList]);

  const handleScroll = () => {
    if (isPaused || isResettingRef.current || isTeleportingRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    
    const center = container.scrollLeft + container.offsetWidth / 2;
    const items = container.children;
    if (items.length === 0) return;
    if (isLooping && items.length < 3) return; // safety
    let closestIdx = 0;
    let minDiff = Infinity;

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      if (!item) continue;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const diff = Math.abs(center - itemCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    
    if (isLooping) {
      // Teleportation logic for infinite loop
      if (closestIdx === 0) {
        // At clone of last item, jump to real last item
        isTeleportingRef.current = true;
        const realLastIdx = currentList.length;
        const targetItem = items[realLastIdx] as HTMLElement;
        if (targetItem) {
          container.scrollLeft = targetItem.offsetLeft - (container.offsetWidth - targetItem.offsetWidth) / 2;
        }
        requestAnimationFrame(() => {
          setActiveIdx(currentList.length - 1);
          isTeleportingRef.current = false;
        });
      } else if (closestIdx === items.length - 1) {
        // At clone of first item, jump to real first item
        isTeleportingRef.current = true;
        const realFirstIdx = 1;
        const targetItem = items[realFirstIdx] as HTMLElement;
        if (targetItem) {
          container.scrollLeft = targetItem.offsetLeft - (container.offsetWidth - targetItem.offsetWidth) / 2;
        }
        requestAnimationFrame(() => {
          setActiveIdx(0);
          isTeleportingRef.current = false;
        });
      } else {
        setActiveIdx(closestIdx - 1);
      }
    } else {
      // Normal direct tracking when there are no clones
      setActiveIdx(closestIdx);
    }
  };

  const handlePrev = () => {
    if (isResettingRef.current) return;
    setIsPaused(true);
    const nextIdx = (activeIdx - 1 + currentList.length) % currentList.length;
    scrollToIndex(nextIdx);
    setActiveIdx(nextIdx);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleNext = () => {
    if (isResettingRef.current) return;
    setIsPaused(true);
    const nextIdx = (activeIdx + 1) % currentList.length;
    scrollToIndex(nextIdx);
    setActiveIdx(nextIdx);
    setTimeout(() => setIsPaused(false), 1000);
  };

  // Switcher Component to avoid repeating JSX
  const TabSwitcher = () => (
    <div className="flex justify-center mb-12 px-4">
      <div className={`flex p-1 rounded-2xl border transition-all duration-500 ${
        isDarkMode 
          ? 'bg-neutral-900 border-neutral-800 shadow-[0_0_20px_rgba(0,0,0,0.4)]' 
          : 'bg-neutral-100 border-neutral-200/50 shadow-sm'
      }`}>
        <button
          onClick={() => setActiveTab('work')}
          className={`px-8 py-3 rounded-xl text-sm md:text-base font-hand font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            activeTab === 'work'
              ? isDarkMode 
                ? 'bg-tech-blue text-black shadow-[0_0_15px_rgba(0,240,255,0.45)] font-extrabold' 
                : 'bg-neutral-900 text-white shadow-md'
              : isDarkMode 
                ? 'text-neutral-400 hover:text-neutral-200' 
                : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          WORK EXPERIENCE
        </button>
        <button
          onClick={() => setActiveTab('voluntary')}
          className={`px-8 py-3 rounded-xl text-sm md:text-base font-hand font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            activeTab === 'voluntary'
              ? isDarkMode 
                ? 'bg-tech-blue text-black shadow-[0_0_15px_rgba(0,240,255,0.45)] font-extrabold' 
                : 'bg-neutral-900 text-white shadow-md'
              : isDarkMode 
                ? 'text-neutral-400 hover:text-neutral-200' 
                : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Voluntary Work
        </button>
      </div>
    </div>
  );

  // Fallback 1: No cards
  if (currentList.length === 0) {
    return (
      <div className="w-full">
        <TabSwitcher />
        <div className="flex justify-center py-12">
          <div className={`p-10 rounded-3xl border text-center max-w-md ${
            isDarkMode 
              ? 'bg-neutral-900/40 border-neutral-800 text-neutral-400' 
              : 'bg-white border-neutral-100/50 text-neutral-500'
          }`}>
            No experiences found in this section.
          </div>
        </div>
      </div>
    );
  }

  // Fallback 2: Exactly 1 card (Fully Centered, Static, No paging/arrows/flickering)
  if (currentList.length === 1) {
    const exp = currentList[0];
    return (
      <div className="w-full">
        <TabSwitcher />
        <div className="flex justify-center px-4">
          <motion.div
            key={`${activeTab}-single`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[500px]"
          >
            <div 
              className={`p-10 md:p-14 rounded-[3.5rem] border transition-all h-full flex flex-col justify-center ${
                isDarkMode 
                  ? 'bg-neutral-900/40 border-neutral-800 shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl' 
                  : 'bg-white shadow-[0_20px_80px_rgba(0,0,0,0.03)] border-neutral-100/50'
              }`}
            >
              <div className="flex flex-col gap-10">
                <div className={`w-16 h-16 flex items-center justify-center shrink-0 transition-all rounded-3xl ${
                  isDarkMode 
                    ? 'bg-tech-blue/10 text-tech-blue drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                    : 'bg-neutral-50 text-[#4d8b8b]'
                }`}>
                  {(exp.icon)}
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className={`font-sans font-bold text-xl md:text-2xl mb-3 leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                      {exp.title}
                    </h4>
                    <div className={`text-[11px] font-bold uppercase tracking-[0.3em] ${isDarkMode ? 'text-tech-blue' : 'text-[#4d8b8b]'}`}>
                      {exp.role} {exp.period && ` | ${exp.period}`}
                    </div>
                  </div>
                  <ul className="space-y-5">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className={`text-[13px] md:text-[14px] font-sans flex gap-5 leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        <span className={`mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-tech-blue/40' : 'bg-neutral-300'}`} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <TabSwitcher />
      <div className="relative w-full overflow-visible pt-0 pb-10 px-0 translate-y-[-20px] group/carousel">
        {/* Navigation Arrows */}
        {currentList.length > 1 && (
          <>
        <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-40 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button 
            onClick={handlePrev}
            className={`p-4 rounded-full border pointer-events-auto transition-all hover:scale-110 active:scale-95 cursor-pointer ${
              isDarkMode 
                ? 'bg-neutral-950/50 border-tech-blue/30 text-tech-blue hover:bg-tech-blue hover:text-black shadow-[0_0_20px_rgba(0,240,255,0.2)]' 
                : 'bg-white/80 border-neutral-200 text-neutral-800 hover:bg-neutral-900 hover:text-white shadow-lg'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        </>
      )}

        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-40 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button 
            onClick={handleNext}
            className={`p-4 rounded-full border pointer-events-auto transition-all hover:scale-110 active:scale-95 cursor-pointer ${
              isDarkMode 
                ? 'bg-neutral-950/50 border-tech-blue/30 text-tech-blue hover:bg-tech-blue hover:text-black shadow-[0_0_20px_rgba(0,240,255,0.2)]' 
                : 'bg-white/80 border-neutral-200 text-neutral-800 hover:bg-neutral-900 hover:text-white shadow-lg'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div 
          ref={containerRef}
          className="flex gap-12 overflow-x-auto no-scrollbar snap-x snap-mandatory px-[15vw] md:px-[30vw] pt-12 pb-20"
          onMouseLeave={() => setIsPaused(false)}
          onScroll={handleScroll}
        >
          {displayExperiences.map((exp, idx) => {
            const realIdx = isLooping
              ? (idx === 0 ? currentList.length - 1 : (idx === displayExperiences.length - 1 ? 0 : idx - 1))
              : idx;
            const isActive = realIdx === activeIdx;
            
            return (
              <motion.div
                key={`${activeTab}-${idx}-${realIdx}`}
                initial={false}
                animate={{
                  scale: isActive ? 1.05 : 0.85,
                  opacity: isActive ? 1 : 0.3,
                  rotateY: isActive ? 0 : (realIdx < activeIdx ? 35 : -35),
                  z: isActive ? 100 : 0,
                  x: isActive ? 0 : (realIdx < activeIdx ? 20 : -20)
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 25,
                  mass: 1.2
                }}
                className="snap-center shrink-0 w-[85vw] md:w-[500px] perspective-2000"
              >
                <div 
                  className={`p-10 md:p-14 rounded-[3.5rem] border transition-all h-full flex flex-col justify-center ${
                    isDarkMode 
                    ? 'bg-neutral-900/40 border-neutral-800 shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl' 
                      : 'bg-white shadow-[0_20px_80px_rgba(0,0,0,0.03)] border-neutral-100/50'
                  }`}
                >
                  <div className="flex flex-col gap-10">
                    <div className={`w-16 h-16 flex items-center justify-center shrink-0 transition-all rounded-3xl ${
                      isDarkMode 
                        ? 'bg-tech-blue/10 text-tech-blue drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                        : 'bg-neutral-50 text-[#4d8b8b]'
                      }`}>
                      {exp.icon}
                    </div>
                    <div className="space-y-8">
                      <div>
                        <h4 className={`font-sans font-bold text-xl md:text-3xl mb-3 leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                          {exp.title}
                        </h4>
                        <div className={`text-[13px] font-bold uppercase tracking-[0.3em] ${isDarkMode ? 'text-tech-blue' : 'text-[#4d8b8b]'}`}>
                          {exp.role} {exp.period && ` | ${exp.period}`}
                        </div>
                      </div>
                      <ul className="space-y-5">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className={`text-[15px] md:text-[15px] font-sans flex gap-3 leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            <span className={`mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-tech-blue/40' : 'bg-neutral-300'}`} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Indicators */}
        {currentList.length > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            {currentList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsPaused(true);
                  scrollToIndex(idx);
                  setActiveIdx(idx);
                  // Resume auto-scroll after a delay
                  setTimeout(() => setIsPaused(false), 1000);
                }}
                className={`h-2 cursor-pointer transition-all duration-500 rounded-full ${
                  activeIdx === idx 
                    ? `w-12 ${isDarkMode ? 'bg-tech-blue shadow-[0_0_10px_rgba(0,240,255,0.5)]' : 'bg-neutral-900'}` 
                    : `w-2 ${isDarkMode ? 'bg-neutral-800 hover:bg-tech-blue/40 hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] hover:scale-150' : 'bg-neutral-200 hover:bg-neutral-400 hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:scale-150'}`
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [phase, setPhase] = useState<'typing' | 'floating'>('typing');
  const [loopKey, setLoopKey] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [activeAdminTab, setActiveAdminTab] = useState<'blogs' | 'projects'>('blogs');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [linglingClicks, setLinglingClicks] = useState(0);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [blogFormTitle, setBlogFormTitle] = useState("");
  const [blogFormDescription, setBlogFormDescription] = useState("");
  const [blogFormLink, setBlogFormLink] = useState("");
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogFormError, setBlogFormError] = useState("");
  const [projectFormCategory, setProjectFormCategory] = useState("");
  const [projectFormTitle, setProjectFormTitle] = useState("");
  const [projectFormDescription, setProjectFormDescription] = useState("");
  const [projectFormLink, setProjectFormLink] = useState("");
  const [projectFormType, setProjectFormType] = useState("VIEW PROJECT");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectFormError, setProjectFormError] = useState("");

  const fetchBlogs = useCallback(async () => {
    setIsLoadingBlogs(true);
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        setBlogs(await res.json());
      } else {
        setBlogs(POSTS);
      }
    } catch (e) {
      console.error("Failed to fetch blogs:", e);
      setBlogs(POSTS);
    } finally {
      setIsLoadingBlogs(false);
    }
  }, []);

  const fetchProjects = useCallback(async () => {
    setIsLoadingProjects(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        setProjectsList(await res.json());
      } else {
        setProjectsList(PROJECTS);
      }
    } catch (e) {
      console.error("Failed to fetch projects:", e);
      setProjectsList(PROJECTS);
    } finally {
      setIsLoadingProjects(false);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("lingling_admin_token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      if (supabaseClient) {
        const { data, error } = await supabaseClient.auth.getUser(token);
        if (!error && data.user) {
          setIsAuthenticated(true);
          return;
        }
      }

      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("lingling_admin_token");
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
    fetchProjects();
    checkAuth();
  }, [fetchBlogs, fetchProjects, checkAuth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      if (supabaseClient) {
        const email = resolveLoginEmail(loginUsername);
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password: loginPassword
        });

        if (error || !data.session) {
          setLoginError(error?.message || "Invalid username or password");
          return;
        }

        localStorage.setItem("lingling_admin_token", data.session.access_token);
        setIsAuthenticated(true);
        setIsLoginModalOpen(false);
        setIsAdminPanelOpen(true);
        setLoginUsername("");
        setLoginPassword("");
        return;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("lingling_admin_token", data.token);
        setIsAuthenticated(true);
        setIsLoginModalOpen(false);
        setIsAdminPanelOpen(true);
        setLoginUsername("");
        setLoginPassword("");
      } else {
        const errorData = await res.json();
        setLoginError(errorData.error || "Invalid username or password");
      }
    } catch {
      setLoginError("Could not connect to authentication server");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("lingling_admin_token");
    setIsAuthenticated(false);
    setIsAdminPanelOpen(false);
  };

  const handleCreateOrUpdateBlog = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    setBlogFormError("");
    if (!blogFormTitle.trim() || !blogFormDescription.trim()) {
      setBlogFormError("Title and description are required");
      return;
    }

    const token = localStorage.getItem("lingling_admin_token");
    if (!token) {
      setBlogFormError("Not authenticated");
      return;
    }

    const url = editingBlogId ? `/api/blogs/${editingBlogId}` : "/api/blogs";
    const method = editingBlogId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: blogFormTitle,
          description: blogFormDescription,
          link: blogFormLink,
          draft: isDraft
        })
      });

      if (res.ok) {
        clearBlogForm();
        fetchBlogs();
      } else {
        const err = await res.json();
        setBlogFormError(err.error || "Failed to save blog post");
      }
    } catch {
      setBlogFormError("Network error occurred");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    const token = localStorage.getItem("lingling_admin_token");
    if (!token) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchBlogs();
      } else {
        alert("Failed to delete blog post");
      }
    } catch {
      alert("Network error occurred");
    }
  };

  const startEditBlog = (blog: any) => {
    setEditingBlogId(blog.id);
    setBlogFormTitle(blog.title);
    setBlogFormDescription(blog.description);
    setBlogFormLink(blog.link);
    setActiveAdminTab("blogs");
  };

  const clearBlogForm = () => {
    setEditingBlogId(null);
    setBlogFormTitle("");
    setBlogFormDescription("");
    setBlogFormLink("");
    setBlogFormError("");
  };

  const handleCreateOrUpdateProject = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    setProjectFormError("");
    if (!projectFormCategory.trim() || !projectFormTitle.trim() || !projectFormDescription.trim()) {
      setProjectFormError("Category, title, and description are required");
      return;
    }

    const token = localStorage.getItem("lingling_admin_token");
    if (!token) {
      setProjectFormError("Not authenticated");
      return;
    }

    const url = editingProjectId ? `/api/projects/${editingProjectId}` : "/api/projects";
    const method = editingProjectId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          category: projectFormCategory,
          title: projectFormTitle,
          description: projectFormDescription,
          link: projectFormLink,
          type: projectFormType,
          draft: isDraft
        })
      });

      if (res.ok) {
        clearProjectForm();
        fetchProjects();
      } else {
        const err = await res.json();
        setProjectFormError(err.error || "Failed to save project");
      }
    } catch {
      setProjectFormError("Network error occurred");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const token = localStorage.getItem("lingling_admin_token");
    if (!token) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProjects();
      } else {
        alert("Failed to delete project");
      }
    } catch {
      alert("Network error occurred");
    }
  };

  const startEditProject = (project: any) => {
    setEditingProjectId(project.id);
    setProjectFormCategory(project.category);
    setProjectFormTitle(project.title);
    setProjectFormDescription(project.description);
    setProjectFormLink(project.link);
    setProjectFormType(project.type || "VIEW PROJECT");
    setActiveAdminTab("projects");
  };

  const clearProjectForm = () => {
    setEditingProjectId(null);
    setProjectFormCategory("");
    setProjectFormTitle("");
    setProjectFormDescription("");
    setProjectFormLink("");
    setProjectFormType("VIEW PROJECT");
    setProjectFormError("");
  };
  
  // Parallax interaction values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // Transform layers for depth
  const depth1X = useTransform(springX, (val) => val * 20);
  const depth1Y = useTransform(springY, (val) => val * 20);
  const depth2X = useTransform(springX, (val) => val * 40);
  const depth2Y = useTransform(springY, (val) => val * 40);
  const handleTypewriterComplete = useCallback(() => {
    setPhase('floating');
  }, []);

  // Animation reset logic
  const handleReset = () => {
    setPhase('typing');
    setLoopKey(prev => prev + 1);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) * 2 - 1);
      mouseY.set((clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={`min-h-screen selection:bg-brand-pink/40 bg-brand-cream text-neutral-900 overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'dark bg-neutral-950 text-neutral-100' : ''}`}>
      
      {/* Tech Overlay for Dark Mode */}
      {isDarkMode && <div className="fixed inset-0 pointer-events-none tech-grid z-0 opacity-40 animate-pulse-slow" />}
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 h-20 flex items-center justify-between border-b ${isDarkMode ? 'bg-neutral-950/80 border-neutral-800 backdrop-blur-xl' : 'bg-white/80 border-neutral-100 backdrop-blur-md'}`}>
        <div className={`absolute top-0 left-0 right-0 h-[3px] transition-colors duration-500 ${isDarkMode ? 'bg-tech-green shadow-[0_0_10px_#4D8B8B]' : 'bg-[#6366f1]'}`}></div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-0.1 sm:gap-4 z-50">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setLinglingClicks((prev) => {
                const next = prev + 1;
                if (next >= 5) {
                  setIsLoginModalOpen(true);
                  return 0;
                }
                return next;
              });
              handleReset();
            }}
            className={`font-display font-medium text-2xl tracking-tighter uppercase transition-colors duration-500 ${isDarkMode ? 'text-white hover:text-tech-blue' : 'text-neutral-800 hover:opacity-70'}`}
          >
            LINGLING.HE
          </a>
          <div className="scale-[0.65] sm:scale-[0.85] origin-left shrink-0 -mt-1 sm:mt-0">
            <WorkStatus isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* Desktop Links */}
        <div className={`hidden lg:flex items-center gap-10 text-[18px] font-medium transition-colors duration-500 font-mono tracking-widest ${isDarkMode ? 'text-neutral-400 font-mono tracking-widest' : 'text-neutral-600'}`}>
          <a href="#about" className={`relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all hover:after:w-full ${isDarkMode ? 'hover:text-tech-blue after:bg-tech-green' : 'hover:text-black after:bg-black'}`}>About</a>
          <a href="#projects" className={`relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all hover:after:w-full ${isDarkMode ? 'hover:text-tech-blue after:bg-tech-green' : 'hover:text-black after:bg-black'}`}>Projects</a>
          <a href="#blog" className={`relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all hover:after:w-full ${isDarkMode ? 'hover:text-tech-blue after:bg-tech-green' : 'hover:text-black after:bg-black'}`}>Blog</a>
          <a href="#experience" className={`relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all hover:after:w-full ${isDarkMode ? 'hover:text-tech-blue after:bg-tech-green' : 'hover:text-black after:bg-black'}`}>Experience</a>
          <a href="#education" className={`relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all hover:after:w-full ${isDarkMode ? 'hover:text-tech-blue after:bg-tech-green' : 'hover:text-black after:bg-black'}`}>Education</a>
          <a href="#contact" className={`relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all hover:after:w-full ${isDarkMode ? 'hover:text-tech-blue after:bg-tech-green' : 'hover:text-black after:bg-black'}`}>Contact</a>

          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAdminPanelOpen(true)}
                className={`px-3 py-1 text-[15px] font-mono font-bold tracking-widest rounded transition-all border duration-200
                  ${isDarkMode 
                    ? 'bg-tech-blue/10 border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-neutral-950 hover:border-tech-green hover:shadow-[0_0_15px_rgba(77,139,139,0.4)]' 
                    : 'bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-950 hover:shadow-sm hover:shadow-black/5'}`}
              >
                CONSOLE
              </button>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 text-[11px] font-mono outline-none"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all duration-300 hover:translate-y-[-2px] border ${isDarkMode ? 'bg-tech-blue border-tech-blue/50 text-black hover:bg-neutral-950 hover:text-tech-blue shadow-[0_0_15px] shadow-tech-blue/20 hover:shadow-tech-blue/40' : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:bg-neutral-200'}`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a 
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-4 px-8 py-2.5 rounded-full text-[14px] font-bold tracking-widest uppercase transition-all hover:translate-y-[-2px] border ${isDarkMode ? 'bg-tech-blue border-tech-blue/50 text-black hover:bg-neutral-950 hover:text-tech-blue shadow-[0_0_20px] shadow-tech-blue/20 hover:shadow-tech-blue/40' : 'bg-[#0a1a14] border-transparent text-white hover:bg-black'}`}
          >
            RESUME
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-4 z-50">
        <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-1.5 rounded-full transition-all duration-300 hover:translate-y-[-2px] border ${isDarkMode ? 'bg-tech-blue border-tech-blue/50 text-black hover:bg-neutral-950 hover:text-tech-blue shadow-tech-blue/20 hover:shadow-tech-blue/40' : 'bg-neutral-100 border-neutral-200 text-neutral-600'}`}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <a 
            href="/resume.pdf"
            className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all uppercase hover:translate-y-[-2px] border ${isDarkMode ? 'bg-tech-blue border-tech-blue/50 text-black hover:bg-neutral-950 hover:text-tech-blue shadow-tech-blue/20 hover:shadow-tech-blue/40' : 'bg-[#0a1a14] border-transparent text-white'}`}
          >
            RESUME
          </a>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 focus:outline-none ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: 'auto', opacity: 1, display: 'flex' } : { height: 0, opacity: 0, transitionEnd: { display: 'none' } }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`absolute top-full left-0 right-0 flex-col items-center py-10 gap-6 lg:hidden overflow-hidden shadow-xl border-b transition-all duration-500 ${isDarkMode ? 'bg-neutral-950/80 border-neutral-800 backdrop-blur-xl' : 'bg-white/80 border-neutral-100 backdrop-blur-md'}`}
        >
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-hand uppercase tracking-tight transition-colors ${isDarkMode ? 'text-neutral-300 hover:text-tech-green' : 'text-neutral-800 hover:text-blue-600'}`}>About Me</a>
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-hand uppercase tracking-tight transition-colors ${isDarkMode ? 'text-neutral-300 hover:text-tech-green' : 'text-neutral-800 hover:text-blue-600'}`}>Projects</a>
          <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-hand uppercase tracking-tight transition-colors ${isDarkMode ? 'text-neutral-300 hover:text-tech-green' : 'text-neutral-800 hover:text-blue-600'}`}>Experience</a>
          <a href="#education" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-hand uppercase tracking-tight transition-colors ${isDarkMode ? 'text-neutral-300 hover:text-tech-green' : 'text-neutral-800 hover:text-blue-600'}`}>Education</a>
          <a href="#blog" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-hand uppercase tracking-tight transition-colors ${isDarkMode ? 'text-neutral-300 hover:text-tech-green' : 'text-neutral-800 hover:text-blue-600'}`}>Blog</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-hand uppercase tracking-tight transition-colors ${isDarkMode ? 'text-neutral-300 hover:text-tech-green' : 'text-neutral-800 hover:text-blue-600'}`}>Contact</a>
          {isAuthenticated && (
            <>
              <button
                onClick={() => {
                  setIsAdminPanelOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-xl font-hand uppercase tracking-tight font-bold transition-colors
                  ${isDarkMode 
                    ? 'text-tech-blue hover:text-white' 
                    : 'text-neutral-800 hover:text-brand-sage-600'}`}
              >
                Dashboard Console
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-xl font-hand uppercase tracking-tight transition-colors text-red-500"
              >
                Log Out
              </button>
            </>
          )}
        </motion.div>
      </nav>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="pt-24 space-y-24"
      >
        {/* Interactive Hero */}
        <section ref={heroRef} className="relative h-[90vh] flex flex-col items-center justify-center p-6">
          {/* Parallax Floating Labels */}
          <div className="absolute inset-0 z-0">
            {/* Label 1: Research */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase === 'floating' ? { 
                opacity: 1,
                scale: 1
              } : { opacity: 0, scale: 0.8 }}
              whileHover={{ 
                opacity: 1, 
                scale: 1.05,
                zIndex: 30,
                transition: { delay: 0, duration: 0.2 } 
              }}
              transition={{ 
                duration: 0.8,
                delay: 1.5 // After Image
              }}
              className="absolute top-[12%] left-[2%] md:left-[5%] pointer-events-auto cursor-pointer"
            >
              <motion.div style={{ x: depth1X, y: depth1Y }}>
                <div className={`bento-card border border-white/50 shadow-xl w-48 md:w-64 rotate-[-6deg] p-6 transition-all duration-500 ${isDarkMode ? 'bg-neutral-950/80 border-tech-blue/30 shadow-tech-blue/20' : 'bg-brand-blue shadow-blue-200/20'}`}>
                  <div className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1 ${isDarkMode ? 'text-tech-blue' : 'text-blue-500'}`}>RESEARCH</div>
                  <div className={`font-hand text-xl md:text-2xl leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                    {phase === 'floating' && (
                      <Typewriter text="Exploring future AI landscapes" />
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Label 2: Development */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase === 'floating' ? { 
                opacity: 1,
                scale: 1
              } : { opacity: 0, scale: 0.8 }}
              whileHover={{ 
                opacity: 1, 
                scale: 1.05,
                zIndex: 30,
                transition: { delay: 0, duration: 0.2 } 
              }}
              transition={{ 
                duration: 0.8,
                delay: 2.5 // After Research
              }}
              className="absolute top-[8%] right-[2%] md:right-[10%] pointer-events-auto cursor-pointer"
            >
              <motion.div style={{ x: depth2X, y: depth2Y }}>
                <div className={`bento-card border border-white/50 shadow-xl w-48 md:w-64 rotate-[4deg] p-6 transition-all duration-500 ${isDarkMode ? 'bg-neutral-950/80 border-tech-purple/30 shadow-tech-purple/20' : 'bg-brand-pink shadow-pink-200/20'}`}>
                  <div className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1 ${isDarkMode ? 'text-tech-purple' : 'text-pink-500'}`}>DEVELOPMENT</div>
                  <div className={`font-hand text-xl md:text-2xl leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                    {phase === 'floating' && (
                      <Typewriter text="Building robust software systems" />
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Label 3: Foundations */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase === 'floating' ? { 
                opacity: 1,
                scale: 1
              } : { opacity: 0, scale: 0.8 }}
              whileHover={{ 
                opacity: 1, 
                scale: 1.05,
                zIndex: 30,
                transition: { delay: 0, duration: 0.2 } 
              }}
              transition={{ 
                duration: 0.8,
                delay: 3.5 // After Development
              }}
              className="absolute bottom-[15%] md:bottom-[12%] left-[5%] md:left-[5%] pointer-events-auto cursor-pointer"
            >
              <motion.div style={{ x: depth1X, y: depth1Y }}>
                <div className={`bento-card border border-white/50 shadow-xl w-48 md:w-64 rotate-[5deg] p-6 transition-all duration-500 ${isDarkMode ? 'bg-neutral-950/80 border-tech-green/30 shadow-tech-green/20' : 'bg-brand-green shadow-green-200/20'}`}>
                  <div className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1 ${isDarkMode ? 'text-tech-green' : 'text-green-600'}`}>AI FOUNDATIONS</div>
                  <div className={`font-hand text-xl md:text-2xl leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                    {phase === 'floating' && (
                      <Typewriter text="Mastering neural networks" />
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Label 4: Identity/Portrait (IMAGE) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase === 'floating' ? { 
                opacity: 1,
                scale: 1
              } : { opacity: 0, scale: 0.8 }}
              whileHover={{ 
                opacity: 1, 
                scale: 1.02,
                zIndex: 30,
                transition: { delay: 0, duration: 0.2 } 
              }}
              transition={{ 
                duration: 0.8,
                delay: 0.5 // Appears first after heading
              }}
              className="absolute bottom-[21%] md:bottom-[10%] right-[8%] md:right-[10%] pointer-events-auto cursor-pointer"
            >
              <motion.div style={{ x: depth2X, y: depth2Y }}>
                <div className={`bento-card border shadow-2xl p-2 w-44 md:w-56 rotate-[-4deg] transition-all duration-500 ${isDarkMode ? 'bg-neutral-950/80 border-neutral-800' : 'bg-white border-neutral-100 shadow-[0_0_25px_rgba(255,255,255,0.7)]'}`}>
                  <div className="aspect-[4/5] bg-neutral-100 dark:bg-neutral-800 rounded-2xl overflow-hidden mb-3">
                  <img 
                    src="/image/Ling.jpg" 
                    alt="Lingling" 
                    className="w-full h-full object-cover brightness-110"
                    referrerPolicy="no-referrer"
                  />
                  </div>
                  <div className={`text-[12px] font-mono text-center mb-1 tracking-widest ${isDarkMode ? 'text-neutral-500' : 'text-neutral-600'}`}>LONDON, UK</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Label 5: UI/UX (New) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase === 'floating' ? { 
                opacity: 1,
                scale: 1
              } : { opacity: 0, scale: 0.8 }}
              whileHover={{ 
                opacity: 1, 
                scale: 1.05,
                zIndex: 30,
                transition: { delay: 0, duration: 0.2 } 
              }}
              transition={{ 
                duration: 0.8,
                delay: 4.0 
              }}
              className="absolute top-[42%] md:top-[48%] left-[5%] md:left-[14%] pointer-events-auto cursor-pointer"
            >
              <motion.div style={{ x: depth1X, y: depth1Y }}>
                <div className={`bento-card border shadow-xl w-40 md:w-56 rotate-[18deg] p-4 text-center transition-all duration-500 ${isDarkMode ? 'bg-neutral-950/80 border-tech-purple/30 shadow-tech-purple/20' : 'bg-brand-purple border-white/50 shadow-purple-200/20'}`}>
                  <div className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1 ${isDarkMode ? 'text-tech-purple' : 'text-purple-600'}`}>UI/UX</div>
                  <div className={`font-hand text-lg md:text-xl ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                    {phase === 'floating' && (
                      <Typewriter text="Human-centric design" />
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Label 6: Robotics */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase === 'floating' ? { 
                opacity: 1,
                scale: 1
              } : { opacity: 0, scale: 0.8 }}
              whileHover={{ 
                opacity: 1, 
                scale: 1.05,
                zIndex: 30,
                transition: { delay: 0, duration: 0.2 } 
              }}
              transition={{ 
                duration: 0.8,
                delay: 4.5
              }}
              className="absolute top-[25%] md:top-[26%] right-[20%] md:right-[20%] pointer-events-auto cursor-pointer"
            >
              <motion.div style={{ x: depth2X, y: depth2Y }}>
                <div className={`bento-card border shadow-xl w-40 md:w-56 rotate-[-3deg] p-4 text-center transition-all duration-500 ${isDarkMode ? 'bg-neutral-950/80 border-neutral-800 shadow-white/5' : 'bg-white border-neutral-100 shadow-[0_0_20px_rgba(255,255,255,0.8)]'}`}>
                  <div className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>ROBOTICS</div>
                  <div className={`font-hand text-lg md:text-xl ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                    {phase === 'floating' && (
                      <Typewriter text="Hardware Implementation" />
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Central Typography */}
          <div className="relative z-10 text-center max-w-4xl px-4 w-full -mt-16 md:-mt-24">
            <h1 className="text-2xl md:text-5xl font-hand mb-2 leading-[1.1] text-neutral-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] min-h-[2em] px-2">
                <Typewriter 
                  key={loopKey}
                  text="What's my next breakthrough?" 
                  onComplete={handleTypewriterComplete} 
                />
            </h1>
          </div>
        </section>

        {/* About */}
        <section id="about" className="max-w-5xl mx-auto px-2 space-y-8">
          <div className="text-center space-y-2">
            <div className="text-[13px] font-bold uppercase tracking-[0.4em] text-neutral-400">ABOUT ME</div>
            <h2 className="text-4xl md:text-6xl font-hand leading-tight">Curious, practical, and research-minded</h2>
            <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-lg max-w-2xl mx-auto">
            I am developing a foundation in computer science, artificial intelligence, databases, and web technologies, with a focus on building practical systems across software, AI, and automation.
            </p>
          </div>
          
          <div className="space-y-8 max-w-5xl mx-auto">
            {SKILL_CATEGORIES.map((category, catIdx) => (
              <div key={category.title} className="space-y-4">
                <div className="flex items-center gap-4">
                <div className={`h-px flex-grow transition-colors duration-500 ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}></div>
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] text-neutral-400 shrink-0">{category.title}</h3>
                  <div className={`h-px flex-grow transition-colors duration-500 ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {category.skills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (catIdx * 0.1) + (idx * 0.05) }}
                      className={`group flex flex-col items-center justify-center p-6 rounded-[2.5rem] border transition-all duration-500 
                        ${isDarkMode 
                          ? 'bg-black border-neutral-800 shadow-[0_0_30px_rgba(77,139,139,0.05)] hover:shadow-[0_0_50px_rgba(77,139,139,0.2)] hover:border-tech-green/50' 
                          : `border-neutral-100/50 ${skill.color}`}`}
                    >
                      <div className={`p-3 rounded-2xl mb-3 transition-all duration-300 group-hover:scale-110 
                        ${isDarkMode 
                          ? 'bg-neutral-800/50 text-tech-green group-hover:bg-tech-blue group-hover:text-black group-hover:shadow-[0_0_20px_rgba(77,139,139,0.6)]' 
                          : 'bg-white/30 text-neutral-700 group-hover:bg-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]'}`}>
                        {skill.icon}
                      </div>
                      <div className={`font-sans font-bold text-sm tracking-widest uppercase transition-colors text-center 
                        ${isDarkMode ? 'text-neutral-400 group-hover:text-tech-blue' : 'text-neutral-800/80 group-hover:text-neutral-900'}`}>{skill.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="max-w-7xl mx-auto px-2 space-y-6">
          <div className="space-y-2 text-center">
            <div className="text-[13px] font-bold uppercase tracking-[0.2em] text-neutral-400">WORK EXPERIENCES</div>
            <h2 className={`text-4xl md:text-6xl font-hand leading-tight font-medium max-w-2xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]' : 'text-neutral-900'}`}>Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 justify-center">
            {(projectsList.length ? projectsList : PROJECTS).filter((project) => project.draft !== true).map((project, idx) => (
              <motion.div
                key={project.id || project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group border p-8 flex flex-col h-full rounded-3xl transition-all relative
                  ${isDarkMode 
                    ? 'bg-black border-neutral-800 shadow-[0_0_30px_rgba(0,240,255,0.05)] hover:shadow-[0_0_50px_rgba(0,240,255,0.2)] hover:border-tech-blue/50' 
                    : 'bg-white border-neutral-100 shadow-xl shadow-neutral-200/20 hover:shadow-2xl hover:shadow-neutral-300/40 hover:border-neutral-200'}`}
              >
                <div className="text-[14px] text-neutral-500 font-sans font-medium uppercase tracking-[0.15em] mb-6"> {project.category}</div>
                <h3 className="font-hand text-3xl mb-3 leading-tight dark:text-white">{project.title}</h3>
                <p className="text-lg text-neutral-400 font-sans leading-relaxed mb-8 flex-grow">{project.description}</p>
                <div className="mt-auto">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-[13px] font-bold tracking-widest uppercase transition-colors 
                      ${isDarkMode ? 'text-white group-hover:text-tech-blue' : 'text-neutral-900 group-hover:text-tech-green'}`}
                  >
                    {project.type} <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Blog */}
        <section id="blog" className="max-w-7xl mx-auto px-2 space-y-6">
          <div className="space-y-2 text-center">
            <div className="text-[13px] font-bold uppercase tracking-[0.4em] text-neutral-400">RECENT POSTS</div>
            <h2 className={`text-4xl md:text-6xl font-hand max-w-2xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]' : 'text-neutral-900'}`}>Blogs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            {(blogs.length ? blogs : POSTS).filter((post) => post.draft !== true).map((post) => (
              <motion.div
                key={post.id || post.title}
                className={`group border p-8 flex flex-col h-full rounded-3xl transition-all relative
                  ${isDarkMode 
                    ? 'bg-black border-neutral-800 shadow-[0_0_30px_rgba(0,240,255,0.05)] hover:shadow-[0_0_50px_rgba(0,240,255,0.2)] hover:border-tech-blue/50' 
                    : 'bg-white border-neutral-100 shadow-xl shadow-neutral-200/20 hover:shadow-2xl hover:shadow-neutral-300/40 hover:border-neutral-200'}`}
              >
                <div className="text-[14px] text-neutral-300 dark:text-neutral-600 font-mono font-bold uppercase tracking-widest mb-4">{post.date}</div>
                <h3 className="font-hand text-3xl mb-3 leading-tight dark:text-white">{post.title}</h3>
                <p className="text-lg text-neutral-400 dark:text-neutral-500 font-sans mb-8 leading-relaxed">{post.description}</p>
                <div className="mt-auto">
                  <a href={post.link} 
                  className={`inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.3em] uppercase transition-all 
                        ${isDarkMode 
                          ? 'text-white group-hover:text-tech-blue' 
                          : 'text-neutral-900 group-hover:text-tech-green text-black'}`}
                    >
                    READ MORE <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience & Education */}
        <div className="max-w-7xl mx-auto px-2 flex flex-col gap-20 py-10">
          <section id="experience" className="space-y-6 w-full">
          <div className="space-y-2 text-center px-8">
              <div className="text-[13px] font-bold uppercase tracking-[0.2em] text-neutral-400">EXPERIENCES</div>
              <h2 className={`text-4xl md:text-6xl font-hand leading-tight font-medium max-w-2xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]' : 'text-neutral-900'}`}>Experiences</h2>
            </div>
            
            <ExperienceCarousel isDarkMode={isDarkMode} />
          </section>

          <section id="education" className="space-y-12 w-full pt-4">
          <div className="space-y-2 text-center">
              <div className="text-[13px] font-bold uppercase tracking-[0.2em] text-neutral-400">EDUCATION</div>
              <h2 className={`text-4xl md:text-6xl font-hand leading-tight font-medium max-w-2xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]' : 'text-neutral-900'}`}>Academic Foundation</h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`p-16 flex flex-col items-center text-center space-y-8 rounded-[3rem] transition-all duration-500 border ${isDarkMode ? 'bg-neutral-900/50 border-neutral-800 shadow-[0_20px_50px_-20px_rgba(0,240,255,0.1)] backdrop-blur-xl' : 'bg-[#e8f3f1] border-transparent shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]'}`}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <GraduationCap className={`w-8 h-8 transition-colors ${isDarkMode ? 'text-tech-blue drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]' : 'text-neutral-800'}`} />
              </div>
              <div className="space-y-2">
                <h4 className={`font-sans font-bold text-[22px] ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>BSc Computer Science and Artificial Intelligence</h4>
                <p className={`text-m font-sans ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Queen Mary University of London | 2024 - current</p>
              </div>
              <div className={`px-8 py-3 rounded-full text-[14px] font-bold tracking-[0.2em] uppercase transition-all duration-500 cursor-default ${
                isDarkMode 
                  ? 'bg-neutral-800/50 text-tech-blue border border-tech-blue/20 hover:border-tech-blue/40 hover:bg-neutral-800 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]' 
                  : 'bg-white/50 text-[#4d8b8b] border border-transparent hover:bg-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]'
            }`}>
                FUTURE FOCUS: AI & ROBOTICS
              </div>
            </motion.div>
          </section>
        </div>

        {/* Contact */}
        <section id="contact" className={`pt-40 transition-colors duration-500 ${isDarkMode ? 'bg-neutral-950' : 'bg-black'}`}>
          <div className="max-w-7xl mx-auto px-8 text-center mb-16">
            <div className="text-[13px] font-bold uppercase tracking-[0.2em] text-neutral-400">CONTACT</div>
            <h2 className={`text-6xl md:text-8xl font-hand leading-[1.1] max-w-10xl mx-auto ${isDarkMode ? 'text-white' : 'text-white'}`}>
              Let's build something <br /> next.
            </h2>
          </div>
          
          <div className="pb-24">
            <div className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center">
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a 
                  href="mailto:l.he@se24.qmul.ac.uk" 
                  className={`pl-2 pr-10 py-2 rounded-full border transition-all hover:shadow-xl hover:translate-y-[-2px] group text-[16px] font-bold tracking-wider flex items-center gap-4 ${isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white hover:border-tech-green/50 shadow-tech-green/5' : 'bg-white border-neutral-100 text-neutral-900 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-neutral-800 text-tech-blue group-hover:bg-tech-blue group-hover:text-black' : 'bg-neutral-50 group-hover:bg-black group-hover:text-white'}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  Email
                </a>
                <a 
                  href="https://www.linkedin.com/in/lingling-he-a61a10263/" 
                  className={`pl-2 pr-10 py-2 rounded-full border transition-all hover:shadow-xl hover:translate-y-[-2px] group text-[16px] font-bold tracking-wider flex items-center gap-4 ${isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white hover:border-tech-blue/50 shadow-tech-blue/5' : 'bg-white border-neutral-100 text-neutral-900 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-neutral-800 text-tech-blue group-hover:bg-tech-blue group-hover:text-black' : 'bg-neutral-50 group-hover:bg-black group-hover:text-white'}`}>
                    <Linkedin className="w-5 h-5" />
                  </div>
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/OOOHC" 
                  className={`pl-2 pr-10 py-2 rounded-full border transition-all hover:shadow-xl hover:translate-y-[-2px] group text-[16px] font-bold tracking-wider flex items-center gap-4 ${isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white hover:border-tech-blue/50 shadow-tech-blue/5' : 'bg-white border-neutral-100 text-neutral-900 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-neutral-800 text-tech-blue group-hover:bg-tech-blue group-hover:text-black' : 'bg-neutral-50 group-hover:bg-black group-hover:text-white'}`}>
                    <Github className="w-5 h-5" />
                  </div>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <footer className="py-8 bg-black border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-8 flex justify-center items-center">
          <div className="text-[12px] font-bold text-neutral-500 tracking-[0.4em] uppercase font-sans text-center">
            © 2026 LingLing He
          </div>
        </div>
      </footer>

      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`w-full max-w-md p-8 rounded-[2rem] border transition-colors duration-500
              ${isDarkMode
                ? 'bg-neutral-900 border-neutral-800 text-white shadow-[0_0_50px_rgba(0,240,255,0.15)]'
                : 'bg-white border-neutral-100 text-neutral-900 shadow-2xl shadow-neutral-200/50'}`}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Lock className={`w-5 h-5 ${isDarkMode ? 'text-tech-purple' : 'text-neutral-900'}`} />
                <h3 className="text-xl font-bold tracking-wider font-mono">ADMIN LOGIN</h3>
              </div>
              <button
                onClick={() => { setIsLoginModalOpen(false); setLoginError(""); }}
                className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Username or Email</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your username or email"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none transition-all
                    ${isDarkMode
                      ? 'bg-neutral-950 border-neutral-800 text-white focus:border-tech-purple/50 focus:shadow-[0_0_15px_rgba(188,0,255,0.2)]'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-950 focus:border-neutral-800'}`}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter administrator password..."
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none transition-all
                    ${isDarkMode
                      ? 'bg-neutral-950 border-neutral-800 text-white focus:border-tech-purple/50 focus:shadow-[0_0_15px_rgba(188,0,255,0.2)]'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-950 focus:border-neutral-800'}`}
                />
              </div>

              {loginError && (
                <div className="text-xs font-mono text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all
                  ${isDarkMode
                    ? 'bg-tech-purple text-white hover:bg-opacity-90 shadow-[0_0_20px_rgba(188,0,255,0.3)]'
                    : 'bg-black text-white hover:bg-neutral-900'}`}
              >
                SIGN IN
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {isAdminPanelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`w-full max-w-2xl h-full p-8 overflow-y-auto border-l flex flex-col justify-between
              ${isDarkMode
                ? 'bg-neutral-950 border-neutral-800 text-white'
                : 'bg-white border-neutral-200 text-neutral-900'}`}
          >
            <div>
            <div className="flex justify-between items-center mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <div>
                  <h3 className="text-xl font-bold tracking-wider font-mono">DASHBOARD CONSOLE</h3>
                </div>
                <button
                  onClick={() => { setIsAdminPanelOpen(false); clearBlogForm(); clearProjectForm(); }}
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex mb-6 font-mono text-s gap-4">
                <button
                  onClick={() => {
                    setActiveAdminTab("blogs");
                    clearProjectForm();
                  }}
                  className={`pb-2 px-1 border-b-2 transition-all font-bold 
                    ${activeAdminTab === "blogs" 
                      ? (isDarkMode ? "border-tech-blue text-tech-blue" : "border-neutral-900 text-neutral-900") 
                      : (isDarkMode ? "border-transparent text-neutral-500 hover:text-neutral-300" : "border-transparent text-neutral-400 hover:text-neutral-600")}`}
                >
                  MANAGE BLOG POSTS
                </button>
                <button
                  onClick={() => {
                    setActiveAdminTab("projects");
                    clearBlogForm();
                  }}
                  className={`pb-2 px-1 border-b-2 transition-all font-bold 
                    ${activeAdminTab === "projects" 
                      ? (isDarkMode ? "border-tech-blue text-tech-blue" : "border-neutral-900 text-neutral-900") 
                      : (isDarkMode ? "border-transparent text-neutral-500 hover:text-neutral-300" : "border-transparent text-neutral-400 hover:text-neutral-600")}`}
                >
                  MANAGE PROJECTS
                </button>
              </div>

              {activeAdminTab === "blogs" ? (
                <>
                  <div className={`p-6 rounded-2xl border mb-6 transition-all duration-300
                    ${isDarkMode ? 'bg-neutral-900/30 border-neutral-800/80' : 'bg-neutral-50 border-neutral-200'}`}>
                    <h4 className={`text-xs font-bold tracking-widest uppercase font-mono mb-4 
                      ${isDarkMode ? 'text-tech-purple' : 'text-brand-sage-500'}`}>
                      {editingBlogId ? "EDIT POST ENTRY" : "WRITE NEW BLOG POST"}
                    </h4>

                    <form onSubmit={handleCreateOrUpdateBlog} className="space-y-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          placeholder="Future of Intelligence..."
                          value={blogFormTitle}
                          onChange={(e) => setBlogFormTitle(e.target.value)}
                          className={`w-full px-3 py-2.5 rounded-xl border text-[13px] font-mono focus:outline-none
                            ${isDarkMode 
                              ? 'bg-neutral-950 border-neutral-800 text-white' 
                              : 'bg-white border-neutral-200 text-neutral-950'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Description</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Enter a captivating abstract summary..."
                          value={blogFormDescription}
                          onChange={(e) => setBlogFormDescription(e.target.value)}
                          className={`w-full px-3 py-2.5 rounded-xl border text-[13px] font-sans focus:outline-none
                            ${isDarkMode 
                              ? 'bg-neutral-950 border-neutral-800 text-white' 
                              : 'bg-white border-neutral-200 text-neutral-950'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Reference / Read More Link (Optional)</label>
                        <input
                          type="text"
                          placeholder="https://"
                          value={blogFormLink}
                          onChange={(e) => setBlogFormLink(e.target.value)}
                          className={`w-full px-3 py-2.5 rounded-xl border text-[13px] font-mono focus:outline-none
                            ${isDarkMode 
                              ? 'bg-neutral-950 border-neutral-800 text-white' 
                              : 'bg-white border-neutral-200 text-neutral-950'}`}
                        />
                      </div>

                      {blogFormError && <div className="text-xs font-mono text-red-500">{blogFormError}</div>}

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button type="submit" className={`px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all
                            ${isDarkMode 
                              ? 'bg-tech-blue hover:bg-opacity-90 text-black shadow-[0_0_15px_rgba(188,0,255,0.25)] hover:shadow-[0_0_25px_rgba(188,0,255,0.45)]' 
                              : 'bg-brand-sage-600 hover:bg-brand-sage-700 text-white shadow-md hover:shadow-lg hover:shadow-brand-sage-100'}`}
                        >
                          {editingBlogId ? "PUBLISH UPDATE" : "PUBLISH POST"}
                        </button>
                        <button type="button" onClick={(e) => handleCreateOrUpdateBlog(e, true)} className="px-5 py-2.5 bg-neutral-600 hover:bg-neutral-700 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all">
                          {editingBlogId ? "SAVE AS DRAFT" : "SAVE DRAFT"}
                        </button>
                        {editingBlogId && (
                          <button type="button" onClick={clearBlogForm} className="px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 text-xs font-bold uppercase tracking-widest rounded-xl transition-all font-mono">
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold tracking-widest uppercase font-mono mb-4 text-neutral-400">MANAGE RECENT ENTRIES</h4>
                    <div className="space-y-3">
                      {(blogs.length ? blogs : POSTS).map((b) => (
                        <div key={b.id || b.title} className={`px-4 py-2 rounded-xl border flex items-center justify-between gap-4 ${isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-950'}`}>
                          <div className="overflow-hidden">
                            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mr-2">{b.date}</span>
                            <h5 className="font-bold text-[15px] truncate flex items-center gap-2">
                              {b.title}
                              {b.draft && <span className={`px-1.5 py-0.5 text-[14px] font-mono tracking-widest uppercase font-bold rounded scale-90 origin-left border
                                  ${isDarkMode 
                                    ? 'text-tech-blue bg-tech-blue/10 border-tech-blue/30' 
                                    : 'text-brand-sage-600 bg-brand-sage-50 border-brand-sage-200'}`}>DRAFT</span>}
                            </h5>
                            <p className="text-[13px] text-neutral-400 truncate max-w-md">{b.description}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => startEditBlog(b)} className={`p-1.5 rounded-lg border transition-all duration-200 outline-none
                                ${isDarkMode 
                                  ? 'bg-tech-blue/10 text-tech-blue border-tech-blue/20 hover:bg-tech-blue hover:text-black hover:border-tech-blue hover:shadow-[0_0_10px_rgba(0,240,255,0.4)]' 
                                  : 'bg-brand-sage-50 text-brand-sage-600 border-brand-sage-100 hover:bg-brand-sage-600 hover:text-white hover:border-brand-sage-600 shadow-sm'}`}
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            {b.id && (
                              <button onClick={() => handleDeleteBlog(b.id)} className={`p-1.5 rounded-lg border transition-all duration-200 outline-none
                                ${isDarkMode 
                                  ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_0_10px_rgba(239,68,68,0.4)]' 
                                  : 'bg-white text-red-600 border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-sm shadow-red-50'}`} title="Delete">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={`p-6 rounded-2xl border mb-8 transition-all duration-300
                    ${isDarkMode ? 'bg-neutral-900/30 border-neutral-800/80' : 'bg-neutral-50 border-neutral-200'}`}>
                    <h4 className={`text-xs font-bold tracking-widest uppercase font-mono mb-4 
                      ${isDarkMode ? 'text-tech-purple' : 'text-brand-sage-500'}`}>
                      {editingProjectId ? "EDIT PROJECT ENTRY" : "CREATE NEW PROJECT"}
                    </h4>

                    <form onSubmit={(e) => handleCreateOrUpdateProject(e, false)} className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Category</label>
                          <input type="text" required placeholder="INTRODUCTION TO ROBOTICS..." value={projectFormCategory} onChange={(e) => setProjectFormCategory(e.target.value)} className={`w-full px-3 py-2.5 rounded-xl border text-[13px] font-mono focus:outline-none
                              ${isDarkMode 
                                ? 'bg-neutral-950 border-neutral-800 text-white' 
                                : 'bg-white border-neutral-200 text-neutral-950'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Action Type / Label</label>
                          <input type="text" required placeholder="VIEW PROJECT or OPEN PDF..." value={projectFormType} onChange={(e) => setProjectFormType(e.target.value)} className={`w-full px-3 py-2.5 rounded-xl border text-[13px] font-mono focus:outline-none 
                              ${isDarkMode 
                                ? 'bg-neutral-950 border-neutral-800 text-white' 
                                : 'bg-white border-neutral-200 text-neutral-950'}`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Title</label>
                        <input type="text" required placeholder="Project title..." value={projectFormTitle} onChange={(e) => setProjectFormTitle(e.target.value)} className={`w-full px-3 py-2.5 rounded-xl border text-[13px] font-sans focus:outline-none
                            ${isDarkMode 
                              ? 'bg-neutral-950 border-neutral-800 text-white' 
                              : 'bg-white border-neutral-200 text-neutral-950'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Description</label>
                        <textarea required rows={3} placeholder="Describe the technical scope and accomplishments..." value={projectFormDescription} onChange={(e) => setProjectFormDescription(e.target.value)} className={`w-full px-3 py-2.5 rounded-xl border text-[13px] font-sans focus:outline-none
                            ${isDarkMode 
                              ? 'bg-neutral-950 border-neutral-800 text-white' 
                              : 'bg-white border-neutral-200 text-neutral-950'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Project reference link (Optional)</label>
                        <input type="text" placeholder="https:// or #" value={projectFormLink} onChange={(e) => setProjectFormLink(e.target.value)} className={`w-full px-3 py-2.5 rounded-xl border text-[13px] font-mono focus:outline-none
                            ${isDarkMode 
                              ? 'bg-neutral-950 border-neutral-800 text-white' 
                              : 'bg-white border-neutral-200 text-neutral-950'}`}
                        />
                      </div>

                      {projectFormError && <div className="text-xs font-mono text-red-500">{projectFormError}</div>}

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button type="submit" className={`px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all
                            ${isDarkMode 
                              ? 'bg-tech-blue hover:bg-opacity-90 text-black shadow-[0_0_15px_rgba(188,0,255,0.25)] hover:shadow-[0_0_25px_rgba(188,0,255,0.45)]' 
                              : 'bg-brand-sage-600 hover:bg-brand-sage-700 text-white shadow-md hover:shadow-lg hover:shadow-brand-sage-100'}`}
                        >
                          {editingProjectId ? "PUBLISH UPDATE" : "PUBLISH PROJECT"}
                        </button>
                        <button type="button" onClick={(e) => handleCreateOrUpdateProject(e, true)} className="px-5 py-2.5 bg-neutral-600 hover:bg-neutral-700 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all">
                          {editingProjectId ? "SAVE AS DRAFT" : "SAVE DRAFT"}
                        </button>
                        {editingProjectId && (
                          <button type="button" onClick={clearProjectForm} className="px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 text-xs font-bold uppercase tracking-widest rounded-xl transition-all font-mono">
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold tracking-widest uppercase font-mono mb-4 text-neutral-400">MANAGE RECENT PROJECTS</h4>
                    <div className="space-y-3">
                      {(projectsList.length ? projectsList : PROJECTS).map((p) => (
                        <div key={p.id || p.title} className={`px-4 py-2 rounded-xl border flex items-center justify-between gap-4 ${isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-950'}`}>
                          <div className="overflow-hidden">
                            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mr-2">{p.category}</span>
                            <h5 className="font-bold text-[15px] truncate flex items-center gap-2">
                              {p.title}
                              {p.draft && <span className={`px-1.5 py-0.5 text-[14px] font-mono tracking-widest uppercase font-bold rounded scale-90 origin-left border
                                  ${isDarkMode 
                                    ? 'text-tech-blue bg-tech-blue/10 border-tech-blue/30' 
                                    : 'text-brand-sage-600 bg-brand-sage-50 border-brand-sage-200'}`}>DRAFT</span>}
                            </h5>
                            <p className="text-[13px] text-neutral-400 truncate max-w-md">{p.description}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => startEditProject(p)} className={`p-1.5 rounded-lg border transition-all duration-200 outline-none
                                ${isDarkMode 
                                  ? 'bg-tech-blue/10 text-tech-blue border-tech-blue/20 hover:bg-tech-blue hover:text-black hover:border-tech-blue hover:shadow-[0_0_10px_rgba(0,240,255,0.4)]' 
                                  : 'bg-brand-sage-50 text-brand-sage-600 border-brand-sage-100 hover:bg-brand-sage-600 hover:text-white hover:border-brand-sage-600 shadow-sm'}`}
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            {p.id && (
                              <button onClick={() => handleDeleteProject(p.id)} className={`p-1.5 rounded-lg border transition-all duration-200 outline-none
                                ${isDarkMode 
                                  ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_0_10px_rgba(239,68,68,0.4)]' 
                                  : 'bg-white text-red-600 border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-sm shadow-red-50'}`} title="Delete">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 mt-8 flex justify-between items-center">
              <span className="text-xs font-mono text-neutral-400">Session Active</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white text-xs font-mono uppercase tracking-widest font-bold rounded-xl transition-all">
                SIGN OUT
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
