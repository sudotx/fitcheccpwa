import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { Heart, MessageCircle, Bookmark, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data for demonstration
const mockOutfit = {
    id: '1',
    title: 'Summer Street Style',
    description: 'A perfect blend of comfort and style for those hot summer days.',
    images: [
        '/outfits/outfit1-1.jpg',
        '/outfits/outfit1-2.jpg',
        '/outfits/outfit1-3.jpg',
    ],
    items: [
        {
            id: '1',
            name: 'Vintage Denim Jacket',
            brand: 'Levi\'s',
            price: 89.99,
            imageUrl: '/items/item1.jpg',
        },
        {
            id: '2',
            name: 'White Graphic Tee',
            brand: 'Supreme',
            price: 45.00,
            imageUrl: '/items/item2.jpg',
        },
        {
            id: '3',
            name: 'Black Cargo Pants',
            brand: 'Carhartt',
            price: 79.99,
            imageUrl: '/items/item3.jpg',
        },
    ],
    tags: ['Streetwear', 'Summer', 'Casual'],
    likes: 234,
    comments: 45,
    isSaved: false,
    creator: {
        username: 'fashionista',
        avatar: '/avatars/user1.jpg',
    },
};

export default function OutfitDetail() {
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [likes, setLikes] = useState(mockOutfit.likes);
    const [isSaved, setIsSaved] = useState(mockOutfit.isSaved);

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === mockOutfit.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? mockOutfit.images.length - 1 : prev - 1
        );
    };

    const handleLike = () => {
        setLikes((prev) => prev + 1);
    };

    const handleSave = () => {
        setIsSaved((prev) => !prev);
    };

    return (
        <Layout>
            <div className="max-w-screen-xl mx-auto">
                {/* Image Carousel */}
                <div className="relative aspect-[4/5] bg-gray-100">
                    <Image
                        src={mockOutfit.images[currentImageIndex]}
                        alt={mockOutfit.title}
                        fill
                        className="object-cover"
                    />

                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {mockOutfit.images.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-6">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">{mockOutfit.title}</h1>
                            <p className="text-gray-600 mt-1">{mockOutfit.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleLike}
                                className="flex items-center gap-1 text-gray-600 hover:text-red-500"
                            >
                                <Heart size={20} />
                                <span>{likes}</span>
                            </button>
                            <button
                                onClick={handleSave}
                                className={`${isSaved ? 'text-yellow-500' : 'text-gray-600'
                                    } hover:text-yellow-500`}
                            >
                                <Bookmark size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {mockOutfit.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Items */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Items in this outfit</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {mockOutfit.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => router.push(`/item/${item.id}`)}
                                    className="flex gap-3 p-3 bg-white rounded-lg hover:bg-gray-50"
                                >
                                    <div className="relative w-20 h-20">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-sm text-gray-600">{item.brand}</p>
                                        <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Creator */}
                    <div className="flex items-center gap-3 pt-4 border-t">
                        <div className="relative w-12 h-12">
                            <Image
                                src={mockOutfit.creator.avatar}
                                alt={mockOutfit.creator.username}
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                        <div>
                            <p className="font-medium">@{mockOutfit.creator.username}</p>
                            <button
                                onClick={() => router.push(`/profile/${mockOutfit.creator.username}`)}
                                className="text-sm text-blue-600 hover:text-blue-500"
                            >
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
} 