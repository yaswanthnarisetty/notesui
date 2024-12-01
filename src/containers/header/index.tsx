"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router2 = usePathname();
  const router = useRouter()

  console.log("router",router);
  
  // Check if user is logged in using localStorage token
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      setIsLoggedIn(!!token); // Update state based on token presence
    };

    checkLoginStatus(); // Initial check
    window.addEventListener("storage", checkLoginStatus); // Optional: sync across tabs

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      setIsLoggedIn(!!token);
    };

    router.events?.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events?.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const handleLogout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false);
    router.push("/"); // Redirect after logout
  };

  // Hide header on login page
  if (router2 === "/login") {
    return null; // Do not render the header on the login page
  }
  if (router2 === "/signup") {
    return null; // Do not render the header on the login page
  }



  return (
    <div className="w-full h-full sm:py-10">
      <header className="bg-purple-600 text-white p-4">
        <nav className="mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SSnote</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="/features" className="hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:underline">
                Pricing
              </a>
            </li>
            {isLoggedIn && (  <li>
              <a href="/categories" className="hover:underline">
             My Categories
              </a>
            </li>
            )}
            
            <li>
              {!isLoggedIn ? (
                <a href="/login" className="hover:underline">
                  Login
                </a>
              ) : (
                
                <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded">
                  Logout
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
