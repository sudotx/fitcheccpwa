import Image from 'next/image';
import { Sparkles, Heart, MessageCircle, Bookmark } from 'lucide-react';

interface AIRecommendationCardProps {
    imageUrl: string;
    title: string;
    description: string;
    confidence: number;
    likes: number;
    comments: number;
    isSaved: boolean;
    onLike: () => void;
    onComment: () => void;
    onSave: () => void;
}

export default function AIRecommendationCard({
    imageUrl,
    title,
    description,
    confidence,
    likes,
    comments,
    isSaved,
    onLike,
    onComment,
    onSave,
}: AIRecommendationCardProps) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="relative aspect-[4/5]">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>{Math.round(confidence * 100)}% Match</span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-medium text-lg">{title}</h3>
                <p className="text-gray-600 text-sm mt-1">{description}</p>

                <div className="flex items-center gap-4 mt-3">
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
            </div>
        </div>
    );
} 