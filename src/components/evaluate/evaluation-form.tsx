"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  Code2,
  Sparkles,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import {
  PersonalizedCodeFeedbackOutput,
  getPersonalizedCodeFeedback,
} from "@/ai/flows/personalized-code-feedback";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EvaluationAnalysisReport } from "./evaluation-analysis-report";
import { CopyButton } from "@/components/shared/copy-button";
import { evaluateStaticCode } from "@/lib/evaluator";

const formSchema = z.object({
  programmingLanguage: z.string().min(1, "Please select a language."),
  userSkillLevel: z.string().min(1, "Please select your skill level."),
  code: z.string().min(20, "Please enter at least 20 characters of code."),
  userCodingStyle: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const sampleSnippets: Record<
  string,
  { lang: string; skill: string; code: string; label: string }
> = {
  python: {
    label: "Python: Two Sum",
    lang: "python",
    skill: "beginner",
    code: `def two_sum(nums, target):
    # Hash map to store index of seen numbers
    lookup = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup:
            return [lookup[complement], i]
        lookup[num] = i
    return []`,
  },
  cpp: {
    label: "C++: Binary Search",
    lang: "cpp",
    skill: "intermediate",
    code: `#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
  },
  javascript: {
    label: "JavaScript: Valid Palindrome",
    lang: "javascript",
    skill: "beginner",
    code: `function isPalindrome(s) {
  // Clean alphanumeric characters and lowercase
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
  },
};

export function EvaluationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<PersonalizedCodeFeedbackOutput | null>(
    null,
  );
  const [evaluatedCode, setEvaluatedCode] = useState("");
  const [evaluatedLanguage, setEvaluatedLanguage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      programmingLanguage: "javascript",
      userSkillLevel: "beginner",
      code: "",
      userCodingStyle: "",
    },
  });

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }
  }, [result]);

  // Loading animation step cycle
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 4);
      }, 1600);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const loadingMessages = [
    "Requesting Gemini feedback...",
    "Waiting for your AI review...",
    "Your review is still in progress...",
    "Larger solutions may take a little longer...",
  ];

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const feedback = await getPersonalizedCodeFeedback(values);
      setResult(feedback);
      setEvaluatedCode(values.code);
      setEvaluatedLanguage(values.programmingLanguage);
    } catch (e) {
      console.error(e);
      setError(
        "An error occurred while evaluating your code. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const loadPreset = (presetKey: string) => {
    const preset = sampleSnippets[presetKey];
    if (preset) {
      form.setValue("programmingLanguage", preset.lang);
      form.setValue("userSkillLevel", preset.skill);
      form.setValue("code", preset.code, { shouldValidate: true });
      setResult(null);
      setError(null);
    }
  };

  const handleClear = () => {
    form.setValue("code", "");
    setResult(null);
    setError(null);
  };

  const currentCode = form.watch("code");

  return (
    <div className="space-y-8">
      <p className="rounded-xl border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
        Your code is sent to Gemini for feedback. The static analysis below does
        not run your code. AI authorship cannot be reliably determined from code
        style alone; no keystroke or paste telemetry is collected by this
        evaluator.
      </p>
      {/* Sample Snippet Loaders */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-dustyPink-500" />
          Load sample:
        </span>
        {Object.entries(sampleSnippets).map(([key, item]) => (
          <Button
            key={key}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadPreset(key)}
            disabled={isLoading}
            className="text-xs h-7 px-3 border-border/60 hover:border-dustyPink/50 hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            {item.label}
          </Button>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="programmingLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-semibold">
                    Programming Language
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-card border-border/70 focus:ring-dustyPink-400">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="ruby">Ruby</SelectItem>
                      <SelectItem value="rust">Rust</SelectItem>
                      <SelectItem value="kotlin">Kotlin</SelectItem>
                      <SelectItem value="swift">Swift</SelectItem>
                      <SelectItem value="php">PHP</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userSkillLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-semibold">
                    Skill Level
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-card border-border/70 focus:ring-dustyPink-400">
                        <SelectValue placeholder="Select your skill level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">
                        Beginner (Clear explanations)
                      </SelectItem>
                      <SelectItem value="intermediate">
                        Intermediate (Deep analysis)
                      </SelectItem>
                      <SelectItem value="advanced">
                        Advanced (Micro-optimizations)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <FormLabel className="text-foreground font-semibold flex items-center gap-1.5">
                    <Code2 className="h-4 w-4 text-primary" />
                    <span>Source Code</span>
                  </FormLabel>
                  <div className="flex items-center gap-1.5">
                    {field.value && (
                      <>
                        <CopyButton
                          text={field.value}
                          label="Copy Code"
                          size="sm"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleClear}
                          disabled={isLoading}
                          className="text-xs h-7 text-muted-foreground hover:text-destructive"
                        >
                          Clear
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <FormControl>
                  <Textarea
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                    placeholder="// Your next improvement starts here.\n// Paste a solution or choose a sample above."
                    className="min-h-[330px] font-mono text-sm bg-muted/20 border-border/70 focus-visible:ring-dustyPink-400 focus-visible:border-primary rounded-xl leading-relaxed transition-all"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <div className="editor-status">
                  <span>
                    {currentCode ? currentCode.split("\n").length : 0} lines ·{" "}
                    {currentCode.length} characters
                  </span>
                  <span>Plain-text editor</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Button
              type="submit"
              disabled={isLoading || !currentCode || currentCode.length < 20}
              className="w-full sm:w-auto font-bold text-base px-8 py-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Evaluating Code...
                </>
              ) : (
                "Evaluate Code"
              )}
            </Button>
            {currentCode &&
              currentCode.length > 0 &&
              currentCode.length < 20 && (
                <span className="text-xs text-amber-500">
                  Please enter {20 - currentCode.length} more characters to
                  evaluate.
                </span>
              )}
          </div>
        </form>
      </Form>

      {/* Loading Animation Card */}
      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-dustyPink/40 bg-card/80 p-8 shadow-xl backdrop-blur-md animate-in fade-in duration-300"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-primary/10 border-2 border-primary border-t-transparent animate-spin" />
              <Sparkles className="h-6 w-6 text-dustyPink-500 absolute inset-0 m-auto animate-pulse" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-foreground">
                Analyzing Your Solution
              </h3>
              <p className="text-sm text-primary font-medium mt-1 animate-pulse font-mono">
                {loadingMessages[loadingStep]}
              </p>
            </div>
            <div className="w-full max-w-xs bg-muted/40 h-2 rounded-full overflow-hidden border border-border/50">
              <div
                className="animate-shimmer h-full transition-all duration-500 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-center text-destructive text-sm font-medium"
        >
          {error}
        </div>
      )}

      <div ref={resultsRef} className="scroll-mt-24">
        {result && (
          <EvaluationAnalysisReport
            result={result}
            staticReport={evaluateStaticCode(evaluatedCode, evaluatedLanguage)}
          />
        )}
      </div>
    </div>
  );
}
