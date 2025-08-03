// Theme Manager for AI Code Assistant
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.themes = {
            light: {
                '--bg-primary': '#ffffff',
                '--bg-secondary': '#f8f9fa',
                '--bg-tertiary': '#e9ecef',
                '--text-primary': '#212529',
                '--text-secondary': '#6c757d',
                '--accent-primary': '#007bff',
                '--accent-secondary': '#6f42c1',
                '--border-color': '#dee2e6',
                '--shadow': '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
                '--code-bg': '#f8f9fa',
                '--keyword': '#d73a49',
                '--string': '#032f62',
                '--comment': '#6a737d',
                '--number': '#005cc5',
                '--function': '#6f42c1',
                '--tag': '#22863a',
                '--attribute': '#b088ff',
                '--property': '#005cc5',
                '--value': '#032f62',
                '--selector': '#d73a49'
            },
            dark: {
                '--bg-primary': '#1a1a1a',
                '--bg-secondary': '#2d2d2d',
                '--bg-tertiary': '#404040',
                '--text-primary': '#ffffff',
                '--text-secondary': '#b0b0b0',
                '--accent-primary': '#4dabf7',
                '--accent-secondary': '#ae8fff',
                '--border-color': '#404040',
                '--shadow': '0 0.125rem 0.25rem rgba(0, 0, 0, 0.3)',
                '--code-bg': '#2d2d2d',
                '--keyword': '#ff7b72',
                '--string': '#a5d6ff',
                '--comment': '#8b949e',
                '--number': '#79c0ff',
                '--function': '#d2a8ff',
                '--tag': '#7ee787',
                '--attribute': '#ffa657',
                '--property': '#79c0ff',
                '--value': '#a5d6ff',
                '--selector': '#ff7b72'
            },
            blue: {
                '--bg-primary': '#0d1117',
                '--bg-secondary': '#161b22',
                '--bg-tertiary': '#21262d',
                '--text-primary': '#f0f6fc',
                '--text-secondary': '#8b949e',
                '--accent-primary': '#58a6ff',
                '--accent-secondary': '#bc8cff',
                '--border-color': '#30363d',
                '--shadow': '0 0.125rem 0.25rem rgba(0, 0, 0, 0.4)',
                '--code-bg': '#161b22',
                '--keyword': '#ff7b72',
                '--string': '#a5d6ff',
                '--comment': '#8b949e',
                '--number': '#79c0ff',
                '--function': '#d2a8ff',
                '--tag': '#7ee787',
                '--attribute': '#ffa657',
                '--property': '#79c0ff',
                '--value': '#a5d6ff',
                '--selector': '#ff7b72'
            },
            green: {
                '--bg-primary': '#0a0f0a',
                '--bg-secondary': '#1a1f1a',
                '--bg-tertiary': '#2a2f2a',
                '--text-primary': '#f0f6f0',
                '--text-secondary': '#8b948e',
                '--accent-primary': '#58ffa6',
                '--accent-secondary': '#8cffbc',
                '--border-color': '#303630',
                '--shadow': '0 0.125rem 0.25rem rgba(0, 0, 0, 0.4)',
                '--code-bg': '#1a1f1a',
                '--keyword': '#ff7b72',
                '--string': '#a5d6ff',
                '--comment': '#8b949e',
                '--number': '#79c0ff',
                '--function': '#d2a8ff',
                '--tag': '#7ee787',
                '--attribute': '#ffa657',
                '--property': '#79c0ff',
                '--value': '#a5d6ff',
                '--selector': '#ff7b72'
            }
        };
        
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.createThemeToggle();
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        const root = document.documentElement;
        Object.entries(theme).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });

        this.currentTheme = themeName;
        localStorage.setItem('theme', themeName);
        
        // Update theme indicator
        const themeIndicator = document.getElementById('theme-indicator');
        if (themeIndicator) {
            themeIndicator.textContent = themeName.charAt(0).toUpperCase() + themeName.slice(1);
        }

        // Dispatch theme change event
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: themeName } }));
    }

    createThemeToggle() {
        // Create theme toggle button if it doesn't exist
        if (!document.getElementById('theme-toggle')) {
            const toggle = document.createElement('button');
            toggle.id = 'theme-toggle';
            toggle.className = 'theme-toggle-btn';
            toggle.innerHTML = `
                <span class="theme-icon">🌙</span>
                <span class="theme-text">Theme</span>
            `;
            toggle.title = 'Toggle theme';

            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .theme-toggle-btn {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    color: var(--text-primary);
                    padding: 10px 15px;
                    border-radius: 25px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    z-index: 1000;
                    transition: all 0.3s ease;
                    box-shadow: var(--shadow);
                }

                .theme-toggle-btn:hover {
                    background: var(--bg-tertiary);
                    transform: translateY(-2px);
                }

                .theme-icon {
                    font-size: 16px;
                }

                .theme-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    box-shadow: var(--shadow);
                    padding: 8px 0;
                    margin-top: 5px;
                    min-width: 120px;
                    display: none;
                }

                .theme-dropdown.show {
                    display: block;
                }

                .theme-option {
                    padding: 8px 15px;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }

                .theme-option:hover {
                    background: var(--bg-tertiary);
                }

                .theme-option.active {
                    background: var(--accent-primary);
                    color: white;
                }
            `;
            document.head.appendChild(style);

            // Create dropdown
            const dropdown = document.createElement('div');
            dropdown.className = 'theme-dropdown';
            dropdown.innerHTML = `
                <div class="theme-option" data-theme="light">Light</div>
                <div class="theme-option" data-theme="dark">Dark</div>
                <div class="theme-option" data-theme="blue">Blue</div>
                <div class="theme-option" data-theme="green">Green</div>
            `;

            toggle.appendChild(dropdown);
            document.body.appendChild(toggle);

            // Event listeners
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });

            dropdown.addEventListener('click', (e) => {
                if (e.target.classList.contains('theme-option')) {
                    const theme = e.target.dataset.theme;
                    this.applyTheme(theme);
                    dropdown.classList.remove('show');
                    
                    // Update active state
                    dropdown.querySelectorAll('.theme-option').forEach(opt => {
                        opt.classList.remove('active');
                    });
                    e.target.classList.add('active');
                }
            });

            document.addEventListener('click', () => {
                dropdown.classList.remove('show');
            });

            // Set initial active state
            const activeOption = dropdown.querySelector(`[data-theme="${this.currentTheme}"]`);
            if (activeOption) {
                activeOption.classList.add('active');
            }
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    getAvailableThemes() {
        return Object.keys(this.themes);
    }

    // Method to add custom theme
    addCustomTheme(name, colors) {
        this.themes[name] = colors;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
} 