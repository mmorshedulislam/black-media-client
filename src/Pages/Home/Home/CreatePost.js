import React from "react";
import { FiVideo } from "react-icons/fi";
import { BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { HiPhoto } from "react-icons/hi2";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCreatePost = (data) => {
    if (!user) {
      toast.error("Please Login then Post.");
      return navigate("/login");
    }
    const postText = data.postText;
    const authorName = user?.displayName;
    const authorEmail = user?.email;
    const authorImage = user?.photoURL;
    const date = new Date();
    const postDate = format(date, "PPPP");
    const postMS = new Date().getMilliseconds();
    const postImage = data.image[0];

    const formData = new FormData();
    formData.append("image", postImage);

    const url = `https://api.imgbb.com/1/upload?key=b244a88f9f8d1ed1e003856b185c6459`;

    setProcessing(true);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const postImgUrl = imgData.data.url;

          const postData = {
            postText,
            postImgUrl,
            authorName,
            authorEmail,
            authorImage,
            postDate,
            postMS,
            likes: 0,
            loves: 0,
            ratings: 0,
          };
          fetch(`${process.env.REACT_APP_PORT}/posts`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(postData),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              toast.success("Post Uploaded.");
              reset();
              setProcessing(false);
              navigate("/media");
            })
            .catch((err) => {
              console.log(err);
              setProcessing(false);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setProcessing(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreatePost)}
      className="my-2 bg-white border rounded-lg p-3"
    >
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
          className="w-full h-28 rounded-md border-gray-300"
          {...register("postText", { required: true })}
        ></textarea>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-5 lg:gap-x-5 my-3 ml-14">
          <div className="flex gap-x-1 items-center justify-center cursor-pointer">
            <FiVideo className="text-2xl" />
            <span className="text-sm hidden md:block">Live Video</span>
          </div>
          <div>
            <label
              htmlFor="post-img"
              className="flex gap-x-1 items-center justify-center cursor-pointer"
            >
              <HiPhoto className="text-2xl" />
              <span className="hidden md:block text-sm">Photos</span>
            </label>
            <input
              type="file"
              name="image"
              id="post-img"
              className="hidden"
              {...register("image", { required: true })}
            />
          </div>
          <div className="flex gap-x-1 items-center justify-center cursor-pointer">
            <BsEmojiSmile className="text-2xl" />
            <span className="text-sm hidden md:block">Feeling/Activity</span>
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
          className={`bg-gray-600 w-full rounded-md text-white p-1 cursor-pointer text-md ${
            processing && "bg-gray-900"
          }`}
          disabled={processing}
        />
      </div>
    </form>
  );
};

export default CreatePost;
