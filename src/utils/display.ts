import chalk from 'chalk';
import { LIGHTHOUSE_CATEGORIES, SCORE_THRESHOLDS } from '../constants/index.js';

export function formatScore(score: number): string {
    if (score >= SCORE_THRESHOLDS.GOOD) return chalk.green(`${score.toFixed(1)}`);
    if (score >= SCORE_THRESHOLDS.NEEDS_IMPROVEMENT) return chalk.yellow(`${score.toFixed(1)}`);
    return chalk.red(`${score.toFixed(1)}`);
}

export function displayScoreSummary(lhr: any): void {
    console.log('\n' + chalk.bold('Score Summary:'));
    console.log('='.repeat(30));

    const categories = LIGHTHOUSE_CATEGORIES;

    categories.forEach((category: string) => {
        const categoryData = lhr.categories[category];
        if (categoryData) {
            const score = Math.round(categoryData.score * 100);
            console.log(`${categoryData.title}: ${formatScore(score)}`);
        }
    });
}

export function displayComparisonResults(url1: string, url2: string, result1: any, result2: any): void {
    console.log('\n' + chalk.bold('Comparison Results:'));
    console.log('='.repeat(50));

    const categories = ['performance', 'accessibility', 'best-practices', 'seo'];

    categories.forEach((category: string) => {
        const score1 = result1.result?.categories?.[category]?.score * 100 || 0;
        const score2 = result2.result?.categories?.[category]?.score * 100 || 0;
        const diff = score2 - score1;

        console.log(`${chalk.bold(category.toUpperCase())}:`);
        console.log(`  ${new URL(url1).hostname}: ${formatScore(score1)}`);
        console.log(`  ${new URL(url2).hostname}: ${formatScore(score2)}`);
        console.log(`  Difference: ${diff > 0 ? chalk.green(`+${diff.toFixed(1)}`) : chalk.red(diff.toFixed(1))}`);
        console.log('');
    });
}

export function logBatchProgress(currentBatch: number, totalBatches: number): void {
    console.log(chalk.green(`Completed batch ${currentBatch}/${totalBatches}`));
}

export function logMonitoringStart(url: string, interval: string, threshold: string): void {
    console.log(chalk.blue(`Starting monitoring for ${url}`));
    console.log(`Interval: ${interval} minutes, Threshold: ${threshold}`);
}

export function logMonitoringResult(performanceScore: number, threshold: number): void {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] Performance Score: ${formatScore(performanceScore)}`);

    if (performanceScore < threshold) {
        console.log(chalk.red(`⚠️  ALERT: Performance score (${performanceScore.toFixed(1)}) below threshold (${threshold})`));
    }
}

export function logError(message: string): void {
    console.error(chalk.red(message));
}

export function logSuccess(message: string): void {
    console.log(chalk.green(message));
}

export function logInfo(message: string): void {
    console.log(chalk.blue(message));
} 