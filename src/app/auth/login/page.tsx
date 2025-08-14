"use client"
import { useContext, useState } from "react";
import { useRouter } from 'next/navigation';

import axios from "axios";

import { UserContext } from "../../../context/UserContext";
import Link from "next/link";

const Login = () => {
    const router = useRouter();

    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
    // the default email and password
    const [user, setUser] = useState({
        email: "maya@gmail.com",
        password: "maya",
    });

    // loader
    const [loading, setLoading] = useState(false);

    // aigning in to the journal
    const login = async () => {
        setLoading(true);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
                {
                    email: user.email,
                    password: user.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = res.data;
            // console.log("user signin data: ", data);
            // console.log("authtoken generated when signed in : ", data.authtoken);
            setUser(data);
            setLoading(false);
            if (data.authtoken) {
                setIsAuthenticated(true);
                localStorage.setItem("token", data.authtoken);

                router.push("/");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    // now handling the user input of email and password
    const handleChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    console.log("isAuthenticated: ", isAuthenticated);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen w-full bg-transparent">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-300"></div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center m-auto w-full h-full p-4 ">
                <div className=" ">
                    {/* {loading ? <div>....loading</div> : <div></div>} */}

                    <div className="flex flex-col justify-center items-center">
                        <span
                            className="text-orange-500 text-8xl font-extrabold knewave-regular"
                        // style={{ backgroundImage: 'url("/images/forest.jpg")' }}
                        >
                            VRiTTi
                        </span>
                        <span className="font-bold  rounded-xl  marck-script-regular text-6xl my-4 text-orange-900">
                            Login
                        </span>
                        <form
                            action="submit"
                            className=" p-10 rounded-xl shadow-lg shadow-stone-400 bg-gray-500/30"
                        >
                            <div className="flex flex-col gap-10 text-black">
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="font-bold">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        placeholder="em@gmail.com"
                                        className="p-4 rounded-2xl  h-auto bg-transparent"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="password" className="font-semibold t">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        placeholder="****"
                                        className="p-4 rounded-3xl bg-transparent "
                                    />
                                </div>
                            </div>
                        </form>
                        <div
                            onClick={login}
                            className="p-2 rounded-xl cursor-pointer  bg-orange-900 shadow-lg shadow-gray-900/70 my-2 text-white hover:bg-stone-500"
                        >
                            Submit
                        </div>

                        <div className="flex flex-row my-2 gap-2 items-center">
                            <span
                                className="text-[#8dbcaa] font-bold  text-2xl"
                            >
                                Dont have an account?
                            </span>
                            <Link href="/auth/signin">
                                <div className="p-2 rounded-xl bg-stone-400/40 shadow-lg shadow-gray-700 hover:bg-stone-200">
                                    SignIn
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
