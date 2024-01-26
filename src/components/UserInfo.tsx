import React from "react";

interface UserInfoProps {
  user: {
    name: string;
    email: string;
    address?: string;
    telephone?: string;
  };
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div>
      <h2>User Info:</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {user.telephone && (
        <p>
          <strong>Mobile number:</strong> {user.telephone}
        </p>
      )}
    </div>
  );
};

export { UserInfo };
