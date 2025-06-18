// Lighthouse CLI Configuration
// This file can be used to customize Lighthouse settings for your project

module.exports = {
  ci: {
    collect: {
      // URLs to audit
      url: [
        'https://example.com',
        'https://example.com/about',
        'https://example.com/contact'
      ],
      // Number of runs per URL
      numberOfRuns: 3,
      // Settings for the Lighthouse run
      settings: {
        // Device type: 'mobile' or 'desktop'
        formFactor: 'mobile',
        // Throttling settings
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
        },
        // Categories to audit
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        // Skip certain audits
        skipAudits: ['uses-http2'],
        // Chrome flags
        chromeFlags: ['--headless', '--no-sandbox'],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports',
    },
    assert: {
      // Performance thresholds
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
      },
    },
  },
}; 