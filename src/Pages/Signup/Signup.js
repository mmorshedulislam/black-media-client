import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Signup = () => {
  const { createUser, upgradeProfile } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;

    const userImg = data.image[0];
    console.log(userImg);

    const formData = new FormData();
    formData.append("image", userImg);

    const url = `https://api.imgbb.com/1/upload?key=b244a88f9f8d1ed1e003856b185c6459`;

    setProcessing(true);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);
        if (imgData.success) {
          const imgUrl = imgData.data.url;
          // Create User
          createUser(email, password)
            .then((result) => {
              const user = result.user;
              // UPDATE PROFILE
              handleUpgradeProfile(name, imgUrl);
              // SAVE TO DATABASE
              saveToDB(name, email, imgUrl);
              console.log(user);
              reset();
              setProcessing(false);
            })
            .catch((err) => {
              console.log(err);
              setProcessing(false);
              toast.error(err.code);
            });
        }
      })
      .catch((err) => {
        console.log("Img Error", err);
        setProcessing(false);
      });
  };

  const handleUpgradeProfile = (name, imgUrl) => {
    upgradeProfile(name, imgUrl)
      .then(() => {})
      .catch((err) => {
        console.log("update error", err);
      });
  };

  const saveToDB = (userName, userEmail, userImg) => {
    const institute = "Govt. City College, Chittagong.";
    const address = "Chittagong, Bangladesh.";
    const userInfo = { userName, userEmail, userImg, institute, address };
    fetch(`${process.env.REACT_APP_PORT}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("User Successfully Register.");
        navigate("/");
      })
      .catch((err) => {
        console.log("DB Error", err);
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10">
      <div
        className="hidden lg:block"
        style={{
          background: `url('https://i.ibb.co/HdP57tH/bg.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      ></div>
      <div className="p-10">
        <div className="flex justify-between items-center">
          <Link to={"/"} className="text-2xl">
            <FaHome />
          </Link>
          <div className="flex gap-x-2 justify-end">
            <Link
              to={"/login"}
              className="px-6 py-3 rounded-3xl font-semibold bg-[#343A40] text-white"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="px-6 py-3 rounded-3xl font-semibold bg-[#343A40] text-white"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="lg:w-2/3 mx-auto">
          <h2 className="font-bold text-3xl lg:text-5xl my-5">
            Create <br /> Your Account
          </h2>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="relative my-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUserAlt />
              </div>
              <input
                type="text"
                id=""
                {...register("name")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div className="relative my-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BsFillEnvelopeFill />
              </div>
              <input
                type="email"
                id=""
                {...register("email", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Email"
              />
            </div>
            <div className="relative my-3">
              <input
                className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="small_size"
                type="file"
                {...register("image", { required: true })}
              />
            </div>
            <div className="relative my-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <AiFillLock />
              </div>
              <input
                type="password"
                id=""
                {...register("password", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
              />
            </div>
            <div className="relative my-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <AiFillLock />
              </div>
              <input
                type="password"
                id=""
                {...register("confirmPassword")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Confirm Password"
              />
            </div>
            <div
              className={`w-full bg-[#343A40] p-3 rounded-md text-white text-center cursor-pointer ${
                processing && "bg-gray-900"
              }`}
            >
              <input
                type="submit"
                value="Register"
                className="cursor-pointer uppercase"
                disabled={processing}
              />
            </div>
          </form>
          <p className="my-3 text-gray-500">
            Already have account?{" "}
            <Link to={"/login"} className="text-blue-500">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
