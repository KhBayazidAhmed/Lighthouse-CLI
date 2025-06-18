export const DEFAULT_OUTPUT_DIR = './lighthouse-reports';
export const DEFAULT_FORMAT = 'html';
export const DEFAULT_DEVICE = 'mobile';
export const DEFAULT_CATEGORIES = 'performance,accessibility,best-practices,seo';
export const DEFAULT_CONCURRENT_AUDITS = '3';
export const DEFAULT_MONITOR_INTERVAL = '60';
export const DEFAULT_MONITOR_THRESHOLD = '80';

export const LIGHTHOUSE_CATEGORIES = [
    'performance',
    'accessibility',
    'best-practices',
    'seo',
    'pwa'
];

export const SCORE_THRESHOLDS = {
    GOOD: 90,
    NEEDS_IMPROVEMENT: 50
};

export const CHROME_FLAGS = ['--headless']; 