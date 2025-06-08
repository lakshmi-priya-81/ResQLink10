import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Donate Organs - Save Lives</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1588776814546-ec7d16d58d3d?auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          color: "#111",
        }}
      >
        {/* Header */}
        <header className="flex justify-between items-center p-6 bg-white bg-opacity-90 shadow-md">
          <div className="flex items-center gap-4">
            <img
              src="https://www.pngarc.com/wp-content/uploads/2023/05/World-Blood-Donor-Day-Organ-donation-logo-png-image-min.png"
              alt="Logo"
              className="h-[60px] w-auto"
            />
            <div className="text-sm leading-tight">
              <strong>Under Organ Health Mission</strong>
              <br />
              Government of India
            </div>
          </div>
          <div>
            <button
              onClick={() => (window.location.href = "/user-login")}
              className="bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded-md font-semibold mr-2"
            >
              User Login
            </button>
            <button
              onClick={() => (window.location.href = "/admin-login")}
              className="bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded-md font-semibold"
            >
              Admin Login
            </button>
          </div>
        </header>

        {/* Navbar */}
        <nav className="bg-gray-100 py-3 text-center">
          <a href="/" className="mx-4 text-gray-700 font-semibold hover:text-red-700">
            Home
          </a>
          <a
            href="/check-availability"
            className="mx-4 text-gray-700 font-semibold hover:text-red-700"
          >
            Check Availability
          </a>
          <a href="/dashboard" className="mx-4 text-gray-700 font-semibold hover:text-red-700">
            Dashboard
          </a>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-wrap justify-center items-center p-8 bg-white bg-opacity-85">
          <div className="text-center p-4 flex-1 min-w-[280px]">
            <h1 className="text-3xl text-red-700 font-bold">Donate Organs - Save Lives :)</h1>
            <p className="text-lg my-2">Join the mission to give life a second chance.</p>
            <p className="italic text-gray-700 mb-4">
              "The gift of life is the greatest legacy one can leave."
            </p>
            <button
              onClick={() => (window.location.href = "/register")}
              className="bg-green-700 hover:bg-green-900 text-white px-6 py-2 rounded-md font-semibold"
            >
              Register Now
            </button>
          </div>
          <div className="text-center flex-1 min-w-[280px]">
            <img
              src="https://img.freepik.com/free-vector/donate-blood-isolated-logo_1025-350.jpg"
              alt="Donate Blood or Organs"
              className="rounded-lg w-[300px] max-w-full mx-auto"
            />
          </div>
        </section>

        {/* Info Cards */}
        <section className="flex flex-wrap justify-center gap-6 p-8 bg-white bg-opacity-90">
          {[
            {
              img: "https://img.freepik.com/free-vector/happy-world-blood-donor-day-red-white-background-social-media-design-banner-free-vector_1340-21529.jpg",
              text: `Blood donation is a vital, accessible way to support patients requiring transfusions for surgeries, trauma, or treatments for conditions like cancer or anemia.`,
            },
            {
              img: "https://www.careinsurance.com/upload_master/media/posts/August2024/national-organ-donation-day.webp",
              text: `Organ donation is a selfless act that can save or transform the lives of individuals suffering from organ failure.`,
            },
            {
              img: "https://www.shutterstock.com/image-vector/banner-organ-transplant-donation-awareness-260nw-1067188598.jpg",
              text: `Any person not less than 18 years of age, who voluntarily authorizes the removal of any of his organ and/or tissue...`,
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-4 w-72 text-center"
            >
              <img
                src={card.img}
                alt={`Card ${index + 1}`}
                className="rounded-md mb-2 w-full h-auto"
              />
              <p className="text-sm text-gray-700">{card.text}</p>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section className="text-center py-10 bg-gray-100">
          <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
          <p>
            <strong>Phone:</strong> +91-9876543210
          </p>
          <p>
            <strong>Email:</strong> support@donateorgans.com
          </p>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white text-center py-4 text-sm">
          &copy; 2025 Donate Organs Initiative. All Rights Reserved. | Designed under OHM
        </footer>
      </div>
    </>
  );
}
