import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";


function UpdateImage() {
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [jobs, setJobs] = useState('');
  const [error, setError] = useState(""); 
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Load current user data when component is mounted
  useEffect(() => {
    if (user) {
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setJobs(user.jobs || '');
    }
  }, [user]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("jobs", jobs);

    const userId = user._id; // Get the current user ID
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/update-image/${userId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert("Image updated successfully");
      setImage(null); // Clear the selected image
      setError(""); // Clear the error message
      updateUser(data);
      navigate('/home');
    } else {
      setError(data.error || "An error occurred.");
      console.error(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <div className="form-container">
        {/* Left Column - Display Existing Information */}
        <div className="info-column">
          <h3>Current Information</h3>
          <div className="info-item">
            <strong>Address:</strong>
            <p>{user.address || 'Not provided'}</p>
          </div>
          <div className="info-item">
            <strong>Phone:</strong>
            <p>{user.phone || 'Not provided'}</p>
          </div>
          <div className="info-item">
            <strong>Jobs:</strong>
            <p>{user.jobs || 'Not provided'}</p>
          </div>
          <div className="info-item">
            <strong>Image:</strong>
            <img src={user.image || '/default-image.png'} alt="User" className="user-image" />
          </div>
        </div>

        {/* Right Column - Update Information */}
        <div className="update-column">
          <h3>Update Information</h3>
          <div className="input-group">
            <label className="input-label">Address</label>
            <input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Phone</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Jobs</label>
            <input 
              type="text" 
              value={jobs} 
              onChange={(e) => setJobs(e.target.value)} 
              required 
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Image</label>
            <input 
              type="file" 
              onChange={handleImageChange} 
              accept="image/*" 
              className="file-input"
            />
          </div>

          <button type="submit" className="submit-btn" style={{color: "black"}}>Update</button>

          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
    </form>
  );
}

export default UpdateImage;
