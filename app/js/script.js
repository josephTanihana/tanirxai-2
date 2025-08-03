// AI Code Assistant - JavaScript Functionality

// Import new modules
let syntaxHighlighter, themeManager, collaborationManager, projectTemplates, debugTools;

// Initialize modules when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize new modules
    syntaxHighlighter = new SyntaxHighlighter();
    themeManager = new ThemeManager();
    collaborationManager = new CollaborationManager();
    projectTemplates = new ProjectTemplates();
    debugTools = new DebugTools();

    // Setup syntax highlighting for code editor
    const codeEditor = document.getElementById('code-editor');
    if (codeEditor) {
        syntaxHighlighter.setupRealTimeHighlighting(codeEditor, 'javascript');
    }

    // Setup theme change listener
    document.addEventListener('themeChanged', function(event) {
        console.log('Theme changed to:', event.detail.theme);
        // Refresh any theme-dependent components
        if (debugTools) {
            debugTools.refreshMetrics();
        }
    });

    // Initialize existing functionality
    initializeApp();
});

// Sample code templates for different languages
const codeTemplates = {
    python: {
        'web app': `from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'message': 'Hello from AI-generated API!',
        'status': 'success'
    }
    return json.dumps(data)

if __name__ == '__main__':
    app.run(debug=True)`,
        
        'machine learning': `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load and prepare data
def load_data(file_path):
    data = pd.read_csv(file_path)
    return data

# Train model
def train_model(X, y):
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    return model

# Main execution
if __name__ == "__main__":
    # Load your data here
    data = load_data('your_data.csv')
    X = data.drop('target', axis=1)
    y = data['target']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    model = train_model(X_train, y_train)
    
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    print(f"Model accuracy: {accuracy:.2f}")`,
        
        'api client': `import requests
import json

class APIClient:
    def __init__(self, base_url, api_key=None):
        self.base_url = base_url
        self.api_key = api_key
        self.session = requests.Session()
        
        if api_key:
            self.session.headers.update({'Authorization': f'Bearer {api_key}'})
    
    def get(self, endpoint, params=None):
        response = self.session.get(f"{self.base_url}/{endpoint}", params=params)
        response.raise_for_status()
        return response.json()
    
    def post(self, endpoint, data=None):
        response = self.session.post(f"{self.base_url}/{endpoint}", json=data)
        response.raise_for_status()
        return response.json()
    
    def put(self, endpoint, data=None):
        response = self.session.put(f"{self.base_url}/{endpoint}", json=data)
        response.raise_for_status()
        return response.json()
    
    def delete(self, endpoint):
        response = self.session.delete(f"{self.base_url}/{endpoint}")
        response.raise_for_status()
        return response.json()

# Usage example
client = APIClient("https://api.example.com", "your-api-key")
data = client.get("users")`
    },
    
    javascript: {
        'web app': `const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/data', (req, res) => {
    res.json({
        message: 'Hello from AI-generated API!',
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

app.post('/api/submit', (req, res) => {
    const { data } = req.body;
    // Process data here
    res.json({ success: true, message: 'Data received' });
});

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`,
        
        'react component': `import React, { useState, useEffect } from 'react';
import './Component.css';

const AIComponent = ({ title, data }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ai-component">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter your input..."
                    required 
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Submit'}
                </button>
            </form>
            {result && (
                <div className="result">
                    <h3>Result:</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default AIComponent;`,
        
        'api client': `class APIClient {
    constructor(baseURL, options = {}) {
        this.baseURL = baseURL;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };
    }

    async request(endpoint, options = {}) {
        const url = \`\${this.baseURL}\${endpoint}\`;
        const config = {
            ...this.options,
            ...options,
            headers: {
                ...this.options.headers,
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? \`\${endpoint}?\${queryString}\` : endpoint;
        return this.request(url, { method: 'GET' });
    }

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Usage example
const client = new APIClient('https://api.example.com');
const data = await client.get('/users');`
    },
    
    java: {
        'web app': `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
public class AIWebApplication {
    public static void main(String[] args) {
        SpringApplication.run(AIWebApplication.class, args);
    }
}

@RestController
@RequestMapping("/api")
public class AIController {
    
    @GetMapping("/data")
    public ResponseEntity<Map<String, Object>> getData() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Hello from AI-generated Spring Boot API!");
        response.put("status", "success");
        response.put("timestamp", new Date());
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitData(@RequestBody Map<String, Object> data) {
        // Process the data here
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Data received successfully");
        return ResponseEntity.ok(response);
    }
}`,
        
        'android app': `public class MainActivity extends AppCompatActivity {
    private TextView resultTextView;
    private EditText inputEditText;
    private Button submitButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        initializeViews();
        setupListeners();
    }
    
    private void initializeViews() {
        resultTextView = findViewById(R.id.result_text);
        inputEditText = findViewById(R.id.input_edit);
        submitButton = findViewById(R.id.submit_button);
    }
    
    private void setupListeners() {
        submitButton.setOnClickListener(v -> {
            String input = inputEditText.getText().toString();
            if (!input.isEmpty()) {
                processInput(input);
            }
        });
    }
    
    private void processInput(String input) {
        // AI processing logic here
        String result = "Processed: " + input;
        resultTextView.setText(result);
    }
}`,
        
        'api client': `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import com.fasterxml.jackson.databind.ObjectMapper;

public class APIClient {
    private final String baseURL;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    
    public APIClient(String baseURL) {
        this.baseURL = baseURL;
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }
    
    public <T> T get(String endpoint, Class<T> responseType) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(baseURL + endpoint))
            .header("Content-Type", "application/json")
            .GET()
            .build();
            
        HttpResponse<String> response = httpClient.send(request, 
            HttpResponse.BodyHandlers.ofString());
            
        return objectMapper.readValue(response.body(), responseType);
    }
    
    public <T> T post(String endpoint, Object data, Class<T> responseType) throws Exception {
        String jsonData = objectMapper.writeValueAsString(data);
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(baseURL + endpoint))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonData))
            .build();
            
        HttpResponse<String> response = httpClient.send(request, 
            HttpResponse.BodyHandlers.ofString());
            
        return objectMapper.readValue(response.body(), responseType);
    }
}`
    },
    
    cpp: {
        'game': `#include <iostream>
#include <vector>
#include <memory>

class GameObject {
protected:
    float x, y;
    std::string name;
    
public:
    GameObject(float x, float y, const std::string& name) 
        : x(x), y(y), name(name) {}
    
    virtual void update() = 0;
    virtual void render() = 0;
    
    float getX() const { return x; }
    float getY() const { return y; }
    const std::string& getName() const { return name; }
};

class Player : public GameObject {
private:
    float speed;
    
public:
    Player(float x, float y) : GameObject(x, y, "Player"), speed(5.0f) {}
    
    void update() override {
        // Handle input and update position
        std::cout << "Updating player at (" << x << ", " << y << ")" << std::endl;
    }
    
    void render() override {
        std::cout << "Rendering player: " << name << std::endl;
    }
    
    void move(float dx, float dy) {
        x += dx * speed;
        y += dy * speed;
    }
};

class Game {
private:
    std::vector<std::unique_ptr<GameObject>> objects;
    
public:
    void addObject(std::unique_ptr<GameObject> obj) {
        objects.push_back(std::move(obj));
    }
    
    void update() {
        for (auto& obj : objects) {
            obj->update();
        }
    }
    
    void render() {
        for (auto& obj : objects) {
            obj->render();
        }
    }
    
    void run() {
        std::cout << "Game loop started!" << std::endl;
        // Main game loop would go here
    }
};

int main() {
    Game game;
    game.addObject(std::make_unique<Player>(100.0f, 100.0f));
    game.run();
    return 0;
}`,
        
        'system utility': `#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>

class FileProcessor {
private:
    std::string filename;
    
public:
    FileProcessor(const std::string& filename) : filename(filename) {}
    
    bool processFile() {
        std::ifstream file(filename);
        if (!file.is_open()) {
            std::cerr << "Error: Could not open file " << filename << std::endl;
            return false;
        }
        
        std::string line;
        std::vector<std::string> lines;
        
        while (std::getline(file, line)) {
            lines.push_back(line);
        }
        
        file.close();
        
        // Process the lines
        std::cout << "Processing " << lines.size() << " lines..." << std::endl;
        
        // Example processing: count words
        int wordCount = 0;
        for (const auto& line : lines) {
            std::string word;
            std::istringstream iss(line);
            while (iss >> word) {
                wordCount++;
            }
        }
        
        std::cout << "Total words: " << wordCount << std::endl;
        return true;
    }
    
    void saveResults(const std::string& outputFile) {
        std::ofstream outFile(outputFile);
        if (outFile.is_open()) {
            outFile << "Processing completed successfully!" << std::endl;
            outFile.close();
        }
    }
};

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cout << "Usage: " << argv[0] << " <filename>" << std::endl;
        return 1;
    }
    
    FileProcessor processor(argv[1]);
    if (processor.processFile()) {
        processor.saveResults("output.txt");
        std::cout << "Processing completed!" << std::endl;
    }
    
    return 0;
}`
    },
    
    rust: {
        'web server': `use actix_web::{web, App, HttpServer, HttpResponse, Result};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
struct ApiResponse {
    message: String,
    status: String,
    timestamp: String,
}

#[derive(Deserialize)]
struct SubmitData {
    data: String,
}

async fn get_data() -> Result<HttpResponse> {
    let response = ApiResponse {
        message: "Hello from AI-generated Rust API!".to_string(),
        status: "success".to_string(),
        timestamp: chrono::Utc::now().to_rfc3339(),
    };
    
    Ok(HttpResponse::Ok().json(response))
}

async fn submit_data(data: web::Json<SubmitData>) -> Result<HttpResponse> {
    // Process the data here
    let response = ApiResponse {
        message: format!("Received: {}", data.data),
        status: "success".to_string(),
        timestamp: chrono::Utc::now().to_rfc3339(),
    };
    
    Ok(HttpResponse::Ok().json(response))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting AI-generated Rust server on http://localhost:8080");
    
    HttpServer::new(|| {
        App::new()
            .route("/api/data", web::get().to(get_data))
            .route("/api/submit", web::post().to(submit_data))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}`,
        
        'cli tool': `use clap::{App, Arg};
use std::fs;
use std::path::Path;

struct FileProcessor {
    input_path: String,
    output_path: Option<String>,
}

impl FileProcessor {
    fn new(input_path: String) -> Self {
        Self {
            input_path,
            output_path: None,
        }
    }
    
    fn with_output(mut self, output_path: String) -> Self {
        self.output_path = Some(output_path);
        self
    }
    
    fn process(&self) -> Result<(), Box<dyn std::error::Error>> {
        let content = fs::read_to_string(&self.input_path)?;
        
        // Process the content
        let processed = self.transform_content(&content);
        
        // Output the result
        match &self.output_path {
            Some(path) => fs::write(path, processed)?,
            None => println!("{}", processed),
        }
        
        Ok(())
    }
    
    fn transform_content(&self, content: &str) -> String {
        // Example transformation: convert to uppercase
        content.to_uppercase()
    }
}

fn main() {
    let matches = App::new("AI CLI Tool")
        .version("1.0")
        .author("AI Generated")
        .about("Processes files with AI-generated logic")
        .arg(
            Arg::with_name("input")
                .short("i")
                .long("input")
                .value_name("FILE")
                .help("Input file to process")
                .required(true)
                .takes_value(true),
        )
        .arg(
            Arg::with_name("output")
                .short("o")
                .long("output")
                .value_name("FILE")
                .help("Output file (defaults to stdout)")
                .takes_value(true),
        )
        .get_matches();
    
    let input_path = matches.value_of("input").unwrap().to_string();
    let mut processor = FileProcessor::new(input_path);
    
    if let Some(output_path) = matches.value_of("output") {
        processor = processor.with_output(output_path.to_string());
    }
    
    if let Err(e) = processor.process() {
        eprintln!("Error: {}", e);
        std::process::exit(1);
    }
}`
    }
};

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Button click handlers
function startCoding() {
    const editorSection = document.querySelector('.code-editor-section');
    editorSection.scrollIntoView({ behavior: 'smooth' });
}

