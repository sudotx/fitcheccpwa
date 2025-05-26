import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/Layout';
import ImageTileCard from '../../components/ImageTileCard';
import { User, Grid, LayoutGrid, Tag, ShoppingBag } from 'lucide-react';

// Mock data for demonstration
const mockProfile = {
    username: 'fashionista',
    name: 'Sarah Johnson',
    bio: 'Fashion enthusiast | Streetwear lover | Minimalist',
    avatar: '/avatars/user1.jpg',
    coverImage: '/covers/cover1.jpg',
    stats: {
        followers: 1234,
        following: 567,
        wishlist: 89,
    },
    items: [
        {
            id: '1',
            type: 'item',
            imageUrl: '/items/item1.jpg',
            title: 'Vintage Denim Jacket',
            price: 89.99,
            likes: 234,
            comments: 45,
            isSaved: false,
            tags: ['Vintage', 'Denim', 'Jacket'],
        },
        // Add more items...
    ],
    outfits: [
        {
            id: '1',
            type: 'outfit',
            imageUrl: '/outfits/outfit1.jpg',
            title: 'Summer Street Style',
            likes: 156,
            comments: 23,
            isSaved: true,
            tags: ['Streetwear', 'Summer', 'Casual'],
        },
        // Add more outfits...
    ],
    boards: [
        {
            id: '1',
            title: 'Summer Essentials',
            itemCount: 12,
            coverImage: '/boards/board1.jpg',
        },
        // Add more boards...
    ],
    forSale: [
        {
            id: '1',
            type: 'item',
            imageUrl: '/items/item1.jpg',
            title: 'Vintage Denim Jacket',
            price: 89.99,
            likes: 234,
            comments: 45,
            isSaved: false,
            tags: ['Vintage', 'Denim', 'Jacket'],
        },
        // Add more items...
    ],
};

const tabs = [
    { id: 'closet', label: 'Closet', icon: Grid },
    { id: 'outfits', label: 'Outfits', icon: LayoutGrid },
    { id: 'boards', label: 'Boards', icon: Tag },
    { id: 'forsale', label: 'For Sale', icon: ShoppingBag },
];

export default function Profile() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('closet');
    const { username } = router.query;

    const isOwnProfile = username === mockProfile.username;

    const renderContent = () => {
        switch (activeTab) {
            case 'closet':
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mockProfile.items.map((item) => (
                            <ImageTileCard
                                key={item.id}
                                type="item"
                                imageUrl={item.imageUrl}
                                title={item.title}
                                price={item.price}
                                likes={item.likes}
                                comments={item.comments}
                                isSaved={item.isSaved}
                                tags={item.tags}
                                onLike={() => { }}
                                onComment={() => { }}
                                onSave={() => { }}
                            />
                        ))}
                    </div>
                );

            case 'outfits':
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mockProfile.outfits.map((outfit) => (
                            <ImageTileCard
                                key={outfit.id}
                                type="outfit"
                                imageUrl={outfit.imageUrl}
                                title={outfit.title}
                                likes={outfit.likes}
                                comments={outfit.comments}
                                isSaved={outfit.isSaved}
                                tags={outfit.tags}
                                onLike={() => { }}
                                onComment={() => { }}
                                onSave={() => { }}
                            />
                        ))}
                    </div>
                );

            case 'boards':
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mockProfile.boards.map((board) => (
                            <div
                                key={board.id}
                                className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                            >
                                <Image
                                    src={board.coverImage}
                                    alt={board.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
                                    <h3 className="font-medium text-lg">{board.title}</h3>
                                    <p className="text-sm">{board.itemCount} items</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'forsale':
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mockProfile.forSale.map((item) => (
                            <ImageTileCard
                                key={item.id}
                                type="item"
                                imageUrl={item.imageUrl}
                                title={item.title}
                                price={item.price}
                                likes={item.likes}
                                comments={item.comments}
                                isSaved={item.isSaved}
                                tags={item.tags}
                                onLike={() => { }}
                                onComment={() => { }}
                                onSave={() => { }}
                            />
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Layout>
            <div className="max-w-screen-xl mx-auto">
                {/* Cover Image */}
                <div className="relative h-48 md:h-64">
                    <Image
                        src={mockProfile.coverImage}
                        alt="Cover"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Profile Info */}
                <div className="px-4 -mt-16 relative z-10">
                    <div className="flex items-end gap-4">
                        <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                            <Image
                                src={mockProfile.avatar}
                                alt={mockProfile.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {isOwnProfile && (
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                                Edit Profile
                            </button>
                        )}
                    </div>

                    <div className="mt-4">
                        <h1 className="text-2xl font-bold">{mockProfile.name}</h1>
                        <p className="text-gray-600">@{mockProfile.username}</p>
                        <p className="mt-2">{mockProfile.bio}</p>
                    </div>

                    <div className="flex gap-6 mt-4">
                        <div>
                            <p className="font-medium">{mockProfile.stats.followers}</p>
                            <p className="text-sm text-gray-600">Followers</p>
                        </div>
                        <div>
                            <p className="font-medium">{mockProfile.stats.following}</p>
                            <p className="text-sm text-gray-600">Following</p>
                        </div>
                        <div>
                            <p className="font-medium">{mockProfile.stats.wishlist}</p>
                            <p className="text-sm text-gray-600">Wishlist</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b mt-6">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <div className="flex gap-8">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 py-4 border-b-2 ${activeTab === tab.id
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-screen-xl mx-auto px-4 py-6">
                    {renderContent()}
                </div>
            </div>
        </Layout>
    );
} 