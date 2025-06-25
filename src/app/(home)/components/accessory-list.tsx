import React, { useEffect, useState } from 'react';
import AccessoryCard from './accessory-card';
import { Accessory } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

const AccessoryList = ({
    selectedAccessorys,
    handleCheckBoxCheck,
}: {
    selectedAccessorys: Accessory[];
    handleCheckBoxCheck: (accessory: Accessory) => void;
}) => {
    const searchParams = useSearchParams();
    const [accessorys, setAccessorys] = useState<Accessory[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const accessoryResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_GATEWAY}/accessorys?storeId=${searchParams.get('shopId')}`
            );
            const accessorys = await accessoryResponse.json();
            setAccessorys(accessorys);
        };
        fetchData();
    }, [searchParams]);

    return (
        <section className="mt-8">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-7 bg-gradient-to-b from-orange-500 to-orange-700 rounded-full"></div>
                <h3 className="font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
                    Premium Accessories
                </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {accessorys.map((accessory, index) => {
                    return (
                        <div
                            key={accessory.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <AccessoryCard
                                accessory={accessory}
                                selectedAccessorys={selectedAccessorys}
                                handleCheckBoxCheck={handleCheckBoxCheck}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default AccessoryList;