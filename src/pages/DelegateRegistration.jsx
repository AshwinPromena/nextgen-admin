import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Tag, Card, Typography, Space, Descriptions, Input } from 'antd';
import { Eye, Search } from 'lucide-react';
import { getDelegateRegistrations } from '../services/mockApi';
import useDebounce from '../hooks/useDebounce';

const { Title } = Typography;

const DelegateRegistration = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const [searchText, setSearchText] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const debouncedSearchText = useDebounce(searchText, 500);

    useEffect(() => {
        fetchData();
    }, [pagination.current, pagination.pageSize, debouncedSearchText]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getDelegateRegistrations(
                pagination.current - 1,
                pagination.pageSize,
                debouncedSearchText
            );
            if (response.statusCode === 200) {
                setData(response.data || []);
                setTotalRecords(response.totalRecords || 0);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (newPagination) => {
        setPagination(newPagination);
    };

    // Columns matched to starred fields in image: Full Name, Company, Phone, Email
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            className: 'font-medium',
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <Button
                    type="primary"
                    icon={<Eye size={16} />}
                    className="flex items-center"
                    onClick={() => {
                        setSelectedRecord(record);
                        setModalVisible(true);
                    }}
                >
                    View
                </Button>
            ),
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Title level={3} className="m-0">Delegate Registrations</Title>
                <Input
                    placeholder="Search by company, name, email, phone..."
                    prefix={<Search size={18} className="text-gray-400" />}
                    className="max-w-md h-11 rounded-xl shadow-sm border-gray-100"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setPagination({ ...pagination, current: 1 });
                    }}
                    allowClear
                />
            </div>

            <Card className="shadow-sm border-none overflow-hidden rounded-2xl">
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    rowKey="id"
                    pagination={{
                        ...pagination,
                        total: totalRecords,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} records`,
                    }}
                    onChange={handleTableChange}
                    scroll={{ x: 800 }} // Ensure horizontal scroll on mobile
                />
            </Card>

            <Modal
                title={<Title level={4} className="m-0">Delegate Details</Title>}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="close" type="primary" onClick={() => setModalVisible(false)} className="rounded-lg h-10 px-6">
                        Close
                    </Button>
                ]}
                width={700}
                centered
            >
                {selectedRecord && (
                    <div className="py-4">
                        <Descriptions bordered column={2} className="bg-gray-50/30 rounded-xl overflow-hidden">
                            <Descriptions.Item label="Full Name" span={2} className="font-semibold">{selectedRecord.fullName}</Descriptions.Item>
                            <Descriptions.Item label="Email">{selectedRecord.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{selectedRecord.phone}</Descriptions.Item>
                            <Descriptions.Item label="Company" span={2}>{selectedRecord.company}</Descriptions.Item>
                            <Descriptions.Item label="Designation">{selectedRecord.designation || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Industry">{selectedRecord.industry || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="City">{selectedRecord.city || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Areas of Interest" span={2}>
                                {selectedRecord.areasOfInterest ? (
                                    Array.isArray(selectedRecord.areasOfInterest) ?
                                        selectedRecord.areasOfInterest.map(area => <Tag key={area} color="blue">{area}</Tag>) :
                                        <Tag color="blue">{selectedRecord.areasOfInterest}</Tag>
                                ) : 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Message" span={2}>
                                <div className="whitespace-pre-wrap text-gray-600">{selectedRecord.message || 'No message provided.'}</div>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DelegateRegistration;
