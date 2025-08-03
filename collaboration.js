// Real-time Collaboration for AI Code Assistant
class CollaborationManager {
    constructor() {
        this.sessions = new Map();
        this.currentSession = null;
        this.peers = new Map();
        this.userId = this.generateUserId();
        this.userName = localStorage.getItem('userName') || `User${Math.floor(Math.random() * 1000)}`;
        this.isHost = false;
        
        this.init();
    }

    init() {
        this.createCollaborationUI();
        this.setupWebSocket();
    }

    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    createCollaborationUI() {
        const collaborationPanel = document.createElement('div');
        collaborationPanel.id = 'collaboration-panel';
        collaborationPanel.className = 'collaboration-panel';
        collaborationPanel.innerHTML = `
            <div class="collab-header">
                <h3>🤝 Collaboration</h3>
                <button id="close-collab" class="close-btn">×</button>
            </div>
            <div class="collab-content">
                <div class="session-info">
                    <div class="session-id">
                        <label>Session ID:</label>
                        <input type="text" id="session-id-input" readonly>
                        <button id="copy-session-id" class="copy-btn">Copy</button>
                    </div>
                    <div class="join-session">
                        <label>Join Session:</label>
                        <input type="text" id="join-session-input" placeholder="Enter session ID">
                        <button id="join-session-btn" class="join-btn">Join</button>
                    </div>
                </div>
                <div class="participants">
                    <h4>Participants</h4>
                    <div id="participants-list"></div>
                </div>
                <div class="chat-section">
                    <h4>Chat</h4>
                    <div id="chat-messages" class="chat-messages"></div>
                    <div class="chat-input">
                        <input type="text" id="chat-input" placeholder="Type a message...">
                        <button id="send-chat">Send</button>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .collaboration-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 400px;
                max-height: 600px;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                box-shadow: var(--shadow);
                z-index: 10000;
                display: none;
                overflow: hidden;
            }

            .collab-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                border-bottom: 1px solid var(--border-color);
                background: var(--bg-tertiary);
            }

            .collab-header h3 {
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

            .collab-content {
                padding: 20px;
                max-height: 500px;
                overflow-y: auto;
            }

            .session-info {
                margin-bottom: 20px;
            }

            .session-id, .join-session {
                margin-bottom: 15px;
            }

            .session-id input, .join-session input {
                width: 200px;
                padding: 8px 12px;
                border: 1px solid var(--border-color);
                border-radius: 6px;
                background: var(--bg-primary);
                color: var(--text-primary);
                margin-right: 10px;
            }

            .copy-btn, .join-btn {
                padding: 8px 15px;
                background: var(--accent-primary);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                transition: background 0.2s ease;
            }

            .copy-btn:hover, .join-btn:hover {
                background: var(--accent-secondary);
            }

            .participants {
                margin-bottom: 20px;
            }

            .participants h4 {
                margin: 0 0 10px 0;
                color: var(--text-primary);
            }

            #participants-list {
                max-height: 100px;
                overflow-y: auto;
            }

            .participant {
                display: flex;
                align-items: center;
                padding: 8px;
                margin-bottom: 5px;
                background: var(--bg-tertiary);
                border-radius: 6px;
            }

            .participant-avatar {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: var(--accent-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 12px;
                margin-right: 10px;
            }

            .chat-section h4 {
                margin: 0 0 10px 0;
                color: var(--text-primary);
            }

            .chat-messages {
                height: 150px;
                overflow-y: auto;
                border: 1px solid var(--border-color);
                border-radius: 6px;
                padding: 10px;
                background: var(--bg-primary);
                margin-bottom: 10px;
            }

            .chat-message {
                margin-bottom: 8px;
                padding: 8px;
                border-radius: 6px;
                background: var(--bg-tertiary);
            }

            .chat-message .sender {
                font-weight: bold;
                color: var(--accent-primary);
                margin-bottom: 4px;
            }

            .chat-input {
                display: flex;
                gap: 10px;
            }

            .chat-input input {
                flex: 1;
                padding: 8px 12px;
                border: 1px solid var(--border-color);
                border-radius: 6px;
                background: var(--bg-primary);
                color: var(--text-primary);
            }

            .chat-input button {
                padding: 8px 15px;
                background: var(--accent-primary);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
            }

            .collab-toggle {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--accent-primary);
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

            .collab-toggle:hover {
                transform: scale(1.1);
                background: var(--accent-secondary);
            }

            .cursor {
                position: absolute;
                width: 2px;
                height: 20px;
                background: var(--accent-primary);
                animation: blink 1s infinite;
            }

            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(collaborationPanel);

        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'collab-toggle';
        toggleBtn.innerHTML = '🤝';
        toggleBtn.title = 'Open Collaboration';
        document.body.appendChild(toggleBtn);

        // Event listeners
        toggleBtn.addEventListener('click', () => {
            collaborationPanel.style.display = collaborationPanel.style.display === 'none' ? 'block' : 'none';
        });

        document.getElementById('close-collab').addEventListener('click', () => {
            collaborationPanel.style.display = 'none';
        });

        document.getElementById('copy-session-id').addEventListener('click', () => {
            const sessionId = document.getElementById('session-id-input').value;
            navigator.clipboard.writeText(sessionId);
            this.showNotification('Session ID copied to clipboard!');
        });

        document.getElementById('join-session-btn').addEventListener('click', () => {
            const sessionId = document.getElementById('join-session-input').value;
            this.joinSession(sessionId);
        });

        document.getElementById('send-chat').addEventListener('click', () => {
            this.sendChatMessage();
        });

        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });
    }

    setupWebSocket() {
        // Simulate WebSocket connection for demo
        // In a real implementation, you would connect to a WebSocket server
        this.simulateWebSocket();
    }

    simulateWebSocket() {
        // Simulate WebSocket behavior for demo purposes
        setInterval(() => {
            if (this.currentSession) {
                // Simulate receiving updates
                this.handleIncomingUpdate({
                    type: 'cursor',
                    userId: 'peer_' + Math.random().toString(36).substr(2, 5),
                    position: Math.floor(Math.random() * 100)
                });
            }
        }, 5000);
    }

    createSession() {
        const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
        this.currentSession = sessionId;
        this.isHost = true;
        
        this.sessions.set(sessionId, {
            participants: new Map(),
            code: '',
            cursors: new Map()
        });

        document.getElementById('session-id-input').value = sessionId;
        this.addParticipant(this.userId, this.userName);
        
        this.showNotification('Session created! Share the session ID with others.');
        return sessionId;
    }

    joinSession(sessionId) {
        if (!sessionId) {
            this.showNotification('Please enter a session ID');
            return;
        }

        this.currentSession = sessionId;
        this.isHost = false;

        if (!this.sessions.has(sessionId)) {
            this.sessions.set(sessionId, {
                participants: new Map(),
                code: '',
                cursors: new Map()
            });
        }

        this.addParticipant(this.userId, this.userName);
        this.sendMessage({
            type: 'join',
            sessionId: sessionId,
            userId: this.userId,
            userName: this.userName
        });

        this.showNotification('Joined session!');
    }

    addParticipant(userId, userName) {
        const session = this.sessions.get(this.currentSession);
        if (session) {
            session.participants.set(userId, {
                id: userId,
                name: userName,
                joinedAt: new Date()
            });
            this.updateParticipantsList();
        }
    }

    updateParticipantsList() {
        const participantsList = document.getElementById('participants-list');
        const session = this.sessions.get(this.currentSession);
        
        if (!session) return;

        participantsList.innerHTML = '';
        session.participants.forEach(participant => {
            const participantEl = document.createElement('div');
            participantEl.className = 'participant';
            participantEl.innerHTML = `
                <div class="participant-avatar">${participant.name.charAt(0)}</div>
                <span>${participant.name}</span>
            `;
            participantsList.appendChild(participantEl);
        });
    }

    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addChatMessage(this.userName, message);
        this.sendMessage({
            type: 'chat',
            sessionId: this.currentSession,
            userId: this.userId,
            userName: this.userName,
            message: message
        });

        input.value = '';
    }

    addChatMessage(sender, message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageEl = document.createElement('div');
        messageEl.className = 'chat-message';
        messageEl.innerHTML = `
            <div class="sender">${sender}</div>
            <div class="message">${message}</div>
        `;
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendMessage(message) {
        // In a real implementation, this would send via WebSocket
        console.log('Sending message:', message);
        
        // Simulate message handling
        setTimeout(() => {
            this.handleIncomingUpdate(message);
        }, 100);
    }

    handleIncomingUpdate(update) {
        switch (update.type) {
            case 'join':
                this.addParticipant(update.userId, update.userName);
                break;
            case 'chat':
                this.addChatMessage(update.userName, update.message);
                break;
            case 'code_update':
                this.updateCode(update.code);
                break;
            case 'cursor':
                this.updateCursor(update.userId, update.position);
                break;
        }
    }

    updateCode(code) {
        const codeEditor = document.getElementById('code-editor');
        if (codeEditor) {
            codeEditor.value = code;
        }
    }

    updateCursor(userId, position) {
        // Remove existing cursor for this user
        const existingCursor = document.querySelector(`[data-user="${userId}"]`);
        if (existingCursor) {
            existingCursor.remove();
        }

        // Add new cursor
        const codeEditor = document.getElementById('code-editor');
        if (codeEditor) {
            const cursor = document.createElement('div');
            cursor.className = 'cursor';
            cursor.setAttribute('data-user', userId);
            cursor.style.left = `${position}px`;
            codeEditor.parentNode.appendChild(cursor);
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-primary);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10001;
            box-shadow: var(--shadow);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Public methods for external use
    startCollaboration() {
        return this.createSession();
    }

    getCurrentSession() {
        return this.currentSession;
    }

    getParticipants() {
        const session = this.sessions.get(this.currentSession);
        return session ? Array.from(session.participants.values()) : [];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CollaborationManager;
} 