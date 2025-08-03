const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // File operations
    saveFile: (content, defaultPath) => ipcRenderer.invoke('save-file', content, defaultPath),
    openFile: () => ipcRenderer.invoke('open-file'),
    
    // Settings
    getSettings: () => ipcRenderer.invoke('get-settings'),
    saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
    
    // Notifications
    showNotification: (title, body) => ipcRenderer.invoke('show-notification', title, body),
    
    // App events
    onNewProject: (callback) => ipcRenderer.on('new-project', callback),
    onOpenProject: (callback) => ipcRenderer.on('open-project', callback),
    onSaveCode: (callback) => ipcRenderer.on('save-code', callback),
    
    // Update events
    onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback),
    onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', callback),
    onUpdateError: (callback) => ipcRenderer.on('update-error', callback),
    
    // Remove listeners
    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});

// Expose desktop-specific features
contextBridge.exposeInMainWorld('desktopFeatures', {
    isDesktop: true,
    platform: process.platform,
    version: process.versions.electron,
    
    // Desktop-specific UI enhancements
    setTitle: (title) => {
        document.title = title;
    },
    
    // Desktop notifications
    requestNotificationPermission: () => {
        if ('Notification' in window) {
            return Notification.requestPermission();
        }
        return Promise.resolve('denied');
    },
    
    // Desktop-specific shortcuts
    registerShortcuts: () => {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + S to save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                window.electronAPI.saveCode();
            }
            
            // Ctrl/Cmd + O to open
            if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
                e.preventDefault();
                window.electronAPI.openFile();
            }
            
            // Ctrl/Cmd + N for new project
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                window.electronAPI.newProject();
            }
        });
    }
});

// Expose enhanced AI code generator for desktop
contextBridge.exposeInMainWorld('desktopAICodeGenerator', {
    // Enhanced code generation with desktop features
    generateCode: (prompt, language, options = {}) => {
        // Use the enhanced AI code generator from the main script
        if (window.aiCodeGenerator) {
            return window.aiCodeGenerator.generateCode(prompt, language, options);
        }
        return '// Desktop AI Code Generator\n// Enhanced with desktop features\n';
    },
    
    // Desktop-specific code templates
    getDesktopTemplates: () => {
        return {
            'windows-app': `using System;
using System.Windows.Forms;

namespace AIGeneratedApp
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
            SetupUI();
        }
        
        private void SetupUI()
        {
            this.Text = "AI Generated Windows App";
            this.Size = new System.Drawing.Size(800, 600);
            
            // Add your UI components here
            Button button = new Button();
            button.Text = "Click Me!";
            button.Location = new System.Drawing.Point(50, 50);
            button.Click += (sender, e) => MessageBox.Show("Hello from AI-generated Windows app!");
            
            this.Controls.Add(button);
        }
    }
}`,
            
            'desktop-api': `import requests
import json
import os
from pathlib import Path

class DesktopAPIClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        self.config_path = Path.home() / '.ai-code-assistant' / 'config.json'
        self.config_path.parent.mkdir(exist_ok=True)
    
    def load_config(self):
        """Load configuration from desktop storage"""
        if self.config_path.exists():
            with open(self.config_path, 'r') as f:
                return json.load(f)
        return {}
    
    def save_config(self, config):
        """Save configuration to desktop storage"""
        with open(self.config_path, 'w') as f:
            json.dump(config, f, indent=2)
    
    def get_data(self, endpoint):
        """Get data from API with desktop caching"""
        cache_file = Path.home() / '.ai-code-assistant' / 'cache' / f'{endpoint}.json'
        cache_file.parent.mkdir(exist_ok=True)
        
        if cache_file.exists():
            with open(cache_file, 'r') as f:
                return json.load(f)
        
        response = self.session.get(f"{self.base_url}/{endpoint}")
        data = response.json()
        
        with open(cache_file, 'w') as f:
            json.dump(data, f, indent=2)
        
        return data
    
    def post_data(self, endpoint, data):
        """Post data to API"""
        response = self.session.post(f"{self.base_url}/{endpoint}", json=data)
        return response.json()

# Usage
client = DesktopAPIClient("https://api.example.com")
data = client.get_data("users")`,
            
            'desktop-automation': `import pyautogui
import time
import keyboard
from pathlib import Path

class DesktopAutomation:
    def __init__(self):
        self.scripts_path = Path.home() / 'Desktop' / 'AI-Automation-Scripts'
        self.scripts_path.mkdir(exist_ok=True)
    
    def create_automation_script(self, name, actions):
        """Create a desktop automation script"""
        script_content = f'''import pyautogui
import time

def {name}():
    """AI-generated desktop automation script"""
    {actions}
    
if __name__ == "__main__":
    {name}()
'''
        
        script_file = self.scripts_path / f'{name}.py'
        with open(script_file, 'w') as f:
            f.write(script_content)
        
        return str(script_file)
    
    def run_script(self, script_path):
        """Run an automation script"""
        import subprocess
        subprocess.run(['python', script_path])
    
    def record_macro(self, duration=10):
        """Record mouse and keyboard actions"""
        print(f"Recording macro for {duration} seconds...")
        time.sleep(3)  # Give user time to prepare
        
        start_time = time.time()
        actions = []
        
        while time.time() - start_time < duration:
            # Record mouse clicks
            if pyautogui.mouseDown():
                x, y = pyautogui.position()
                actions.append(f'pyautogui.click({x}, {y})')
                time.sleep(0.1)
            
            # Record keyboard input
            if keyboard.is_pressed():
                key = keyboard.read_event()
                if key.event_type == 'down':
                    actions.append(f'pyautogui.press("{key.name}")')
        
        return actions

# Usage
automation = DesktopAutomation()
script_path = automation.create_automation_script('test_automation', 'print("Hello from automation!")')
automation.run_script(script_path)`
        };
    },
    
    // Desktop file system operations
    getDesktopPath: () => {
        const { app } = require('electron');
        return app.getPath('desktop');
    },
    
    getDocumentsPath: () => {
        const { app } = require('electron');
        return app.getPath('documents');
    },
    
    getAppDataPath: () => {
        const { app } = require('electron');
        return app.getPath('userData');
    }
});

// Initialize desktop features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Register desktop shortcuts
    if (window.desktopFeatures) {
        window.desktopFeatures.registerShortcuts();
    }
    
    // Set up desktop-specific event listeners
    if (window.electronAPI) {
        // Handle new project
        window.electronAPI.onNewProject(() => {
            if (window.aiCodeGenerator) {
                // Clear current code and start new project
                const codeElement = document.getElementById('generated-code');
                if (codeElement) {
                    codeElement.innerHTML = '<code>// New project started\n// Describe what you want to build...</code>';
                }
            }
        });
        
        // Handle save code
        window.electronAPI.onSaveCode(() => {
            const codeElement = document.getElementById('generated-code');
            if (codeElement && codeElement.textContent) {
                window.electronAPI.saveFile(codeElement.textContent, 'ai-generated-code.txt');
            }
        });
        
        // Handle open project
        window.electronAPI.onOpenProject((event, projectPath) => {
            console.log('Opening project:', projectPath);
            // Handle project opening logic
        });
    }
}); 