import Head from "next/head";

export default function Register() {
  return (
    <>
      <Head>
        <title>Register Now - Organ Donor Portal</title>
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
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
          }

          .register-form {
            background: white;
            padding: 40px;
            border-radius: 12px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          }

          h2 {
            text-align: center;
            color: #d32f2f;
            font-size: 26px;
            margin-bottom: 10px;
          }

          .login-description {
            text-align: center;
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

          @media (max-width: 480px) {
            .register-form {
              padding: 25px 20px;
            }
          }
        `}</style>

        <div className="register-form">
          <h2>Donor Registration</h2>
          <p className="login-description">
            Join our community of life savers by registering as a donor. Your contribution can give someone a second chance at life.
          </p>

          <form>
            <label htmlFor="fullname">Full Name</label>
            <input id="fullname" type="text" placeholder="Full Name" required />

            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" placeholder="Email Address" required />

            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" placeholder="Phone Number" required />

            <label htmlFor="location">Location (City, State)</label>
            <input id="location" type="text" placeholder="Location (City, State)" required />

            <label>Select Donation Type:</label>
            <div className="checkbox-container">
              <input type="checkbox" id="blood" name="donationType" value="Blood" />
              <label htmlFor="blood">Blood</label>

              <input type="checkbox" id="organs" name="donationType" value="Organs" />
              <label htmlFor="organs">Organs</label>
            </div>

            <button type="submit">Submit</button>
          </form>

          <p className="note">
            <strong>Note:</strong> All your details are kept confidential and used only for donor matching purposes.
          </p>
        </div>
      </div>
    </>
  );
}
