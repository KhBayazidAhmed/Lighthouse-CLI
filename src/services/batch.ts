import { BatchOptions, AuditResult } from '../types/index.js';
import { readUrlsFromFile, parseUrlsFromString, saveBatchSummary } from '../utils/file.js';
import { logError, logInfo, logSuccess, logBatchProgress } from '../utils/display.js';
import { runSingleAuditSilent } from './audit.js';
import { DEFAULT_CONCURRENT_AUDITS } from '../constants/index.js';

export async function runBatchAudit(options: BatchOptions): Promise<void> {
    const urls = await getUrlsForBatch(options);

    if (urls.length === 0) {
        logError('No URLs found to audit');
        process.exit(1);
    }

    logInfo(`Starting batch audit for ${urls.length} URLs`);

    const concurrent = parseInt(options.concurrent || DEFAULT_CONCURRENT_AUDITS);
    const results: AuditResult[] = [];

    // Process URLs in batches
    const totalBatches = Math.ceil(urls.length / concurrent);

    for (let i = 0; i < urls.length; i += concurrent) {
        const batch = urls.slice(i, i + concurrent);
        const batchResults = await processBatch(batch, options);
        results.push(...batchResults);

        const currentBatch = Math.floor(i / concurrent) + 1;
        logBatchProgress(currentBatch, totalBatches);
    }

    // Generate summary report
    const summaryPath = await saveBatchSummary(results, options);
    logSuccess(`Batch summary saved to: ${summaryPath}`);
}

async function getUrlsForBatch(options: BatchOptions): Promise<string[]> {
    if (options.file) {
        try {
            return await readUrlsFromFile(options.file);
        } catch (error) {
            logError(error instanceof Error ? error.message : 'Unknown error');
            process.exit(1);
        }
    } else if (options.urls) {
        return parseUrlsFromString(options.urls);
    } else {
        logError('Please provide URLs via --file or --urls option');
        process.exit(1);
    }
}

async function processBatch(urls: string[], options: BatchOptions): Promise<AuditResult[]> {
    const batchPromises = urls.map((url: string) => runSingleAuditSilent(url, options));
    return await Promise.all(batchPromises);
} 