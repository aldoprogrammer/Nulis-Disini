import React, { useState } from 'react';
import { Dialog, Input, Button, Typography, Tooltip } from "@material-tailwind/react";

const AddPostModal = ({ open, onClose, onAddPost }) => {
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [isGenerating, setIsGenerating] = useState({ ai: false, thumbnail: false, chart: false });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prevPost => ({ ...prevPost, [name]: value }));
    };

    const handleAddPost = () => {
        if (newPost.title.trim() && newPost.content.trim()) {
            onAddPost(newPost);
            setNewPost({ title: '', content: '' });
        }
    };

    const handleGenerateContent = async () => {
        setIsGenerating(prev => ({ ...prev, ai: true }));
        // Simulate an AI content generation process
        setTimeout(() => {
            setNewPost(prevPost => ({ ...prevPost, content: 'Generated AI content here...' }));
            setIsGenerating(prev => ({ ...prev, ai: false }));
        }, 2000);
    };

    const handleGenerateThumbnail = async () => {
        setIsGenerating(prev => ({ ...prev, thumbnail: true }));
        // Simulate thumbnail generation
        setTimeout(() => {
            alert('Thumbnail generated!');
            setIsGenerating(prev => ({ ...prev, thumbnail: false }));
        }, 2000);
    };

    const handleGenerateChart = async () => {
        setIsGenerating(prev => ({ ...prev, chart: true }));
        // Simulate chart generation
        setTimeout(() => {
            alert('Chart generated!');
            setIsGenerating(prev => ({ ...prev, chart: false }));
        }, 2000);
    };

    return (
        <Dialog open={open} onClose={onClose} size="sm" className="p-6">
            <div className="flex flex-col gap-4">
                <Typography variant="h5" color="blue-gray" className="text-center font-bold">
                    Add New Post
                </Typography>

                <div className="relative flex justify-end">
                    <Tooltip content="Material Tailwind" placement="top" className="z-50">
                        <button className='relative z-10'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                            </svg>
                        </button>
                    </Tooltip>
                </div>

                <Input
                    label="Title"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                    className="w-full"
                    variant="outlined"
                    required
                />
                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleGenerateContent}
                        color="blue"
                        disabled={isGenerating.ai}
                    >
                        {isGenerating.ai ? 'Generating Content...' : 'Generate AI Content'}
                    </Button>
                    <Button
                        onClick={handleGenerateThumbnail}
                        color="green"
                        disabled={isGenerating.thumbnail}
                    >
                        {isGenerating.thumbnail ? 'Generating Thumbnail...' : 'Generate Thumbnail'}
                    </Button>
                    <Button
                        onClick={handleGenerateChart}
                        color="purple"
                        disabled={isGenerating.chart}
                    >
                        {isGenerating.chart ? 'Generating Chart...' : 'Generate Chart'}
                    </Button>
                </div>
                <textarea
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-blue-gray-300 rounded-md"
                    rows="4"
                    placeholder="Enter post content here..."
                />

                <div className="flex justify-end gap-4 mt-4">
                    <Button onClick={onClose} color="red" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleAddPost} color="blue">
                        Add Post
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default AddPostModal;
