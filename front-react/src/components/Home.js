import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './../App.css';
import ShowArticles from './ShowArticles';
import ShowArticlesBlock2 from './ShowArticlesBlock2';


function Home() {
  return (
    <main className='main'>
        <ShowArticles/>
        <ShowArticlesBlock2/>
    </main>
  );
}

export default Home;
