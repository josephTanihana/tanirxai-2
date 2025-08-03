// Mobile AI Code Assistant JavaScript
// Optimized for iOS and Android devices

// Mobile-specific AI Code Generator
class MobileAICodeGenerator {
    constructor() {
        this.currentLanguage = 'python';
        this.currentPrompt = '';
        this.generatedCode = '';
        this.isGenerating = false;
        this.initializeMobileFeatures();
    }

    initializeMobileFeatures() {
        // Add touch gestures
        this.addTouchGestures();
        
        // Initialize mobile-specific features
        this.setupMobileNavigation();
        this.setupMobileCodeGeneration();
        this.setupMobileSettings();
        
        // Add haptic feedback for iOS
        this.setupHapticFeedback();
        
        // Setup mobile-specific event listeners
        this.setupMobileEventListeners();
    }

    addTouchGestures() {
        let startY = 0;
        let currentY = 0;
        let isScrolling = false;

        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            const diff = startY - currentY;
            
            if (Math.abs(diff) > 10) {
                isScrolling = true;
            }
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!isScrolling) {
                // Handle tap events
                this.handleTap(e);
            }
            isScrolling = false;
        }, { passive: true });
    }

    handleTap(e) {
        // Add subtle haptic feedback for taps
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }

    setupMobileNavigation() {
        // Smooth section transitions
        const sections = document.querySelectorAll('.mobile-section');
        sections.forEach(section => {
            section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }

    setupMobileCodeGeneration() {
        // Mobile-optimized code generation
        const languageSelect = document.getElementById('mobile-language-select');
        const promptTextarea = document.getElementById('mobile-code-prompt');
        const generateBtn = document.querySelector('.generate-btn');

        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.currentLanguage = e.target.value;
                this.updateLanguageUI(e.target.value);
            });
        }

        if (promptTextarea) {
            promptTextarea.addEventListener('input', (e) => {
                this.currentPrompt = e.target.value;
                this.autoResizeTextarea(e.target);
            });
        }

        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateMobileCode();
            });
        }
    }

    setupMobileSettings() {
        // Mobile settings functionality
        const themeSelect = document.getElementById('theme-select');
        const codeStyleSelect = document.getElementById('code-style-select');
        const autoSaveCheckbox = document.getElementById('auto-save');
        const notificationsCheckbox = document.getElementById('notifications');

        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                this.applyTheme(e.target.value);
            });
        }

        if (codeStyleSelect) {
            codeStyleSelect.addEventListener('change', (e) => {
                this.updateCodeStyle(e.target.value);
            });
        }

        if (autoSaveCheckbox) {
            autoSaveCheckbox.addEventListener('change', (e) => {
                this.toggleAutoSave(e.target.checked);
            });
        }

        if (notificationsCheckbox) {
            notificationsCheckbox.addEventListener('change', (e) => {
                this.toggleNotifications(e.target.checked);
            });
        }
    }

    setupHapticFeedback() {
        // iOS haptic feedback
        if ('vibrate' in navigator) {
            // Android vibration
            this.hapticFeedback = (pattern) => {
                navigator.vibrate(pattern);
            };
        } else if (window.webkit && window.webkit.messageHandlers) {
            // iOS haptic feedback through WebKit
            this.hapticFeedback = (type) => {
                window.webkit.messageHandlers.hapticFeedback.postMessage({ type });
            };
        } else {
            this.hapticFeedback = () => {}; // No haptic feedback available
        }
    }

    setupMobileEventListeners() {
        // Mobile-specific event listeners
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeMobileApp();
        });

        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });

        // Handle resize events
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initializeMobileApp() {
        // Initialize mobile app features
        this.loadMobileSettings();
        this.setupMobileKeyboard();
        this.setupMobileShare();
        
        // Show welcome message for first-time users
        if (!localStorage.getItem('mobileAppInitialized')) {
            this.showWelcomeMessage();
            localStorage.setItem('mobileAppInitialized', 'true');
        }
    }

    setupMobileKeyboard() {
        // Handle mobile keyboard events
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.addEventListener('focus', () => {
                this.handleKeyboardOpen();
            });
            
            textarea.addEventListener('blur', () => {
                this.handleKeyboardClose();
            });
        });
    }

    setupMobileShare() {
        // Mobile share functionality
        if (navigator.share) {
            const shareButtons = document.querySelectorAll('.share-btn');
            shareButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.shareContent();
                });
            });
        }
    }

    generateMobileCode() {
        if (this.isGenerating) return;
        
        const prompt = document.getElementById('mobile-code-prompt').value;
        const language = document.getElementById('mobile-language-select').value;
        
        if (!prompt.trim()) {
            this.showMobileToast('Please describe what you want to build', 'error');
            return;
        }

        this.isGenerating = true;
        this.showGeneratingState();
        this.hapticFeedback(50); // Light haptic feedback

        // Use the enhanced AI code generator
        const generatedCode = aiCodeGenerator.generateCode(prompt, language);
        
        setTimeout(() => {
            this.displayMobileCode(generatedCode);
            this.isGenerating = false;
            this.hideGeneratingState();
            this.hapticFeedback([50, 50, 50]); // Success haptic feedback
        }, 1500);
    }

    showGeneratingState() {
        const generateBtn = document.querySelector('.generate-btn');
        const codeOutput = document.getElementById('mobileCodeOutput');
        
        if (generateBtn) {
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            generateBtn.disabled = true;
        }
        
        if (codeOutput) {
            codeOutput.style.opacity = '0.6';
        }
    }

    hideGeneratingState() {
        const generateBtn = document.querySelector('.generate-btn');
        const codeOutput = document.getElementById('mobileCodeOutput');
        
        if (generateBtn) {
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Code';
            generateBtn.disabled = false;
        }
        
        if (codeOutput) {
            codeOutput.style.opacity = '1';
        }
    }

    displayMobileCode(code) {
        const codeElement = document.getElementById('mobile-generated-code');
        if (codeElement) {
            codeElement.innerHTML = `<code>${this.escapeHtml(code)}</code>`;
            this.generatedCode = code;
            
            // Scroll to code output
            document.getElementById('mobileCodeOutput').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    copyMobileCode() {
        if (!this.generatedCode) {
            this.showMobileToast('No code to copy', 'error');
            return;
        }

        navigator.clipboard.writeText(this.generatedCode).then(() => {
            this.showMobileToast('Code copied to clipboard!', 'success');
            this.hapticFeedback(100);
        }).catch(() => {
            this.showMobileToast('Failed to copy code', 'error');
        });
    }

    downloadMobileCode() {
        if (!this.generatedCode) {
            this.showMobileToast('No code to download', 'error');
            return;
        }

        const language = document.getElementById('mobile-language-select').value;
        const extension = this.getFileExtension(language);
        const filename = `ai-generated-code.${extension}`;
        
        const blob = new Blob([this.generatedCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showMobileToast('Code downloaded!', 'success');
        this.hapticFeedback([50, 50]);
    }

    getFileExtension(language) {
        const extensions = {
            'python': 'py',
            'javascript': 'js',
            'typescript': 'ts',
            'java': 'java',
            'swift': 'swift',
            'kotlin': 'kt',
            'rust': 'rs',
            'go': 'go',
            'cpp': 'cpp',
            'csharp': 'cs',
            'php': 'php',
            'ruby': 'rb'
        };
        return extensions[language] || 'txt';
    }

    showMobileToast(message, type = 'info') {
        // Create mobile toast notification
        const toast = document.createElement('div');
        toast.className = `mobile-toast ${type}`;
        toast.textContent = message;
        
        // Style the toast
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#3742fa',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10000',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    updateLanguageUI(language) {
        // Update UI based on selected language
        const languageCards = document.querySelectorAll('.language-card');
        languageCards.forEach(card => {
            card.style.opacity = '0.6';
        });
        
        // Highlight selected language
        const selectedCard = document.querySelector(`[data-language="${language}"]`);
        if (selectedCard) {
            selectedCard.style.opacity = '1';
        }
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    applyTheme(theme) {
        document.body.className = `theme-${theme}`;
        localStorage.setItem('mobileTheme', theme);
    }

    updateCodeStyle(style) {
        localStorage.setItem('mobileCodeStyle', style);
    }

    toggleAutoSave(enabled) {
        localStorage.setItem('mobileAutoSave', enabled);
    }

    toggleNotifications(enabled) {
        localStorage.setItem('mobileNotifications', enabled);
        if (enabled && 'Notification' in window) {
            Notification.requestPermission();
        }
    }

    loadMobileSettings() {
        const theme = localStorage.getItem('mobileTheme') || 'auto';
        const codeStyle = localStorage.getItem('mobileCodeStyle') || 'standard';
        const autoSave = localStorage.getItem('mobileAutoSave') !== 'false';
        const notifications = localStorage.getItem('mobileNotifications') !== 'false';
        
        this.applyTheme(theme);
        
        const themeSelect = document.getElementById('theme-select');
        const codeStyleSelect = document.getElementById('code-style-select');
        const autoSaveCheckbox = document.getElementById('auto-save');
        const notificationsCheckbox = document.getElementById('notifications');
        
        if (themeSelect) themeSelect.value = theme;
        if (codeStyleSelect) codeStyleSelect.value = codeStyle;
        if (autoSaveCheckbox) autoSaveCheckbox.checked = autoSave;
        if (notificationsCheckbox) notificationsCheckbox.checked = notifications;
    }

    showWelcomeMessage() {
        this.showMobileToast('Welcome to AI Code Assistant! 🚀', 'success');
    }

    handleOrientationChange() {
        // Handle orientation change
        setTimeout(() => {
            this.updateMobileLayout();
        }, 100);
    }

    handleResize() {
        this.updateMobileLayout();
    }

    updateMobileLayout() {
        // Update layout for different screen sizes
        const isLandscape = window.innerWidth > window.innerHeight;
        const container = document.querySelector('.mobile-container');
        
        if (container) {
            container.style.minHeight = isLandscape ? '100vh' : '100vh';
        }
    }

    handleKeyboardOpen() {
        // Handle mobile keyboard opening
        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';
    }

    handleKeyboardClose() {
        // Handle mobile keyboard closing
        document.body.style.height = '';
        document.body.style.overflow = '';
    }

    shareContent() {
        if (navigator.share) {
            navigator.share({
                title: 'AI Code Assistant',
                text: 'Check out this amazing AI-powered code generator!',
                url: window.location.href
            });
        }
    }
}

// Mobile-specific functions
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.mobile-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function toggleMenu() {
    const nav = document.getElementById('mobileNav');
    nav.classList.toggle('expanded');
}

function generateMobileCode() {
    mobileAI.generateMobileCode();
}

function copyMobileCode() {
    mobileAI.copyMobileCode();
}

function downloadMobileCode() {
    mobileAI.downloadMobileCode();
}

function showDemo() {
    // Show demo modal or navigate to demo section
    mobileAI.showMobileToast('Demo feature coming soon!', 'info');
}

// Initialize mobile AI code generator
const mobileAI = new MobileAICodeGenerator();

// Add mobile-specific CSS for toast notifications
const mobileToastStyles = `
.mobile-toast {
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: #3742fa;
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.mobile-toast.success {
    background: #2ed573;
}

.mobile-toast.error {
    background: #ff4757;
}

.mobile-toast.info {
    background: #3742fa;
}
`;

// Inject mobile toast styles
const style = document.createElement('style');
style.textContent = mobileToastStyles;
document.head.appendChild(style); 