function showDemo() {
    // Simulate a demo video or interactive demo
    alert('🎬 Demo Mode: Watch how our AI generates code in real-time!\n\nThis would show an interactive demonstration of the AI code generation process.');
}

// Code generation functionality
function generateCode() {
    const prompt = document.getElementById('code-prompt').value.trim();
    const language = document.getElementById('language-select').value;
    const outputElement = document.getElementById('generated-code');
    
    if (!prompt) {
        alert('Please describe what you want to build!');
        return;
    }
    
    // Show loading state
    outputElement.innerHTML = '<code>🤖 AI is generating your code...</code>';
    
    // Simulate AI processing time
    setTimeout(() => {
        const generatedCode = generateAICode(prompt, language);
        outputElement.innerHTML = `<code>${generatedCode}</code>`;
        
        // Add success animation
        outputElement.style.animation = 'fadeInUp 0.6s ease-out';
        setTimeout(() => {
            outputElement.style.animation = '';
        }, 600);
    }, 2000);
}

function generateAICode(prompt, language) {
    const lowerPrompt = prompt.toLowerCase();
    
    // Determine the type of application based on prompt keywords
    let appType = 'web app';
    if (lowerPrompt.includes('machine learning') || lowerPrompt.includes('ml') || lowerPrompt.includes('ai')) {
        appType = 'machine learning';
    } else if (lowerPrompt.includes('api') || lowerPrompt.includes('client')) {
        appType = 'api client';
    } else if (lowerPrompt.includes('game') || lowerPrompt.includes('unity')) {
        appType = 'game';
    } else if (lowerPrompt.includes('android') || lowerPrompt.includes('mobile')) {
        appType = 'android app';
    } else if (lowerPrompt.includes('react') || lowerPrompt.includes('component')) {
        appType = 'react component';
    } else if (lowerPrompt.includes('system') || lowerPrompt.includes('utility')) {
        appType = 'system utility';
    } else if (lowerPrompt.includes('server') || lowerPrompt.includes('backend')) {
        appType = 'web server';
    } else if (lowerPrompt.includes('cli') || lowerPrompt.includes('command')) {
        appType = 'cli tool';
    }
    
    // Get the appropriate code template
    const templates = codeTemplates[language];
    if (templates && templates[appType]) {
        return templates[appType];
    }
    
    // Fallback template
    return `// AI Generated Code for ${language}
// Based on your request: "${prompt}"

// This is a sample implementation
// The AI would generate more specific code based on your requirements

function processRequest(input) {
    // AI-generated logic would go here
    return {
        result: "Processed: " + input,
        status: "success",
        timestamp: new Date().toISOString()
    };
}

// Usage example
const result = processRequest("your input here");
console.log(result);`;
}

