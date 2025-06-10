import Head from "next/head";
import { useState } from 'react';
import { UserLoginForm, DonorProfile } from '../components/UserLoginForm';

// Main UserLogin page component
export default function UserLogin() {
  // State to manage view (login or profile)
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <Head>
        <title>{showProfile ? "Donor Profile" : "User Login"} - Organ Donor Portal</title>
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
            background: linear-gradient(to right, #fbeaec, #e3f2fd);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .login-page-container, .profile-page-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px 20px;
            flex-grow: 1;
          }

          .login-card, .profile-card {
            background: white;
            padding: 40px 30px;
            border-radius: 12px;
            box-shadow: 0 6px 15px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 100%;
            text-align: center;
          }

          .login-logo {
            width: 100%;
            max-width: 260px;
            border-radius: 10px;
            margin-bottom: 20px;
          }

          .login-card h2, .profile-card h2 {
            font-size: 24px;
            color: #c62828;
            margin-bottom: 10px;
          }

          .login-description, .profile-description {
            font-size: 14px;
            color: #555;
            margin-bottom: 20px;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          form input, form select {
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
          }

          form button {
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

          form button:hover {
            background-color: #1b5e20;
          }

          .register-link {
            margin-top: 15px;
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

          .login-footer, .profile-footer {
            background-color: #212121;
            color: white;
            text-align: center;
            padding: 16px 10px;
            font-size: 14px;
          }

          @media (max-width: 480px) {
            .login-card, .profile-card {
              padding: 30px 20px;
            }
          }
        `}</style>
        {showProfile ? (
          <div className="profile-page-container">
            <DonorProfile />
          </div>
        ) : (
          <div className="login-page-container">
            <UserLoginForm onLoginSuccess={() => setShowProfile(true)} />
          </div>
        )}
        <footer className={showProfile ? "profile-footer" : "login-footer"}>
          © 2025 Donate Organs Initiative | A Mission by OHM
        </footer>
      </div>
    </>
  );
}