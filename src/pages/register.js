import Head from "next/head";
import { useState } from 'react';
import { RegisterForm, DonorConfirmation } from '../components/RegisterForm';
import Chatbot from '../components/Chatbot';

export default function Register() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [donorData, setDonorData] = useState(null);

  return (
    <>
      <Head>
        <title>{showConfirmation ? "Registration Confirmation" : "Register Now"} - Organ Donor Portal</title>
       
      </Head>
      <div>
        <style>{`
          body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(to right, #f3e5f5, #e1f5fe);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            flex-direction: column;
          }

          .register-form, .confirmation-form {
            background: white;
            padding: 40px;
            border-radius: 12px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          h2 {
            color: #d32f2f;
            font-size: 26px;
            margin-bottom: 10px;
          }

          .login-description, .confirmation-description {
            color: #555;
            font-size: 14px;
            margin-bottom: 30px;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          label {
            font-weight: 600;
            font-size: 14px;
            color: #333;
            text-align: left;
          }

          input[type="text"],
          input[type="email"],
          input[type="tel"] {
            padding: 10px;
            font-size: 14px;
            border-radius: 6px;
            border: 1px solid #ccc;
          }

          button {
            margin-top: 10px;
            padding: 12px;
            font-size: 15px;
            background-color: #2e7d32;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
          }

          button:hover {
            background-color: #1b5e20;
          }

          .checkbox-container {
            margin: 8px 0 15px;
            display: flex;
            gap: 15px;
            justify-content: center;
          }

          .checkbox-container input[type="checkbox"] {
            margin-right: 6px;
          }

          .checkbox-container label {
            margin-right: 15px;
            color: #0077cc;
            font-weight: 600;
          }

          .note {
            margin-top: 20px;
            font-size: 13px;
            color: #555;
          }

          .welcome-message {
            color: #2e7d32;
            font-weight: 600;
            margin-bottom: 20px;
          }

          .donor-details {
            margin-top: 20px;
            text-align: left;
          }

          .donor-details h3 {
            font-size: 18px;
            color: #d32f2f;
            margin-bottom: 10px;
          }

          .donor-details p {
            font-size: 14px;
            color: #555;
            margin: 5px 0;
          }

          @media (max-width: 480px) {
            .register-form, .confirmation-form {
              padding: 25px 20px;
            }
          }
        `}</style>

        {/* Registration or Confirmation */}
        <div className="register-form">
          {showConfirmation && donorData ? (
            <DonorConfirmation donorData={donorData} />
          ) : (
            <RegisterForm onRegisterSuccess={(data) => {
              setDonorData(data);
              setShowConfirmation(true);
            }} />
          )}
        </div>

        {/* Gemini Chatbot */}
        <Chatbot />
      </div>
    </>
  );
}
