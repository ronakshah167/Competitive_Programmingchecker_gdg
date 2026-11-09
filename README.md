# ALL IN · Competitive Programming Checker

ALL IN is a practice workspace for competitive programmers. Paste a solution to get Gemini feedback, review source-level metrics, and ask the AI mentor for help with your next improvement.

**[Live demo](https://cptracker-gdg.vercel.app/)** · **[Try the evaluator](https://cptracker-gdg.vercel.app/evaluate)**

## Features

- **Code evaluator:** Choose a language and skill level, then paste your code or load a sample. Get suggestions, ratings out of 5, and an explanation of your solution.
- **Metrics tab:** Review static estimates, line-level evidence, confidence, and how much of the rubric the analyzer covers.
- **AI mentor:** Ask for algorithm hints, complexity explanations, and debugging help.
- **CP tracker and leaderboard:** Browse the competitive programming dashboard and rankings.
- **Responsive interface:** Switch between light and dark themes, with support for reduced motion.

## How evaluation works

The evaluator sends submitted code to Gemini 3.5 Flash for feedback. If the primary model returns an overload error (HTTP 503), it tries Gemini 3.5 Flash-Lite once.

The **Metrics** tab shows a separate static score out of 100. The analyzer estimates readability from formatting and flags potentially unsafe API calls for review. Metrics without enough evidence are marked as unavailable.

| Metric | Weight |
| --- | ---: |
| Correctness | 35% |
| Efficiency | 20% |
| Robustness | 10% |
| Readability | 15% |
| Idiomatic usage | 10% |
| Security | 5% |
| Problem solving | 5% |

**Coverage** is the sum of the weights of the metrics that received scores. The static score is a weighted average of those metrics only. For example, if readability is the only scored metric, coverage is 15%.

### Current limitations

- The evaluator reviews source code without running submissions or measuring runtime and memory.
- Security flags point to code worth reviewing. They do not confirm vulnerabilities.
- Code style alone cannot establish whether someone used AI.
- Submitted code is sent to Gemini for feedback. Use sample code or code you’re allowed to share.

## Tech stack

Next.js 15 · React · TypeScript · Tailwind CSS · Firebase Authentication · Gemini via Genkit · Vercel

## Run locally

1. Clone the repository and install dependencies.

   ```bash
   git clone https://github.com/ronakshah167/Competitive_Programmingchecker_gdg.git
   cd Competitive_Programmingchecker_gdg
   npm ci
   ```

2. Create a `.env.local` file in the project root and add a key from [Google AI Studio](https://aistudio.google.com/app/apikey). Keep the key out of Git.

   ```dotenv
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. Start the development server and open [localhost:9002](http://localhost:9002).

   ```bash
   npm run dev
   ```

## Checks and deployment

```bash
npm run typecheck
npm run build
```

For Vercel, add `GEMINI_API_KEY` to the project’s environment variables and redeploy. To verify the deployment, load the **Python: Two Sum** sample, click **Evaluate Code**, and open the **Metrics** tab when the report appears.
