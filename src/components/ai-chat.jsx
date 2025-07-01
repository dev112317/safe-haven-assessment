/**
 * ai-chat.jsx
 * Placeholder for AI-based chat widget to drive leads.
 * @todo: Integrate with OpenAI, Dialogflow, or other AI chat provider.
 */
'use client';
import React from 'react';

/**
 * AIChatWidget component (placeholder)
 */
export default function AIChatWidget() {
  return (
    <div className="fixed bottom-4 right-4 w-72 max-w-full z-50">
      <div className="bg-white border rounded-lg shadow-lg p-4 flex flex-col">
        <div className="font-bold mb-2">AI Chat (Coming Soon)</div>
        <div className="text-gray-500 text-sm mb-2">Our AI assistant will help you choose the best security solution and answer your questions.</div>
        {/* @todo: Integrate real AI chat here */}
        <button className="bg-blue-600 text-white rounded px-3 py-1 mt-2 cursor-not-allowed opacity-60" disabled>Start Chat</button>
      </div>
    </div>
  );
} 