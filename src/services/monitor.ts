import { MonitorOptions } from '../types/index.js';
import { runSingleAuditSilent } from './audit.js';
import { logMonitoringStart, logMonitoringResult, logError } from '../utils/display.js';
import { DEFAULT_MONITOR_INTERVAL, DEFAULT_MONITOR_THRESHOLD } from '../constants/index.js';

export async function monitorUrl(url: string, options: MonitorOptions): Promise<void> {
    const interval = parseInt(options.interval || DEFAULT_MONITOR_INTERVAL) * 60 * 1000; // Convert to milliseconds
    const threshold = parseInt(options.threshold || DEFAULT_MONITOR_THRESHOLD);

    logMonitoringStart(url, options.interval || DEFAULT_MONITOR_INTERVAL, options.threshold || DEFAULT_MONITOR_THRESHOLD);

    const monitor = async (): Promise<void> => {
        try {
            const result = await runSingleAuditSilent(url, options);
            const performanceScore = result.result?.categories?.performance?.score * 100 || 0;

            logMonitoringResult(performanceScore, threshold);

        } catch (error) {
            logError(`Monitoring error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

        setTimeout(monitor, interval);
    };

    monitor();
} 