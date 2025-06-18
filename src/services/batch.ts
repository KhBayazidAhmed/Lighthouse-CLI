import path from 'path';
import chalk from 'chalk';
import { BatchOptions, AuditResult } from '../types/index.js';
import { readUrlsFromFile, parseUrlsFromString, saveBatchSummary } from '../utils/file.js';
import { logError, logInfo, logSuccess, logBatchProgress } from '../utils/display.js';
import { runSingleAuditSilent } from './audit.js';
import { DEFAULT_CONCURRENT_AUDITS, DEFAULT_OUTPUT_DIR } from '../constants/index.js';

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
    const absoluteSummaryPath = path.resolve(summaryPath);
    const outputDir = path.resolve(options.outputDir || DEFAULT_OUTPUT_DIR);

    logSuccess(`Batch summary saved to: ${absoluteSummaryPath}`);

    // Display batch completion information
    console.log('');
    console.log(chalk.cyan('📊 Batch Audit Complete!'));
    console.log(chalk.yellow(`   • Individual reports saved to: ${outputDir}`));
    console.log(chalk.yellow(`   • Summary report: ${absoluteSummaryPath}`));
    console.log('');
    console.log(chalk.cyan('📖 How to view your reports:'));
    console.log(chalk.yellow(`   • Browse reports folder: open "${outputDir}"`));
    console.log(chalk.yellow(`   • View summary JSON: cat "${absoluteSummaryPath}"`));
    console.log(chalk.yellow(`   • List all reports: ls -la "${outputDir}"`));
    console.log('');
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