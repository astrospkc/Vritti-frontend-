"use client"

import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const router = useRouter();
    const { setIsAuthenticated } = useContext(UserContext);
    // default user
    const [user, setUser] = useState({
        name: "laya",
        email: "laya@gmail.com",
        password: "laya",
    });

    // loader
    // const [loading, setLoading] = useState(false);

    const sign_in = async () => {
        try {
            // setLoading(true);
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/createuser`,
                {
                    name: user.name,
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
            console.log("signed up user data:  ", data);
            setUser(data);

            if (data.authtoken) {
                localStorage.setItem("token", data.authtoken);
                setIsAuthenticated(true);
                setTimeout(() => {
                    router.push("/dashboard");
                }, 3000);
            } else {
                alert("fill up all the spaces");
            }
        } catch (error) {

            console.error("error: ", error);
        } finally {
            // setLoading(false);
        }
    };

    // handle user input
    const handleSignIn = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // if (loading) {
    //   return (
    //     <div className="flex justify-center items-center h-screen bg-slate-700">
    //       <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-300"></div>
    //     </div>
    //   );
    // }

    return (
        <>
            <div className="flex flex-col justify-center items-center m-auto w-full h-full p-4 font-serif  ">
                <span
                    className="text-orange-500 text-8xl font-extrabold knewave-regular"
                >
                    VRiTTi
                </span>
                <span className="font-bold  rounded-xl  marck-script-regular text-6xl my-4 text-orange-900">
                    Signin
                </span>
                <form
                    action="submit"
                    className=" p-10 rounded-xl shadow-lg shadow-stone-400 bg-gray-500/30"

                >
                    <div className="flex flex-col gap-10 text-black">
                        <div className="flex flex-col ">
                            <label htmlFor="Username" className="font-semibold text-xl">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={user.name}
                                onChange={handleSignIn}
                                placeholder="xyz"
                                className="p-4 rounded-3xl bg-transparent "
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-semibold text-xl">
                                Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={user.email}
                                onChange={handleSignIn}
                                placeholder="em@gmail.com"
                                className="p-4 rounded-3xl text-violet-950"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="font-semibold text-xl">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleSignIn}
                                placeholder="****"
                                className="p-4 rounded-3xl text-violet-950"
                            />
                        </div>
                    </div>
                </form>
                <div
                    onClick={sign_in}
                    className="p-2 rounded-xl cursor-pointer  bg-orange-900 shadow-lg shadow-gray-900/70 my-2 text-white hover:bg-stone-500"
                >
                    Submit
                </div>
                <div className="flex flex-row my-2 gap-2 items-center">
                    <span
                        className="text-[#8dbcaa] font-bold  text-2xl"

                    >Already have an account</span>
                    <Link href="/auth/login">
                        <div className="p-2 rounded-xl bg-stone-400/40 shadow-lg shadow-gray-700 hover:bg-stone-200">
                            Login
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SignIn;