function copyCode() {
    const codeElement = document.getElementById('generated-code');
    const code = codeElement.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        // Show success message
        const button = event.target;
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#27ca3f';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
        alert('Failed to copy code. Please select and copy manually.');
    });
}

function downloadCode() {
    const codeElement = document.getElementById('generated-code');
    const code = codeElement.textContent;
    const language = document.getElementById('language-select').value;
    
    // Create file extension based on language
    const extensions = {
        'python': 'py',
        'javascript': 'js',
        'java': 'java',
        'cpp': 'cpp',
        'rust': 'rs',
        'go': 'go',
        'ruby': 'rb',
        'php': 'php',
        'csharp': 'cs',
        'swift': 'swift',
        'kotlin': 'kt',
        'typescript': 'ts'
    };
    
    const extension = extensions[language] || 'txt';
    const filename = `ai-generated-code.${extension}`;
    
    // Create and download file
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
    button.style.background = '#27ca3f';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}

// Enhanced code generation with project templates
function generateProjectFromTemplate(templateName, projectName) {
    if (!projectTemplates) {
        console.error('Project templates not initialized');
        return;
    }

    try {
        const project = projectTemplates.createProjectFromTemplate(templateName, projectName);
        displayProjectFiles(project);
        return project;
    } catch (error) {
        console.error('Error creating project:', error);
        showNotification('Error creating project: ' + error.message, 'error');
    }
}

