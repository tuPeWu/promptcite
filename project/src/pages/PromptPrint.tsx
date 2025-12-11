import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Info, Leaf, Droplets, Zap, Smile, Meh, Frown } from 'lucide-react';

// Model definitions
const MODELS = {
    A: {
        E_base: 0.05,
        a_in: 0.00001,
        a_out: 0.00003,
    },
    B: {
        E_base: 0.12,
        a_in: 0.00002,
        a_out: 0.00006,
    },
    C: {
        E_base: 0.25,
        a_in: 0.00004,
        a_out: 0.00012,
    },
};

// Response type presets
const RESPONSE_TYPES = {
    short: {
        in: 30,
        out: 60,
    },
    chat: {
        in: 150,
        out: 300,
    },
    research: {
        in: 500,
        out: 2000,
    },
    custom: {
        in: 0,
        out: 0,
    },
};

// Grid carbon intensity presets (g CO2/kWh)
const GRID_REGIONS = {
    global: { value: 470 },
    eu: { value: 210 },
    us: { value: 380 },
};

const PromptPrint: React.FC = () => {
    const { t } = useTranslation();

    // State
    const [modelClass, setModelClass] = useState<'A' | 'B' | 'C'>('B');
    const [responseType, setResponseType] = useState<keyof typeof RESPONSE_TYPES>('chat');
    const [inputTokens, setInputTokens] = useState(RESPONSE_TYPES.chat.in);
    const [outputTokens, setOutputTokens] = useState(RESPONSE_TYPES.chat.out);
    const [gridRegion, setGridRegion] = useState<keyof typeof GRID_REGIONS>('global');
    const [promptText, setPromptText] = useState('');

    // Update tokens when preset changes
    useEffect(() => {
        if (responseType !== 'custom') {
            setInputTokens(RESPONSE_TYPES[responseType].in);
            setOutputTokens(RESPONSE_TYPES[responseType].out);
        }
    }, [responseType]);

    // Estimate tokens from text (rough approximation: 4 chars per token)
    useEffect(() => {
        if (promptText) {
            const estimatedTokens = Math.ceil(promptText.length / 4);
            if (estimatedTokens > 0) {
                // Logic kept same as before
            }
        }
    }, [promptText]);

    // Calculate results
    const calculateResults = () => {
        const model = MODELS[modelClass];
        const grid = GRID_REGIONS[gridRegion];

        // Energy (Wh)
        const E_Wh = model.E_base + (model.a_in * inputTokens) + (model.a_out * outputTokens);

        // Water (mL) - 1.5 mL/Wh
        const W_mL = E_Wh * 1.5;

        // Carbon (g) - E(kWh) * Grid(g/kWh)
        const C_g = (E_Wh / 1000) * grid.value;

        return { E_Wh, W_mL, C_g };
    };

    const results = calculateResults();

    // Evaluation Logic
    const evaluateMetric = (value: number, thresholds: { good: number; bad: number }) => {
        if (value <= thresholds.good) return 'good';
        if (value > thresholds.bad) return 'bad';
        return 'medium';
    };

    const energyStatus = evaluateMetric(results.E_Wh, { good: 0.15, bad: 0.6 });
    const carbonStatus = evaluateMetric(results.C_g, { good: 0.07, bad: 0.29 });
    const waterStatus = evaluateMetric(results.W_mL, { good: 0.225, bad: 0.9 });

    const getOverallStatus = () => {
        if (energyStatus === 'bad' || carbonStatus === 'bad' || waterStatus === 'bad') return 'bad';
        if (energyStatus === 'medium' || carbonStatus === 'medium' || waterStatus === 'medium') return 'medium';
        return 'good';
    };

    const overallStatus = getOverallStatus();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'good': return 'text-green-500';
            case 'medium': return 'text-yellow-500';
            case 'bad': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'good': return <Smile className={`w-16 h-16 ${getStatusColor(status)}`} />;
            case 'medium': return <Meh className={`w-16 h-16 ${getStatusColor(status)}`} />;
            case 'bad': return <Frown className={`w-16 h-16 ${getStatusColor(status)}`} />;
            default: return null;
        }
    };

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPromptText(e.target.value);
        // Auto-estimate input tokens: ~4 chars per token
        const estimated = Math.ceil(e.target.value.length / 4);
        if (estimated > 0) {
            setInputTokens(estimated);
            setResponseType('custom');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('ecoPrompt.title')}</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    {t('ecoPrompt.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">

                    {/* Prompt Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('ecoPrompt.input.label')}
                        </label>
                        <textarea
                            value={promptText}
                            onChange={handlePromptChange}
                            className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={t('ecoPrompt.input.placeholder')}
                        />
                        <p className="text-xs text-gray-500 mt-1 text-right">
                            {t('ecoPrompt.input.estimatedTokens', { count: Math.ceil(promptText.length / 4) })}
                        </p>
                    </div>

                    {/* Model Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('ecoPrompt.modelClass.label')}
                        </label>
                        <div className="space-y-2">
                            {(Object.keys(MODELS) as Array<keyof typeof MODELS>).map((key) => (
                                <label key={key} className={`flex items-start p-3 border rounded-md cursor-pointer transition-colors ${modelClass === key ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                                    <input
                                        type="radio"
                                        name="modelClass"
                                        value={key}
                                        checked={modelClass === key}
                                        onChange={() => setModelClass(key)}
                                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <div className="ml-3">
                                        <span className="block text-sm font-medium text-gray-900 dark:text-white">{t(`ecoPrompt.modelClass.${key}.name`)}</span>
                                        <span className="block text-xs text-gray-500 dark:text-gray-400">{t(`ecoPrompt.modelClass.${key}.description`)}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Response Type & Tokens */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('ecoPrompt.responseType.label')}
                        </label>
                        <select
                            value={responseType}
                            onChange={(e) => setResponseType(e.target.value as keyof typeof RESPONSE_TYPES)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                        >
                            {Object.keys(RESPONSE_TYPES).map((key) => (
                                <option key={key} value={key}>{t(`ecoPrompt.responseType.${key}`)}</option>
                            ))}
                        </select>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-700 dark:text-gray-300">{t('ecoPrompt.tokens.input')}</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{inputTokens}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="2000"
                                    value={inputTokens}
                                    onChange={(e) => {
                                        setInputTokens(parseInt(e.target.value));
                                        setResponseType('custom');
                                    }}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-700 dark:text-gray-300">{t('ecoPrompt.tokens.output')}</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{outputTokens}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="4000"
                                    value={outputTokens}
                                    onChange={(e) => {
                                        setOutputTokens(parseInt(e.target.value));
                                        setResponseType('custom');
                                    }}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Grid Region */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('ecoPrompt.gridRegion.label')}
                        </label>
                        <select
                            value={gridRegion}
                            onChange={(e) => setGridRegion(e.target.value as keyof typeof GRID_REGIONS)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            {Object.entries(GRID_REGIONS).map(([key, value]) => (
                                <option key={key} value={key}>{t(`ecoPrompt.gridRegion.${key}`)} ({value.value} g/kWh)</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md p-6 border border-blue-100 dark:border-gray-600">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                            <Info className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                            {t('ecoPrompt.results.title')}
                        </h2>

                        {/* Overall Evaluation */}
                        <div className="flex flex-col items-center justify-center mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                            <div className="mb-2">
                                {getStatusIcon(overallStatus)}
                            </div>
                            <div className={`text-lg font-bold uppercase tracking-wider ${getStatusColor(overallStatus)}`}>
                                {overallStatus}
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Energy */}
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                <div className="flex items-center">
                                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mr-4">
                                        <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('ecoPrompt.results.energy')}</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {results.E_Wh.toFixed(4)} <span className="text-sm font-normal text-gray-500">Wh</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Carbon */}
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                <div className="flex items-center">
                                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">
                                        <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('ecoPrompt.results.carbon')}</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {results.C_g.toFixed(4)} <span className="text-sm font-normal text-gray-500">g CO₂</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Water */}
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                <div className="flex items-center">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                                        <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('ecoPrompt.results.water')}</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {results.W_mL.toFixed(4)} <span className="text-sm font-normal text-gray-500">mL</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
                            {t('ecoPrompt.results.disclaimer')}
                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/prompt-print/sources"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                        >
                            {t('ecoPrompt.results.viewSources')} &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromptPrint;
