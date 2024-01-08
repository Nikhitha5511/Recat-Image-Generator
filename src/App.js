import React, { useEffect, useState } from 'react';
import './App.css';

const Body = () => {
  const [imageURL, setImageURL] = useState('');
  const [input, setInput] = useState('dog');

  const fetchApi = async () => {
    try {
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
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi();
  };

  useEffect(() => {
    fetchApi();
  }, [input]);

  return (
    <div className='mainContainer'>
      <h1>Image Generator App</h1>
      <div>
        <label htmlFor="inputText">Enter Text: </label>
        <input className='inputText'
          type="text"
          id="inputText"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button  className='button' onClick={handleSubmit}>Generate Image</button>
      {imageURL && (
        <div className='secondContainer'>
          <h2>Generated Image:</h2>
          <img  className='image' src={imageURL} alt="images" />
        </div>
      )}
    </div>
  );
};

export default Body;


