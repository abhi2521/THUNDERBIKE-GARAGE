import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input, Button, Space, Popconfirm, ConfigProvider } from 'antd';
import 'antd/dist/reset.css';

export default function User() {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 10;

  const isEditing = (record) => record.key === editingKey;

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/forms');
      const formatted = res.data.data.map(item => ({ ...item, key: item._id }));
      setData(formatted);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const edit = (record) => {
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (record, updatedRow) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/forms/${record._id}`,
        updatedRow
      );
      const newData = data.map(item =>
        item._id === record._id ? { ...res.data.updated, key: record.key } : item
      );
      setData(newData);
      setEditingKey('');
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/${key}`);
      fetchData();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const columns = [
    ...['firstName','lastName','email','phone','degree','city','pincode','date','message'].map(col => ({
      title: <span style={{ color: 'white' }}>{col.charAt(0).toUpperCase() + col.slice(1)}</span>,
      dataIndex: col,
      key: col,
      editable: true,
      render: col === 'date'
        ? (text) => <span style={{ color: 'white' }}>{text ? new Date(text).toLocaleDateString() : ''}</span>
        : (text) => <span style={{ color: 'white' }}>{text}</span>
    })),
    {
      title: <span style={{ color: 'white' }}>Actions</span>,
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button type="primary" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => save(record, record)}>Save</Button>
            <Button danger onClick={cancel}>Cancel</Button>
          </Space>
        ) : (
          <Space>
            <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => edit(record)}>Edit</Button>
            <Popconfirm 
              title="Delete?" 
              onConfirm={() => handleDelete(record.key)}
              overlayStyle={{ color: 'black' }} // Ensures popconfirm text is visible
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'pincode' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell = ({
    editing, dataIndex, title, inputType, record, children, ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <Input style={{ color: 'white' }} /> : <Input style={{ color: 'white' }} />;
    return (
      <td {...restProps} style={{ 
        backgroundColor: 'transparent', 
        color: 'white',
        borderColor: 'white' // Darker border for better visibility
      }}>
        {editing ? (
          <div style={{ color: 'white' }}>
            {inputNode}
          </div>
        ) : (
          <div style={{ color: 'white' }}>
            {children}
          </div>
        )}
      </td>
    );
  };

  return (
   <ConfigProvider
  theme={{
    components: {
      Table: {
        colorBgContainer: 'transparent',
        colorText: 'white',
        borderColor: 'white',
        headerBg: 'transparent',
        headerColor: 'white',
        headerSplitColor: '#303030',
        rowHoverBg: 'rgba(255, 255, 255, 0.1)',
      },
    },
  }}
>
  {/* Responsive Wrapper with Tailwind */}
  <div className="bg-[#10182B] w-full overflow-x-auto md:overflow-x-visible">
    <div className="min-w-[700px] md:min-w-0">
      <Table
        components={{
          body: {
            cell: EditableCell,
            row: (props) => (
              <tr
                {...props}
                style={{ backgroundColor: 'transparent' }}
              />
            ),
          },
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  borderColor: 'white',
                }}
              />
            ),
          },
        }}
        dataSource={data}
        columns={mergedColumns}
        loading={loading}
        scroll={{ x: 'max-content' }} // key for mobile scroll
        pagination={{
          pageSize: rowsPerPage,
          itemRender: (_, type, originalElement) => {
            if (type === 'prev' || type === 'next') {
              return <Button style={{ color: 'white' }}>{originalElement}</Button>;
            }
            return originalElement;
          },
        }}
        bordered
      />
    </div>
  </div>
</ConfigProvider>
  );
}