function Navbar({ onLogout }) {

  const userData = localStorage.getItem("user");

  const user = userData
    ? JSON.parse(userData)
    : null;

  return (
    <div className="bg-white px-6 py-4 flex items-center justify-between shadow-card">

      <div>

        <h1 className="text-2xl font-bold text-gray-800">
          FocusTrack
        </h1>

        <p className="text-sm text-gray-500">
          Productivity Dashboard
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="hidden md:block text-right">

          <p className="text-sm text-gray-500">
            Welcome
          </p>

          <h3 className="font-semibold text-gray-700">
            {user?.username || "User"}
          </h3>

        </div>

        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">

          {user?.username?.charAt(0).toUpperCase() || "U"}

        </div>

        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;
