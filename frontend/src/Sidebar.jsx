import { NavLink } from "react-router-dom";

function Sidebar() {

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "🏠",
        },

        {
            name: "Analytics",
            path: "/analytics",
            icon: "📊",
        },

        {
            name: "Settings",
            path: "/settings",
            icon: "⚙️",
        },
    ];

    return (
        <div className="w-64 min-h-screen bg-[#111827] text-white flex flex-col">

            <div className="p-6 border-b border-gray-700">

                <h1 className="text-2xl font-bold">
                    FocusTrack
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Productivity Tracker
                </p>

            </div>

            <div className="flex-1 px-4 py-6 space-y-3">

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}

                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition 
              
              ${isActive
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-800 text-gray-300"
                            }`
                        }
                    >
                        <span className="text-xl">
                            {item.icon}
                        </span>

                        <span className="font-medium">
                            {item.name}
                        </span>
                    </NavLink>
                ))}

            </div>

            <div className="p-5 border-t border-gray-700 text-sm text-gray-400">
                FocusTrack v1.0
            </div>

        </div>
    );
}

export default Sidebar;