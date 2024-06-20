import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function RegisterPage({url}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePict, setProfilePict] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/register`, {
        fullName,
        email,
        password,
        phoneNumber, 
        profilePict
      });
      navigate("/login");

      Toastify({
        text: "Success register",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center bg-gray-100">
        <div className="p-8 flex bg-white rounded-3xl">
          <div className="w-96">
            <img
              className="w-16 mb-5"
              src="https://pbs.twimg.com/profile_images/1440775265928417284/ywTBFW6L_400x400.png"
              alt=""
            />
            <h1 className="text-4xl m-0 font-normal">Create an Account</h1>
            <p className="mt-5">Enter your credentials</p>
          </div>
          <form onSubmit={handleSubmit} method="post">
            <div className="block w-96 mt-24">
              <label htmlFor="fullName"></label>
              <input
                className="mb-5 py-2 px-4 w-full border-2 rounded-lg"
                type="fullName"
                name=""
                id=""
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />

              <label htmlFor="phoneNumber"></label>
              <input
                className="mb-5 py-2 px-4 w-full border-2 rounded-lg"
                type="phoneNumber"
                name=""
                id=""
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <label htmlFor="image"></label>
              <input
                className="mb-5 py-2 px-4 w-full border-2 rounded-lg"
                type="text"
                name=""
                id=""
                placeholder="Input your image"
                onChange={(e) => setProfilePict(e.target.value)}
              />

              <label htmlFor="email"></label>
              <input
                className="mb-5 py-2 px-4 w-full border-2 rounded-lg"
                type="email"
                name=""
                id=""
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password"></label>
              <input
                className="mb-5 py-2 px-4 w-full border-2 rounded-lg"
                type="password"
                name=""
                id=""
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <p className="text-sm">
                Not your computer? Use Guest mode to sign in privately.
              </p>
              <button className="text-sm text-blue-600 hover:bg-blue-100">
                Learn more about using Guest mode
              </button>

              <div className="flex justify-end mt-5">
                <Link to="/login">
                  <button className="hover:bg-blue-100 mr-5 hover:rounded-3xl px-6 py-2">
                    Sign in
                  </button>
                </Link>
                <button className="text-white px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700">
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
