// Syntax Highlighter for AI Code Assistant
class SyntaxHighlighter {
    constructor() {
        this.languages = {
            javascript: {
                keywords: ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'async', 'await', 'try', 'catch', 'finally'],
                strings: /"[^"]*"|'[^']*'|`[^`]*`/g,
                comments: /\/\/.*|\/\*[\s\S]*?\*\//g,
                numbers: /\b\d+\.?\d*\b/g,
                functions: /\b\w+(?=\()/g
            },
            python: {
                keywords: ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'finally', 'import', 'from', 'as', 'return', 'yield', 'with', 'async', 'await'],
                strings: /"[^"]*"|'[^']*'|"""[^"]*"""|'''[^']*'''/g,
                comments: /#.*$/gm,
                numbers: /\b\d+\.?\d*\b/g,
                functions: /\b\w+(?=\()/g
            },
            java: {
                keywords: ['public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'static', 'final', 'abstract', 'if', 'else', 'for', 'while', 'try', 'catch', 'finally', 'return', 'new', 'this', 'super'],
                strings: /"[^"]*"/g,
                comments: /\/\/.*|\/\*[\s\S]*?\*\//g,
                numbers: /\b\d+\.?\d*\b/g,
                functions: /\b\w+(?=\()/g
            },
            cpp: {
                keywords: ['int', 'float', 'double', 'char', 'bool', 'string', 'vector', 'map', 'set', 'class', 'struct', 'namespace', 'template', 'typename', 'if', 'else', 'for', 'while', 'try', 'catch', 'return', 'new', 'delete', 'const', 'static', 'virtual', 'public', 'private', 'protected'],
                strings: /"[^"]*"/g,
                comments: /\/\/.*|\/\*[\s\S]*?\*\//g,
                numbers: /\b\d+\.?\d*\b/g,
                functions: /\b\w+(?=\()/g
            },
            csharp: {
                keywords: ['using', 'namespace', 'class', 'interface', 'struct', 'enum', 'public', 'private', 'protected', 'internal', 'static', 'readonly', 'const', 'virtual', 'abstract', 'sealed', 'override', 'new', 'this', 'base', 'if', 'else', 'for', 'while', 'try', 'catch', 'finally', 'return', 'async', 'await', 'var', 'string', 'int', 'bool', 'double', 'decimal'],
                strings: /"[^"]*"|@"[^"]*"/g,
                comments: /\/\/.*|\/\*[\s\S]*?\*\//g,
                numbers: /\b\d+\.?\d*\b/g,
                functions: /\b\w+(?=\()/g
            },
            html: {
                tags: /<\/?[^>]+>/g,
                attributes: /\s\w+="[^"]*"/g,
                comments: /<!--[\s\S]*?-->/g
            },
            css: {
                properties: /[a-zA-Z-]+(?=\s*:)/g,
                values: /:\s*[^;]+/g,
                selectors: /[.#]?\w+(?=\s*{)/g,
                comments: /\/\*[\s\S]*?\*\//g
            }
        };
    }

    highlight(code, language) {
        if (!this.languages[language]) {
            return code;
        }

        let highlighted = code;
        const rules = this.languages[language];

        // Highlight keywords
        if (rules.keywords) {
            rules.keywords.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'g');
                highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`);
            });
        }

        // Highlight strings
        if (rules.strings) {
            highlighted = highlighted.replace(rules.strings, match => `<span class="string">${match}</span>`);
        }

        // Highlight comments
        if (rules.comments) {
            highlighted = highlighted.replace(rules.comments, match => `<span class="comment">${match}</span>`);
        }

        // Highlight numbers
        if (rules.numbers) {
            highlighted = highlighted.replace(rules.numbers, match => `<span class="number">${match}</span>`);
        }

        // Highlight functions
        if (rules.functions) {
            highlighted = highlighted.replace(rules.functions, match => `<span class="function">${match}</span>`);
        }

        // HTML specific highlighting
        if (language === 'html') {
            highlighted = highlighted.replace(rules.tags, match => `<span class="tag">${match}</span>`);
            highlighted = highlighted.replace(rules.attributes, match => `<span class="attribute">${match}</span>`);
        }

        // CSS specific highlighting
        if (language === 'css') {
            highlighted = highlighted.replace(rules.properties, match => `<span class="property">${match}</span>`);
            highlighted = highlighted.replace(rules.values, match => `<span class="value">${match}</span>`);
            highlighted = highlighted.replace(rules.selectors, match => `<span class="selector">${match}</span>`);
        }

        return highlighted;
    }

    // Real-time highlighting for textarea/input
    setupRealTimeHighlighting(element, language) {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-highlight-wrapper';
        wrapper.style.position = 'relative';
        
        const highlightDiv = document.createElement('div');
        highlightDiv.className = 'code-highlight-overlay';
        highlightDiv.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            white-space: pre-wrap;
            word-wrap: break-word;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            padding: inherit;
            border: none;
            background: transparent;
            color: transparent;
            z-index: 1;
        `;

        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
        wrapper.appendChild(highlightDiv);

        const updateHighlight = () => {
            const highlighted = this.highlight(element.value, language);
            highlightDiv.innerHTML = highlighted;
        };

        element.addEventListener('input', updateHighlight);
        element.addEventListener('scroll', () => {
            highlightDiv.scrollTop = element.scrollTop;
            highlightDiv.scrollLeft = element.scrollLeft;
        });

        // Initial highlight
        updateHighlight();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SyntaxHighlighter;
} 