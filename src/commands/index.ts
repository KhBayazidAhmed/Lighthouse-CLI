import { Command } from 'commander';
import { AuditOptions, BatchOptions, MonitorOptions } from '../types/index.js';
import { runSingleAudit } from '../services/audit.js';
import { runBatchAudit } from '../services/batch.js';
import { compareUrls } from '../services/compare.js';
import { monitorUrl } from '../services/monitor.js';
import {
    DEFAULT_OUTPUT_DIR,
    DEFAULT_FORMAT,
    DEFAULT_DEVICE,
    DEFAULT_CATEGORIES,
    DEFAULT_CONCURRENT_AUDITS,
    DEFAULT_MONITOR_INTERVAL,
    DEFAULT_MONITOR_THRESHOLD
} from '../constants/index.js';

export function setupCommands(program: Command): void {
    setupAuditCommand(program);
    setupBatchCommand(program);
    setupCompareCommand(program);
    setupMonitorCommand(program);
}

function setupAuditCommand(program: Command): void {
    program
        .command('audit <url>')
        .description('Run Lighthouse audit on a single URL')
        .option('-o, --output <filename>', 'output filename (without extension)')
        .option('-f, --format <format>', 'output format: json, html, csv', DEFAULT_FORMAT)
        .option('-d, --device <device>', 'device type: mobile, desktop', DEFAULT_DEVICE)
        .option('-c, --categories <categories>', 'comma-separated categories: performance,accessibility,best-practices,seo,pwa', DEFAULT_CATEGORIES)
        .option('--output-dir <dir>', 'output directory', DEFAULT_OUTPUT_DIR)
        .option('--no-throttling', 'disable network/CPU throttling')
        .action(async (url: string, options: AuditOptions) => {
            await runSingleAudit(url, options);
        });
}

function setupBatchCommand(program: Command): void {
    program
        .command('batch')
        .description('Run Lighthouse audits on multiple URLs')
        .option('-f, --file <file>', 'file containing URLs (one per line)')
        .option('-u, --urls <urls>', 'comma-separated URLs')
        .option('-o, --output <prefix>', 'output filename prefix')
        .option('--format <format>', 'output format: json, html, csv', DEFAULT_FORMAT)
        .option('-d, --device <device>', 'device type: mobile, desktop', DEFAULT_DEVICE)
        .option('-c, --categories <categories>', 'comma-separated categories', DEFAULT_CATEGORIES)
        .option('--output-dir <dir>', 'output directory', DEFAULT_OUTPUT_DIR)
        .option('--concurrent <number>', 'number of concurrent audits', DEFAULT_CONCURRENT_AUDITS)
        .option('--no-throttling', 'disable network/CPU throttling')
        .action(async (options: BatchOptions) => {
            await runBatchAudit(options);
        });
}

function setupCompareCommand(program: Command): void {
    program
        .command('compare <url1> <url2>')
        .description('Compare Lighthouse scores between two URLs')
        .option('-d, --device <device>', 'device type: mobile, desktop', DEFAULT_DEVICE)
        .option('-c, --categories <categories>', 'comma-separated categories', DEFAULT_CATEGORIES)
        .option('--output-dir <dir>', 'output directory', DEFAULT_OUTPUT_DIR)
        .action(async (url1: string, url2: string, options: AuditOptions) => {
            await compareUrls(url1, url2, options);
        });
}

function setupMonitorCommand(program: Command): void {
    program
        .command('monitor <url>')
        .description('Monitor a URL continuously and alert on performance degradation')
        .option('-i, --interval <minutes>', 'monitoring interval in minutes', DEFAULT_MONITOR_INTERVAL)
        .option('-t, --threshold <score>', 'performance score threshold (0-100)', DEFAULT_MONITOR_THRESHOLD)
        .option('--output-dir <dir>', 'output directory', DEFAULT_OUTPUT_DIR)
        .action(async (url: string, options: MonitorOptions) => {
            await monitorUrl(url, options);
        });
} 