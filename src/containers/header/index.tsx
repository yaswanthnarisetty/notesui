"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Function to check if the token exists in localStorage
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token); // Update state based on token presence
    };

    // Initial check on component mount
    checkLoginStatus();

    // Optional: Listen for storage changes (cross-tab sync)
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    // Detect navigation and recheck login status
    const handleRouteChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    router.events?.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events?.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/"); // Redirect to home or login page
  };

  return (
    <div className="w-full flex justify-center items-center h-full sm:py-10">
      <header className="flex justify-between items-center mt-8 bg-[#E7E4F1]" style={{ width: "80%" }}>
        <h1 className="text-2xl font-bold text-purple-800">
          <a href="/">SS Notes</a>
        </h1>

        {/* Conditionally render the logout button */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        )}
      </header>
    </div>
  );
};

export default Header;
