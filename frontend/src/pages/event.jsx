import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ban1 from '../assets/eve.jpg';
import 'antd/dist/reset.css';
import { Form, Input, Button, Select, DatePicker, Dropdown, Modal, message, Upload, Image, Spin } from 'antd';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { UploadOutlined } from '@ant-design/icons';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.min.css';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

function Event() {
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [showPopup, setShowPopup] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [bikeToDelete, setBikeToDelete] = useState(null);
    const [editData, setEditData] = useState(null);
    const [bikes, setBikes] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [cropModalVisible, setCropModalVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cropperRef = useRef(null);
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetchBikes();
    }, []);

    const fetchBikes = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('http://localhost:5000/api/bikes');
            setBikes(res.data || []);
        } catch (err) {
            console.error('Fetch bikes error:', err);
            setError(err.response?.data?.message || err.message);
            message.error('Failed to load bikes');
        } finally {
            setLoading(false);
        }
    };

    const handleFinish = async (values) => {
        try {
            const payload = {
                ...values,
                date: values.date?.format('YYYY-MM-DD')
            };
            await axios.post('http://localhost:5000/api/forms', payload);
            message.success('Form submitted successfully!');
            form.resetFields();
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } catch (err) {
            message.error(err?.response?.data?.message || 'Something went wrong. Try again.');
        }
    };

    const handleMenuClick = ({ key }, id) => {
        const selectedBike = bikes.find(bike => bike._id === id);

        if (!selectedBike) {
            message.error("Bike not found");
            return;
        }

        if (key === 'edit') {
            setEditData(selectedBike);
            editForm.setFieldsValue({
                title: selectedBike.title,
                description: selectedBike.description
            });
            setEditModalVisible(true);
        } else if (key === 'delete') {
            setBikeToDelete(selectedBike);
            setDeleteModalVisible(true);
        }
    };

    const handleDelete = async () => {
        if (!bikeToDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/bikes/${bikeToDelete._id}`);
            message.success('Bike deleted successfully');
            setBikes(prev => prev.filter(bike => bike._id !== bikeToDelete._id));
        } catch (err) {
            console.error('Delete error:', err);
            message.error('Failed to delete bike: ' + (err.response?.data?.message || err.message));
        } finally {
            setDeleteModalVisible(false);
            setBikeToDelete(null);
        }
    };

    const onCrop = () => {
        if (typeof cropperRef.current?.cropper !== 'undefined') {
            setCroppedImage(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        }
    };

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            setCropModalVisible(true);
        };
        reader.readAsDataURL(file);
        return false;
    };

    const handleUpload = async () => {
        if (!croppedImage) {
            message.error('Please crop the image first');
            return null;
        }

        setUploading(true);
        try {
            const response = await fetch(croppedImage);
            const blob = await response.blob();

            const formData = new FormData();
            formData.append('image', blob, `bike-${Date.now()}.png`);

            const res = await axios.post('http://localhost:5000/api/bikes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return res.data.imagePath;
        } catch (error) {
            console.error('Upload error:', error);
            message.error('Image upload failed: ' + (error.response?.data?.message || error.message));
            return null;
        } finally {
            setUploading(false);
        }
    };

    const onFinishEdit = async (values) => {
        try {
            let imagePath = editData.image;

            if (croppedImage) {
                const uploadedPath = await handleUpload();
                if (!uploadedPath) return;
                imagePath = uploadedPath;
            }

            const response = await axios.put(
                `http://localhost:5000/api/bikes/${editData._id}`,
                { ...values, image: imagePath }
            );

            message.success("Bike updated successfully!");
            setEditModalVisible(false);
            setEditData(null);
            setCroppedImage(null);
            fetchBikes();
        } catch (err) {
            console.error('Update error:', err);
            message.error("Failed to update bike: " + (err.response?.data?.message || err.message));
        }
    };

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    const uploadProps = {
        beforeUpload: handleImageUpload,
        showUploadList: false,
        accept: 'image/*',
        maxCount: 1
    };

    const getMenu = (id) => ({
        items: [
            { key: 'edit', label: 'Edit' },
            { key: 'delete', label: 'Delete', danger: true }
        ],
        onClick: (info) => handleMenuClick(info, id)
    });

    const toggleWishlist = (bikeId, e) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlist((prevWishlist) =>
            prevWishlist.includes(bikeId)
                ? prevWishlist.filter((id) => id !== bikeId)
                : [...prevWishlist, bikeId]
        );
    };

    const navigateToWishlist = () => {
        navigate('/wishlist', {
            state: {
                wishlist,
                bikes
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 text-red-500">
                <h2>Error loading bikes</h2>
                <p>{error}</p>
                <Button onClick={fetchBikes} className="mt-4">
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#131B2E]">
            {/* Banner Section */}
            <section>
                <div className="w-full h-[120px] xs:h-[150px] sm:h-[180px] md:h-[220px] lg:h-[280px] xl:h-[350px] overflow-hidden">
                    <img
                        src={ban1}
                        alt="banner"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </section>

            {/* Hero Section */}
            <section className="bg-[#131B2E] py-6 xs:py-8 sm:py-10 px-4 xs:px-5 sm:px-6 md:px-10 lg:px-20">
                <div className="flex justify-between items-center mb-4 w-full relative">
                    <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-white font-bold leading-tight text-center mx-auto">
                        Delivering bike solutions that power every journey forward.
                    </h1>

                    <div className="absolute right-0">
                        <Button
                            type="primary"
                            onClick={navigateToWishlist}
                            className="bg-[#FC0919] text-white"
                            icon={<HeartFilled />}
                        >
                            Wishlist ({wishlist.length})
                        </Button>
                    </div>
                </div>
                <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
                    Thunderbike Garage is a trusted name in custom bike engineering, performance upgrades, electric conversions, and restoration services.
                </p>
            </section>

            {/* Bike Grid Section */}
            <section className="bg-[#131B2E] py-4 xs:py-6 sm:py-8 px-3 xs:px-4 sm:px-5 md:px-10 lg:px-20">
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
                    {bikes.slice(0, visibleCount).map((item) => (
                        <div key={item._id} className="relative bg-white shadow-md hover:shadow-lg rounded-md overflow-hidden hover:scale-[1.02] transition-all duration-200">
                            <Link to={`/bike/${item._id}`}>
                                <img
                                    src={`http://localhost:5000/uploads/${item.image}`}
                                    alt={item.title}
                                    className="w-full h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                                    }}
                                />
                                <div className="p-2 xs:p-3 sm:p-4">
                                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold mb-1 xs:mb-2">{item.title}</h3>
                                    <p className="text-xs xs:text-sm text-gray-600 font-medium">{item.description.slice(0, 120)}...</p>
                                </div>
                            </Link>

                            {/* Wishlist Icon */}
                            <div className="absolute top-1 left-1 xs:top-2 xs:left-2 z-10">
                                <Button
                                    type="text"
                                    size="Medium"
                                    className="hover:scale-125 transition-transform duration-150"
                                    onClick={(e) => toggleWishlist(item._id, e)}
                                    icon={
                                        wishlist.includes(item._id) ? (
                                            <HeartFilled style={{ color: 'red', fontSize: '16px' }} />
                                        ) : (
                                            <HeartOutlined style={{ color: '#999', fontSize: '16px' }} />
                                        )
                                    }
                                />
                            </div>

                            {/* Menu Icon */}
                            <div className="absolute top-1 right-1 xs:top-2 xs:right-2 z-10">
                                <Dropdown menu={getMenu(item._id)} trigger={['click']}>
                                    <Button
                                        size="Medium"
                                        className="!p-1 xs:!p-2"
                                        icon={<BiDotsVerticalRounded className="text-xs xs:text-sm" />}
                                        aria-label="More options"
                                    />
                                </Dropdown>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Show More/Less Section */}
            {bikes.length > 0 && (
                <div className="text-center bg-[#131B2E] text-[#FC0919] hover:text-white py-3 xs:py-4 sm:py-5 md:py-6">
                    {visibleCount < bikes.length ? (
                        <button
                            onClick={handleShowMore}
                            className="text-[#000000] underline text-xs xs:text-sm sm:text-base font-medium px-2 py-1"
                        >
                            Show More
                        </button>
                    ) : (
                        <button
                            onClick={() => setVisibleCount(6)}
                            className=" hover:text-white underline text-xs xs:text-sm sm:text-base font-medium px-2 py-1"
                        >
                            Show Less
                        </button>
                    )}
                </div>
            )}

            {/* Contact Form Section */}
            <section className="bg-[#131B2E] py-6 xs:py-8 sm:py-10 px-3 xs:px-4 sm:px-5 md:px-10 lg:px-20">
                <div className="w-full max-w-lg bg-[#C1D93C] font-bold p-3 xs:p-4 sm:p-5 md:p-6 rounded-md sm:rounded-lg shadow-md sm:shadow-lg text-left">
                    <h2 className="text-lg xs:text-xl sm:text-2xl text-center font-bold mb-3 xs:mb-4 sm:mb-5 md:mb-6">Contact Us</h2>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFinish}
                        className="grid grid-cols-1 gap-2 xs:gap-3 sm:gap-4"
                        requiredMark={false}
                    >
                        <div className="text-left">
                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                                <Form.Item
                                    name="firstName"
                                    label={<span className="text-xs xs:text-sm text-left">First Name</span>}
                                    rules={[{ required: true }]}
                                    className="text-left"
                                >
                                    <Input
                                        size="medium"
                                        className="text-xs xs:text-sm text-left"
                                        placeholder="First name"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="lastName"
                                    label={<span className="text-xs xs:text-sm text-left">Last Name</span>}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        size="Medium"
                                        className="text-xs xs:text-sm text-left"
                                        placeholder="Last name"
                                    />
                                </Form.Item>
                            </div>

                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                                <Form.Item
                                    name="email"
                                    label={<span className="text-xs xs:text-sm text-left">Email</span>}
                                    rules={[{ required: true, type: 'email' }]}
                                >
                                    <Input
                                        size="Medium"
                                        className="text-xs xs:text-sm text-left"
                                        placeholder="Your email"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label={<span className="text-xs xs:text-sm text-left">Phone</span>}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        size="medium"
                                        addonBefore={
                                            <Select
                                                defaultValue="+91"
                                                style={{ width: 70 }}
                                                styles={{
                                                    popup: {
                                                        root: {
                                                            backgroundColor: 'white',
                                                        },
                                                    },
                                                }}
                                            >
                                                <Option value="+91">+91</Option>
                                                <Option value="+1">+1</Option>
                                                <Option value="+44">+44</Option>
                                            </Select>
                                        }
                                        maxLength={10}
                                        className="text-xs xs:text-sm text-left"
                                        placeholder="10-digit number"
                                    />
                                </Form.Item>
                            </div>

                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                                <Form.Item
                                    name="degree"
                                    label={<span className="text-xs xs:text-sm text-left">Degree</span>}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        size="Medium"
                                        className="text-xs xs:text-sm text-left"
                                        placeholder="e.g. BCA, MCA"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="city"
                                    label={<span className="text-xs xs:text-sm text-left">City</span>}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        size="Medium"
                                        className="text-xs xs:text-sm text-left"
                                        placeholder="Your city"
                                    />
                                </Form.Item>
                            </div>

                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                                <Form.Item
                                    name="pincode"
                                    label={<span className="text-xs xs:text-sm text-left">Pincode</span>}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        size="Medium"
                                        className="text-xs xs:text-sm text-left"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="date"
                                    label={<span className="text-xs xs:text-sm text-left">Date</span>}
                                    rules={[{ required: true }]}
                                >
                                    <DatePicker
                                        size="Medium"
                                        className="w-full text-xs xs:text-sm text-left"
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item
                                name="message"
                                label={<span className="text-xs xs:text-sm text-left">Message</span>}
                                rules={[{ required: true }]}
                            >
                                <TextArea
                                    rows={4}
                                    size="Medium"
                                    className="text-xs xs:text-sm text-left"
                                    placeholder="Tell us what service you need..."
                                />
                            </Form.Item>

                            <div className="flex justify-center">
                                <Button
                                    type="default"
                                    htmlType="submit"
                                    size="middle"
                                    className="!bg-[#0C204A] !text-white !text-xs xs:!text-sm font-medium w-full xs:w-auto py-1 xs:py-1.5 sm:py-2 rounded-md hover:!bg-gray-800"
                                >
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
                {showPopup && (
                    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-bounce">
                        <h3 className="font-bold">Submitted Successfully!</h3>
                        <p>Your data has been saved.</p>
                    </div>
                )}
            </section>

            {/* Edit Bike Modal */}
            <Modal
                open={editModalVisible}
                title="Edit Bike"
                onCancel={() => {
                    setEditModalVisible(false);
                    setCroppedImage(null);
                }}
                onOk={() => editForm.submit()}
                okText="Save"
                width={800}
                confirmLoading={uploading}
                okButtonProps={{
                    disabled: uploading
                }}
            >
                <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={onFinishEdit}
                    requiredMark={false}
                >
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item label="Bike Image">
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Upload New Image</Button>
                        </Upload>
                        {croppedImage ? (
                            <div className="mt-4">
                                <Image
                                    src={croppedImage}
                                    alt="Cropped preview"
                                    width={200}
                                    className="mt-2 border rounded"
                                />
                            </div>
                        ) : editData?.image && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                                <Image
                                    src={`http://localhost:5000/uploads/${editData.image}`}
                                    alt="Current bike"
                                    width={200}
                                    className="mt-2 border rounded"
                                />
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>

            {/* Image Crop Modal */}
            <Modal
                open={cropModalVisible}
                title="Crop Image"
                onCancel={() => {
                    setCropModalVisible(false);
                    setImage(null);
                }}
                onOk={() => {
                    onCrop();
                    setCropModalVisible(false);
                }}
                okText="Crop Image"
                width={700}
            >
                <div style={{ height: '400px' }}>
                    <Cropper
                        ref={cropperRef}
                        src={image}
                        style={{ height: '100%', width: '100%' }}
                        aspectRatio={16 / 9}
                        guides={true}
                        crop={onCrop}
                    />
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                open={deleteModalVisible}
                title="Confirm Delete"
                onCancel={() => {
                    setDeleteModalVisible(false);
                    setBikeToDelete(null);
                }}
                onOk={handleDelete}
                okText="Delete"
                okButtonProps={{ danger: true }}
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this bike: <strong>{bikeToDelete?.title}</strong>?</p>
                <p>This action cannot be undone.</p>
            </Modal>
        </div>
    );
}

export default Event;