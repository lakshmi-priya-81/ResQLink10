import Head from "next/head";
import AvailabilitySearch from "../components/AvailabilitySearch";

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
            background: linear-gradient(to right, #f3e5f5, #e1f5fe);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .content-container {
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.1);
            text-align: center;
          }

          h2 {
            color: #d32f2f;
            font-size: 26px;
            margin-bottom: 10px;
          }

          .login-description {
            font-size: 14px;
            color: #555;
            margin-bottom: 20px;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          select,
          input {
            padding: 12px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 6px;
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
            margin-top: 20px;
            font-size: 14px;
          }

          .register-link a {
            color: #d32f2f;
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
            padding: 15px;
            font-size: 14px;
          }

          @media (max-width: 480px) {
            .content-container {
              margin: 20px;
              padding: 20px;
            }
          }
        `}</style>
        <AvailabilitySearch />
        <footer className="login-footer">
          © 2025 Organ & Blood Donor Match Portal | Powered by OHM
        </footer>
      </div>
    </>
  );
}