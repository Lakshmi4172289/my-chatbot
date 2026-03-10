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

  const fireflies = Array.from({ length: 22 }, (_, i) => i);
  const leaves = Array.from({ length: 12 }, (_, i) => i);
  const stars = Array.from({ length: 40 }, (_, i) => i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #060b0f;
          font-family: 'Crimson Pro', serif;
          min-height: 100vh;
          overflow: hidden;
        }

        /* ── SCENE ── */
        .scene {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .sky {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 120% 55% at 75% -5%, rgba(30,15,60,0.95) 0%, transparent 60%),
            radial-gradient(ellipse 80% 40% at 20% 0%, rgba(10,20,40,0.8) 0%, transparent 55%),
            radial-gradient(ellipse 100% 60% at 50% 100%, rgba(5,18,8,1) 0%, transparent 65%),
            linear-gradient(180deg, #060b18 0%, #080f12 35%, #060d08 70%, #040a06 100%);
        }

        /* ── CRESCENT MOON top-right ── */
        .crescent-wrap {
          position: absolute;
          top: 28px;
          right: 60px;
          z-index: 2;
          animation: moonDrift 8s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 18px rgba(220,240,255,0.55)) drop-shadow(0 0 50px rgba(180,210,255,0.25));
        }

        @keyframes moonDrift {
          from { transform: translateY(0px) rotate(-1deg); }
          to   { transform: translateY(6px) rotate(1deg); }
        }

        .crescent {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: transparent;
          box-shadow: -22px 4px 0 4px #ddeeff;
          position: relative;
        }

        /* halo rings around crescent */
        .crescent::before {
          content: '';
          position: absolute;
          inset: -14px;
          border-radius: 50%;
          border: 1px solid rgba(200,230,255,0.08);
          box-shadow: 0 0 30px 8px rgba(180,215,255,0.08);
        }

        .crescent::after {
          content: '';
          position: absolute;
          inset: -28px;
          border-radius: 50%;
          border: 1px solid rgba(200,230,255,0.04);
        }

        /* Moonbeam from crescent */
        .moonbeam {
          position: absolute;
          top: 60px;
          right: 55px;
          width: 220px;
          height: 65vh;
          background: linear-gradient(180deg, rgba(200,225,255,0.06) 0%, rgba(160,200,230,0.02) 50%, transparent 100%);
          clip-path: polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%);
          transform-origin: top center;
          animation: beamSway 14s ease-in-out infinite alternate;
          pointer-events: none;
        }

        @keyframes beamSway {
          from { transform: rotate(-3deg) scaleX(0.9); opacity: 0.7; }
          to   { transform: rotate(3deg) scaleX(1.1); opacity: 1; }
        }

        /* ── STARS ── */
        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: starTwinkle var(--t) ease-in-out infinite;
        }

        @keyframes starTwinkle {
          0%, 100% { opacity: var(--max-op); transform: scale(1); }
          50%       { opacity: 0.05; transform: scale(0.4); }
        }

        /* ── OWL — pops out magically ── */
        .owl-wrap {
          position: absolute;
          top: 110px;
          right: 130px;
          font-size: 34px;
          z-index: 5;
          animation: owlFloat 5s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 14px rgba(255,200,80,0.7)) drop-shadow(0 8px 20px rgba(0,0,0,0.8));
          transform-origin: center bottom;
          cursor: default;
        }

        @keyframes owlFloat {
          0%   { transform: translateY(0) rotate(-3deg) scale(1); }
          50%  { transform: translateY(-10px) rotate(2deg) scale(1.06); }
          100% { transform: translateY(-4px) rotate(-1deg) scale(1.02); }
        }

        .owl-wrap:hover {
          filter: drop-shadow(0 0 22px rgba(255,220,100,1)) drop-shadow(0 0 50px rgba(255,180,50,0.6));
          animation-play-state: paused;
        }

        /* ── FLOATING SPELL BOOK ── */
        .book-wrap {
          position: absolute;
          bottom: 130px;
          left: 38px;
          font-size: 38px;
          z-index: 5;
          animation: bookFloat 6s ease-in-out infinite alternate, bookGlow 3s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 12px rgba(150,80,255,0.8)) drop-shadow(0 10px 25px rgba(0,0,0,0.9));
          cursor: default;
        }

        @keyframes bookFloat {
          0%   { transform: translateY(0) rotate(4deg); }
          100% { transform: translateY(-18px) rotate(-3deg); }
        }

        @keyframes bookGlow {
          from { filter: drop-shadow(0 0 10px rgba(140,70,255,0.7)) drop-shadow(0 10px 25px rgba(0,0,0,0.9)); }
          to   { filter: drop-shadow(0 0 24px rgba(180,100,255,1)) drop-shadow(0 0 50px rgba(120,50,220,0.5)) drop-shadow(0 10px 25px rgba(0,0,0,0.9)); }
        }

        /* ── MAGIC WAND ── */
        .wand-wrap {
          position: absolute;
          top: 180px;
          left: 55px;
          font-size: 28px;
          z-index: 5;
          animation: wandSpin 7s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 10px rgba(255,240,100,0.9)) drop-shadow(0 6px 18px rgba(0,0,0,0.8));
          cursor: default;
        }

        @keyframes wandSpin {
          0%   { transform: rotate(-20deg) translateY(0); }
          50%  { transform: rotate(15deg) translateY(-12px); }
          100% { transform: rotate(-10deg) translateY(-6px); }
        }

        /* ── GOLDEN SNITCH-LIKE ORB ── */
        .orb-wrap {
          position: absolute;
          top: 38%;
          right: 42px;
          z-index: 5;
          animation: orbDrift 9s ease-in-out infinite;
          cursor: default;
        }

        @keyframes orbDrift {
          0%   { transform: translate(0, 0) scale(1); }
          25%  { transform: translate(-20px, -30px) scale(1.1); }
          50%  { transform: translate(10px, -50px) scale(0.95); }
          75%  { transform: translate(-15px, -20px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }

        .orb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #fff8c0, #f0b429 40%, #c07800 100%);
          box-shadow:
            0 0 10px 4px rgba(255,200,50,0.8),
            0 0 30px 10px rgba(240,160,20,0.4),
            0 0 60px 20px rgba(200,120,0,0.2);
          animation: orbPulse 2s ease-in-out infinite alternate;
        }

        @keyframes orbPulse {
          from { box-shadow: 0 0 10px 4px rgba(255,200,50,0.8), 0 0 30px 10px rgba(240,160,20,0.4); }
          to   { box-shadow: 0 0 18px 8px rgba(255,220,80,1), 0 0 50px 18px rgba(240,180,40,0.6), 0 0 80px 30px rgba(200,120,0,0.3); }
        }

        /* tiny wings on orb */
        .orb-wrap::before, .orb-wrap::after {
          content: '〜';
          position: absolute;
          top: 2px;
          font-size: 14px;
          color: rgba(255,230,120,0.7);
          animation: wingFlap 0.3s ease-in-out infinite alternate;
        }
        .orb-wrap::before { right: 22px; transform: scaleX(-1); }
        .orb-wrap::after  { left: 22px; }

        @keyframes wingFlap {
          from { transform: scaleY(1); opacity: 0.7; }
          to   { transform: scaleY(0.5); opacity: 1; }
        }

        /* ── POTION BOTTLE ── */
        .potion-wrap {
          position: absolute;
          bottom: 155px;
          right: 45px;
          font-size: 30px;
          z-index: 5;
          animation: potionBob 4s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 14px rgba(80,255,180,0.8)) drop-shadow(0 8px 20px rgba(0,0,0,0.85));
          cursor: default;
        }

        @keyframes potionBob {
          0%   { transform: translateY(0) rotate(-5deg); }
          100% { transform: translateY(-14px) rotate(6deg); }
        }

        /* ── TREES ── */
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
          border-bottom: solid;
        }

        /* Mossy ground glow */
        .ground-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30%;
          background:
            radial-gradient(ellipse 90% 60% at 50% 100%, rgba(30,90,30,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 50% 30% at 30% 100%, rgba(60,120,40,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 50% 30% at 70% 100%, rgba(60,120,40,0.1) 0%, transparent 60%);
          animation: groundPulse 6s ease-in-out infinite alternate;
        }

        @keyframes groundPulse {
          from { opacity: 0.7; }
          to   { opacity: 1; }
        }

        /* Fog */
        .fog {
          position: absolute;
          bottom: 0;
          left: -50%;
          width: 200%;
          height: 28%;
          background: radial-gradient(ellipse 80% 100% at 50% 100%, rgba(100,160,110,0.07) 0%, transparent 70%);
          animation: fogDrift 20s ease-in-out infinite alternate;
        }
        .fog2 {
          position: absolute;
          bottom: 0;
          left: -30%;
          width: 170%;
          height: 18%;
          background: radial-gradient(ellipse 70% 100% at 60% 100%, rgba(80,140,90,0.05) 0%, transparent 60%);
          animation: fogDrift 30s ease-in-out infinite alternate-reverse;
        }

        @keyframes fogDrift {
          from { transform: translateX(-6%); }
          to   { transform: translateX(6%); }
        }

        /* Fireflies */
        .firefly {
          position: absolute;
          border-radius: 50%;
          animation: fireflyFloat var(--dur) ease-in-out infinite, fireflyBlink var(--blink) ease-in-out infinite;
        }

        @keyframes fireflyFloat {
          0%   { transform: translate(0,0); }
          25%  { transform: translate(var(--dx1), var(--dy1)); }
          50%  { transform: translate(var(--dx2), var(--dy2)); }
          75%  { transform: translate(var(--dx3), var(--dy3)); }
          100% { transform: translate(0,0); }
        }

        @keyframes fireflyBlink {
          0%, 100% { opacity: 0.95; }
          50%       { opacity: 0.05; }
        }

        /* Leaves */
        .leaf {
          position: absolute;
          top: -30px;
          font-size: var(--size);
          opacity: 0.55;
          animation: leafFall var(--fall-dur) linear infinite;
          animation-delay: var(--fall-delay);
          filter: drop-shadow(0 0 5px rgba(80,180,60,0.5));
        }

        @keyframes leafFall {
          0%   { transform: translateY(-30px) translateX(0) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.55; }
          90%  { opacity: 0.35; }
          100% { transform: translateY(110vh) translateX(var(--sway)) rotate(540deg); opacity: 0; }
        }

        /* Spell sparkles */
        .sparkle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #fff;
          animation: sparklePop var(--sp-dur) ease-in-out infinite;
          animation-delay: var(--sp-delay);
        }

        @keyframes sparklePop {
          0%   { transform: scale(0) translate(0,0); opacity: 0; }
          30%  { opacity: 1; transform: scale(1.5) translate(var(--sp-x), var(--sp-y)); }
          100% { transform: scale(0) translate(calc(var(--sp-x)*2), calc(var(--sp-y)*2)); opacity: 0; }
        }

        /* ── CHAT UI ── */
        .chat-wrapper {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-width: 740px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .chat-header {
          padding: 22px 0 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          border-bottom: 1px solid rgba(160,120,220,0.12);
          position: relative;
        }

        .header-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: 19px;
          font-weight: 700;
          color: #e8d5ff;
          letter-spacing: 0.06em;
          text-shadow:
            0 0 14px rgba(200,140,255,0.6),
            0 0 35px rgba(160,80,255,0.3),
            0 2px 4px rgba(0,0,0,0.8);
        }

        .header-sub {
          font-family: 'Crimson Pro', serif;
          font-style: italic;
          font-size: 13px;
          color: rgba(200,180,240,0.4);
          letter-spacing: 0.06em;
        }

        /* Decorative divider */
        .divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180,120,255,0.25), rgba(220,180,255,0.5), rgba(180,120,255,0.25), transparent);
          margin-top: 4px;
          position: relative;
        }

        .divider::before {
          content: '✦';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: rgba(220,180,255,0.6);
          font-size: 10px;
          background: #060b0f;
          padding: 0 8px;
          text-shadow: 0 0 10px rgba(200,140,255,0.8);
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 22px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
          scrollbar-width: thin;
          scrollbar-color: rgba(160,100,220,0.15) transparent;
        }

        .messages-area::-webkit-scrollbar { width: 3px; }
        .messages-area::-webkit-scrollbar-thumb { background: rgba(160,100,220,0.2); border-radius: 4px; }

        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .empty-crest {
          font-family: 'Cinzel Decorative', serif;
          font-size: 38px;
          color: rgba(180,130,255,0.2);
          text-shadow: 0 0 30px rgba(180,100,255,0.25);
          animation: crestPulse 3s ease-in-out infinite alternate;
          letter-spacing: 0.1em;
        }

        @keyframes crestPulse {
          from { opacity: 0.5; text-shadow: 0 0 20px rgba(180,100,255,0.2); }
          to   { opacity: 1; text-shadow: 0 0 40px rgba(200,130,255,0.5); }
        }

        .empty-text {
          font-style: italic;
          font-size: 15px;
          color: rgba(200,175,235,0.3);
          letter-spacing: 0.04em;
        }

        .msg-wrap { display: flex; flex-direction: column; }
        .msg-wrap.user { align-items: flex-end; }
        .msg-wrap.assistant { align-items: flex-start; }

        .msg-label {
          font-family: 'Cinzel Decorative', serif;
          font-size: 8px;
          letter-spacing: 0.15em;
          margin-bottom: 5px;
          text-transform: uppercase;
        }

        .msg-label.user { color: rgba(200,230,255,0.4); }
        .msg-label.assistant { color: rgba(200,160,255,0.4); }

        .bubble {
          max-width: 76%;
          padding: 13px 18px;
          font-size: 15px;
          line-height: 1.75;
          animation: appear 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
          position: relative;
        }

        @keyframes appear {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .bubble.user {
          background: linear-gradient(135deg, rgba(40,60,100,0.7), rgba(25,40,80,0.75));
          color: #cce0ff;
          border: 1px solid rgba(100,150,255,0.2);
          border-radius: 18px 4px 18px 18px;
          box-shadow:
            0 4px 24px rgba(60,100,200,0.15),
            0 1px 0 rgba(150,200,255,0.1) inset,
            0 0 0 1px rgba(80,120,220,0.08) inset;
        }

        .bubble.assistant {
          background: linear-gradient(135deg, rgba(30,15,55,0.85), rgba(20,10,40,0.9));
          color: #e8deff;
          border: 1px solid rgba(140,80,220,0.2);
          border-radius: 4px 18px 18px 18px;
          box-shadow:
            0 4px 24px rgba(100,40,200,0.12),
            0 1px 0 rgba(180,130,255,0.08) inset,
            0 0 0 1px rgba(120,60,200,0.08) inset;
        }

        /* Shimmer on assistant bubble */
        .bubble.assistant::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(105deg, transparent 40%, rgba(180,130,255,0.04) 50%, transparent 60%);
          animation: shimmer 4s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        /* Thinking */
        .thinking-wrap { display: flex; flex-direction: column; align-items: flex-start; }

        .thinking {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 13px 18px;
          background: linear-gradient(135deg, rgba(30,15,55,0.85), rgba(20,10,40,0.9));
          border: 1px solid rgba(140,80,220,0.2);
          border-radius: 4px 18px 18px 18px;
          box-shadow: 0 4px 24px rgba(100,40,200,0.12);
        }

        .magic-icon {
          font-size: 17px;
          animation: iconSpin 2s ease-in-out infinite;
        }

        @keyframes iconSpin {
          0%, 100% { transform: rotate(-10deg) scale(1); filter: drop-shadow(0 0 4px rgba(200,150,255,0.6)); }
          50%       { transform: rotate(15deg) scale(1.2); filter: drop-shadow(0 0 10px rgba(220,180,255,1)); }
        }

        .think-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(180,120,255,0.8);
          animation: thinkBounce 1.4s infinite;
        }
        .think-dot:nth-child(3) { animation-delay: 0.18s; }
        .think-dot:nth-child(4) { animation-delay: 0.36s; }

        @keyframes thinkBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30%            { transform: translateY(-7px); opacity: 1; }
        }

        /* Input area */
        .input-area {
          padding: 14px 0 22px;
          border-top: 1px solid rgba(140,80,220,0.1);
        }

        .input-row {
          display: flex;
          gap: 10px;
          align-items: center;
          background: linear-gradient(135deg, rgba(18,10,35,0.97), rgba(12,8,25,0.99));
          border: 1px solid rgba(140,80,220,0.22);
          border-radius: 16px;
          padding: 10px 10px 10px 18px;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-shadow: 0 0 30px rgba(100,40,200,0.08), inset 0 1px 0 rgba(180,130,255,0.05);
        }

        .input-row:focus-within {
          border-color: rgba(180,100,255,0.45);
          box-shadow: 0 0 35px rgba(140,60,255,0.15), 0 0 0 1px rgba(160,80,255,0.1), inset 0 1px 0 rgba(200,150,255,0.07);
        }

        .text-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: rgba(230,215,255,0.9);
          font-family: 'Crimson Pro', serif;
          font-size: 16px;
          line-height: 1.5;
        }

        .text-input::placeholder { color: rgba(160,120,220,0.3); font-style: italic; }

        .send-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6a2fb5, #3d1280);
          border: 1px solid rgba(180,100,255,0.35);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.18s ease;
          box-shadow: 0 0 16px rgba(140,50,255,0.4), 0 4px 12px rgba(0,0,0,0.5);
          font-size: 19px;
          position: relative;
          overflow: hidden;
        }

        .send-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          border-radius: inherit;
        }

        .send-btn:hover {
          background: linear-gradient(135deg, #7e3fd0, #4e189a);
          transform: scale(1.08);
          box-shadow: 0 0 28px rgba(180,80,255,0.65), 0 4px 16px rgba(0,0,0,0.5);
        }

        .send-btn:active { transform: scale(0.95); }
        .send-btn:disabled {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.06);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
      `}</style>

      {/* ── SCENE ── */}
      <div className="scene">
        <div className="sky" />

        {/* Stars */}
        {stars.map((i) => {
          const size = 1 + Math.random() * 2.5;
          return (
            <div key={i} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: size,
              height: size,
              '--t': `${2 + Math.random() * 5}s`,
              '--max-op': 0.4 + Math.random() * 0.6,
              animationDelay: `${Math.random() * 5}s`,
            } as React.CSSProperties} />
          );
        })}

        {/* Crescent moon top-right */}
        <div className="crescent-wrap">
          <div className="crescent" />
        </div>
        <div className="moonbeam" />

        {/* Magical floating objects */}
        <div className="owl-wrap" title="A familiar watches over you">🦉</div>
        <div className="book-wrap" title="Ancient spellbook">📖</div>
        <div className="wand-wrap" title="A wand, charged with magic">🪄</div>
        <div className="orb-wrap"><div className="orb" /></div>
        <div className="potion-wrap" title="A bubbling potion">🧪</div>

        {/* Spell sparkles around wand */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="sparkle" style={{
            left: `${58 + Math.random() * 6}px`,
            top: `${185 + Math.random() * 30}px`,
            '--sp-dur': `${1 + Math.random() * 1.5}s`,
            '--sp-delay': `${Math.random() * 2}s`,
            '--sp-x': `${-20 + Math.random() * 40}px`,
            '--sp-y': `${-20 + Math.random() * 10}px`,
            background: ['#fff', '#ffe080', '#c0a0ff', '#80ffcc'][i % 4],
            boxShadow: `0 0 4px 2px ${['rgba(255,255,255,0.8)','rgba(255,220,80,0.8)','rgba(180,140,255,0.8)','rgba(80,255,180,0.8)'][i % 4]}`,
          } as React.CSSProperties} />
        ))}

        {/* Trees */}
        <div className="trees">
          {[
            { left:'0%',   w:70,  h:700, color:'#030709' },
            { left:'5%',   w:50,  h:580, color:'#040a0b' },
            { left:'11%',  w:80,  h:720, color:'#030608' },
            { left:'19%',  w:42,  h:500, color:'#050c09' },
            { left:'25%',  w:58,  h:610, color:'#040a07' },
            { left:'31%',  w:35,  h:470, color:'#050d09' },
            { left:'62%',  w:35,  h:470, color:'#050d09' },
            { left:'68%',  w:58,  h:610, color:'#040a07' },
            { left:'74%',  w:42,  h:500, color:'#050c09' },
            { left:'82%',  w:80,  h:720, color:'#030608' },
            { left:'89%',  w:50,  h:580, color:'#040a0b' },
            { left:'95%',  w:70,  h:700, color:'#030709' },
          ].map((t, i) => (
            <div key={i} className="tree" style={{
              left: t.left,
              borderLeftWidth: t.w / 2,
              borderRightWidth: t.w / 2,
              borderBottomWidth: t.h,
              borderBottomColor: t.color,
            }} />
          ))}
        </div>

        <div className="ground-glow" />
        <div className="fog" />
        <div className="fog2" />

        {/* Fireflies */}
        {fireflies.map((i) => {
          const warm = i % 3 === 0;
          const blue = i % 3 === 1;
          const color = warm ? 'rgba(255,220,80,' : blue ? 'rgba(120,180,255,' : 'rgba(160,255,140,';
          const size = 3 + Math.random() * 3;
          return (
            <div key={i} className="firefly" style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${30 + Math.random() * 55}%`,
              width: size,
              height: size,
              background: `${color}0.9)`,
              boxShadow: `0 0 ${size * 2}px ${size}px ${color}0.7), 0 0 ${size * 5}px ${size * 2}px ${color}0.25)`,
              '--dur': `${5 + Math.random() * 9}s`,
              '--blink': `${1.5 + Math.random() * 3}s`,
              '--dx1': `${-35 + Math.random() * 70}px`,
              '--dy1': `${-25 + Math.random() * 50}px`,
              '--dx2': `${-50 + Math.random() * 100}px`,
              '--dy2': `${-35 + Math.random() * 70}px`,
              '--dx3': `${-25 + Math.random() * 50}px`,
              '--dy3': `${-15 + Math.random() * 30}px`,
            } as React.CSSProperties} />
          );
        })}

        {/* Leaves */}
        {leaves.map((i) => (
          <div key={i} className="leaf" style={{
            left: `${Math.random() * 95}%`,
            '--size': `${12 + Math.random() * 14}px`,
            '--fall-dur': `${9 + Math.random() * 12}s`,
            '--fall-delay': `${Math.random() * 14}s`,
            '--sway': `${-90 + Math.random() * 180}px`,
          } as React.CSSProperties}>
            {['🍃','🌿','🍂','🍁'][i % 4]}
          </div>
        ))}
      </div>

      {/* ── CHAT ── */}
      <div className="chat-wrapper">
        <div className="chat-header">
          <div className="header-title">The Enchanted Forest</div>
          <div className="header-sub">where ancient magic stirs between the roots…</div>
          <div className="divider" />
        </div>

        <div className="messages-area">
          {messages.length === 0 && !loading && (
            <div className="empty-state">
              <div className="empty-crest">⚯͛</div>
              <div className="empty-text">Mischief managed. Now speak your query, witch or wizard.</div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`msg-wrap ${msg.role}`}>
              <div className={`msg-label ${msg.role}`}>
                {msg.role === 'user' ? '⟡ The Seeker' : '⟢ The Oracle'}
              </div>
              <div className={`bubble ${msg.role}`}>{msg.content}</div>
            </div>
          ))}

          {loading && (
            <div className="thinking-wrap">
              <div className="msg-label assistant">⟢ The Oracle</div>
              <div className="thinking">
                <span className="magic-icon">✨</span>
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
              placeholder="cast your words into the void…"
            />
            <button className="send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>
              ✦
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
