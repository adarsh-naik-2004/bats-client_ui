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
                `${
                    process.env.NEXT_PUBLIC_BACKEND_URL
                }/api/catalog/accessorys?storeId=${searchParams.get('shopId')}`
            );
            const accessorys = await accessoryResponse.json();
            setAccessorys(accessorys);
            console.log('accessorys', accessorys);
        };
        fetchData();
    },);

    return (
        <section className="mt-6">
            <h3>Extra accessorys</h3>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {accessorys.map((accessory) => {
                    return (
                        <AccessoryCard
                            accessory={accessory}
                            key={accessory.id}
                            selectedAccessorys={selectedAccessorys}
                            handleCheckBoxCheck={handleCheckBoxCheck}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default AccessoryList;
