'use client';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const reply = await response.json();
    setMessages([...newMessages, reply]);
    setLoading(false);
  }
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>My Chatbot</h1>
      <div style={{ height: '500px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px'  }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', margin: '10px 0'}}>
            <span style={{ background: msg.role === 'user' ? '#007bff' : '#e9e9e9', color: msg.role ==='user' ? 'white' : 'black', padding: '8px 12px', borderRadius: '10px'  }}>
              {msg.content}
             </span>
          </div>
        ))}
        {loading && <p>Thinking...</p>}  
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px'}}>
          Send
        </button>    
      </div>
    </main>
  );
}