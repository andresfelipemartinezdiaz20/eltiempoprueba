import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Destacado from './Destacado';
import Publicidad from './../img/publicidad.gif';

const cleanHTML = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};

const ShowArticles = () => {
  const url = '/articulos';  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const respuesta = await axios.get(url);
      
      if (Array.isArray(respuesta.data) && respuesta.data.length > 0) {
        setArticles(respuesta.data); 
      } else {
        Swal.fire('No se encontraron artículos', '', 'info');
      }
    } catch (error) {
      console.error("Error al obtener los artículos:", error.response || error.message || error);
      Swal.fire('Error', 'Hubo un problema al cargar los artículos', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='App main-home'>
      <div className='article-content-list'>
        <div className='destacado'>
          <Destacado></Destacado>
        </div>
        <div className='container-fluid article-list'>
          {loading ? (
            <p>Cargando artículos...</p>
          ) : (
            articles.length > 0 ? (
              articles.map((article, index) => (
                <div className="article" key={index}>
                  <div className='image'>
                    <a className="link" href={cleanHTML(article.view_node)}><img src={article.field_image} alt={cleanHTML(article.title)} /></a>
                  </div>
                  <div className='article-content'>
                    <a className="tags" href={cleanHTML(article.view_node)}>{cleanHTML(article.field_tags)}</a>
                    <h2><a className="title" href={cleanHTML(article.view_node)}>{cleanHTML(article.title)}</a></h2>
                    <a className="create" href={cleanHTML(article.view_node)}><small>Por {article.created} - {cleanHTML(article.uid_1)}</small></a>
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron artículos.</p>
            )
          )}
        </div>
      </div>
      <div className='publicidad'>
        <a href='/'> 
          <img src={Publicidad} alt="Logo" />
        </a> 
      </div>
    </div>
  );
};

export default ShowArticles;
