import { useState, useEffect } from 'react';
import { Topbar } from '../components/Topbar';
import { Sidebar } from '../components/Sidebar';
import { Card, Typography, Button } from "@material-tailwind/react";
import Data from '../assets/blogs.json';
import AddPostModal from '../modal/AddPostModal';
import GiftModal from '../modal/GiftModal';

const Dashboard = () => {
  const [blogs, setBlogs] = useState(Data);
  const [openModal, setOpenModal] = useState(false);
  const [openGiftModal, setOpenGiftModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    // Fetch the blog data
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/path/to/your/blogs.json'); // Update the path to your JSON file
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenGiftModal = (blog) => {
    setSelectedBlog(blog);
    setOpenGiftModal(true);
  };

  const handleCloseGiftModal = () => setOpenGiftModal(false);

  const handleAddPost = (newPost) => {
    setBlogs(prevBlogs => [...prevBlogs, { id: Date.now(), ...newPost }]);
    handleCloseModal();
  };

  const handleSendGift = (gift) => {
    // Implement your logic to process the gift here, e.g., API call to handle Theta token transaction
    if (selectedBlog) {
      console.log(`Sending ${gift.name} (${gift.price} Theta tokens) to the author of post ID: ${selectedBlog.id}`);
      // Call API or other services to process the gift
    }
  };

  return (
    <div>
      <Topbar />
      <div className='flex'>
        <Sidebar />
        <div className="flex flex-col items-center w-full p-5">
          <div className="w-full mt-5">
            <button 
              onClick={handleOpenModal}
              className='bg-blue-gray-700 p-4 rounded-md text-white font-bold ml-auto block'>
              Add Post
            </button>
            <Typography variant="h4" color="blue-gray" className="mb-4">
              Mini Blog List
            </Typography>
            {blogs.map((blog) => (
              <Card key={blog.id} color="white" shadow={true} className="w-full h-auto p-5 mb-5">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {blog.title}
                </Typography>
                <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover mb-4" />
                <Typography color="blue-gray" className="mb-4">
                  {blog.content}
                </Typography>
                <Button
                  color="yellow"
                  onClick={() => handleOpenGiftModal(blog)}
                  className="flex items-center gap-2"
                >
                  🎁 Gift
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Modal for adding new post */}
      <AddPostModal 
        open={openModal}
        onClose={handleCloseModal}
        onAddPost={handleAddPost}
      />

      {/* Modal for gift option */}
      <GiftModal
        open={openGiftModal}
        onClose={handleCloseGiftModal}
        onSendGift={handleSendGift}
      />
    </div>
  );
};

export default Dashboard;