function displayProjectFiles(project) {
    const codeOutput = document.getElementById('generated-code');
    let projectContent = `// Project: ${project.name}\n`;
    projectContent += `// Template: ${project.template}\n\n`;
    
    Object.entries(project.files).forEach(([filePath, content]) => {
        projectContent += `// File: ${filePath}\n`;
        projectContent += content + '\n\n';
    });
    
    codeOutput.innerHTML = `<code>${escapeHtml(projectContent)}</code>`;
    
    // Apply syntax highlighting
    if (syntaxHighlighter) {
        const codeElement = codeOutput.querySelector('code');
        if (codeElement) {
            codeElement.innerHTML = syntaxHighlighter.highlight(projectContent, 'javascript');
        }
    }
}

function showProjectTemplates() {
    if (!projectTemplates) {
        console.error('Project templates not initialized');
        return;
    }

    const templates = projectTemplates.getTemplates();
    const categories = projectTemplates.getCategories();
    
    let templateList = '<div class="template-categories">';
    
    categories.forEach(category => {
        templateList += `<h3>${category}</h3>`;
        templateList += '<div class="template-grid">';
        
        Object.entries(templates).forEach(([key, template]) => {
            if (template.category === category) {
                templateList += `
                    <div class="template-card" onclick="selectTemplate('${key}')">
                        <h4>${template.name}</h4>
                        <p>${template.description}</p>
                        <div class="template-meta">
                            <span>${Object.keys(template.files).length} files</span>
                        </div>
                    </div>
                `;
            }
        });
        
        templateList += '</div>';
    });
    
    templateList += '</div>';
    
    // Show in a modal or replace content
    const codeOutput = document.getElementById('generated-code');
    codeOutput.innerHTML = `<div class="template-selection">${templateList}</div>`;
}

