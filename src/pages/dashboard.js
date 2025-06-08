import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Organ Donor Portal</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div>
        <style>{`
          body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(to right, #fce4ec, #e3f2fd);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .content-container {
            max-width: 800px;
            margin: auto;
            padding: 60px 20px;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin-top: 80px;
            margin-bottom: 40px;
          }

          h2 {
            text-align: center;
            font-size: 28px;
            color: #d32f2f;
            margin-bottom: 20px;
          }

          p {
            text-align: center;
            color: #444;
            font-size: 15px;
            margin-bottom: 30px;
          }

          section {
            margin-bottom: 30px;
          }

          h3 {
            color: #1565c0;
            font-size: 20px;
            margin-bottom: 12px;
          }

          ul {
            list-style: none;
            padding-left: 0;
            color: #333;
            line-height: 1.8;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 10px;
          }

          input {
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
          }

          button {
            background-color: #2e7d32;
            color: white;
            padding: 12px;
            font-size: 15px;
            font-weight: 600;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          button:hover {
            background-color: #1b5e20;
          }

          .login-footer {
            background-color: #212121;
            color: white;
            text-align: center;
            padding: 16px 10px;
            font-size: 14px;
            margin-top: auto;
          }

          @media (max-width: 480px) {
            .content-container {
              padding: 30px 15px;
              margin-top: 40px;
            }
          }
        `}</style>

        <div className="content-container">
          <h2>Dashboard</h2>
          <p>Welcome back! Manage your donor profile, view your donation history, and update your contact details below.</p>

          <section className="donor-info">
            <h3>Your Registration Details</h3>
            <ul>
              <li>✔️ Registered as: Blood + Organ Donor</li>
              <li>🗓️ Last Donation Date: 15 March 2025</li>
              <li>📍 Location: Chennai, Tamil Nadu</li>
              <li>📞 Contact Number: +91 98765 43210</li>
            </ul>
          </section>

          <section className="upcoming-events">
            <h3>Upcoming Donation Camps Near You</h3>
            <ul>
              <li>🩸 Blood Donation Camp - Chennai City Hall, 20 June 2025</li>
              <li>🏥 Organ Donation Awareness Drive - Chennai General Hospital, 5 July 2025</li>
            </ul>
          </section>

          <section className="profile-update">
            <h3>Update Profile Information</h3>
            <form>
              <input type="text" placeholder="Full Name" required />
              <input type="tel" placeholder="Phone Number" required />
              <input type="text" placeholder="City" required />
              <button type="submit">Update Profile</button>
            </form>
          </section>
        </div>

        <footer className="login-footer">
          &copy; 2025 Organ & Blood Donor Match Portal | Powered by OHM
        </footer>
      </div>
    </>
  );
}
