export interface AuditOptions {
    output?: string;
    format?: 'json' | 'html' | 'csv';
    device?: 'mobile' | 'desktop';
    categories?: string;
    outputDir?: string;
    throttling?: boolean;
}

export interface BatchOptions extends AuditOptions {
    file?: string;
    urls?: string;
    concurrent?: string;
}

export interface MonitorOptions extends AuditOptions {
    interval?: string;
    threshold?: string;
}

export interface AuditResult {
    url: string;
    result?: any;
    error?: string;
}

export interface BatchSummary {
    timestamp: string;
    totalUrls: number;
    successful: number;
    failed: number;
    results: AuditResult[];
}

export interface LighthouseResult {
    lhr: any;
    report: string | string[];
} 