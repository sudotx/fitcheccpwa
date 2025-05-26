import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { Plus, X, Tag, Save } from 'lucide-react';

// Mock data for demonstration
const mockItems = [
    {
        id: '1',
        imageUrl: '/items/item1.jpg',
        title: 'Vintage Denim Jacket',
        category: 'Outerwear',
    },
    {
        id: '2',
        imageUrl: '/items/item2.jpg',
        title: 'White Graphic Tee',
        category: 'Tops',
    },
    {
        id: '3',
        imageUrl: '/items/item3.jpg',
        title: 'Black Cargo Pants',
        category: 'Bottoms',
    },
    // Add more items...
];

const gridSize = 3; // 3x3 grid

export default function CreateOutfit() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedItems, setSelectedItems] = useState<(typeof mockItems[number] | null)[]>(
        Array(gridSize * gridSize).fill(null)
    );
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');

    const handleDragStart = (e: React.DragEvent, item: typeof mockItems[number]) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(item));
    };

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        const item = JSON.parse(e.dataTransfer.getData('text/plain'));
        setSelectedItems((prev) => {
            const newItems = [...prev];
            newItems[index] = item;
            return newItems;
        });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const removeItem = (index: number) => {
        setSelectedItems((prev) => {
            const newItems = [...prev];
            newItems[index] = null;
            return newItems;
        });
    };

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement outfit creation logic
        console.log('Creating outfit:', {
            title,
            description,
            items: selectedItems.filter(Boolean),
            tags,
        });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Redirect to the new outfit page
        router.push('/outfit/1');
    };

    return (
        <Layout>
            <div className="max-w-screen-xl mx-auto px-4 py-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title and Description */}
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Outfit Title"
                            className="w-full p-3 text-xl font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your outfit..."
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>

                    {/* Grid Editor */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Arrange Your Items</h2>
                        <div className="grid grid-cols-3 gap-4 aspect-square max-w-2xl mx-auto">
                            {selectedItems.map((item, index) => (
                                <div
                                    key={index}
                                    onDrop={(e) => handleDrop(e, index)}
                                    onDragOver={handleDragOver}
                                    className={`relative border-2 border-dashed rounded-lg ${item ? 'border-transparent' : 'border-gray-300'
                                        }`}
                                >
                                    {item ? (
                                        <>
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
                                            >
                                                <X size={16} />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                            <Plus size={24} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Available Items */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Your Items</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {mockItems.map((item) => (
                                <div
                                    key={item.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, item)}
                                    className="relative aspect-square rounded-lg overflow-hidden cursor-move"
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-sm text-center px-2">
                                            {item.title}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-2 text-gray-500 hover:text-gray-700"
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Add a tag..."
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!title || selectedItems.every((item) => !item)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                            <Save size={20} />
                            <span>Create Outfit</span>
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
} 