import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from './../../assets/cards/Cards_data.js';

import { Link } from 'react-router-dom';



const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);

  const cardRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTYxOTI0MDQzMGFjZjRjM2NmNmY2NjYxMTIzZjk3MCIsIm5iZiI6MTc1Njc0NjE4OS4wOCwic3ViIjoiNjhiNWQxY2Q2ODc5OWE0NjQyYjRmOGFkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.m49VOui7AEl26zeDWmimQKGh9ve27wyLcfdnTnJ7CUc'
    }
  };



  const handleWheel = (event) => {
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
    cardRef.current.addEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className='title-card'>
      <h2>{title ? title : "Papular on Netflix"}</h2>
      <div className="card_list" ref={cardRef}>
        {
          apiData.map((card, index) => {
            return <Link to={`/Player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>;
          })
        }
      </div>
    </div>
  );
};

export default TitleCards

