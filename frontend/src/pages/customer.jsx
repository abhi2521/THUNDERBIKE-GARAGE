import { useEffect, useState } from 'react';
import custo from "../assets/cus.png";
import axios from 'axios';
import Pagination from './pagenation.jsx';
// import Navbar from './navbar.jsx';
// import Footer from './footer.jsx';

function Customer() {
  
  const [sponsors, setSponsors] = useState([]);
  const [filteredSponsors, setFilteredSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sponsors');
        setSponsors(res.data.data);
        setFilteredSponsors(res.data.data);
      } catch (err) {
        console.error('❌ Error fetching sponsor data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const filterSponsors = (search, tier) => {
    const filtered = sponsors.filter((sponsor) => {
      const matchName = sponsor.firstName.toLowerCase().includes(search);
      const matchTier = tier === 'all' || sponsor.interest.toLowerCase() === tier;
      return matchName && matchTier;
    });
    setFilteredSponsors(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterSponsors(value, tierFilter);
    setCurrentPage(1);
  };

  const handleTierFilter = (e) => {
    const value = e.target.value;
    setTierFilter(value);
    filterSponsors(searchTerm, value);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentSponsors = filteredSponsors.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (index) => {
    const actualIndex = indexOfFirst + index;
    setEditIndex(actualIndex);
    setEditForm({ ...filteredSponsors[actualIndex] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSave = async () => {
    try {
      const id = editForm._id;
      const res = await axios.put(`http://localhost:5000/api/sponsors/${id}`, editForm);
      const updated = [...sponsors];
      updated[editIndex] = res.data.updated;
      setSponsors(updated);
      filterSponsors(searchTerm, tierFilter);
      setEditIndex(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (index) => {
    const actualIndex = indexOfFirst + index;
    const id = filteredSponsors[actualIndex]._id;
    try {
      await axios.delete(`http://localhost:5000/api/sponsors/${id}`);
      const updated = sponsors.filter((s) => s._id !== id);
      setSponsors(updated);
      filterSponsors(searchTerm, tierFilter);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
<div className='bg-[#1C2739]'>
      {/* Banner */}
      <section className="relative">
        <img src={custo} alt="banner" className="w-full h-auto" />
        <h1 className="absolute bottom-[346px] left-1/2 transform -translate-x-1/2 text-4xl text-black drop-shadow-md font-bold">
          CUSTOMER DETAILS
        </h1>
      </section>

      {/* Header */}
      <section className="mt-4 text-center">
        <h2 className="text-2xl font-semibold text-white">Submitted Sponsor Data</h2>
      </section>

      {/* Filters */}
      <section className="flex flex-wrap  text-white justify-center gap-4 mt-4 mb-6 px-4">
        <input
          type="text"
          placeholder="Search by first name..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 w-64 border  border-gray-300 rounded-md text-black"
        />
        <select
          value={tierFilter}
          onChange={handleTierFilter}
          className="p-2 border bg-transparrent border-gray-300 rounded-md"
        >
          <option value="all">All Tiers</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="bronze">Bronze</option>
        </select>
      </section>

      {/* Table */}
      <section className=" text-white px-4 pb-12">
        {loading ? (
          <p className="text-center italic  text-white">Loading sponsor data...</p>
        ) : currentSponsors.length === 0 ? (
          <p className="text-center italic  text-white">No matching data found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm text-left">
              <thead className="bg-[#1C2739] text-white">
                <tr>
                  <th className="p-2 border">First Name</th>
                  <th className="p-2 border">Last Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Company</th>
                  <th className="p-2 border">Interest</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSponsors.map((sponsor, index) => {
                  const actualIndex = indexOfFirst + index;
                  const isEditing = actualIndex === editIndex;
                  return (
                    <tr key={sponsor._id} >
                      {["firstName", "lastName", "email", "phone", "company", "interest", "message"].map((field) => (
                        <td key={field} className="p-2 border text-white">
                          {isEditing ? (
                            <input
                              type="text"
                              name={field}
                              value={editForm[field] || ''}
                              onChange={handleEditChange}
                              className="p-1 border text-white border-gray-300 rounded w-full"
                            />
                          ) : (
                            sponsor[field]
                          )}
                        </td>
                      ))}
                   <td className="p-2 border">
  <div className="flex gap-2">
    {isEditing ? (
      <button
        onClick={handleSave}
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
      >
        Save
      </button>
    ) : (
      <button
        onClick={() => handleEdit(index)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
      >
        Edit
      </button>
    )}
    <button
      onClick={() => handleDelete(index)}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  </div>
</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Pagination
              itemsPerPage={rowsPerPage}
              totalItems={filteredSponsors.length}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        )}
      </section>
</div>
      {/* <Footer /> */}
    </>
  );
}

export default Customer;
