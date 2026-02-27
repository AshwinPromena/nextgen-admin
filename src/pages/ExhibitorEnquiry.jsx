import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Tag, Card, Typography, Space, Descriptions, Input } from 'antd';
import { Eye, Search } from 'lucide-react';
import { getExhibitorEnquiries } from '../services/mockApi';
import useDebounce from '../hooks/useDebounce';

const { Title } = Typography;

const ExhibitorEnquiry = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [searchText, setSearchText] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const debouncedSearchText = useDebounce(searchText, 500);

    const fetchData = useCallback(async (currentPagination, search) => {
        setLoading(true);
        try {
            const response = await getExhibitorEnquiries(
                currentPagination.current - 1,
                currentPagination.pageSize,
                search
            );

            if (response.statusCode === 200) {
                setData(response.data || []);
                setPagination(prev => ({
                    ...prev,
                    total: response.totalRecords || 0,
                    current: currentPagination.current,
                    pageSize: currentPagination.pageSize,
                }));
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(pagination, debouncedSearchText);
    }, [pagination.current, pagination.pageSize, debouncedSearchText, fetchData]);

    const handleTableChange = (newPagination) => {
        setPagination(prev => ({
            ...prev,
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        }));
    };

    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            className: 'font-medium',
        },
        {
            title: 'Contact Person',
            dataIndex: 'contactPerson',
            key: 'contactPerson',
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
        <div className="space-y-4 px-3 py-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Title level={3} className="m-0">Exhibitor & Sponsor Enquiries</Title>
                <Input
                    placeholder="Search by company name, contact, email, phone..."
                    prefix={<Search size={18} className="text-gray-400" />}
                    className="max-w-md h-11 rounded-xl shadow-sm border-gray-100"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setPagination(prev => ({ ...prev, current: 1 }));
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
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} records`,
                    }}
                    onChange={handleTableChange}
                    scroll={{ x: 800 }}
                />
            </Card>

            <Modal
                title={<Title level={4} className="m-0">Enquiry Details</Title>}
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
                            <Descriptions.Item label="Company Name" span={2} className="font-semibold">{selectedRecord.companyName}</Descriptions.Item>
                            <Descriptions.Item label="Contact Person">{selectedRecord.contactPerson}</Descriptions.Item>
                            <Descriptions.Item label="Designation">{selectedRecord.designation || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Email" span={2}>{selectedRecord.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{selectedRecord.phone}</Descriptions.Item>
                            <Descriptions.Item label="Industry Category">{selectedRecord.industryCategory || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Booth Size">{selectedRecord.boothSizeRequired || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Sponsorship">{selectedRecord.sponsorshipInterest || 'N/A'}</Descriptions.Item>
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

export default ExhibitorEnquiry;
