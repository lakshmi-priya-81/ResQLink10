import Head from "next/head";

export default function CheckAvailability() {
  return (
    <>
      <Head>
        <title>Check Availability - Organ Donor Portal</title>
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
            max-width: 600px;
            margin: auto;
            padding: 50px 20px;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin-top: 80px;
            margin-bottom: 40px;
            text-align: center;
          }

          .content-container h2 {
            font-size: 26px;
            color: #c62828;
            margin-bottom: 10px;
          }

          .login-description {
            font-size: 14px;
            color: #555;
            margin-bottom: 30px;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 20px;
          }

          select, input[type="text"] {
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
          }

          button {
            background-color: #2e7d32;
            color: white;
            padding: 12px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          button:hover {
            background-color: #1b5e20;
          }

          .register-link {
            font-size: 14px;
            color: #444;
          }

          .register-link a {
            color: #c62828;
            text-decoration: none;
            font-weight: 600;
          }

          .register-link a:hover {
            text-decoration: underline;
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
          <h2>Check Organ / Blood Availability</h2>
          <p className="login-description">
            Our Organ & Blood Donor Match Portal connects patients with life-saving donations by giving real-time availability from verified hospitals and donors. Please use the form below to check what's available in your region.
          </p>

          <form>
            <select required>
              <option value="">Select Organ/Blood Type</option>
              <option>Heart</option>
              <option>Kidney</option>
              <option>Liver</option>
              <option>Blood</option>
            </select>
            <input type="text" placeholder="Enter City or State" required />
            <button type="submit">Search</button>
          </form>

          <div className="register-link">
            <p>New to the platform? <a href="/register">Register as a Donor or Recipient</a></p>
          </div>
        </div>

        <footer className="login-footer">
          &copy; 2025 Organ & Blood Donor Match Portal | Powered by OHM
        </footer>
      </div>
    </>
  );
}
