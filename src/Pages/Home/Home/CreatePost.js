import React from "react";
import { FiVideo } from "react-icons/fi";
import { BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { HiPhoto } from "react-icons/hi2";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  return (
    <form className="my-2 bg-white border rounded-lg p-3">
      <div className="flex gap-x-2">
        <img
          className="w-12 h-12 rounded-full"
          src={
            user?.photoURL
              ? user?.photoURL
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt=""
        />
        <textarea
          name="post"
          id=""
          placeholder="What's are you Think Now?"
          className="w-full h-24 rounded-md border border-gray-300"
        ></textarea>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 my-3 ml-14">
          <div className="flex gap-x-1 items-center justify-center cursor-pointer">
            <FiVideo className="text-2xl" />
            <span>Live Video</span>
          </div>
          <div>
            <label
              htmlFor="post-img"
              className="flex gap-x-1 items-center justify-center cursor-pointer"
            >
              <HiPhoto className="text-2xl" />
              <span>Photos</span>
            </label>
            <input type="file" name="" id="post-img" className="hidden" />
          </div>
          <div className="flex gap-x-1 items-center justify-center cursor-pointer">
            <BsEmojiSmile className="text-2xl" />
            <span>Feeling/Activity</span>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-200 rounded-full w-8 h-8">
          <BsThreeDots className="text-xl cursor-pointer" />
        </div>
      </div>
      <div className="mt-3">
        <input
          type="submit"
          value="POST"
          className="bg-gray-600 w-full rounded-md text-white p-1 cursor-pointer text-xl"
        />
      </div>
    </form>
  );
};

export default CreatePost;
