import Head from "next/head";

export default function UserLogin() {
  return (
    <>
      <Head>
        <title>User Login - Organ Donor Portal</title>
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

          .login-page-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px 20px;
            flex-grow: 1;
          }

          .login-card {
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

          .login-card h2 {
            font-size: 24px;
            color: #c62828;
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

          form input {
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

          .login-footer {
            background-color: #212121;
            color: white;
            text-align: center;
            padding: 16px 10px;
            font-size: 14px;
          }

          @media (max-width: 480px) {
            .login-card {
              padding: 30px 20px;
            }
          }
        `}</style>

        <div className="login-page-container">
          <div className="login-card">
            <img
              src="https://www.sakraworldhospital.com/assets/spl_splimgs/organ-donation-2020-1.webp"
              alt="Organ Donation Banner"
              className="login-logo"
            />
            <h2>User Login</h2>
            <p className="login-description">
              Sign in to manage your donor profile, check organ availability, and update your health records.
            </p>
            <form>
              <input type="email" placeholder="Enter your Email" required />
              <input type="password" placeholder="Enter Password" required />
              <button type="submit">Login</button>
            </form>
            <p className="register-link">
              Not registered yet? <a href="register.html">Register here</a>
            </p>
          </div>
        </div>

        <footer className="login-footer">
          <p>&copy; 2025 Donate Organs Initiative | A Mission by OHM</p>
        </footer>
      </div>
    </>
  );
}
