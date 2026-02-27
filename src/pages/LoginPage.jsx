import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { User, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { realLogin } from '../services/mockApi';
import { useNavigate, Navigate } from 'react-router-dom';

const { Title, Text } = Typography;

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const { login, token } = useAuth();
    const navigate = useNavigate();

    if (token) {
        return <Navigate to="/delegates" replace />;
    }

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Updated to use realLogin with userName and password
            const response = await realLogin(values.userName, values.password);
            if (response.success) {
                login(response.user, response.token);
                message.success('Login successful!');
                navigate('/delegates');
            }
        } catch (error) {
            message.error(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md shadow-xl border-none p-4 rounded-3xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-2 mb-6">
                        <img
                            src="/app-logo.jpeg"
                            alt="Nexgen Logo"
                            className="h-16 w-auto object-contain rounded-xl"
                        />
                    </div>
                    <Title level={2} className="m-0 font-bold tracking-tight">Welcome Back</Title>
                </div>

                <Form
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    requiredMark={false}
                >
                    <Form.Item
                        label="Username"
                        name="userName"
                        rules={[
                            { required: true, message: 'Please input your username!' }
                        ]}
                    >
                        <Input
                            prefix={<User size={18} className="text-gray-400 mr-2" />}
                            placeholder="Enter username"
                            size="large"
                            className="h-12 rounded-xl border-gray-100"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<Lock size={18} className="text-gray-400 mr-2" />}
                            placeholder="Enter password"
                            size="large"
                            className="h-12 rounded-xl border-gray-100"
                        />
                    </Form.Item>

                    <Form.Item className="mb-0">
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={loading}
                            className="h-12 font-semibold mt-4 rounded-xl shadow-lg shadow-blue-200"
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginPage;
