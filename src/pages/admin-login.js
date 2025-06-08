import Head from "next/head";

export default function AdminLogin() {
  return (
    <>
      <Head>
        <title>Admin Login - Organ Donor Portal</title>
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
            <h2>Admin Login</h2>
            <p className="login-description">
              Welcome, Admin! Use your credentials to securely manage organ and blood donor records, verify user registrations, and oversee availability statistics.
            </p>
            <form>
              <input type="text" placeholder="Admin Username" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>

        <footer className="login-footer">
          &copy; 2025 Donate Organs Initiative | Admin Panel | Developed under OHM
        </footer>
      </div>
    </>
  );
}
