import React, { useEffect } from "react";
import Cookies from "js-cookie";

export const TestToken: React.FC = () => {
  useEffect(() => {
    const test = async () => {
      try {
        const token = Cookies.get("jwt");
        console.log("Token from cookie:", token);

        const res = await fetch("http://localhost:3000/register", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          credentials: "include",
        });

        console.log("Response status:", res.status);
        const data = await res.text();
        console.log("Response body:", data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    test();
  }, []);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold text-amber-700">🔍 در حال تست JWT...</h2>
      <p className="text-gray-600 mt-2">نتیجه را در کنسول مرورگر (F12 → Console) ببین.</p>
    </div>
  );
};
