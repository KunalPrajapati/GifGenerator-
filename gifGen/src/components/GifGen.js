import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Spinner from './Spinner';

const GifGen = () => {

  const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
  
  const [tag, setTag] = useState('');

  const [gif, setGif] = useState('');

  const [loading, setLoading] = useState(false);

  async function fetchData(tag){
    setLoading(true);
    const tagUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&&tag=${tag}`;
    const {data} = await axios.get(tagUrl);
    const imgSource = data.data.images.downsized_large.url;
    setGif(imgSource);
    setLoading(false);
  }

  useEffect(()=>{
    fetchData('money');
  },[])


  const handleDownload = async (tag) =>{
    axios({
      url: gif,
      method: 'GET',
      responseType: 'blob', // important
    }).then( (res) =>{
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'image.gif');
      document.body.appendChild(link);
      link.click();
    })
  };


  return (
    // <div className='w-full h-screen flex justify-center items-center'> 
    <div > 
      <div className=' text-center border bg-[#6b6bb6]'>
        <h1 className='text-3xl font-bold mt-4 text-white'
        >Generator GIFs by Search</h1>
         <div className='flex item-center justify-center'>
         {loading ?( <Spinner/>) : (<img src={gif} alt="gif"  width={350}/>)}
          </div>
         <div className='flex flex-col items-center mb-4'>
          <input type="text" className='mt-4 w-3/6 p-[2px] text-center font-[500] rounded-md' placeholder='money'
            onChange={(event) => setTag(event.target.value)} value={tag} />
          <button onClick={() => fetchData(tag)} className='bg-[#2b7fce] rounded-lg px-4 py-2 mt-4 text-white font-bold hover:bg-[#165a99]'
          >Generate</button>

          <button onClick={()=> handleDownload(tag)} 
          className='bg-[#2b7fce] rounded-lg px-4 py-2 mt-4 text-white font-bold hover:bg-[#165a99]'
          >Download</button>

         </div>
      </div>
    </div>
  )
}

export default GifGen;
