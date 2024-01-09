
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

const Body = () => {
  const [imageURL, setImageURL] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchApi = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "Authorization": "Bearer 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"
          },
          body: JSON.stringify({ inputs: input }),
        }
      );

      const blob = await res.blob();
      setImageURL(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi();
  };

  return (
    <div>
      <Header/>
      <Main/>
    <div className='mainContainer'>
      <div>
        <label htmlFor="inputText">Enter Text: </label>
        <input
          className='inputText'
          type="text"
          id="inputText"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button className='button' onClick={handleSubmit}>
        Generate Image
      </button>
      {loading && <p>Loading...</p>}
      {imageURL && !loading && (
        <div className='secondContainer'>
          <h2>Generated Image:</h2>
          <img  className='image' src={imageURL} alt="images" />
        </div>
      )}
    </div>
    </div>
  );
};

export default Body;
