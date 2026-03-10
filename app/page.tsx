'use client';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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

  const fireflies = Array.from({ length: 18 }, (_, i) => i);
  const leaves = Array.from({ length: 10 }, (_, i) => i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0b1a0e;
          font-family: 'Lora', serif;
          min-height: 100vh;
          overflow: hidden;
        }

        /* ── SCENE LAYERS ── */
        .scene {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        /* Deep forest gradient sky */
        .scene::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, #0d2e14 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 20% 100%, #071209 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 100%, #071209 0%, transparent 60%),
            linear-gradient(180deg, #061008 0%, #0b1a0e 40%, #071510 100%);
        }

        /* Misty fog layer */
        .fog {
          position: absolute;
          bottom: 0;
          left: -50%;
          width: 200%;
          height: 35%;
          background: radial-gradient(ellipse 80% 100% at 50% 100%, rgba(120,200,130,0.06) 0%, transparent 70%);
          animation: fogDrift 18s ease-in-out infinite alternate;
        }
        .fog2 {
          position: absolute;
          bottom: 0;
          left: -30%;
          width: 160%;
          height: 25%;
          background: radial-gradient(ellipse 70% 100% at 50% 100%, rgba(100,180,110,0.04) 0%, transparent 60%);
          animation: fogDrift 25s ease-in-out infinite alternate-reverse;
        }

        @keyframes fogDrift {
          from { transform: translateX(-5%); }
          to   { transform: translateX(5%); }
        }

        /* Tall tree silhouettes */
        .trees {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          pointer-events: none;
        }

        .tree {
          position: absolute;
          bottom: 0;
          width: 0;
          border-left: solid transparent;
          border-right: solid transparent;
          border-bottom: solid #050e06;
          filter: drop-shadow(0 0 20px rgba(0,0,0,0.8));
        }

        /* Fireflies */
        .firefly {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #b8ff8a;
          box-shadow: 0 0 6px 2px rgba(184,255,138,0.8), 0 0 14px 4px rgba(184,255,138,0.3);
          animation: fireflyFloat var(--dur) ease-in-out infinite, fireflyBlink var(--blink) ease-in-out infinite;
        }

        @keyframes fireflyFloat {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(var(--dx1), var(--dy1)); }
          50%  { transform: translate(var(--dx2), var(--dy2)); }
          75%  { transform: translate(var(--dx3), var(--dy3)); }
          100% { transform: translate(0, 0); }
        }

        @keyframes fireflyBlink {
          0%, 100% { opacity: 0.9; }
          50%       { opacity: 0.1; }
        }

        /* Falling leaves */
        .leaf {
          position: absolute;
          top: -30px;
          font-size: var(--size);
          opacity: 0.6;
          animation: leafFall var(--fall-dur) linear infinite;
          animation-delay: var(--fall-delay);
          filter: drop-shadow(0 0 4px rgba(100,200,80,0.4));
        }

        @keyframes leafFall {
          0%   { transform: translateY(-30px) translateX(0) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(110vh) translateX(var(--sway)) rotate(720deg); opacity: 0; }
        }

        /* Moonlight beam */
        .moonbeam {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 70%;
          background: linear-gradient(180deg, rgba(200,255,210,0.04) 0%, transparent 100%);
          clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
          animation: beamSway 12s ease-in-out infinite alternate;
        }

        @keyframes beamSway {
          from { transform: translateX(-55%) rotate(-2deg); }
          to   { transform: translateX(-45%) rotate(2deg); }
        }

        /* Moon */
        .moon {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #e8ffec, #a8d8b0);
          box-shadow: 0 0 30px 10px rgba(168,216,176,0.25), 0 0 80px 30px rgba(100,180,110,0.1);
          animation: moonGlow 4s ease-in-out infinite alternate;
        }

        @keyframes moonGlow {
          from { box-shadow: 0 0 30px 10px rgba(168,216,176,0.2), 0 0 80px 30px rgba(100,180,110,0.08); }
          to   { box-shadow: 0 0 40px 15px rgba(168,216,176,0.35), 0 0 100px 40px rgba(100,180,110,0.15); }
        }

        /* ── CHAT UI ── */
        .chat-wrapper {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-width: 760px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .chat-header {
          padding: 24px 0 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          border-bottom: 1px solid rgba(140,210,120,0.12);
        }

        .header-title {
          font-family: 'Cinzel', serif;
          font-size: 22px;
          font-weight: 700;
          color: #c8f0c0;
          letter-spacing: 0.12em;
          text-shadow: 0 0 20px rgba(150,255,150,0.4), 0 0 40px rgba(100,200,100,0.2);
        }

        .header-sub {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 12px;
          color: rgba(180,230,170,0.45);
          letter-spacing: 0.05em;
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
          scrollbar-width: thin;
          scrollbar-color: rgba(140,200,120,0.15) transparent;
        }

        .messages-area::-webkit-scrollbar { width: 4px; }
        .messages-area::-webkit-scrollbar-thumb { background: rgba(140,200,120,0.15); border-radius: 4px; }

        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: rgba(180,230,160,0.3);
          font-style: italic;
          font-size: 14px;
        }

        .empty-rune {
          font-family: 'Cinzel', serif;
          font-size: 42px;
          color: rgba(140,210,120,0.15);
          text-shadow: 0 0 20px rgba(140,210,120,0.2);
        }

        .msg-wrap { display: flex; flex-direction: column; }
        .msg-wrap.user { align-items: flex-end; }
        .msg-wrap.assistant { align-items: flex-start; }

        .msg-label {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.18em;
          margin-bottom: 5px;
          text-transform: uppercase;
        }

        .msg-label.user { color: rgba(180,255,160,0.4); }
        .msg-label.assistant { color: rgba(140,200,120,0.35); }

        .bubble {
          max-width: 74%;
          padding: 12px 16px;
          font-size: 14px;
          line-height: 1.7;
          animation: appear 0.35s ease forwards;
        }

        @keyframes appear {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .bubble.user {
          background: linear-gradient(135deg, rgba(100,200,90,0.25), rgba(60,140,60,0.2));
          color: #d4f7cc;
          border: 1px solid rgba(120,210,100,0.3);
          border-radius: 16px 4px 16px 16px;
          box-shadow: 0 0 20px rgba(100,200,80,0.1), inset 0 1px 0 rgba(200,255,180,0.1);
        }

        .bubble.assistant {
          background: linear-gradient(135deg, rgba(20,50,20,0.8), rgba(15,35,15,0.9));
          color: rgba(200,235,190,0.9);
          border: 1px solid rgba(80,150,70,0.2);
          border-radius: 4px 16px 16px 16px;
          box-shadow: 0 0 20px rgba(50,120,40,0.08), inset 0 1px 0 rgba(150,255,130,0.05);
        }

        /* Thinking indicator */
        .thinking-wrap { display: flex; flex-direction: column; align-items: flex-start; }

        .thinking {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 14px 18px;
          background: linear-gradient(135deg, rgba(20,50,20,0.8), rgba(15,35,15,0.9));
          border: 1px solid rgba(80,150,70,0.2);
          border-radius: 4px 16px 16px 16px;
        }

        .mushroom {
          font-size: 16px;
          animation: mushroomBob 1s ease-in-out infinite;
        }

        @keyframes mushroomBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }

        .think-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(140,220,100,0.7);
          animation: thinkBounce 1.3s infinite;
        }
        .think-dot:nth-child(3) { animation-delay: 0.15s; }
        .think-dot:nth-child(4) { animation-delay: 0.3s; }

        @keyframes thinkBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-6px); opacity: 1; }
        }

        /* Input area */
        .input-area {
          padding: 14px 0 22px;
          border-top: 1px solid rgba(100,180,80,0.1);
        }

        .input-row {
          display: flex;
          gap: 10px;
          align-items: center;
          background: linear-gradient(135deg, rgba(15,35,15,0.95), rgba(10,25,10,0.98));
          border: 1px solid rgba(100,180,80,0.2);
          border-radius: 14px;
          padding: 10px 10px 10px 18px;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-shadow: 0 0 30px rgba(50,150,40,0.06), inset 0 1px 0 rgba(150,255,120,0.04);
        }

        .input-row:focus-within {
          border-color: rgba(120,220,90,0.45);
          box-shadow: 0 0 30px rgba(80,200,60,0.12), inset 0 1px 0 rgba(150,255,120,0.06);
        }

        .text-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: rgba(210,245,195,0.9);
          font-family: 'Lora', serif;
          font-size: 14px;
          line-height: 1.5;
        }

        .text-input::placeholder { color: rgba(140,190,120,0.3); font-style: italic; }

        .send-btn {
          width: 40px;
          height: 40px;
          border-radus: 10px;
          background: linear-gradient(135deg, #4a9e3a, #2d6e22);
          border: 1px solid rgba(140,220,100,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s ease;
          box-shadow: 0 0 14px rgba(80,180,60,0.3);
          font-size: 18px;
        }

        .send-btn:hover {
          background: linear-gradient(135deg, #5ab848, #3a8a2a);
          transform: scale(1.07);
          box-shadow: 0 0 20px rgba(100,220,80,0.45);
        }

        .send-btn:active { transform: scale(0.96); }
        .send-btn:disabled {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.06);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
      `}</style>

      {/* ── SCENE ── */}
      <div className="scene">
        {/* Moon + beam */}
        <div className="moon" />
        <div className="moonbeam" />

        {/* Fog */}
        <div className="fog" />
        <div className="fog2" />

        {/* Tree silhouettes */}
        <div className="trees">
          {[
            { left:'2%',  w:55,  h:580 },
            { left:'8%',  w:40,  h:500 },
            { left:'14%', w:65,  h:650 },
            { left:'22%', w:35,  h:460 },
            { left:'28%', w:50,  h:540 },
            { left:'68%', w:50,  h:540 },
            { left:'74%', w:35,  h:460 },
            { left:'80%', w:65,  h:650 },
            { left:'88%', w:40,  h:500 },
            { left:'94%', w:55,  h:580 },
          ].map((t, i) => (
            <div key={i} className="tree" style={{
              left: t.left,
              borderLeftWidth: t.w / 2,
              borderRightWidth: t.w / 2,
              borderBottomWidth: t.h,
              opacity: 0.85 + (i % 3) * 0.05,
            }} />
          ))}
        </div>

        {/* Fireflies */}
        {fireflies.map((i) => (
          <div key={i} className="firefly" style={{
            left: `${8 + Math.random() * 84}%`,
            top: `${20 + Math.random() * 60}%`,
            '--dur': `${5 + Math.random() * 8}s`,
            '--blink': `${1.5 + Math.random() * 2.5}s`,
            '--dx1': `${-30 + Math.random() * 60}px`,
            '--dy1': `${-20 + Math.random() * 40}px`,
            '--dx2': `${-40 + Math.random() * 80}px`,
            '--dy2': `${-30 + Math.random() * 60}px`,
            '--dx3': `${-20 + Math.random() * 40}px`,
            '--dy3': `${-10 + Math.random() * 20}px`,
          } as React.CSSProperties} />
        ))}

        {/* Falling leaves */}
        {leaves.map((i) => (
          <div key={i} className="leaf" style={{
            left: `${Math.random() * 95}%`,
            '--size': `${14 + Math.random() * 12}px`,
            '--fall-dur': `${8 + Math.random() * 10}s`,
            '--fall-delay': `${Math.random() * 12}s`,
            '--sway': `${-80 + Math.random() * 160}px`,
          } as React.CSSProperties}>
            {['🍃','🌿','🍀'][i % 3]}
          </div>
        ))}
      </div>

      {/* ── CHAT ── */}
      <div className="chat-wrapper">
        <div className="chat-header">
          <div className="header-title">✦ The Whispering Grove ✦</div>
          <div className="header-sub">a spirit stirs within the ancient wood…</div>
        </div>

        <div className="messages-area">
          {messages.length === 0 && !loading && (
            <div className="empty-state">
              <div className="empty-rune">᛫ ᚱ ᛫</div>
              <span>speak, wanderer. the forest listens.</span>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`msg-wrap ${msg.role}`}>
              <div className={`msg-label ${msg.role}`}>
                {msg.role === 'user' ? '⟡ Wanderer' : '⟢ Grove Spirit'}
              </div>
              <div className={`bubble ${msg.role}`}>{msg.content}</div>
            </div>
          ))}

          {loading && (
            <div className="thinking-wrap">
              <div className="msg-label assistant">⟢ Grove Spirit</div>
              <div className="thinking">
                <span className="mushroom">🍄</span>
                <div className="think-dot" />
                <div className="think-dot" />
                <div className="think-dot" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="input-area">
          <div className="input-row">
            <input
              className="text-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="whisper into the woods…"
            />
            <button className="send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>
              🌱
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
