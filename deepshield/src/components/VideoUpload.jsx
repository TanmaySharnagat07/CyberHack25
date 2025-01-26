import React, { useState } from 'react';

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [sequenceNumber, setSequenceNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSequenceChange = (e) => {
    setSequenceNumber(e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !sequenceNumber) {
      setError('Please select a video file and provide a sequence number');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);
    formData.append('sequence', sequenceNumber);

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('YOUR_API_URL', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccess('Video uploaded successfully!');
      } else {
        setError('Error uploading video. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-upload-container">
      <h1>Be Protected Against Deepfakes!</h1>
      <p>We offer an AI tool that can identify if an audio or video is a deepfake or real.</p>

      <div className="upload-section">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
        />
        <input
          type="number"
          placeholder="Enter sequence number"
          value={sequenceNumber}
          onChange={handleSequenceChange}
        />
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Video'}
      </button>
    </div>
  );
};

export default VideoUpload;