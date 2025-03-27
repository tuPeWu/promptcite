import React from 'react';

const Instructions = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">How to Use Prompt-Cite</h1>
      <div className="prose prose-lg space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li>Click the "Start citing" button on the homepage or navigate to the citation generator.</li>
            <li>Paste your AI prompt into the text box.</li>
            <li>Fill in your name as the author (or it will be auto-filled if you're signed in).</li>
            <li>Select the AI model you used from the provided options.</li>
            <li>Add any additional information about the model version if relevant.</li>
            <li>Click "GENERATE" to create your citation.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Using Your Citation</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>Copy the generated citation text directly into your academic paper, presentation, or documentation.</li>
            <li>Use the QR code to quickly share access to your prompt and its metadata.</li>
            <li>Access your saved prompts anytime through your account dashboard.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Citation Format</h2>
          <p>Citations are generated in the following format:</p>
          <pre className="bg-gray-50 p-4 rounded-md">
            [Author], "First five words...", [AI Model], [Optional Info], [Date], [Repository Link]
          </pre>
        </section>
      </div>
    </div>
  );
};

export default Instructions;