function selectTemplate(templateKey) {
    const projectName = prompt('Enter project name:');
    if (projectName) {
        generateProjectFromTemplate(templateKey, projectName);
    }
}

// Enhanced code generation with debugging
function generateCodeWithDebug() {
    const prompt = document.getElementById('code-prompt').value;
    const language = document.getElementById('language-select').value;
    
    if (!prompt.trim()) {
        showNotification('Please enter a description of what you want to build.', 'warning');
        return;
    }
    
    // Generate code
    const generatedCode = generateAICode(prompt, language);
    
    // Display code
    const codeOutput = document.getElementById('generated-code');
    codeOutput.innerHTML = `<code>${escapeHtml(generatedCode)}</code>`;
    
    // Apply syntax highlighting
    if (syntaxHighlighter) {
        const codeElement = codeOutput.querySelector('code');
        if (codeElement) {
            codeElement.innerHTML = syntaxHighlighter.highlight(generatedCode, language);
        }
    }
    
    // Analyze code for issues and suggestions
    if (debugTools) {
        debugTools.analyzeCode(generatedCode);
    }
    
    showNotification('Code generated successfully! Check the debug tools for analysis.', 'success');
}

// Collaboration features
function startCollaboration() {
    if (!collaborationManager) {
        console.error('Collaboration manager not initialized');
        return;
    }
    
    const sessionId = collaborationManager.startCollaboration();
    showNotification(`Collaboration session started! Session ID: ${sessionId}`, 'success');
}

function joinCollaboration() {
    const sessionId = prompt('Enter session ID to join:');
    if (sessionId && collaborationManager) {
        collaborationManager.joinSession(sessionId);
    }
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        color: white;
        z-index: 10000;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ffc107';
            notification.style.color = '#212529';
            break;
        default:
            notification.style.backgroundColor = '#007bff';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Initialize app function
function initializeApp() {
    // Add new buttons to the UI
    addNewFeatures();
    
    // Setup event listeners for new features
    setupNewEventListeners();
}

function addNewFeatures() {
    // Add template button
    const codeActions = document.querySelector('.code-actions');
    if (codeActions) {
        const templateBtn = document.createElement('button');
        templateBtn.className = 'btn btn-secondary';
        templateBtn.innerHTML = '<i class="fas fa-layer-group"></i> Templates';
        templateBtn.onclick = showProjectTemplates;
        codeActions.appendChild(templateBtn);
        
        const debugBtn = document.createElement('button');
        debugBtn.className = 'btn btn-secondary';
        debugBtn.innerHTML = '<i class="fas fa-bug"></i> Debug';
        debugBtn.onclick = () => {
            if (debugTools) {
                debugTools.refreshMetrics();
            }
        };
        codeActions.appendChild(debugBtn);
    }
}

function setupNewEventListeners() {
    // Override the original generate code function
    const generateBtn = document.querySelector('button[onclick="generateCode()"]');
    if (generateBtn) {
        generateBtn.onclick = generateCodeWithDebug;
    }
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all feature cards and language cards
    document.querySelectorAll('.feature-card, .language-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add typing effect to the hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to generate code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        generateCode();
    }
    
    // Ctrl/Cmd + C to copy code
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const activeElement = document.activeElement;
        if (activeElement.id === 'generated-code') {
            copyCode();
        }
    }
});

// Add tooltips for better UX
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}); 