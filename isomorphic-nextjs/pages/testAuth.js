import React, { useState } from 'react';

function SerialNumberGenerator() {
  const [formatString, setFormatString] = useState('');
  const [dateParam, setDateParam] = useState('');
  const [generatedSerialNumber, setGeneratedSerialNumber] = useState('');

  const handleGenerateSerialNumber = async () => {
    try {
      const response = await fetch(`http://localhost:3000/getSerialNumber?formatString=${formatString}&dateParam=${dateParam}`);
      const data = await response.json();
      if (data.length > 0) {
        setGeneratedSerialNumber(data[0].RAWIN_NO);
      } else {
        setGeneratedSerialNumber('No matching serial number found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setGeneratedSerialNumber('Error fetching data from server.');
    }
  };

  return (
    <div>
      <label>
        Format String:
        <input
          type="text"
          value={formatString}
          onChange={(e) => setFormatString(e.target.value)}
        />
      </label>
      <br />
      <label>
        Date Parameter:
        <input
          type="date"
          value={dateParam}
          onChange={(e) => setDateParam(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleGenerateSerialNumber}>Generate Serial Number</button>
      <br />
      <div>
        Generated Serial Number: {generatedSerialNumber}
      </div>
    </div>
  );
}

export default SerialNumberGenerator;
