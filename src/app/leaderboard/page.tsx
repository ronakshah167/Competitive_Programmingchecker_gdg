import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Crown, Medal, Trophy, Sparkles } from 'lucide-react';
import { CopyButton } from '@/components/shared/copy-button';

const leaderboardData = [
  { rank: 1, name: 'Alex Turing', score: 4850, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', badge: 'Grandmaster' },
  { rank: 2, name: 'Brendan Eich', score: 4700, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', badge: 'Master' },
  { rank: 3, name: 'Grace Hopper', score: 4680, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', badge: 'Master' },
  { rank: 4, name: 'Linus Torvalds', score: 4520, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', badge: 'Candidate Master' },
  { rank: 5, name: 'Ada Lovelace', score: 4310, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d', badge: 'Candidate Master' },
  { rank: 6, name: 'Yukihiro Matsumoto', score: 4200, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d', badge: 'Expert' },
  { rank: 7, name: 'Guido van Rossum', score: 4150, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d', badge: 'Expert' },
];

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Trophy className="w-5 h-5 text-amber-400 drop-shadow" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-slate-300 drop-shadow" />;
  if (rank === 3) return <Crown className="w-5 h-5 text-amber-600 drop-shadow" />;
  return <span className="font-bold text-sm w-6 text-center text-muted-foreground">{rank}</span>;
};

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-dustyPink/25 text-xs font-semibold uppercase tracking-wider text-primary mb-4 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-dustyPink-500" />
          <span>Community Rankings</span>
        </div>
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Leaderboard
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
          See who is pushing code quality to the maximum and mastering competitive programming.
        </p>
      </header>

      <Card className="bg-card/80 border border-dustyPink/30 shadow-2xl shadow-primary/5 hover:shadow-primary/10 transition-shadow duration-300 rounded-2xl overflow-hidden backdrop-blur-md">
        <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
          <CardTitle className="font-headline text-xl text-foreground flex items-center gap-2">
            <Trophy className="h-5 w-5 text-dustyPink-500" />
            <span>Top Programmers</span>
          </CardTitle>
          <CardDescription>Rankings based on evaluation rating and problems solved.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="w-[80px] text-center font-semibold text-foreground">Rank</TableHead>
                <TableHead className="font-semibold text-foreground">Coder</TableHead>
                <TableHead className="hidden sm:table-cell font-semibold text-foreground">Tier</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user) => (
                <TableRow key={user.rank} className="group transition-colors hover:bg-muted/30 border-border/40">
                  <TableCell>
                    <div className="flex items-center justify-center h-full">
                      <RankIcon rank={user.rank} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3.5">
                      <Avatar className="h-10 w-10 border border-dustyPink/30">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary/20 text-primary font-bold">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground text-sm leading-none">{user.name}</p>
                        <p className="text-xs text-muted-foreground mt-1 sm:hidden">{user.badge}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-dustyPink/20 font-medium">
                      {user.badge}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-base text-primary">
                    {user.score.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
