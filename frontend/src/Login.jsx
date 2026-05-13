import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {

    const [isRegister, setIsRegister] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const API_URL = "http://localhost:5000/api";

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            if (isRegister) {
                await axios.post(`${API_URL}/register`, {
                    username,
                    email,
                    password,
                });

                alert("Account Created Successfully");

                setIsRegister(false);
            }

            else {
                const response = await axios.post(`${API_URL}/login`, {
                    email,
                    password,
                });

                localStorage.setItem("token", response.data.token);

                localStorage.setItem("focustrack_auth", "true");

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );

                onLogin();
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] px-4">

            <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-8">

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">⏱️</span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        FocusTrack
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Track your productivity easily
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {isRegister && (
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Username
                            </label>

                            <input
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                className="input-box"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="input-box"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="input-box"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#4F6DB8] hover:bg-[#3e5ca8] text-white py-3 rounded-xl font-medium transition"
                    >
                        {loading
                            ? "Please wait..."
                            : isRegister
                                ? "Create Account"
                                : "Login"}
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-gray-500">
                    {isRegister
                        ? "Already have an account?"
                        : "Don't have an account?"}

                    <button
                        onClick={() =>
                            setIsRegister(!isRegister)
                        }
                        className="ml-2 text-blue-600 font-semibold"
                    >
                        {isRegister ? "Login" : "Register"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;