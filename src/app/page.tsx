import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Code, Bot, BarChart, Trophy, Sparkles, ArrowRight, CheckCircle2, Shield, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaqSection } from '@/components/shared/faq-section';

const features = [
  {
    icon: Code,
    title: 'Code Evaluation',
    tag: 'Gemini AI Powered',
    description: 'Get instant multi-dimensional feedback on your code. Discover optimizations, readability insights, and personalized coaching.',
    link: '/evaluate',
  },
  {
    icon: Bot,
    title: 'AI Coding Mentor',
    tag: '24/7 Interactive',
    description: 'Ask algorithmic questions, get hints without spoilers, understand time complexities, and work through tricky problems.',
    link: '/chatbot',
  },
  {
    icon: BarChart,
    title: 'CP Tracker',
    tag: 'LeetCode & Codeforces',
    description: 'Track submissions, visual timelines, and activity heatmaps across multiple platforms to stay consistent and competitive.',
    link: '/cp-tracker',
  },
  {
    icon: Trophy,
    title: 'Global Leaderboard',
    tag: 'Friendly Competition',
    description: 'Climb the rankings, earn ratings on your problem solving quality, and benchmark yourself against fellow programmers.',
    link: '/leaderboard',
  }
];

const highlights = [
  'Instant AI-Powered Feedback with line-by-line breakdown',
  'Multi-Language Support (C++, Python, JS, Java, Rust & more)',
  'AI Authorship Detection & Style Consistency Analysis',
  'Tailored for Beginner to Advanced Competitive Coders',
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-minimal-code');

  return (
    <div className="relative isolate overflow-hidden bg-background">
      {/* Background Decorative Mesh Gradients */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-burgundy-700 via-primary to-dustyPink-400 opacity-25 dark:opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 sm:pt-28 lg:flex lg:items-center lg:gap-x-12 lg:px-8 lg:pt-32 min-h-[calc(100vh-4rem)]">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto animate-in fade-in slide-in-from-left-12 duration-700">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-dustyPink/25 text-xs font-semibold text-primary mb-6 backdrop-blur-sm">
            <Flame className="h-3.5 w-3.5 text-dustyPink-500 fill-dustyPink-500/20" />
            <span>Next-Gen Competitive Programming & Mentorship</span>
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            Go <span className="text-primary italic underline decoration-dustyPink decoration-wavy decoration-2">All In</span> On Your Code
          </h1>

          <p className="mt-6 text-lg sm:text-xl leading-8 text-muted-foreground">
            A serious developer platform engineered with elegant burgundy, cream, and dusty pink aesthetics. Evaluate your logic, conquer coding contests, and receive personalized feedback from Gemini AI.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              asChild
              size="lg"
              className="font-bold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 px-7"
            >
              <Link href="/evaluate">
                Evaluate Code Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-semibold text-base border-border/80 hover:border-dustyPink/50 hover:bg-accent/15 transition-all duration-300"
            >
              <Link href="/chatbot">Talk to AI Mentor &rarr;</Link>
            </Button>
          </div>

          {/* Highlights checklist */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-border/40">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-dustyPink-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image / Card Preview */}
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow animate-in fade-in slide-in-from-right-12 duration-700">
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-primary via-dustyPink-500 to-burgundy-700 opacity-30 blur-xl transition-all duration-500 group-hover:opacity-60" />
            <div className="relative overflow-hidden rounded-2xl border border-dustyPink/30 bg-card/80 p-2 shadow-2xl backdrop-blur-sm">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  width={600}
                  height={400}
                  priority
                  className="w-full h-auto rounded-xl object-cover ring-1 ring-foreground/10 transition-transform duration-500 hover:scale-[1.02]"
                />
              )}
              <div className="p-4 flex items-center justify-between border-t border-border/40 mt-2 bg-card/60 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-muted-foreground">Gemini 3.5 AI Engine Active</span>
                </div>
                <span className="text-xs font-medium text-dustyPink-400 bg-primary/10 px-2.5 py-1 rounded-full border border-dustyPink/20">
                  Ready to Evaluate
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <Sparkles className="h-3 w-3 text-dustyPink-500" />
              <span>Full Developer Suite</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Everything You Need to Master Your Code
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              A comprehensive platform designed to turn practice into genuine mastery with real-time AI critique.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-500"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <Card className="bg-card/70 border-border/60 hover:border-dustyPink/50 h-full flex flex-col hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5 transition-all duration-300 group rounded-2xl overflow-hidden backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="bg-primary/10 text-primary p-3 rounded-xl border border-dustyPink/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <feature.icon className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-medium text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full border border-border/50">
                          {feature.tag}
                        </span>
                      </div>
                      <CardTitle className="font-headline text-xl text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow pt-0">
                      <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                        {feature.description}
                      </p>
                      <Button
                        asChild
                        variant="link"
                        className="mt-4 px-0 text-primary group-hover:text-dustyPink-500 group-hover:translate-x-1 transition-all justify-start w-fit font-semibold text-sm"
                      >
                        <Link href={feature.link}>
                          Explore feature &rarr;
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expandable FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm py-12 text-sm text-muted-foreground">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold font-headline text-xs">
              AI
            </div>
            <span className="font-headline font-bold text-foreground text-base">ALL IN</span>
            <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs sm:text-sm">
            <Link href="/evaluate" className="hover:text-primary transition-colors">Evaluate</Link>
            <Link href="/chatbot" className="hover:text-primary transition-colors">AI Chatbot</Link>
            <Link href="/cp-tracker" className="hover:text-primary transition-colors">CP Tracker</Link>
            <Link href="/leaderboard" className="hover:text-primary transition-colors">Leaderboard</Link>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
        </div>
      </footer>

      {/* Bottom decorative gradient */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-burgundy-800 via-primary to-dustyPink-400 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}
