
import { useState } from 'react';
import './App.css';
import OptionItem from './Components/OptionItem';

function App() {

  const [img, setImg] = useState("");

  const apiUrl = 'https://api.waifu.im/search';  // Replace with the actual API endpoint URL
  const params = {
    included_tags: ['raiden-shogun', 'maid'],
    height: '>=2000'
  };

  const queryParams = new URLSearchParams();

  for (const key in params) {
    if (Array.isArray(params[key])) {
      params[key].forEach(value => {
        queryParams.append(key, value);
      });
    } else {
      queryParams.set(key, params[key]);
    }
  }
  const requestUrl = `${apiUrl}?${queryParams.toString()}`;

  fetch(requestUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
  
      } else {
        throw new Error('Request failed with status code: ' + response.status);
      }
    })
    .then(data => {
      // Process the response data as needed
      const imgUrl = data.images[0].url;
      setImg(imgUrl)
    
    })
    .catch(error => {
      console.error('An error occurred:', error.message);
    });
  return (
    <div>
      <OptionItem img={img}/>
    </div>
  );
}

export default App;
