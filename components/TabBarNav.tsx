import { Home, Shirt, Compass, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const tabs = [
    { name: 'Feed', href: '/feed', icon: Home },
    { name: 'Closet', href: '/wardrobe', icon: Shirt },
    { name: 'Explore', href: '/search', icon: Compass },
    { name: 'Bids', href: '/bids', icon: DollarSign },
];

export default function TabBarNav() {
    const router = useRouter();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex justify-around">
                    {tabs.map((tab) => {
                        const isActive = router.pathname.startsWith(tab.href);
                        const Icon = tab.icon;

                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={`flex flex-col items-center py-2 px-3 ${isActive
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="text-xs mt-1">{tab.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
} 