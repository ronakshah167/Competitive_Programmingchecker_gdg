"use client";

import * as React from "react";
import { HelpCircle, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "item-1",
    question: "How does the AI evaluate my code?",
    answer:
      "ALL IN uses Google Gemini AI (via Google Genkit) to perform an in-depth, multi-dimensional code evaluation. It assesses your solution across readability, logic, optimization, and maintainability, assigns an overall score (1-5), and generates beginner-friendly line-by-line explanations alongside concrete suggestions for improvement.",
  },
  {
    id: "item-2",
    question: "Which programming languages are supported?",
    answer:
      "We support all major languages including JavaScript, Python, C++, Java, TypeScript, C#, Go, Rust, Kotlin, Swift, Ruby, PHP, HTML, and CSS. The evaluation prompt automatically adapts its syntax and idiom checks to your chosen language.",
  },
  {
    id: "item-3",
    question: "Can ALL IN tell if code was written by AI?",
    answer:
      "No reliable authorship conclusion can be drawn from code style alone. The authorship section explains this limitation; AI feedback should never be treated as proof of who wrote a solution.",
  },
  {
    id: "item-4",
    question: "What can I ask the AI Chatbot?",
    answer:
      "The AI chatbot acts as your 24/7 coding mentor. You can ask for hints on competitive programming problems, algorithmic intuition (such as DP, Graphs, or Two Pointers), time and space complexity breakdowns, syntax explanations, or bug troubleshooting without spoiling the whole solution.",
  },
  {
    id: "item-5",
    question: "How does the CP Tracker help me improve?",
    answer:
      "The CP Tracker consolidates your practice history across platforms like LeetCode and Codeforces into an interactive timeline and activity heatmap. You can monitor your submission accuracy, review past problem difficulty, and stay on top of upcoming contest schedules.",
  },
  {
    id: "item-6",
    question: "Is my submitted code kept private?",
    answer:
      "Your code is sent to Google Gemini to generate feedback. Avoid submitting credentials or confidential code. The static analyzer does not execute your code, and the evaluator does not collect keystroke or paste telemetry.",
  },
  {
    id: "item-7",
    question: "Can I switch between light and dark mode?",
    answer:
      "Use the sun or moon button in the navigation to switch between the light and graphite themes. Your preference is remembered on this device.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-dustyPink/20 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            <Sparkles className="h-3.5 w-3.5 text-dustyPink-500" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about ALL IN, code evaluations, AI
            assistance, and competitive tracking.
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-primary/5">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-border/50 rounded-xl px-5 py-1 transition-all duration-200 hover:border-dustyPink/40 data-[state=open]:border-primary/50 data-[state=open]:bg-primary/5"
              >
                <AccordionTrigger className="text-left font-headline text-base sm:text-lg font-semibold hover:no-underline hover:text-primary py-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-dustyPink-500 shrink-0" />
                    <span>{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pl-7 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
