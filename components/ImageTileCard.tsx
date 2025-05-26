import Image from 'next/image';
import { Heart, MessageCircle, Bookmark, Tag } from 'lucide-react';

interface ImageTileCardProps {
    type: 'outfit' | 'item';
    imageUrl: string;
    title: string;
    price?: number;
    likes?: number;
    comments?: number;
    isSaved?: boolean;
    tags?: string[];
    onLike?: () => void;
    onComment?: () => void;
    onSave?: () => void;
    onTag?: () => void;
}

export default function ImageTileCard({
    type,
    imageUrl,
    title,
    price,
    likes = 0,
    comments = 0,
    isSaved = false,
    tags = [],
    onLike,
    onComment,
    onSave,
    onTag,
}: ImageTileCardProps) {
    return (
        <div className="relative group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="aspect-square relative">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>

            <div className="p-3">
                <h3 className="font-medium text-sm truncate">{title}</h3>
                {type === 'item' && price && (
                    <p className="text-sm font-semibold mt-1">${price.toFixed(2)}</p>
                )}

                <div className="flex items-center gap-3 mt-2">
                    <button
                        onClick={onLike}
                        className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
                    >
                        <Heart size={16} />
                        <span className="text-xs">{likes}</span>
                    </button>

                    <button
                        onClick={onComment}
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        <MessageCircle size={16} />
                        <span className="text-xs">{comments}</span>
                    </button>

                    <button
                        onClick={onSave}
                        className={`ml-auto ${isSaved ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500'} transition-colors`}
                    >
                        <Bookmark size={16} />
                    </button>
                </div>

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 