import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  // تغییر تم و ذخیره در localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="bg-white text-gray-950 dark:bg-neutral-900 shadow-lg border-b border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* لوگو + اسم سایت */}
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-20 h-20 object-contain"
            />
            <span className="text-l font-bold tracking-wide text-gray-900">
             کتابخانه آنلاین لوتوس
            </span>
          </div>

          {/* منوی دسکتاپ */}
          <div className="hidden md:flex items-center gap-1 text-m">

            <Link className="hover:text-gray-600 transition" to="/register/user">ثبت‌نام</Link>
            <span>/</span>
            <Link className="hover:text-gray-600 transition" to="/auth/login">ورود</Link>

            {/* دکمه Dark / Light */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="px-1 py-1 rounded-md border border-gray-600 text-gray-950 hover:text-amber-700 transition"
            >
              {theme === "light" ? "🌙 شب" : "☀️ روز"}
            </button>
          </div>

          {/* منوی موبایل */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* منوی موبایل باز شونده */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 text-black px-4 py-4 space-y-3 text-lg border-t border-yellow-500/30">

          <Link className="block hover:text-gray-700" to="/register">ثبت‌نام</Link>
          <Link className="block hover:text-gray-700" to="/login">ورود</Link>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-full px-3 py-2 rounded-md border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
          >
            {theme === "light" ? "🌙 حالت شب" : "☀️ حالت روز"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
