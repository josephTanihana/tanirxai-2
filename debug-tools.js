// Debug Tools for AI Code Assistant
class DebugTools {
    constructor() {
        this.issues = [];
        this.suggestions = [];
        this.performanceMetrics = {};
        this.init();
    }

    init() {
        this.createDebugPanel();
        this.setupCodeAnalysis();
    }

    createDebugPanel() {
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debug-panel';
        debugPanel.className = 'debug-panel';
        debugPanel.innerHTML = `
            <div class="debug-header">
                <h3>🔧 Debug Tools</h3>
                <button id="close-debug" class="close-btn">×</button>
            </div>
            <div class="debug-content">
                <div class="debug-tabs">
                    <button class="tab-btn active" data-tab="issues">Issues</button>
                    <button class="tab-btn" data-tab="suggestions">Suggestions</button>
                    <button class="tab-btn" data-tab="performance">Performance</button>
                    <button class="tab-btn" data-tab="console">Console</button>
                </div>
                <div class="tab-content">
                    <div id="issues-tab" class="tab-pane active">
                        <div id="issues-list"></div>
                    </div>
                    <div id="suggestions-tab" class="tab-pane">
                        <div id="suggestions-list"></div>
                    </div>
                    <div id="performance-tab" class="tab-pane">
                        <div id="performance-metrics"></div>
                    </div>
                    <div id="console-tab" class="tab-pane">
                        <div id="console-output"></div>
                        <div class="console-input">
                            <input type="text" id="console-input" placeholder="Enter JavaScript code...">
                            <button id="console-execute">Execute</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .debug-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 600px;
                height: 500px;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                box-shadow: var(--shadow);
                z-index: 10000;
                display: none;
                overflow: hidden;
            }

            .debug-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                border-bottom: 1px solid var(--border-color);
                background: var(--bg-tertiary);
            }

            .debug-header h3 {
                margin: 0;
                color: var(--text-primary);
            }

            .close-btn {
                background: none;
                border: none;
                font-size: 24px;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .debug-content {
                height: calc(100% - 60px);
                display: flex;
                flex-direction: column;
            }

            .debug-tabs {
                display: flex;
                border-bottom: 1px solid var(--border-color);
                background: var(--bg-tertiary);
            }

            .tab-btn {
                padding: 12px 20px;
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                border-bottom: 2px solid transparent;
                transition: all 0.2s ease;
            }

            .tab-btn.active {
                color: var(--accent-primary);
                border-bottom-color: var(--accent-primary);
            }

            .tab-content {
                flex: 1;
                overflow: hidden;
            }

            .tab-pane {
                height: 100%;
                display: none;
                overflow-y: auto;
                padding: 20px;
            }

            .tab-pane.active {
                display: block;
            }

            .issue-item, .suggestion-item {
                padding: 12px;
                margin-bottom: 10px;
                border-radius: 6px;
                border-left: 4px solid;
            }

            .issue-item {
                background: rgba(220, 53, 69, 0.1);
                border-left-color: #dc3545;
            }

            .suggestion-item {
                background: rgba(40, 167, 69, 0.1);
                border-left-color: #28a745;
            }

            .issue-title, .suggestion-title {
                font-weight: bold;
                margin-bottom: 5px;
            }

            .issue-description, .suggestion-description {
                font-size: 14px;
                color: var(--text-secondary);
            }

            .performance-metric {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                margin-bottom: 8px;
                background: var(--bg-tertiary);
                border-radius: 6px;
            }

            .metric-label {
                font-weight: bold;
            }

            .metric-value {
                color: var(--accent-primary);
            }

            #console-output {
                height: 300px;
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                padding: 10px;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                overflow-y: auto;
                margin-bottom: 10px;
            }

            .console-input {
                display: flex;
                gap: 10px;
            }

            .console-input input {
                flex: 1;
                padding: 8px 12px;
                border: 1px solid var(--border-color);
                border-radius: 6px;
                background: var(--bg-primary);
                color: var(--text-primary);
                font-family: 'Courier New', monospace;
            }

            .console-input button {
                padding: 8px 15px;
                background: var(--accent-primary);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
            }

            .debug-toggle {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: var(--accent-secondary);
                color: white;
                border: none;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                font-size: 24px;
                cursor: pointer;
                box-shadow: var(--shadow);
                z-index: 1000;
                transition: all 0.3s ease;
            }

            .debug-toggle:hover {
                transform: scale(1.1);
                background: var(--accent-primary);
            }

            .error-line {
                background: rgba(220, 53, 69, 0.2);
                border-left: 3px solid #dc3545;
            }

            .warning-line {
                background: rgba(255, 193, 7, 0.2);
                border-left: 3px solid #ffc107;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(debugPanel);

        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'debug-toggle';
        toggleBtn.innerHTML = '🔧';
        toggleBtn.title = 'Open Debug Tools';
        document.body.appendChild(toggleBtn);

        // Event listeners
        toggleBtn.addEventListener('click', () => {
            debugPanel.style.display = debugPanel.style.display === 'none' ? 'block' : 'none';
        });

        document.getElementById('close-debug').addEventListener('click', () => {
            debugPanel.style.display = 'none';
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                
                // Update active tab button
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active tab content
                document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });

        // Console execution
        document.getElementById('console-execute').addEventListener('click', () => {
            this.executeConsoleCommand();
        });

        document.getElementById('console-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeConsoleCommand();
            }
        });
    }

    setupCodeAnalysis() {
        // Monitor code editor for real-time analysis
        const codeEditor = document.getElementById('code-editor');
        if (codeEditor) {
            codeEditor.addEventListener('input', () => {
                this.analyzeCode(codeEditor.value);
            });
        }
    }

    analyzeCode(code) {
        this.issues = [];
        this.suggestions = [];

        // Basic syntax analysis
        this.checkSyntax(code);
        this.checkBestPractices(code);
        this.checkPerformance(code);
        this.checkSecurity(code);

        this.updateIssuesList();
        this.updateSuggestionsList();
    }

    checkSyntax(code) {
        try {
            // Basic JavaScript syntax check
            if (code.includes('function') || code.includes('const') || code.includes('let')) {
                // Try to parse as JavaScript
                new Function(code);
            }
        } catch (error) {
            this.issues.push({
                type: 'syntax',
                title: 'Syntax Error',
                description: error.message,
                severity: 'error',
                line: this.extractLineNumber(error.message)
            });
        }
    }

    checkBestPractices(code) {
        const patterns = [
            {
                pattern: /console\.log\(/g,
                issue: 'Console.log statements should be removed in production',
                type: 'warning'
            },
            {
                pattern: /var\s+\w+/g,
                issue: 'Consider using let or const instead of var',
                type: 'suggestion'
            },
            {
                pattern: /==/g,
                issue: 'Consider using === for strict equality comparison',
                type: 'suggestion'
            },
            {
                pattern: /function\s+\w+\s*\([^)]*\)\s*{[^}]*}/g,
                issue: 'Consider using arrow functions for better readability',
                type: 'suggestion'
            }
        ];

        patterns.forEach(({ pattern, issue, type }) => {
            const matches = code.match(pattern);
            if (matches) {
                if (type === 'warning') {
                    this.issues.push({
                        type: 'best-practice',
                        title: 'Best Practice Warning',
                        description: issue,
                        severity: 'warning',
                        count: matches.length
                    });
                } else {
                    this.suggestions.push({
                        type: 'improvement',
                        title: 'Code Improvement',
                        description: issue,
                        impact: 'low'
                    });
                }
            }
        });
    }

    checkPerformance(code) {
        const performancePatterns = [
            {
                pattern: /for\s*\(\s*let\s+i\s*=\s*0;\s*i\s*<\s*array\.length;\s*i\+\+\)/g,
                issue: 'Consider caching array.length for better performance',
                type: 'performance'
            },
            {
                pattern: /\.innerHTML\s*=/g,
                issue: 'Consider using textContent for better performance and security',
                type: 'performance'
            },
            {
                pattern: /document\.getElementById\(/g,
                issue: 'Consider caching DOM queries for better performance',
                type: 'performance'
            }
        ];

        performancePatterns.forEach(({ pattern, issue, type }) => {
            const matches = code.match(pattern);
            if (matches) {
                this.suggestions.push({
                    type: 'performance',
                    title: 'Performance Optimization',
                    description: issue,
                    impact: 'medium'
                });
            }
        });
    }

    checkSecurity(code) {
        const securityPatterns = [
            {
                pattern: /eval\(/g,
                issue: 'eval() is dangerous and should be avoided',
                type: 'security'
            },
            {
                pattern: /innerHTML\s*=\s*[^;]*\+/g,
                issue: 'Potential XSS vulnerability with innerHTML',
                type: 'security'
            },
            {
                pattern: /document\.write\(/g,
                issue: 'document.write() can be dangerous and is deprecated',
                type: 'security'
            }
        ];

        securityPatterns.forEach(({ pattern, issue, type }) => {
            const matches = code.match(pattern);
            if (matches) {
                this.issues.push({
                    type: 'security',
                    title: 'Security Issue',
                    description: issue,
                    severity: 'error',
                    count: matches.length
                });
            }
        });
    }

    extractLineNumber(errorMessage) {
        const match = errorMessage.match(/line (\d+)/);
        return match ? parseInt(match[1]) : null;
    }

    updateIssuesList() {
        const issuesList = document.getElementById('issues-list');
        issuesList.innerHTML = '';

        if (this.issues.length === 0) {
            issuesList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No issues found! 🎉</p>';
            return;
        }

        this.issues.forEach(issue => {
            const issueEl = document.createElement('div');
            issueEl.className = 'issue-item';
            issueEl.innerHTML = `
                <div class="issue-title">${issue.title}</div>
                <div class="issue-description">${issue.description}</div>
                ${issue.line ? `<div style="font-size: 12px; color: var(--text-secondary);">Line: ${issue.line}</div>` : ''}
                ${issue.count ? `<div style="font-size: 12px; color: var(--text-secondary);">Found ${issue.count} instances</div>` : ''}
            `;
            issuesList.appendChild(issueEl);
        });
    }

    updateSuggestionsList() {
        const suggestionsList = document.getElementById('suggestions-list');
        suggestionsList.innerHTML = '';

        if (this.suggestions.length === 0) {
            suggestionsList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No suggestions at this time</p>';
            return;
        }

        this.suggestions.forEach(suggestion => {
            const suggestionEl = document.createElement('div');
            suggestionEl.className = 'suggestion-item';
            suggestionEl.innerHTML = `
                <div class="suggestion-title">${suggestion.title}</div>
                <div class="suggestion-description">${suggestion.description}</div>
                <div style="font-size: 12px; color: var(--text-secondary);">Impact: ${suggestion.impact}</div>
            `;
            suggestionsList.appendChild(suggestionEl);
        });
    }

    updatePerformanceMetrics() {
        const metricsContainer = document.getElementById('performance-metrics');
        metricsContainer.innerHTML = '';

        const metrics = [
            { label: 'Memory Usage', value: this.getMemoryUsage() },
            { label: 'Page Load Time', value: this.getPageLoadTime() },
            { label: 'Code Complexity', value: this.calculateComplexity() },
            { label: 'Lines of Code', value: this.getLinesOfCode() }
        ];

        metrics.forEach(metric => {
            const metricEl = document.createElement('div');
            metricEl.className = 'performance-metric';
            metricEl.innerHTML = `
                <span class="metric-label">${metric.label}</span>
                <span class="metric-value">${metric.value}</span>
            `;
            metricsContainer.appendChild(metricEl);
        });
    }

    getMemoryUsage() {
        if (performance.memory) {
            const used = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            const total = Math.round(performance.memory.totalJSHeapSize / 1024 / 1024);
            return `${used}MB / ${total}MB`;
        }
        return 'Not available';
    }

    getPageLoadTime() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        return `${Math.round(loadTime)}ms`;
    }

    calculateComplexity() {
        const codeEditor = document.getElementById('code-editor');
        if (!codeEditor) return 'N/A';

        const code = codeEditor.value;
        const complexity = this.analyzeComplexity(code);
        return complexity;
    }

    analyzeComplexity(code) {
        let complexity = 1;
        
        // Count control structures
        const patterns = [
            /if\s*\(/g,
            /for\s*\(/g,
            /while\s*\(/g,
            /switch\s*\(/g,
            /catch\s*\(/g,
            /\?\s*[^:]*\s*:/g, // ternary operators
        ];

        patterns.forEach(pattern => {
            const matches = code.match(pattern);
            if (matches) {
                complexity += matches.length;
            }
        });

        if (complexity <= 5) return 'Low';
        if (complexity <= 10) return 'Medium';
        return 'High';
    }

    getLinesOfCode() {
        const codeEditor = document.getElementById('code-editor');
        if (!codeEditor) return '0';
        
        const lines = codeEditor.value.split('\n').filter(line => line.trim().length > 0);
        return lines.length.toString();
    }

    executeConsoleCommand() {
        const input = document.getElementById('console-input');
        const command = input.value.trim();
        
        if (!command) return;

        const consoleOutput = document.getElementById('console-output');
        const outputLine = document.createElement('div');
        outputLine.style.marginBottom = '10px';
        outputLine.innerHTML = `
            <span style="color: #007acc;">></span> <span style="color: #d4d4d4;">${command}</span>
        `;
        consoleOutput.appendChild(outputLine);

        try {
            const result = eval(command);
            const resultLine = document.createElement('div');
            resultLine.style.marginBottom = '10px';
            resultLine.style.color = '#4ec9b0';
            resultLine.textContent = result;
            consoleOutput.appendChild(resultLine);
        } catch (error) {
            const errorLine = document.createElement('div');
            errorLine.style.marginBottom = '10px';
            errorLine.style.color = '#f44747';
            errorLine.textContent = `Error: ${error.message}`;
            consoleOutput.appendChild(errorLine);
        }

        input.value = '';
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    // Public methods
    addIssue(issue) {
        this.issues.push(issue);
        this.updateIssuesList();
    }

    addSuggestion(suggestion) {
        this.suggestions.push(suggestion);
        this.updateSuggestionsList();
    }

    refreshMetrics() {
        this.updatePerformanceMetrics();
    }

    highlightErrorLine(lineNumber) {
        const codeEditor = document.getElementById('code-editor');
        if (!codeEditor) return;

        // Remove existing highlights
        codeEditor.classList.remove('error-line', 'warning-line');
        
        // Add highlight based on line number
        if (lineNumber) {
            codeEditor.classList.add('error-line');
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DebugTools;
} 