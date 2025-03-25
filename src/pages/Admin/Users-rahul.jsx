import { useEffect, useState } from 'react';
import { useAuth } from '../../store/Auth';

const Users = () => {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const { AuthorizationToken } = useAuth(); // Destructure AuthorizationToken from useAuth

  const getAllUsersData = async () => {
    try {
      const response = await fetch('https://f1-server-1.onrender.com/api/v1/admin/users', {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken, // No extra space, token should be prefixed properly
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("users", data);
      setUsers(data); // Set users state with fetched data

    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []); // Depend on AuthorizationToken

  return (
    <div className="container">
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td><img src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" alt="User Avatar" className="user-avatar" />{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default Users;
