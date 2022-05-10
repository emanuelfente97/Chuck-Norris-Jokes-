import React, { useState, useEffect} from 'react';
import axios from 'axios';


const App = () => {
  const [categories, setCategories] = useState([]); 
  const [category, setCategory] = useState('');
  const [joke, setJoke] = useState('');



  const getCategories = async () => {
    const categoriesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
    setCategories(categoriesResponse.data);
  }

  const generateJoke = async () => {
    const jokeResponse = await axios.get(`${process.env.REACT_APP_API_URL}/random?category=${category}`);
    setJoke(jokeResponse.data.value);
  }


  useEffect(() => {
    getCategories();
    // console.log("change category")
  }, []);

  return (
    <div className="box">
      <div className='row'>
        <h3> Chuck Norris Jokes Generator</h3>
      </div>
      <div className='row'>
        <select defaultValue="msg" onChange={(event) => setCategory(event.target.value)}>
          <option value="msg" disabled>Select a category</option>
          {categories.map((value) => {
            return <option value={value}>{value}</option>
          })}
        </select>
      </div>
      <div className='row'>
        <button disabled={!category} onClick={generateJoke} title={!category ? "Please select a category first" : ""}> Generate a new joke</button>
      </div>
      <div className='row'>
        {joke && <p>Your generated joke is: { joke }</p>}
      </div>
    </div>
  );
};

export default App; 
