import { useState } from "react";
import axios from "axios";

const App = () => {
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [iv, setIv] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!encryptedPassword || !iv) {
      setError("Both encrypted password and IV are required.");
      return;
    }

    try {
      // Send request to the back-end to decrypt the password
      const response = await axios.post(
        "https://unlock-pass-back.vercel.app/api/decrypt-password", 
        {
          encryptedPassword,
          iv,
        }
      );

      setDecryptedPassword(response.data.decryptedPassword);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Error decrypting the password. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="border-2 h-screen flex justify-center flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Decrypt Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="text-lg font-bold">Encrypted Password:</label>
            <input
              type="text"
              className="ml-2 border-2 border-black rounded-md p-2"
              value={encryptedPassword}
              onChange={(e) => setEncryptedPassword(e.target.value)}
              placeholder="Enter encrypted password"
            />
          </div>
          <div className="mb-6">
            <label className="text-lg font-bold">IV (Initialization Vector):</label>
            <input
              type="text"
              className="ml-2 border-2 border-black rounded-md p-2"
              value={iv}
              onChange={(e) => setIv(e.target.value)}
              placeholder="Enter IV"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Decrypt</button>
        </form>

        {decryptedPassword && (
          <div>
            <h3>Decrypted Password:</h3>
            <p>{decryptedPassword}</p>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default App;
