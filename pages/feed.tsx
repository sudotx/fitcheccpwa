import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ImageTileCard from '../components/ImageTileCard';
import AIRecommendationCard from '../components/AIRecommendationCard';

// Mock data for demonstration
const mockFeed = [
    {
        id: '1',
        type: 'outfit',
        imageUrl: '/outfits/outfit1.jpg',
        title: 'Summer Street Style',
        likes: 234,
        comments: 45,
        isSaved: false,
        tags: ['Streetwear', 'Summer', 'Casual'],
    },
    {
        id: '2',
        type: 'ai',
        imageUrl: '/outfits/outfit2.jpg',
        title: 'Minimalist Office Look',
        description: 'Perfect for your next business meeting',
        confidence: 0.92,
        likes: 156,
        comments: 23,
        isSaved: true,
    },
    {
        id: '3',
        type: 'item',
        imageUrl: '/items/item1.jpg',
        title: 'Vintage Denim Jacket',
        price: 89.99,
        likes: 89,
        comments: 12,
        isSaved: false,
        tags: ['Vintage', 'Denim', 'Jacket'],
    },
];

type FeedItem = typeof mockFeed[number];

export default function Feed() {
    const [feed, setFeed] = useState<FeedItem[]>(mockFeed);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    // Simulate infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadMore = async () => {
        if (isLoading) return;
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFeed((prev) => [...prev, ...mockFeed]);
        setPage((prev) => prev + 1);
        setIsLoading(false);
    };

    const handleLike = (id: string) => {
        setFeed((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, likes: item.likes + 1 }
                    : item
            )
        );
    };

    const handleSave = (id: string) => {
        setFeed((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, isSaved: !item.isSaved }
                    : item
            )
        );
    };

    return (
        <Layout>
            <div className="max-w-screen-xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feed.map((item) => {
                        if (item.type === 'ai') {
                            return (
                                <AIRecommendationCard
                                    key={item.id}
                                    imageUrl={item.imageUrl || ''}
                                    title={item.title}
                                    description={item.description || ''}
                                    confidence={item.confidence || 0}
                                    likes={item.likes}
                                    comments={item.comments}
                                    isSaved={item.isSaved}
                                    onLike={() => handleLike(item.id)}
                                    onComment={() => { }}
                                    onSave={() => handleSave(item.id)}
                                />
                            );
                        }

                        return (
                            <ImageTileCard
                                key={item.id}
                                type={item.type as 'outfit' | 'item'}
                                imageUrl={item.imageUrl}
                                title={item.title}
                                price={item.type === 'item' ? (item as any).price : undefined}
                                likes={item.likes}
                                comments={item.comments}
                                isSaved={item.isSaved}
                                tags={item.tags || []}
                                onLike={() => handleLike(item.id)}
                                onComment={() => { }}
                                onSave={() => handleSave(item.id)}
                            />
                        );
                    })}
                </div>

                {isLoading && (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                    </div>
                )}
            </div>
        </Layout>
    );
} 