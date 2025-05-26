import { useState } from 'react';
import { DollarSign, Clock } from 'lucide-react';

interface BiddingCTAProps {
    currentPrice: number;
    buyNowPrice?: number;
    timeLeft?: string;
    onPlaceBid: (amount: number) => void;
    onBuyNow?: () => void;
}

export default function BiddingCTA({
    currentPrice,
    buyNowPrice,
    timeLeft,
    onPlaceBid,
    onBuyNow,
}: BiddingCTAProps) {
    const [bidAmount, setBidAmount] = useState(currentPrice + 1);

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Current Price</p>
                    <p className="text-2xl font-bold">${currentPrice.toFixed(2)}</p>
                </div>
                {timeLeft && (
                    <div className="flex items-center gap-1 text-gray-600">
                        <Clock size={16} />
                        <span className="text-sm">{timeLeft}</span>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <DollarSign size={20} className="text-gray-600" />
                    <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(Number(e.target.value))}
                        min={currentPrice + 1}
                        step={1}
                        className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={() => onPlaceBid(bidAmount)}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Place Bid
                </button>

                {buyNowPrice && onBuyNow && (
                    <button
                        onClick={onBuyNow}
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Buy Now (${buyNowPrice.toFixed(2)})
                    </button>
                )}
            </div>
        </div>
    );
} 