import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ImageTileCard from '../../components/ImageTileCard';
import { Plus, Filter, X } from 'lucide-react';

// Mock data for demonstration
const mockItems = [
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
        category: 'Outerwear',
        color: 'Blue',
        season: 'All',
    },
    // Add more items...
];

const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];
const colors = ['All', 'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink'];
const seasons = ['All', 'Spring', 'Summer', 'Fall', 'Winter'];

export default function Wardrobe() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedColor, setSelectedColor] = useState('All');
    const [selectedSeason, setSelectedSeason] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredItems = mockItems.filter((item) => {
        if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
        if (selectedColor !== 'All' && item.color !== selectedColor) return false;
        if (selectedSeason !== 'All' && item.season !== selectedSeason) return false;
        return true;
    });

    return (
        <Layout>
            <div className="max-w-screen-xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">My Wardrobe</h1>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
                        >
                            <Filter size={20} />
                            <span>Filter</span>
                        </button>
                        <button
                            onClick={() => router.push('/wardrobe/upload')}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <Plus size={20} />
                            <span>Add Item</span>
                        </button>
                    </div>
                </div>

                {/* Filter Modal */}
                {isFilterOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg w-full max-w-md">
                            <div className="p-4 border-b flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Filter Items</h2>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-4 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Color
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-3 py-1 rounded-full text-sm ${selectedColor === color
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Season
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {seasons.map((season) => (
                                            <button
                                                key={season}
                                                onClick={() => setSelectedSeason(season)}
                                                className={`px-3 py-1 rounded-full text-sm ${selectedSeason === season
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {season}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-t flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setSelectedColor('All');
                                        setSelectedSeason('All');
                                    }}
                                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredItems.map((item) => (
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

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No items match your filters</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('All');
                                setSelectedColor('All');
                                setSelectedSeason('All');
                            }}
                            className="mt-4 text-blue-600 hover:text-blue-700"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
} 