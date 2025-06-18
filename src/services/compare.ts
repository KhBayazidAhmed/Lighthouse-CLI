import { AuditOptions } from '../types/index.js';
import { runSingleAuditSilent } from './audit.js';
import { displayComparisonResults, logInfo } from '../utils/display.js';

export async function compareUrls(url1: string, url2: string, options: AuditOptions): Promise<void> {
    logInfo(`Comparing ${url1} vs ${url2}`);

    // Run audits sequentially to avoid race conditions
    const [result1, result2] = await Promise.all([
        runSingleAuditSilent(url1, options),
        runSingleAuditSilent(url2, options)
    ]);

    displayComparisonResults(url1, url2, result1, result2);
} 