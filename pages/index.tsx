import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';

const stylePreferences = [
	{ id: 'minimal', name: 'Minimal', image: '/styles/minimal.jpg' },
	{ id: 'streetwear', name: 'Streetwear', image: '/styles/streetwear.jpg' },
	{ id: 'classic', name: 'Classic', image: '/styles/classic.jpg' },
	{ id: 'bohemian', name: 'Bohemian', image: '/styles/bohemian.jpg' },
	{ id: 'avant-garde', name: 'Avant-garde', image: '/styles/avant-garde.jpg' },
	{ id: 'sporty', name: 'Sporty', image: '/styles/sporty.jpg' },
];

export default function Onboarding() {
	const router = useRouter();
	const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
	const [step, setStep] = useState(1);

	const toggleStyle = (styleId: string) => {
		setSelectedStyles((prev) =>
			prev.includes(styleId)
				? prev.filter((id) => id !== styleId)
				: [...prev, styleId]
		);
	};

	const handleContinue = () => {
		if (step === 1) {
			setStep(2);
		} else {
			router.push('/feed');
		}
	};

	return (
		<Layout showTabBar={false}>
			<div className="min-h-screen bg-white">
				{step === 1 ? (
					<div className="p-6 space-y-8">
						<div className="text-center space-y-2">
							<h1 className="text-3xl font-bold">Welcome to Closetly</h1>
							<p className="text-gray-600">
								Select your style preferences to get started
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							{stylePreferences.map((style) => (
								<button
									key={style.id}
									onClick={() => toggleStyle(style.id)}
									className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedStyles.includes(style.id)
										? 'border-blue-500 ring-2 ring-blue-200'
										: 'border-gray-200'
										}`}
								>
									<Image
										src={style.image}
										alt={style.name}
										fill
										className="object-cover"
									/>
									<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
										<span className="text-white font-medium">{style.name}</span>
									</div>
								</button>
							))}
						</div>

						<button
							onClick={handleContinue}
							disabled={selectedStyles.length === 0}
							className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50"
						>
							Continue
						</button>
					</div>
				) : (
					<div className="p-6 space-y-8">
						<div className="text-center space-y-2">
							<h1 className="text-3xl font-bold">Lets Build Your Closet</h1>
							<p className="text-gray-600">
								Upload your first items or let AI create a starter board
							</p>
						</div>

						<div className="space-y-4">
							<button
								onClick={() => router.push('/wardrobe/upload')}
								className="w-full p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 transition-colors"
							>
								<div className="space-y-2">
									<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
										<svg
											className="w-6 h-6 text-blue-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 4v16m8-8H4"
											/>
										</svg>
									</div>
									<p className="font-medium">Upload Your Items</p>
									<p className="text-sm text-gray-500">
										Start by adding your favorite pieces
									</p>
								</div>
							</button>

							<button
								onClick={() => router.push('/feed')}
								className="w-full p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 transition-colors"
							>
								<div className="space-y-2">
									<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
										<svg
											className="w-6 h-6 text-purple-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
											/>
										</svg>
									</div>
									<p className="font-medium">AI Starter Board</p>
									<p className="text-sm text-gray-500">
										Let AI create a personalized collection
									</p>
								</div>
							</button>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}
