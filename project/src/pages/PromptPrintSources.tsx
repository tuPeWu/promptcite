import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SOURCES = [
    { id: 1, title: "Advocating Energy-per-Token in LLM Inference", url: "https://arxiv.org/html/2511.05597" },
    { id: 2, title: "Energy Use of AI Inference", url: "https://arxiv.org/html/2505.09598v5" },
    { id: 3, title: "EuroMLSys 2025 Paper", url: "https://euromlsys.eu/pdf/euromlsys25-27.pdf" },
    { id: 4, title: "Test-time Scaling Energy", url: "https://arxiv.org/pdf/2509.20241.pdf" },
    { id: 5, title: "Energy Efficient or Exhaustive? Benchmarking Power Consumption", url: "https://energy.acm.org/eir/energy-efficient-or-exhaustive-benchmarking-power-consumption-of-llm-inference-engines/" },
    { id: 6, title: "Google Gemini AI Energy Report", url: "https://www.technologyreview.com/2025/08/21/1122288/google-gemini-ai-energy/" },
    { id: 7, title: "AI Footprint August 2025", url: "https://www.sustainabilitybynumbers.com/p/ai-footprint-august-2025" },
    { id: 8, title: "How much energy does ChatGPT use?", url: "https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use" },
    { id: 9, title: "Chain-of-Thought Energy Analysis", url: "https://arxiv.org/abs/2505.09598" },
    { id: 10, title: "AI Water Consumption (UCR)", url: "https://news.ucr.edu/articles/2023/04/28/ai-programs-consume-large-volumes-scarce-water" },
    { id: 11, title: "AI's Hidden Water Cost", url: "https://theconversation.com/ai-has-a-hidden-water-cost-heres-how-to-calculate-yours-263252" },
    { id: 12, title: "Google's AI Transparency Report", url: "https://www.taxtheai.com/post/google-s-ai-transparency-what-we-learned-from-its-new-gemini-energy-report" },
    { id: 13, title: "Global Electricity Review 2025", url: "https://ember-energy.org/latest-insights/global-electricity-review-2025/major-countries-and-regions/" },
    { id: 14, title: "Carbon Intensity of Electricity", url: "https://ourworldindata.org/grapher/carbon-intensity-electricity" },
    { id: 15, title: "Measuring the Energy Footprint of LLM Inference (v1)", url: "https://arxiv.org/html/2505.09598v1" },
    { id: 16, title: "Measuring Environmental Impact of AI Inference (Google Cloud)", url: "https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference/" },
    { id: 17, title: "ACL 2025 Paper", url: "https://aclanthology.org/2025.acl-long.1563.pdf" },
    { id: 18, title: "ScienceDirect Article", url: "https://www.sciencedirect.com/science/article/abs/pii/S1364032125008329" },
    { id: 19, title: "IEEE Xplore Article", url: "https://ieeexplore.ieee.org/iel8/6287639/10820123/11015703.pdf" },
    { id: 20, title: "How Hungry is AI? Benchmarking Energy, Water, and Carbon", url: "https://www.semanticscholar.org/paper/How-Hungry-is-AI-Benchmarking-Energy,-Water,-and-of-Jegham-Abdelatti/75bca8d05232deab461d8033bcf4255ebbb3773d" },
    { id: 21, title: "Is Google's Reveal Progress or Greenwashing?", url: "https://towardsdatascience.com/is-googles-reveal-of-geminis-impact-progress-or-greenwashing/" },
    { id: 22, title: "Scribd Document 2505-09598v3", url: "https://www.scribd.com/document/900675261/2505-09598v3" },
    { id: 23, title: "The Moonlight Review", url: "https://www.themoonlight.io/en/review/how-hungry-is-ai-benchmarking-energy-water-and-carbon-footprint-of-llm-inference" },
    { id: 24, title: "TechRadar: Google Reveals Gemini Energy Use", url: "https://www.techradar.com/pro/google-reveals-just-how-much-energy-each-gemini-query-uses-and-you-might-be-surprised" },
];

const PromptPrintSources: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
                <Link to="/prompt-print" className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('ecoPrompt.sources.back')}
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('ecoPrompt.sources.title')}</h1>

                <div className="prose dark:prose-invert max-w-none mb-8">
                    <p>
                        {t('ecoPrompt.sources.intro')}
                    </p>
                    <p className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded text-center">
                        E = E_base + (a_in × T_in) + (a_out × T_out)
                    </p>
                    <p>
                        {t('ecoPrompt.sources.waterCarbon')}
                    </p>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('ecoPrompt.sources.references')}</h2>
                <ul className="space-y-3">
                    {SOURCES.map((source) => (
                        <li key={source.id} className="flex items-start">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                                {source.id}
                            </span>
                            <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                            >
                                {source.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PromptPrintSources;
