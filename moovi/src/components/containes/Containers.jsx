
import './conatiner.css'
import React from 'react'
import MovieList from './Card'

export default function Containers({ searchQuery }) {
  return (
    <section>

    
    {/* <div className='containers'>
      <h2>Films Cards</h2>
     
    </div> */}
     <div>
      <MovieList searchQuery={searchQuery}/>
      </div>
      </section>
  )
}
