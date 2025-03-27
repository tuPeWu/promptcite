import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Prompt-Cite - Automated AI Prompt Bibliography</h1>
      <div className="prose prose-lg">
        <p className="text-xl mb-6">
          📖 <strong>Prompt-Cite</strong> is a repository for the automatic cataloging and organization
          of prompts used in academic research and creative work with AI.
        </p>
        <p className="text-xl">
          🎯 <strong>Goal:</strong> To create a fully automated prompt bibliography generator
          ("promptographic index") that enables easy archiving, sharing, and citation of AI prompts
          in academic publications, business presentations, reports, and documentation of artistic work.
        </p>
      </div>
    </div>
  );
};

export default About;