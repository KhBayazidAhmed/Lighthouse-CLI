import { LIGHTHOUSE_CATEGORIES } from '../constants/index.js';

export function generateCSVReport(lhr: any): string {
    const categories = LIGHTHOUSE_CATEGORIES;
    const headers = ['URL', 'Timestamp', ...categories.map((c: string) => c.toUpperCase())];

    const scores = categories.map((category: string) => {
        const score = lhr.categories[category]?.score;
        return score ? Math.round(score * 100) : 'N/A';
    });

    const row = [
        lhr.finalUrl,
        new Date(lhr.fetchTime).toISOString(),
        ...scores
    ];

    return [headers.join(','), row.join(',')].join('\n');
}

export function extractReportContent(report: string | string[]): string {
    return typeof report === 'string' ? report : report[0] || '';
} 