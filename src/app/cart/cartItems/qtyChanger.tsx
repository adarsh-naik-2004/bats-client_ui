// QtyChanger.tsx
import { Minus, Plus } from 'lucide-react';
import React from 'react';

interface IProps {
    handleQtyChange: (qty: number) => void;
    children: React.ReactNode;
}
const QtyChanger = ({ handleQtyChange, children }: IProps) => {
    return (
        <div className="flex items-center bg-gray-800 rounded-full border border-gray-600">
            <button
                onClick={() => {
                    handleQtyChange(-1);
                }}
                className="w-10 h-10 rounded-full hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <Minus size={16} />
            </button>
            <div className="w-8 text-center text-white font-medium">{children}</div>
            <button
                onClick={() => {
                    handleQtyChange(1);
                }}
                className="w-10 h-10 rounded-full hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <Plus size={16} />
            </button>
        </div>
    );
};

export default QtyChanger;