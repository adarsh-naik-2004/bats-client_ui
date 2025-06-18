// addAddress.tsx
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
            if (!customerId) throw new Error("Customer ID is required");
            return await addAddress(customerId, address);
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
                    className="text-orange-400 border-orange-500/30 hover:bg-orange-900/20 hover:text-orange-300"
                >
                    <Plus size={'16'} />
                    <span className="ml-2">Add New Address</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 border-orange-800/50">
                <Form {...addressForm}>
                    <form onSubmit={handleAddressAdd}>
                        <DialogHeader>
                            <DialogTitle className="text-orange-300">Add Address</DialogTitle>
                            <DialogDescription className="text-orange-200/80">
                                We can save your address for next time order.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div>
                                <Label htmlFor="address" className="text-orange-300">Address</Label>
                                <FormField
                                    name="address"
                                    control={addressForm.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea 
                                                        className="mt-2 bg-gray-800 border-gray-700 text-white placeholder:text-orange-200/50 focus:border-orange-500"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-orange-500" />
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
                                className="bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900"
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