import React from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../Components/Hooks/UseAuth";
import { UseAxiosSecure } from "../Components/Hooks/UseAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, signup, updateuser } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const signinwithgoogle = () => {
    loginWithGoogle()
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          axiosSecure
            .post("/new-user", {
              email: user?.email,
              name: user?.displayName,
              photoUrl: user?.photoURL,
              role: "user",
              gender: "Is not Specified",
              phone: "Is not Specified",
              address: "Is not Specified",
            })
            .then((res) => {
              toast.success("Registration Successful");
              navigate("/");

              return "Registration Successful";
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const confirmPasswordCheck = (e) => {
    const password = e.target.value;
    const confirmPasswordInput = document.querySelector(
      'input[name="cpassword"]'
    );
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      confirmPasswordInput.setCustomValidity("Passwords do not match");
    } else {
      confirmPasswordInput.setCustomValidity("");
    }
  };

  const handlesignup = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const formdata = Object.fromEntries(data);

    signup(formdata.email, formdata.password)
      .then((res) => {
        const user = res.user;
        console.log(user);

        if (user) {
          return updateuser(formdata.name, formdata.photoUrl).then(() => {
            axiosSecure
              .post("/new-user", {
                email: user?.email,
                name: user?.displayName,
                photoUrl: user?.photoURL,
                role: "user",
                gender: formdata.gender,
                phone: formdata.number,
                address: formdata.address,
              })
              .then((res) => {
                toast.success("Registration Successful");
                navigate("/");
                return alert("REgistration succesful");
              })
              .catch((err) => {
                toast.error("registration fail");
                throw new Error(err);
              });
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
        <div className="text-center mb-16">
          <h1 className="text-gray-800 text-2xl  font-bold mt-6">
            Sign up into your account
          </h1>
        </div>

        <form onSubmit={handlesignup}>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <input
                name="name"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                PhotoUrl
              </label>
              <input
                name="photoUrl"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Email Id
              </label>
              <input
                name="email"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Mobile No.
              </label>
              <input
                name="number"
                type="number"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Confirm Password
              </label>
              <input
                name="cpassword"
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter confirm password"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Gender</label>
              <select
                name="gender"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Address
                </label>
                <textarea
                  name="address"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter address"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="md:flex items-center justify-center gap-4 mt-10">
            <button
              type="submit"
              className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md bg-secondary text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign up
            </button>
            <button
              onClick={() => {
                signinwithgoogle();
              }}
              className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md border-black border bg-blue-600 hover:bg-blue-700 focus:outline-none dark:text-white dark:border-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32px"
                className="inline"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#fbbd00"
                  d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                  data-original="#fbbd00"
                />
                <path
                  fill="#0f9d58"
                  d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                  data-original="#0f9d58"
                />
                <path
                  fill="#31aa52"
                  d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                  data-original="#31aa52"
                />
                <path
                  fill="#3c79e6"
                  d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                  data-original="#3c79e6"
                />
                <path
                  fill="#cf2d48"
                  d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                  data-original="#cf2d48"
                />
                <path
                  fill="#eb4132"
                  d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                  data-original="#eb4132"
                />
              </svg>
              Sign Up with Google
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
