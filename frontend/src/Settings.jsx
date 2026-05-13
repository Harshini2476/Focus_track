import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const API_URL = "http://localhost:5000/api";

const CATEGORY_OPTIONS = [
  "Productive",
  "Neutral",
  "Unproductive",
];

const CATEGORY_COLORS = {
  Productive: "bg-green-100 text-green-700",
  Neutral: "bg-yellow-100 text-yellow-700",
  Unproductive: "bg-red-100 text-red-700",
};

function Settings({ onLogout }) {

  const [categories, setCategories] = useState({});

  const [website, setWebsite] = useState("");

  const [category, setCategory] =
    useState("Productive");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories(
        response.data.categories || {}
      );

    } catch (error) {

      setCategories({
        "github.com": "Productive",
        "leetcode.com": "Productive",
        "youtube.com": "Unproductive",
        "instagram.com": "Unproductive",
        "google.com": "Neutral",
      });

    } finally {

      setLoading(false);

    }
  };

  const addWebsite = (e) => {

    e.preventDefault();

    if (!website.trim()) return;

    const cleanWebsite = website
      .replace("https://", "")
      .replace("http://", "")
      .replace("/", "");

    setCategories({
      ...categories,
      [cleanWebsite]: category,
    });

    setWebsite("");

    setCategory("Productive");
  };

  const updateCategory = (domain, value) => {

    setCategories({
      ...categories,
      [domain]: value,
    });
  };

  const deleteWebsite = (domain) => {

    const updated = { ...categories };

    delete updated[domain];

    setCategories(updated);
  };

  const saveSettings = async () => {

    try {

      setSaving(true);

      const token =
        localStorage.getItem("token");

      await axios.put(
        `${API_URL}/categories`,
        categories,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "Settings saved successfully!"
      );

    } catch (error) {

      setMessage(
        "Could not save settings."
      );

    } finally {

      setSaving(false);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar
          pageTitle="Settings"
          onLogout={onLogout}
        />

        <div className="p-6 space-y-6">

          {/* Header */}
          <div>

            <h1 className="text-3xl font-bold text-gray-900">
              Website Categories
            </h1>

            <p className="text-gray-500 mt-1">
              Manage productive and
              unproductive websites.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <h2 className="text-lg font-semibold mb-5">
              Add Website
            </h2>

            <form
              onSubmit={addWebsite}
              className="flex flex-col md:flex-row gap-4"
            >

              <input
                type="text"
                placeholder="Enter website domain"
                value={website}
                onChange={(e) =>
                  setWebsite(e.target.value)
                }
                className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="border border-gray-200 rounded-2xl px-4 py-3 outline-none"
              >

                {CATEGORY_OPTIONS.map((item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                ))}

              </select>

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-medium transition"
              >
                Add
              </button>

            </form>

          </div>

          {message && (

            <div className="bg-indigo-50 text-indigo-700 px-4 py-3 rounded-2xl">
              {message}
            </div>

          )}

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-lg font-semibold">
                Saved Websites
              </h2>

              <button
                onClick={saveSettings}
                disabled={saving}
                className="bg-black text-white px-5 py-2 rounded-2xl hover:opacity-90 transition"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

            {loading ? (

              <div className="text-gray-400">
                Loading...
              </div>

            ) : (

              <div className="space-y-4">

                {Object.entries(categories).map(
                  ([domain, value]) => (

                    <div
                      key={domain}
                      className="border border-gray-100 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >

                      {/* Website Info */}
                      <div>

                        <h3 className="font-semibold text-gray-900">
                          {domain}
                        </h3>

                        <span
                          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[value]}`}
                        >
                          {value}
                        </span>

                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">

                        <select
                          value={value}
                          onChange={(e) =>
                            updateCategory(
                              domain,
                              e.target.value
                            )
                          }
                          className="border border-gray-200 rounded-xl px-3 py-2"
                        >

                          {CATEGORY_OPTIONS.map(
                            (item) => (

                              <option
                                key={item}
                                value={item}
                              >
                                {item}
                              </option>

                            )
                          )}

                        </select>

                        <button
                          onClick={() =>
                            deleteWebsite(domain)
                          }
                          className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl transition"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-red-100">

            <h2 className="text-lg font-semibold mb-2">
              Account
            </h2>

            <p className="text-gray-500 mb-5">
              Logout from your FocusTrack
              account.
            </p>

            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-medium transition"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;