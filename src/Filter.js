import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Filter({setActiveGenre,activeGenre, setFiltered,popular}) {
    const [genre, setGenre] = useState([])

    useEffect(() => {
        fetchGenre();
      }, []);

    const fetchGenre = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=19f819fe84c8a3dfc509667bab3208c6&language=vi"
        );

        const genres = await data.json();
        setGenre(genres.genres);
    };

    useEffect(() => {
        if(activeGenre === 0){
            setFiltered(popular);
            return;
        }
        const filtered = popular.filter((movie) => {
           return movie.genre_ids.includes(activeGenre)
        })
        setFiltered(filtered);
    }, [activeGenre])

    return (
    <div className='filter-container'>
        <button  className={activeGenre === 0 ? 'active': ''}  onClick={() => setActiveGenre(0)} >Tất cả</button>    
        {
            genre.map((item) => 
                <button  className={activeGenre === item.id ? 'active': ''}  onClick={() => setActiveGenre(item.id)} >{item.name}</button>    
            )
        }
    </div>
  )
}
