import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PostUpdate = () => {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate(); // Initialize navigate function
    const [newTitle, setNewTitle] = useState(''); // State for new title
    const [newContent, setNewContent] = useState(''); // State for new content

    // Handle the update request
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/update/${id}`, {
                newTitle,
                newContent
            });

            alert(response.data); // Display success message
            navigate('/blogposted'); // Redirect to the blog list page
        } catch (error) {
            console.error("Error updating blog:", error);
            alert("Cập nhật thất bại."); // Show error message
        }
    };

    return (
        <div className="post-update-container">
            <h2 className="title2">Cập nhật bài viết</h2>
            <input 

                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                className="input-field"
                placeholder="Tiêu đề mới" 
            />
            <textarea 
                value={newContent} 
                onChange={(e) => setNewContent(e.target.value)} 
                className="textarea-field"
                placeholder="Nội dung mới" 
            />
            <button className="submit-btn" onClick={handleUpdate}>Cập nhật</button>
        </div>
    );
};

export default PostUpdate;
