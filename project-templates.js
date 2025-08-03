// Project Templates for AI Code Assistant
class ProjectTemplates {
    constructor() {
        this.templates = {
            // Web Development Templates
            'react-app': {
                name: 'React Application',
                description: 'A modern React application with hooks and functional components',
                category: 'Web Development',
                files: {
                    'package.json': {
                        content: `{
  "name": "react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`
                    },
                    'src/App.js': {
                        content: `import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React</h1>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </header>
    </div>
  );
}

export default App;`
                    },
                    'src/App.css': {
                        content: `.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

button {
  font-size: 18px;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #61dafb;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #21a1cb;
}`
                    },
                    'public/index.html': {
                        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="React App created with AI Code Assistant" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`
                    }
                }
            },
            'vue-app': {
                name: 'Vue.js Application',
                description: 'A Vue.js application with composition API',
                category: 'Web Development',
                files: {
                    'package.json': {
                        content: `{
  "name": "vue-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "vue": "^3.3.0",
    "vue-router": "^4.2.0"
  },
  "devDependencies": {
    "@vue/cli-service": "^5.0.0",
    "@vue/compiler-sfc": "^3.3.0"
  }
}`
                    },
                    'src/main.js': {
                        content: `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')`
                    },
                    'src/App.vue': {
                        content: `<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>`
                    }
                }
            },
            'node-api': {
                name: 'Node.js API Server',
                description: 'A RESTful API server with Express.js',
                category: 'Backend Development',
                files: {
                    'package.json': {
                        content: `{
  "name": "node-api",
  "version": "1.0.0",
  "description": "RESTful API server",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "helmet": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}`
                    },
                    'server.js': {
                        content: `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  res.json({ 
    message: 'User created successfully',
    user: { id: Date.now(), name, email }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
                    },
                    '.env': {
                        content: `PORT=3000
NODE_ENV=development`
                    }
                }
            },
            'python-flask': {
                name: 'Python Flask App',
                description: 'A web application using Flask framework',
                category: 'Backend Development',
                files: {
                    'app.py': {
                        content: `from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    return jsonify({
        'message': 'Hello from Flask!',
        'status': 'success'
    })

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    return jsonify({
        'message': 'User created successfully',
        'user': data
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)`
                    },
                    'requirements.txt': {
                        content: `Flask==2.3.0
Flask-CORS==4.0.0
python-dotenv==1.0.0`
                    },
                    'templates/index.html': {
                        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flask App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            text-align: center;
            margin-top: 50px;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Flask App</h1>
        <p>This is a simple Flask application.</p>
        <button onclick="fetchData()">Get Data</button>
        <div id="result"></div>
    </div>

    <script>
        async function fetchData() {
            try {
                const response = await fetch('/api/data');
                const data = await response.json();
                document.getElementById('result').innerHTML = 
                    '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            } catch (error) {
                console.error('Error:', error);
            }
        }
    </script>
</body>
</html>`
                    }
                }
            },
            'mobile-react-native': {
                name: 'React Native App',
                description: 'A cross-platform mobile app with React Native',
                category: 'Mobile Development',
                files: {
                    'package.json': {
                        content: `{
  "name": "react-native-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/stack": "^6.3.0",
    "react-native-screens": "^3.20.0",
    "react-native-safe-area-context": "^4.5.0",
    "react-native-gesture-handler": "^2.10.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@babel/preset-env": "^7.20.0",
    "@babel/runtime": "^7.20.0",
    "@react-native/eslint-config": "^0.72.0",
    "@react-native/metro-config": "^0.72.0",
    "@tsconfig/react-native": "^3.0.0",
    "@types/react": "^18.0.24",
    "@types/react-test-renderer": "^18.0.0",
    "babel-jest": "^29.2.1",
    "eslint": "^8.19.0",
    "jest": "^29.2.1",
    "metro-react-native-babel-preset": "0.76.5",
    "prettier": "^2.4.1",
    "react-test-renderer": "18.2.0",
    "typescript": "4.8.4"
  }
}`
                    },
                    'App.js': {
                        content: `import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={styles.container.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Welcome to React Native!</Text>
          <Text style={styles.sectionDescription}>
            This is a cross-platform mobile application built with React Native.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  scrollView: {
    backgroundColor: '#F3F3F3',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;`
                    }
                }
            },
            'desktop-electron': {
                name: 'Electron Desktop App',
                description: 'A cross-platform desktop application with Electron',
                category: 'Desktop Development',
                files: {
                    'package.json': {
                        content: `{
  "name": "electron-app",
  "version": "1.0.0",
  "description": "Electron Desktop Application",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder",
    "pack": "electron-builder --dir",
    "dist": "electron-builder"
  },
  "dependencies": {
    "electron": "^25.0.0"
  },
  "devDependencies": {
    "electron-builder": "^24.0.0"
  },
  "build": {
    "appId": "com.example.electron-app",
    "productName": "Electron App",
    "directories": {
      "output": "dist"
    },
    "files": [
      "**/*",
      "!node_modules/**/*"
    ],
    "mac": {
      "category": "public.app-category.utilities"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "AppImage"
    }
  }
}`
                    },
                    'main.js': {
                        content: `const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'assets/icon.png')
  });

  mainWindow.loadFile('index.html');

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Create menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('menu-new');
          }
        },
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            mainWindow.webContents.send('menu-open');
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});`
                    },
                    'index.html': {
                        content: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Electron App</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            text-align: center;
            max-width: 600px;
        }
        
        h1 {
            font-size: 3em;
            margin-bottom: 20px;
        }
        
        p {
            font-size: 1.2em;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        
        .button {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 15px 30px;
            font-size: 1.1em;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }
        
        .feature {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Electron App</h1>
        <p>Welcome to your cross-platform desktop application!</p>
        <button class="button" onclick="showMessage()">Click Me!</button>
        
        <div class="features">
            <div class="feature">
                <h3>📱 Cross-Platform</h3>
                <p>Works on Windows, macOS, and Linux</p>
            </div>
            <div class="feature">
                <h3>⚡ Fast</h3>
                <p>Built with modern web technologies</p>
            </div>
            <div class="feature">
                <h3>🔧 Customizable</h3>
                <p>Easy to modify and extend</p>
            </div>
        </div>
    </div>

    <script>
        const { ipcRenderer } = require('electron');
        
        function showMessage() {
            alert('Hello from Electron! 🎉');
        }
        
        // Listen for menu events
        ipcRenderer.on('menu-new', () => {
            alert('New file requested!');
        });
        
        ipcRenderer.on('menu-open', () => {
            alert('Open file requested!');
        });
    </script>
</body>
</html>`
                    }
                }
            }
        };
    }

    getTemplates() {
        return this.templates;
    }

    getTemplate(name) {
        return this.templates[name];
    }

    getTemplatesByCategory(category) {
        return Object.entries(this.templates)
            .filter(([key, template]) => template.category === category)
            .reduce((acc, [key, template]) => {
                acc[key] = template;
                return acc;
            }, {});
    }

    getCategories() {
        const categories = new Set();
        Object.values(this.templates).forEach(template => {
            categories.add(template.category);
        });
        return Array.from(categories);
    }

    createProjectFromTemplate(templateName, projectName) {
        const template = this.templates[templateName];
        if (!template) {
            throw new Error(`Template '${templateName}' not found`);
        }

        const project = {
            name: projectName,
            template: templateName,
            files: {}
        };

        // Create files from template
        Object.entries(template.files).forEach(([filePath, fileData]) => {
            project.files[filePath] = fileData.content;
        });

        return project;
    }

    // Method to add custom template
    addTemplate(name, template) {
        this.templates[name] = template;
    }

    // Generate template preview
    generatePreview(templateName) {
        const template = this.templates[templateName];
        if (!template) return null;

        const preview = {
            name: template.name,
            description: template.description,
            category: template.category,
            fileCount: Object.keys(template.files).length,
            files: Object.keys(template.files)
        };

        return preview;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectTemplates;
} 