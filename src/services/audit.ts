import ora from 'ora';
import chalk from 'chalk';
import path from 'path';
import { AuditOptions } from '../types/index.js';
import { runLighthouseAudit, runSilentLighthouseAudit } from '../utils/lighthouse.js';
import {
    ensureOutputDirectory,
    generateFilename,
    createOutputPath,
    saveReport
} from '../utils/file.js';
import { displayScoreSummary, logError, logSuccess } from '../utils/display.js';
import { generateCSVReport, extractReportContent } from '../utils/report.js';
import { DEFAULT_OUTPUT_DIR, DEFAULT_FORMAT } from '../constants/index.js';

export async function runSingleAudit(url: string, options: AuditOptions): Promise<void> {
    const spinner = ora(`Running Lighthouse audit for ${chalk.blue(url)}`).start();

    try {
        // Ensure output directory exists
        await ensureOutputDirectory(options.outputDir || DEFAULT_OUTPUT_DIR);

        // Run the audit
        const runnerResult = await runLighthouseAudit(url, options);

        // Generate filename and output path
        const filename = generateFilename(url, options.output);
        const outputPath = createOutputPath(
            options.outputDir || DEFAULT_OUTPUT_DIR,
            filename,
            options.format || DEFAULT_FORMAT
        );

        // Save report
        await saveAuditReport(runnerResult, outputPath, options.format || DEFAULT_FORMAT);

        // Get absolute path for display
        const absolutePath = path.resolve(outputPath);

        spinner.succeed(`Audit completed! Report saved to: ${chalk.green(absolutePath)}`);

        // Display how to access the report
        console.log('');
        console.log(chalk.cyan('📖 How to view your report:'));
        const reportFormat = options.format || DEFAULT_FORMAT;
        if (reportFormat === 'html') {
            console.log(chalk.yellow(`   • Open in browser: file://${absolutePath}`));
            console.log(chalk.yellow(`   • Or double-click the file: ${absolutePath}`));
        } else if (reportFormat === 'json') {
            console.log(chalk.yellow(`   • View JSON data: cat "${absolutePath}"`));
            console.log(chalk.yellow(`   • Open in editor: code "${absolutePath}"`));
        } else if (reportFormat === 'csv') {
            console.log(chalk.yellow(`   • View CSV data: cat "${absolutePath}"`));
            console.log(chalk.yellow(`   • Open in spreadsheet: open "${absolutePath}"`));
        }
        console.log('');

        // Display summary
        displayScoreSummary(runnerResult.lhr);

    } catch (error) {
        spinner.fail(`Audit failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        process.exit(1);
    }
}

export async function runSingleAuditSilent(url: string, options: AuditOptions): Promise<any> {
    try {
        return await runSilentLighthouseAudit(url, options);
    } catch (error) {
        return {
            url,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}

async function saveAuditReport(runnerResult: any, outputPath: string, format: string): Promise<void> {
    if (format === 'csv') {
        const csvData = generateCSVReport(runnerResult.lhr);
        await saveReport(outputPath, csvData);
    } else {
        const reportContent = extractReportContent(runnerResult.report);
        await saveReport(outputPath, reportContent);
    }
} 