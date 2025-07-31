import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditBike() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState({ title: '', description: '', image: '' });
  const [file, setFile] = useState(null);
  const [popup, setPopup] = useState('');

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/bikes/${id}`);
        setBike(res.data);
      } catch (error) {
        setPopup('Failed to fetch bike');
      }
    };

    fetchBike();
  }, [id]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', bike.title);
    formData.append('description', bike.description);
    if (file) formData.append('image', file);

    try {
      await axios.put(`http://localhost:8000/api/bikes/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPopup('✅ Updated successfully!');
      setTimeout(() => {
        setPopup('');
        navigate('/');
      }, 2000);
    } catch (err) {
      setPopup('❌ Update failed');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {popup && (
        <div className="bg-yellow-200 text-black p-2 rounded mb-4 text-center">{popup}</div>
      )}
      <input
        className="w-full border p-2 mb-2"
        placeholder="Title"
        value={bike.title}
        onChange={(e) => setBike({ ...bike, title: e.target.value })}
      />
      <textarea
        className="w-full border p-2 mb-2"
        placeholder="Description"
        value={bike.description}
        onChange={(e) => setBike({ ...bike, description: e.target.value })}
      > </textarea>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
      <button
        onClick={handleUpdate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Update
      </button>
    </div>
  );
}

export default EditBike;
