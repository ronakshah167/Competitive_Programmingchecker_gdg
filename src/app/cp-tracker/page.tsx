import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ContestHeatmap } from '@/components/cp-tracker/contest-heatmap';
import { ContestTimeline } from '@/components/cp-tracker/contest-timeline';
import { Sparkles, Trophy } from 'lucide-react';
import { CopyButton } from '@/components/shared/copy-button';

const trackedSubmissions = [
  { id: 1, problem: 'Two Sum', platform: 'LeetCode', date: '2024-07-20', rating: 4.5, status: 'Accepted' },
  { id: 2, problem: 'A. Watermelon', platform: 'Codeforces', date: '2024-07-19', rating: 3.2, status: 'Accepted' },
  { id: 3, problem: 'Regular Bracket Sequences', platform: 'Codeforces', date: '2024-07-26', rating: 4.1, status: 'Accepted' },
  { id: 4, problem: 'Longest Substring Without Repeating Characters', platform: 'LeetCode', date: '2024-07-25', rating: 4.8, status: 'Accepted' },
  { id: 5, problem: 'A. Way Too Long Words', platform: 'Codeforces', date: '2024-07-17', rating: 3.1, status: 'Time Limit Exceeded' },
  { id: 6, problem: 'B. Drinks', platform: 'Codeforces', date: '2024-07-24', rating: 3.5, status: 'Wrong Answer' },
  { id: 7, problem: 'Median of Two Sorted Arrays', platform: 'LeetCode', date: '2024-07-14', rating: 4.9, status: 'Accepted' },
  { id: 8, problem: 'C. Word Game', platform: 'Codeforces', date: '2024-07-23', rating: 3.9, status: 'Accepted' },
  { id: 9, problem: 'Reverse Integer', platform: 'LeetCode', date: '2024-07-12', rating: 4.1, status: 'Accepted' },
  { id: 10, problem: 'D. Odd Queries', platform: 'Codeforces', date: '2024-07-22', rating: 4.2, status: 'Accepted' },
  { id: 11, problem: 'String to Integer (atoi)', platform: 'LeetCode', date: '2024-07-10', rating: 3.8, status: 'Wrong Answer' },
  { id: 12, problem: 'A. Bit++', platform: 'Codeforces', date: '2024-07-09', rating: 3.3, status: 'Accepted' },
  { id: 13, problem: 'Palindrome Number', platform: 'LeetCode', date: '2024-07-08', rating: 4.0, status: 'Accepted' },
  { id: 14, problem: 'A. Petya and Strings', platform: 'Codeforces', date: '2024-07-07', rating: 3.7, status: 'Accepted' },
  { id: 15, problem: 'Container With Most Water', platform: 'LeetCode', date: '2024-07-06', rating: 4.7, status: 'Time Limit Exceeded' },
  { id: 16, problem: '3Sum', platform: 'LeetCode', date: '2024-07-05', rating: 4.6, status: 'Accepted' },
  { id: 17, problem: 'B. Following the String', platform: 'Codeforces', date: '2024-07-04', rating: 3.8, status: 'Accepted' },
  { id: 18, problem: 'Valid Parentheses', platform: 'LeetCode', date: '2024-07-03', rating: 4.3, status: 'Accepted' },
  { id: 19, problem: 'A. Theatre Square', platform: 'Codeforces', date: '2024-07-02', rating: 3.0, status: 'Wrong Answer' },
  { id: 20, problem: 'Merge Two Sorted Lists', platform: 'LeetCode', date: '2024-07-01', rating: 4.4, status: 'Accepted' },
  { id: 21, problem: 'C. Can I Square?', platform: 'Codeforces', date: '2024-06-30', rating: 4.0, status: 'Accepted' },
  { id: 22, problem: 'Generate Parentheses', platform: 'LeetCode', date: '2024-06-29', rating: 4.7, status: 'Accepted' },
  { id: 23, problem: 'A. Helpful Maths', platform: 'Codeforces', date: '2024-06-28', rating: 3.6, status: 'Accepted' },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Accepted':
      return <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25">Accepted</Badge>;
    case 'Time Limit Exceeded':
      return <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25">TLE</Badge>;
    case 'Wrong Answer':
      return <Badge className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/25">WA</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function CpTrackerPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-dustyPink/25 text-xs font-semibold uppercase tracking-wider text-primary mb-4 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-dustyPink-500" />
          <span>Competitive Programming Analytics</span>
        </div>
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          CP Tracker
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Monitor your cross-platform problem submissions, rating progression, and contest schedules.
        </p>
      </header>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-card/80 border border-dustyPink/30 shadow-xl backdrop-blur-md rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <CardTitle className="font-headline text-xl text-foreground">Recent Submissions</CardTitle>
              <CardDescription>A real-time log of your activity on LeetCode & Codeforces.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="font-semibold text-foreground">Problem</TableHead>
                    <TableHead className="font-semibold text-foreground">Platform</TableHead>
                    <TableHead className="font-semibold text-foreground">Date</TableHead>
                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                    <TableHead className="text-right font-semibold text-foreground">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trackedSubmissions.map((sub) => (
                    <TableRow key={sub.id} className="group transition-colors hover:bg-muted/30 border-border/40">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground">{sub.problem}</span>
                          <CopyButton
                            text={sub.problem}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted/50 border border-border/60 text-muted-foreground font-mono">
                          {sub.platform}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">{sub.date}</TableCell>
                      <TableCell>
                        <StatusBadge status={sub.status} />
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-base text-primary">
                        {sub.rating.toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border border-dustyPink/30 shadow-xl backdrop-blur-md rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <CardTitle className="font-headline text-xl text-foreground">Contest Activity Heatmap</CardTitle>
              <CardDescription>Your 365-day submission frequency visualized in Burgundy & Dusty Pink tones.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ContestHeatmap />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <ContestTimeline />
        </div>
      </div>
    </div>
  );
}
