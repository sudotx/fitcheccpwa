import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ItemUploadModal from '../../components/ItemUploadModal';

export default function ItemUpload() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleUpload = async (data: {
        image: File;
        brand: string;
        category: string;
        color: string;
        season: string;
        price: number;
        tags: string[];
    }) => {
        // TODO: Implement actual upload logic
        console.log('Uploading item:', data);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Redirect to wardrobe after successful upload
        router.push('/wardrobe');
    };

    return (
        <Layout>
            <div className="max-w-screen-xl mx-auto px-4 py-6">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Upload New Item</h1>
                    <p className="text-gray-600">
                        Add items to your wardrobe to create outfits and get AI recommendations
                    </p>
                </div>

                <ItemUploadModal
                    isOpen={isModalOpen}
                    onClose={() => router.back()}
                    onUpload={handleUpload}
                />
            </div>
        </Layout>
    );
} 