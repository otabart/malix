import "../styles/Tokenize.css"
import { useState } from 'react';

export default function Tokenize(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ipName, setIpName] = useState(''); // IP stands for Intellectual Property
    const [details, setDetails] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload
    
        // Display form data in the console
        console.log({ name, email, ipName, details });
    
        // Optionally, you can clear the form after submission
        setName('');
        setEmail('');
        setIpName('');
        setDetails('');
      };


      return (
        <div>
          <h2 style={{textAlign: "center"}}>Tokenize Intellectual Property</h2>
          
          {/* Step 4: Create the form structure */}
          <form onSubmit={handleSubmit} className="form-container">
            {/* Name input */}
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update state on input change
                required
              />
            </div>
    
            {/* Email input */}
            <div>
              <label>Supply:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
                required
              />
            </div>
    
            {/* Name of Intellectual Property input */}
            <div>
              <label>Name of Intellectual Property:</label>
              <input
                type="text"
                value={ipName}
                onChange={(e) => setIpName(e.target.value)} // Update state on input change
                required
              />
            </div>
    
            {/* Details textarea */}
            <div>
              <label>Details:</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)} // Update state on input change
                required
              ></textarea>
            </div>
    
            {/* Submit button */}
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    
}