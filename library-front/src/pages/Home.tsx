import React from 'react';

import Navbar from '../component/Navbar';

export const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Header */}
      <header className="bg-gradient-to-r from-amber-700 to-white py-20 text-amber-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">به کتابخانه خوش آمدید</h1>
          <p className="text-lg mb-6">
            بهترین کتاب‌ها، ساده‌ترین دسترسی، لذت مطالعه در دنیای دیجیتال.
          </p>


        </div>
      </header>

      {/* Article + Image Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white shadow-xl justify-center overflow-hidden grid md:grid-cols-2 gap-0">

          {/* Left: Image */}
  
            <img
              src="/images/book1.jpg"
              alt="کتابخانه"
              className="rounded-xl  p-8 max-w-full  h-64 md:h-80 lg:mr-20 md:mt-10 object-cover"
            />

          {/* Right: Text */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-amber-800">چرا مطالعه مهم است؟</h2>
            <p className="text-gray-700 leading-7 mb-4">
              مطالعه باعث افزایش تمرکز، توسعه ذهن، رشد خلاقیت و گسترش دایره واژگان می‌شود.
              کتاب‌ها مسیرهایی هستند که ما را بدون نیاز به سفر واقعی، به جهان‌های جدید می‌برند.
              با ثبت‌نام در این کتابخانه، می‌توانید به آسانی به مجموعه بزرگی از کتاب‌ها دسترسی پیدا کنید
              و تجربه یک مطالعه لذت‌بخش را برای خود بسازید.
            </p>
          </div>
        </div>
         <div className="bg-white shadow-xl overflow-hidden grid md:grid-cols-2 gap-0">

          {/* Left: Image */}
            <img
              src="/images/book2.jpg"
              alt="کتابخانه"
              className="w-115 max-w-full p-8 rounded-xl h-64 md:h-80 lg:mr-20 md:mt-15 object-cover"
            />

          {/* Right: Text */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-amber-800"> تاریخچه‌ی کتاب و کتابخانه در ایران  از دوران باستان تا به امروز</h2>
            <p className="text-gray-700 leading-7 mb-4">
              

از آنجا که کتاب و کتابخانه‌شناسنامه دانش و اندیشه و تمدن ملت‌ها  شناخته می‌شود، و ایران گرامی میهن ما و مردم فرهنگ‌پرور و هنردوست آن در بوجود آوردن کتاب و کتابخانه تر پیشروترین ملت‌ها بوده‌اند، اینک در این باره اطلاعاتی بسیار فشرده و مختصر به عرض خوانندگان ارجمند می‌رسد.

برای آگاهی از سرگذشت کتاب و کتابخانه در ایران از قدیم‌ترین دوران باید نخست سخن از پیدایش خط وسیله ثبت و ضبظ اندیشه و فکر به میان آورد. گرچه توضیح  و تحقیق درباره پیدایش خط در ایران مستلزم بحثی مفصل است و اگر در آن بخوض و بررسی بپردازیم رساله‌ای کامل را شامل است لیکن ناگزیر باید برای آغاز سخن و ورود به مطلب مورد طرح شمه‌ای بآن اشارت رود.

بنا به تحقیق دانشمندان رشته خط شناسی نخستین خطی که در ایران باستان سابقه تاریخی دارد خط « دین دبیریه» است1 که تاریخ اختراع آن را به دو هزار سال قبل از میلاد مسیح که چهار هزار سال قبل از این تاریخ باشد تخمین زده‌اند2.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
