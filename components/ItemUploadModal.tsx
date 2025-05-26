import { useState, useCallback } from 'react';
import { Upload, X, Tag, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface ItemUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (data: {
        image: File;
        brand: string;
        category: string;
        color: string;
        season: string;
        price: number;
        tags: string[];
    }) => void;
}

const categories = ['Tops', 'Bottoms', 'Dresses', 'Shoes', 'Accessories'];
const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink'];

export default function ItemUploadModal({
    isOpen,
    onClose,
    onUpload,
}: ItemUploadModalProps) {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [season, setSeason] = useState('');
    const [price, setPrice] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleAnalyze = useCallback(async () => {
        if (!image) return;

        setIsAnalyzing(true);
        // TODO: Implement AI analysis
        // This would call your AI service to analyze the image
        // and suggest tags, category, etc.
        setTimeout(() => {
            setCategory('Tops');
            setColor('Blue');
            setSeason('Summer');
            setTags(['Casual', 'Streetwear']);
            setIsAnalyzing(false);
        }, 1500);
    }, [image]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return;

        onUpload({
            image,
            brand,
            category,
            color,
            season,
            price: parseFloat(price),
            tags,
        });
    }, [image, brand, category, color, season, price, tags, onUpload]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Upload Item</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Item Photo
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            {preview ? (
                                <div className="relative aspect-square max-w-xs mx-auto">
                                    <Image
                                        src={preview}
                                        alt="Preview"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="text-sm text-gray-600">
                                        <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                                            <span>Upload a file</span>
                                            <input
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Brand
                            </label>
                            <input
                                type="text"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Color
                            </label>
                            <select
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Select color</option>
                                {colors.map((col) => (
                                    <option key={col} value={col}>
                                        {col}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Season
                            </label>
                            <select
                                value={season}
                                onChange={(e) => setSeason(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Select season</option>
                                {seasons.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Tags
                            </label>
                            <button
                                type="button"
                                onClick={handleAnalyze}
                                disabled={!image || isAnalyzing}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50"
                            >
                                <Sparkles size={16} />
                                {isAnalyzing ? 'Analyzing...' : 'Auto-tag with AI'}
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => setTags(tags.filter((t) => t !== tag))}
                                        className="ml-1 text-gray-500 hover:text-gray-700"
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!image}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            Upload Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 