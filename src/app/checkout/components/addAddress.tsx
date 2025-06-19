// AddAdress.tsx
import { LoaderCircle, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAddress } from '@/lib/http/api';

const formSchema = z.object({
    address: z.string().min(2, {
        message: 'Address must be at least 2 characters.',
    }),
});

const AddAdress = ({ customerId }: { customerId: string | undefined }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addressForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['address', customerId],
        mutationFn: async (address: string) => {
            return await addAddress(customerId!, address);
        },
        onSuccess: () => {
            addressForm.reset();
            setIsModalOpen(false);
            return queryClient.invalidateQueries({ queryKey: ['customer'] });
        },
    });

    const handleAddressAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();

        return addressForm.handleSubmit((data: z.infer<typeof formSchema>) => {
            mutate(data.address);
        })(e);
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button 
                    size={'sm'} 
                    variant={'outline'}
                    className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                    <Plus size={'16'} className="text-orange-400" />
                    <span className="ml-2">Add New Address</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700">
                <Form {...addressForm}>
                    <form onSubmit={handleAddressAdd}>
                        <DialogHeader>
                            <DialogTitle className="text-white">Add Address</DialogTitle>
                            <DialogDescription className="text-gray-400">
                                We can save your address for next time order.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div>
                                <Label htmlFor="address" className="text-gray-300">Address</Label>
                                <FormField
                                    name="address"
                                    control={addressForm.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea 
                                                        className="mt-2 bg-gray-700 border-gray-600 text-white focus:border-orange-500"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button 
                                type="submit" 
                                disabled={isPending}
                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                            >
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <LoaderCircle className="animate-spin" />
                                        <span>Please wait...</span>
                                    </span>
                                ) : (
                                    'Save Address'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddAdress;