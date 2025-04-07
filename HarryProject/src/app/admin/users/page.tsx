// app/admin/users/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../api/adminServices';
import { User } from '../../../types';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error('Failed to load users', error);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
                setUsers(prev => prev.filter(user => user._id !== id));
            } catch (error) {
                console.error("Failed to delete user", error);
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8">Loading users...</div>;
    }


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Users</h1>

            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Email</th>
                            <th className="py-2 px-4 text-left">Mobile</th>
                            <th className="py-2 px-4 text-left">Joined</th>
                            <th className="py-2 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-t">
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">{user.mobile}</td>
                                <td className="py-2 px-4">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}