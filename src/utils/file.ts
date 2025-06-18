import fs from 'fs-extra';
import path from 'path';
import { AuditOptions, BatchOptions, BatchSummary, AuditResult } from '../types/index.js';
import { DEFAULT_OUTPUT_DIR } from '../constants/index.js';

export async function ensureOutputDirectory(outputDir: string): Promise<void> {
    await fs.ensureDir(outputDir);
}

export function generateFilename(url: string, output?: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const urlSlug = new URL(url).hostname.replace(/\./g, '-');
    return output || `${urlSlug}-${timestamp}`;
}

export function createOutputPath(outputDir: string, filename: string, format: string): string {
    return path.join(outputDir, `${filename}.${format}`);
}

export async function saveReport(outputPath: string, content: string): Promise<void> {
    await fs.writeFile(outputPath, content);
}

export async function readUrlsFromFile(filePath: string): Promise<string[]> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return fileContent
            .split('\n')
            .filter((line: string) => line.trim() && !line.startsWith('#'));
    } catch (error) {
        throw new Error(`Error reading file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export function parseUrlsFromString(urls: string): string[] {
    return urls.split(',').map((url: string) => url.trim());
}

export async function saveBatchSummary(results: AuditResult[], options: BatchOptions): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const summaryPath = path.join(
        options.outputDir || DEFAULT_OUTPUT_DIR,
        `batch-summary-${timestamp}.json`
    );

    const summary: BatchSummary = {
        timestamp: new Date().toISOString(),
        totalUrls: results.length,
        successful: results.filter((r: AuditResult) => !r.error).length,
        failed: results.filter((r: AuditResult) => r.error).length,
        results: results
    };

    await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));
    return summaryPath;
} 