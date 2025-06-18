// qtyChanger.tsx
import { Minus, Plus } from 'lucide-react';
import React from 'react';

interface IProps {
    handleQtyChange: (qty: number) => void;
    children: React.ReactNode;
}
const QtyChanger = ({ handleQtyChange, children }: IProps) => {
    return (
        <div className="flex items-center bg-gray-700 rounded-full">
            <button
                onClick={() => handleQtyChange(-1)}
                className="w-8 h-8 rounded-full hover:bg-orange-900/40 flex items-center justify-center text-orange-300"
            >
                <Minus size={16} />
            </button>
            <div className="w-8 text-center text-white">{children}</div>
            <button
                onClick={() => handleQtyChange(1)}
                className="w-8 h-8 rounded-full hover:bg-orange-900/40 flex items-center justify-center text-orange-300"
            >
                <Plus size={16} />
            </button>
        </div>
    );
};

export default QtyChanger;