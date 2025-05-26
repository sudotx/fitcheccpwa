import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <SignedIn>
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">Welcome to FitCheck!</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Outfit Management */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-3">Outfit Management</h2>
                            <p className="text-gray-600 mb-4">Create and organize your outfits</p>
                            <Link
                                href="/outfits"
                                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Manage Outfits
                            </Link>
                        </div>

                        {/* Style Recommendations */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-3">Style Recommendations</h2>
                            <p className="text-gray-600 mb-4">Get personalized style suggestions</p>
                            <Link
                                href="/recommendations"
                                className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                            >
                                View Recommendations
                            </Link>
                        </div>

                        {/* Wardrobe Organization */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-3">Wardrobe Organization</h2>
                            <p className="text-gray-600 mb-4">Organize your clothing items</p>
                            <Link
                                href="/wardrobe"
                                className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                Manage Wardrobe
                            </Link>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/outfits/new"
                                className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition"
                            >
                                Create New Outfit
                            </Link>
                            <Link
                                href="/wardrobe/add"
                                className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
                            >
                                Add Clothing Item
                            </Link>
                            <Link
                                href="/style-quiz"
                                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
                            >
                                Take Style Quiz
                            </Link>
                        </div>
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <div className="text-center py-12">
                    <h1 className="text-3xl font-bold mb-4">Welcome to FitCheck</h1>
                    <p className="text-xl text-gray-600 mb-8">Your personal fashion assistant</p>
                    <div className="space-y-4">
                        <p className="text-gray-700">Sign in to access:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Outfit Management</li>
                            <li>Style Recommendations</li>
                            <li>Wardrobe Organization</li>
                            <li>Personalized Fashion Tips</li>
                        </ul>
                    </div>
                </div>
            </SignedOut>
        </div>
    );
} 