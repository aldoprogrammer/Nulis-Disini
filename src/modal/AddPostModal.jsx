import React, { useState } from 'react';
import { Dialog, Input, Button, Typography, Tooltip } from "@material-tailwind/react";
import axios from 'axios';

const AddPostModal = ({ open, onClose, onAddPost }) => {
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [isGenerating, setIsGenerating] = useState({ ai: false, thumbnail: false, video: false });
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

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
        try {
            // Include the title in the prompt
            const prompt = `Generate content for a blog post titled: "${newPost.title}"`;
            
            const response = await axios.post('https://api.thetaedgecloud.com/generate', {
                model: 'llama-3-8b',
                prompt: prompt,
                // Include other parameters if needed
            }, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_THETA_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            setNewPost(prevPost => ({ ...prevPost, content: response.data.generatedContent }));
        } catch (error) {
            console.error('Error generating content:', error);
            alert('Failed to generate content. Please try again.');
        } finally {
            setIsGenerating(prev => ({ ...prev, ai: false }));
        }
    };

    const handleGenerateThumbnail = async () => {
        setIsGenerating(prev => ({ ...prev, thumbnail: true }));
        try {
            // Use the post title to generate the thumbnail
            const prompt = `Create a visually appealing thumbnail for a blog post titled: "${newPost.title}"`;

            const response = await axios.post('https://api.thetaedgecloud.com/stable-diffusion', {
                model: 'stable-diffusion',
                prompt: prompt,
                // Include other parameters if needed
            }, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_THETA_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            // Set the URL of the generated thumbnail
            setThumbnailUrl(response.data.imageUrl);
        } catch (error) {
            console.error('Error generating thumbnail:', error);
            alert('Failed to generate thumbnail. Please try again.');
        } finally {
            setIsGenerating(prev => ({ ...prev, thumbnail: false }));
        }
    };

    const handleGenerateVideo = async () => {
        setIsGenerating(prev => ({ ...prev, video: true }));
        try {
            // Use the post title to generate the video
            const prompt = `Create a visually engaging video for a blog post titled: "${newPost.title}"`;

            const response = await axios.post('https://api.thetaedgecloud.com/stable-diffusion-video', {
                model: 'stable-diffusion-video',
                prompt: prompt,
                // Include other parameters if needed
            }, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_THETA_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            // Set the URL of the generated video
            setVideoUrl(response.data.videoUrl);
        } catch (error) {
            console.error('Error generating video:', error);
            alert('Failed to generate video. Please try again.');
        } finally {
            setIsGenerating(prev => ({ ...prev, video: false }));
        }
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
                        onClick={handleGenerateVideo}
                        color="purple"
                        disabled={isGenerating.video}
                    >
                        {isGenerating.video ? 'Generating Video...' : 'Generate Video'}
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

                {thumbnailUrl && (
                    <div className="mt-4">
                        <Typography variant="h6" color="blue-gray" className="font-bold">
                            Generated Thumbnail
                        </Typography>
                        <img src={thumbnailUrl} alt="Generated Thumbnail" className="w-full mt-2 border border-blue-gray-300 rounded-md" />
                    </div>
                )}

                {videoUrl && (
                    <div className="mt-4">
                        <Typography variant="h6" color="blue-gray" className="font-bold">
                            Generated Video
                        </Typography>
                        <video src={videoUrl} controls className="w-full mt-2 border border-blue-gray-300 rounded-md" />
                    </div>
                )}

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
