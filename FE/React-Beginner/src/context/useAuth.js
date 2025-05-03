import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if (token) {
            fetch('http://localhost:5000/users/api/v1/whoami', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Token không hợp lệ');
                    }
                    return response.json();
                })
                .then((data) => setUser(data.user_details))
                .catch(() => {
                    setToken(null);
                    localStorage.removeItem('token');
                });
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await fetch('http://localhost:5000/users/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Đăng nhập thất bại');
            }

            const data = await response.json();
            const { access_token } = data;
            setToken(access_token);
            localStorage.setItem('token', access_token);

            const userResponse = await fetch('http://localhost:5000/users/api/v1/whoami', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!userResponse.ok) {
                throw new Error('Không thể lấy thông tin người dùng');
            }

            const userData = await userResponse.json();
            setUser(userData.user_details);
        } catch (error) {
            throw new Error(error.message || 'Đăng nhập thất bại');
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await fetch('http://localhost:5000/users/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            throw new Error(error.message || 'Đăng ký thất bại');
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:5000/users/api/v1/logout', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Đăng xuất thất bại');
            }

            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Đăng xuất thất bại:', error);
        }
    };

    return { user, token, login, register, logout };
};