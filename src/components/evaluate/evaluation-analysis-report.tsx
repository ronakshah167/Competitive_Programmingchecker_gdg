"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PersonalizedCodeFeedbackOutput } from "@/ai/flows/personalized-code-feedback";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import {
  Star,
  Sparkles,
  BookOpen,
  Lightbulb,
  BrainCircuit,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  Award,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CopyButton } from "@/components/shared/copy-button";
import { EvaluationReport, metricNames, weights } from "@/lib/evaluator";

interface EvaluationAnalysisReportProps {
  result: PersonalizedCodeFeedbackOutput;
  staticReport: EvaluationReport;
}

const CustomPolarAngleAxisTick = ({ payload, x, y, cx, cy, ...rest }: any) => {
  return (
    <text
      {...rest}
      y={y + (y - cy) / 10}
      x={x + (x - cx) / 10}
      className="fill-foreground font-semibold text-xs"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {payload.value}
    </text>
  );
};

export function EvaluationAnalysisReport({
  result,
  staticReport,
}: EvaluationAnalysisReportProps) {
  const chartData = [
    { skill: "Readability", score: result.readability, fullMark: 5 },
    { skill: "Logic", score: result.logic, fullMark: 5 },
    { skill: "Optimization", score: result.optimization, fullMark: 5 },
    { skill: "Maintainability", score: result.maintainability, fullMark: 5 },
  ];

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--primary))",
    },
  };

  const aiLikelihood = result.aiDetection.likelihood;
  const getLikelihoodColor = (likelihood: number) => {
    if (likelihood > 75) return "text-destructive";
    if (likelihood > 50) return "text-amber-500";
    return "text-emerald-500";
  };

  const skillScores = [
    { name: "Readability", score: result.readability },
    { name: "Logic", score: result.logic },
    { name: "Optimization", score: result.optimization },
    { name: "Maintainability", score: result.maintainability },
  ];

  return (
    <Card className="mt-10 bg-card/80 border border-dustyPink/30 shadow-2xl shadow-primary/10 rounded-2xl overflow-hidden backdrop-blur-md animate-in fade-in slide-in-from-bottom-6 duration-500">
      <CardHeader className="border-b border-border/50 bg-muted/20 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-headline text-2xl flex items-center gap-2.5 text-foreground">
              <div className="p-2 rounded-xl bg-primary/15 text-primary border border-dustyPink/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span>Evaluation Analysis Report</span>
            </CardTitle>
            <CardDescription className="mt-1">
              Gemini AI in-depth evaluation and scoring analysis.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto bg-card px-3.5 py-1.5 rounded-full border border-dustyPink/30 shadow-sm">
            <Award className="h-4 w-4 text-dustyPink-500" />
            <span className="text-xs font-semibold text-foreground font-mono">
              Score: {result.rating.toFixed(1)} / 5.0
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1.5 rounded-xl bg-muted/40 border border-border/50">
            <TabsTrigger
              value="overview"
              className="py-2.5 rounded-lg font-medium text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
            >
              <Lightbulb className="w-4 h-4 mr-2 text-dustyPink-400" />
              <span>Feedback & Analysis</span>
            </TabsTrigger>
            <TabsTrigger
              value="ai-detection"
              className="py-2.5 rounded-lg font-medium text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
            >
              <BrainCircuit className="w-4 h-4 mr-2 text-dustyPink-400" />
              <span>AI Authorship</span>
            </TabsTrigger>
            <TabsTrigger
              value="explanation"
              className="py-2.5 rounded-lg font-medium text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
            >
              <BookOpen className="w-4 h-4 mr-2 text-dustyPink-400" />
              <span>Code Explanation</span>
            </TabsTrigger>
            <TabsTrigger
              value="metrics"
              className="py-2.5 rounded-lg font-medium text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
            >
              Metrics
            </TabsTrigger>
          </TabsList>
          {/* TAB 1: OVERVIEW */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Quick Skills Pill Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {skillScores.map((s) => (
                <div
                  key={s.name}
                  className="rounded-xl border border-border/60 bg-muted/20 p-3 text-center transition-all duration-200 hover:border-dustyPink/40 hover:-translate-y-0.5"
                >
                  <p className="text-xs text-muted-foreground">{s.name}</p>
                  <p className="mt-1 text-lg font-bold font-headline text-foreground">
                    {s.score}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      / 5
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Overall Rating & Key Feedback */}
              <div className="space-y-6">
                <div className="p-4 rounded-xl border border-border/60 bg-card">
                  <h3 className="font-semibold mb-2 font-headline text-foreground flex items-center justify-between">
                    <span>Overall Rating</span>
                    <span className="font-bold text-lg text-primary">
                      {result.rating.toFixed(1)} / 5.0
                    </span>
                  </h3>
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 transition-transform hover:scale-125 ${
                          i < result.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-dustyPink/30 bg-card relative group">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold font-headline text-foreground flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-dustyPink-500" />
                      <span>Key AI Feedback</span>
                    </h3>
                    <CopyButton text={result.feedback} label="Copy" size="sm" />
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2.5 leading-relaxed">
                    <ul className="space-y-2.5">
                      {result.feedback
                        .split("\n")
                        .filter((fb) => fb.trim().length > 0)
                        .map((fb, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            <span>
                              {fb.replace(/^- /, "").replace(/^\* /, "").trim()}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills Radar Analysis */}
              <div className="p-5 rounded-xl border border-border/60 bg-card">
                <h3 className="font-semibold mb-4 text-center font-headline text-foreground">
                  Multi-Dimensional Skills Analysis
                </h3>
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[300px]"
                >
                  <RadarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                  >
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <PolarAngleAxis
                      dataKey="skill"
                      tick={<CustomPolarAngleAxisTick />}
                    />
                    <PolarGrid
                      stroke="hsl(var(--border))"
                      strokeDasharray="3 3"
                    />
                    <PolarRadiusAxis
                      tick={({ x, y, payload }) => (
                        <text
                          x={x}
                          y={y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="fill-muted-foreground text-[10px]"
                        >
                          {payload.value}
                        </text>
                      )}
                      angle={30}
                      domain={[0, 5]}
                      tickCount={6}
                    />
                    <Radar
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="hsl(var(--primary))"
                      fillOpacity={0.45}
                      dot={{
                        r: 4,
                        fill: "hsl(var(--accent))",
                        stroke: "hsl(var(--primary))",
                        strokeWidth: 1.5,
                      }}
                    />
                  </RadarChart>
                </ChartContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="mt-6 space-y-4">
            <div className="rounded-xl border border-border p-4 bg-muted/20">
              <h3 className="font-semibold">
                Static analysis · partial coverage
              </h3>
              <p className="text-sm text-muted-foreground">
                Estimated score: {staticReport.overall_score ?? "Not available"}{" "}
                / 100 · Weighted rubric coverage: {staticReport.coverage}%.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                This score describes checked heuristics only—not the quality or
                correctness of the entire solution. Unavailable metrics are
                excluded, not assigned zero.
              </p>
            </div>
            {metricNames.map((name) => {
              const metric = staticReport.metrics[name];
              return (
                <div
                  key={name}
                  className="rounded-xl border border-border p-4 space-y-2"
                >
                  <div className="flex justify-between gap-2">
                    <strong className="capitalize">
                      {name.replace(/([A-Z])/g, " $1")}
                    </strong>
                    <span className="text-sm">
                      {metric.score === null
                        ? "Not measured"
                        : `${metric.score}/100`}{" "}
                      · {weights[name]}% weight
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {metric.status} · confidence{" "}
                    {Math.round(metric.confidence * 100)}%
                  </p>
                  {metric.evidence.map((e, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                      Lines {e.line_start}–{e.line_end}: {e.note}
                    </p>
                  ))}
                </div>
              );
            })}
            {staticReport.improvements.map((item, i) => (
              <p key={i} className="text-sm text-muted-foreground">
                • {item}
              </p>
            ))}
          </TabsContent>
          {/* TAB 2: AI DETECTION */}
          <TabsContent value="ai-detection" className="mt-6">
            <Card className="border border-dustyPink/30 bg-card/60 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline flex items-center gap-2 text-foreground">
                    <BrainCircuit className="text-primary w-5 h-5" />
                    AI Authorship Assessment
                  </CardTitle>
                  <CardDescription>
                    Unverified stylistic observations only. This is not an
                    authorship verdict.
                  </CardDescription>
                </div>
                <CopyButton
                  text={`Unverified AI-style observations: ${result.aiDetection.reasoning}`}
                  label="Copy"
                  size="sm"
                />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 rounded-2xl border border-border/50 bg-muted/20">
                  <div
                    className={`font-bold text-6xl font-headline tracking-tight ${getLikelihoodColor(aiLikelihood)}`}
                  >
                    Not verified
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">
                    AI authorship cannot be established from this evaluation
                  </p>
                  <Progress
                    value={0}
                    className="mt-4 h-3 bg-muted/50"
                    indicatorClassName={
                      aiLikelihood > 75
                        ? "bg-destructive"
                        : aiLikelihood > 50
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                    }
                  />
                </div>

                <div className="flex items-start gap-4 bg-muted/20 p-5 rounded-xl border border-dustyPink/20">
                  {aiLikelihood > 75 ? (
                    <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  ) : aiLikelihood > 50 ? (
                    <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                  ) : (
                    <UserCheck className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <h4 className="font-semibold font-headline text-foreground">
                      Unverified stylistic observations
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                      {result.aiDetection.reasoning}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  No labeled validation set, editor provenance, or calibrated
                  detection model is connected. No penalty should follow from
                  these observations. Ask the author to explain the code, and
                  allow human review.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: CODE EXPLANATION */}
          <TabsContent value="explanation" className="mt-6">
            <Card className="border border-dustyPink/30 bg-card/60 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline flex items-center gap-2 text-foreground">
                    <BookOpen className="text-primary w-5 h-5" />
                    Line-by-Line Code Breakdown
                  </CardTitle>
                  <CardDescription>
                    Beginner-safe, intuitive breakdown of the algorithm logic
                    and structure.
                  </CardDescription>
                </div>
                <CopyButton
                  text={result.codeExplanation}
                  label="Copy Explanation"
                  size="sm"
                />
              </CardHeader>
              <CardContent>
                <div className="p-5 rounded-xl border border-border/60 bg-muted/20 text-foreground font-body text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                  {result.codeExplanation}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
