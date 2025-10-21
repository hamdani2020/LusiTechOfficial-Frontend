'use client';

import { useState, useEffect } from 'react';

interface HelloResponse {
    message: string;
    status: string;
    data: {
        company: string;
        tagline: string;
    };
}

export default function HelloPage() {
    const [backendData, setBackendData] = useState<HelloResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBackendData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hello/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch from backend');
                }
                const data = await response.json();
                setBackendData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchBackendData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2D2F92] to-[#00ACF8] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-[#2D2F92] mb-6 text-center">
                    Hello World Test
                </h1>

                <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h2 className="font-semibold text-green-800 mb-2">Frontend Status</h2>
                        <p className="text-green-700">Next.js Frontend is running!</p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h2 className="font-semibold text-blue-800 mb-2">Backend Status</h2>
                        {loading && (
                            <p className="text-blue-700">🔄 Connecting to backend...</p>
                        )}
                        {error && (
                            <p className="text-red-700">❌ Backend connection failed: {error}</p>
                        )}
                        {backendData && (
                            <div className="text-blue-700">
                                <p>✅ Django Backend is running!</p>
                                <p className="mt-2 text-sm">
                                    <strong>Message:</strong> {backendData.message}
                                </p>
                                <p className="text-sm">
                                    <strong>Company:</strong> {backendData.data.company}
                                </p>
                                <p className="text-sm">
                                    <strong>Tagline:</strong> {backendData.data.tagline}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h2 className="font-semibold text-purple-800 mb-2">Docker Status</h2>
                        <p className="text-purple-700">✅ Docker Compose is working!</p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <a
                        href="/"
                        className="inline-block bg-[#2D2F92] text-white px-6 py-2 rounded-lg hover:bg-[#1f2070] transition-colors"
                    >
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}