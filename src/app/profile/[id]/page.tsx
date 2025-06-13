"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppData, User, user_service } from "@/context/AppContext";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "@/components/loading";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";

const UserProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  const { id } = useParams();

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${user_service}/api/v1/user/${id}`);
      setUser(data as User);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (!user) {
    return <Loading />;
  }
  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4">
  <Card className="w-full max-w-xl shadow-lg border rounded-2xl p-6 mx-auto">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl font-semibold">Profile</CardTitle>
    </CardHeader>

    <CardContent className="flex flex-col items-center space-y-4">
      <Avatar className="w-28 h-28 border-4 border-gray-200 shadow-md cursor-pointer">
        <AvatarImage src={user?.image} alt="profile pic" />
      </Avatar>

      <div className="w-full space-y-2 text-center">
        <label className="font-medium">Name</label>
        <p>{user?.name}</p>
      </div>

      {user?.bio && (
        <div className="w-full space-y-2 text-center">
          <label className="font-medium">Bio</label>
          <p>{user.bio}</p>
        </div>
      )}

      <div className="flex gap-4 mt-3">
        {user?.instagram && (
          <a href={user.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram className="text-pink-500 text-2xl" />
          </a>
        )}
        {user?.facebook && (
          <a href={user.facebook} target="_blank" rel="noopener noreferrer">
            <Facebook className="text-blue-500 text-2xl" />
          </a>
        )}
        {user?.linkedin && (
          <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="text-blue-700 text-2xl" />
          </a>
        )}
      </div>
    </CardContent>
  </Card>
</div>
  );
};

export default UserProfilePage;