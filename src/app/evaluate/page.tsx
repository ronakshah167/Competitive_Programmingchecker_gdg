import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EvaluationForm } from '@/components/evaluate/evaluation-form';
import { Sparkles } from 'lucide-react';

export default function EvaluatePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <header className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-dustyPink/25 text-xs font-semibold uppercase tracking-wider text-primary mb-4 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-dustyPink-500" />
          <span>Gemini AI Code Evaluator</span>
        </div>
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Code Evaluation
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Submit your code to receive comprehensive multi-metric analysis, algorithmic feedback, and a transparent discussion of authorship limitations.
        </p>
      </header>

      <Card className="bg-card/85 border border-dustyPink/30 shadow-2xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 rounded-2xl backdrop-blur-md overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-muted/20 pb-5">
          <CardTitle className="font-headline text-2xl text-foreground">
            Submit Your Code
          </CardTitle>
          <CardDescription>
            Select the programming language, your skill level, and paste your solution below.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <EvaluationForm />
        </CardContent>
      </Card>
    </div>
  );
}
