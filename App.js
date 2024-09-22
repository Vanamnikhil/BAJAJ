// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputJson, setInputJson] = useState('');
  const [response, setResponse] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const jsonInput = JSON.parse(inputJson);
      const response = await axios.post('https://bfhl-api.vercel.app/bfhl', jsonInput);
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedOptions);
  };

  const filteredResponse = () => {
    if (selectedOptions.includes('Alphabets')) {
      return { ...response, alphabets: response.alphabets };
    } else if (selectedOptions.includes('Numbers')) {
      return { ...response, numbers: response.numbers };
    } else if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      return { ...response, highest_lowercase_alphabet: response.highest_lowercase_alphabet };
    } else {
      return response;
    }
  };

  return (
    <div>
      <h1>RA2111026010187</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={inputJson} onChange={(event) => setInputJson(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <select multiple value={selectedOptions} onChange={handleSelectChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</