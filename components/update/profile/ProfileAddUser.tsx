import { User } from "@/src/API";
import React from "react";

interface ProfileProops {
  user: User;
}

const Profile = ({ user }: ProfileProops) => {
  return (
    <div className="flex flex-row p-3 gap-3">
      <div className="rounded-full border flex p-3 bg-yellow-primary items-center justify-center w-12 h-12">
        <p className="font-bold text-lg">{`${user.first_name?.charAt(
          0
        )}${user.last_name?.charAt(0)}`}</p>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-text-primary font-bold">{`${user.first_name} ${user.last_name}`}</p>
        <p className="text-text-secondary">{user.role}</p>
      </div>
    </div>
  );
};

export default Profile;
