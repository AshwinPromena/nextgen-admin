import axiosInstance from '../utils/axiosInstance';

// Real API for Login
export const realLogin = async (userName, password) => {
    const response = await axiosInstance.post('https://development8.promena.in/api/User/Login', {
        userName,
        password
    });

    const { statusCode, message, data } = response.data;

    // The user requested to treat statusCode 200 or message "Success" as success
    // and generate a random token if data is null.
    if (statusCode === 200 || message === 'Success') {
        return {
            success: true,
            token: 'nexus-auth-' + Math.random().toString(36).substring(2) + Date.now().toString(36),
            user: { userName, name: 'Admin' }, // Basic user info since data is null
        };
    }

    throw new Error(message || 'Login failed');
};

// Real API for Delegate Registration
export const getDelegateRegistrations = async (pageIndex = 0, pageSize = 10, searchString = '') => {
    const response = await axiosInstance.post('https://development8.promena.in/api/User/GetAllDelegateRegister', {
        pageIndex,
        pageSize,
        searchString
    });
    return response.data;
};

// Real API for Exhibitor Enquiry
export const getExhibitorEnquiries = async (pageIndex = 0, pageSize = 10, searchString = '') => {
    const response = await axiosInstance.post('https://development8.promena.in/api/User/GetAllEnquiry', {
        pageIndex,
        pageSize,
        searchString
    });
    return response.data;
};
