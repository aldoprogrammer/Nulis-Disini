import React, { useState } from 'react';
import { Dialog, Button, Typography, Tooltip } from "@material-tailwind/react";
import { useAldoAlert } from 'aldo-alert';

// Example gift options with prices
const giftOptions = [
    { id: 1, name: 'Bear', price: 10 },
    { id: 2, name: 'Lion', price: 25 },
    { id: 3, name: 'Bird', price: 50 },
    // Add more gifts and prices as needed
];

const GiftModal = ({ open, onClose, onSendGift }) => {
    const [selectedGift, setSelectedGift] = useState(null);
    const { showAldoAlert } = useAldoAlert();

    const handleGiftSelect = (gift) => {
        setSelectedGift(gift);
    };

    const handleSendGift = () => {
        if (selectedGift) {
            // Call the parent function to handle the gift sending logic
            onSendGift(selectedGift);
            showAldoAlert('Gift sent successfully!', 'info');

            onClose();
        } else {
            alert('Please select a gift.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} size="sm" className="p-8 rounded-lg shadow-lg">
            <div className="flex flex-col gap-6">
                <Typography variant="h5" color="blue-gray" className="text-center font-bold">
                    Gift Theta Token
                </Typography>

                <div className="flex flex-col gap-4">
                    {giftOptions.map((gift) => (
                        <Button
                            key={gift.id}
                            onClick={() => handleGiftSelect(gift)}
                            className={`flex text-black justify-between items-center p-4 rounded-md border ${selectedGift?.id === gift.id ? 'bg-blue-100' : 'bg-white'} border-gray-300`}
                        >
                            <Typography>{gift.name}</Typography>
                            <Typography>{gift.price} Theta</Typography>
                        </Button>
                    ))}
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <Button onClick={onClose} color="red" variant="outlined">
                        Cancel
                    </Button>
                    <Button color="blue" onClick={handleSendGift}>
                        Send Gift
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default GiftModal;
