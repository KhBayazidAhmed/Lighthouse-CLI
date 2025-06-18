import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { AuditOptions, LighthouseResult } from '../types/index.js';
import { CHROME_FLAGS } from '../constants/index.js';

export async function createLighthouseOptions(options: AuditOptions, port: number) {
    return {
        logLevel: 'info' as const,
        output: options.format === 'csv' ? 'json' : options.format,
        onlyCategories: options.categories?.split(','),
        port,
        disableDeviceEmulation: options.device === 'desktop',
        throttling: options.throttling !== false ? undefined : {
            rttMs: 0,
            throughputKbps: 0,
            cpuSlowdownMultiplier: 1,
        }
    };
}

export async function createSilentLighthouseOptions(options: AuditOptions, port: number) {
    return {
        logLevel: 'error' as const,
        output: 'json' as const,
        onlyCategories: options.categories?.split(','),
        port,
        disableDeviceEmulation: options.device === 'desktop',
    };
}

export async function runLighthouseAudit(url: string, options: AuditOptions): Promise<LighthouseResult> {
    const chrome = await chromeLauncher.launch({ chromeFlags: CHROME_FLAGS });

    try {
        const lighthouseOptions = await createLighthouseOptions(options, chrome.port);
        const runnerResult = await lighthouse(url, lighthouseOptions);

        if (!runnerResult || !runnerResult.report) {
            throw new Error('Lighthouse audit failed');
        }

        return runnerResult;
    } finally {
        await chrome.kill();
    }
}

export async function runSilentLighthouseAudit(url: string, options: AuditOptions): Promise<any> {
    const chrome = await chromeLauncher.launch({ chromeFlags: CHROME_FLAGS });

    try {
        const lighthouseOptions = await createSilentLighthouseOptions(options, chrome.port);
        const runnerResult = await lighthouse(url, lighthouseOptions);
        return { url, result: runnerResult?.lhr };
    } finally {
        await chrome.kill();
    }
} 