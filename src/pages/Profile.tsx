// src/pages/Profile.tsx
import React from "react";
import Header from "@/components/Header";
import CVProfile from "@/components/CVProfile";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      <main>
        <CVProfile />
      </main>
    </div>
  );
};

export default Profile;