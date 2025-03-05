import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Publicidad from './../img/publicidad.gif';

const cleanHTML = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};

const Articles = () => {
  const url = '/articulo/node/*';  
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

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div className='App'>
      <div className='container-fluid'>
        {loading ? (
          <p>Cargando artículos...</p>
        ) : (
          articles.length > 0 ? (
            articles.map((article, index) => (
              <div className="article-internal" key={index}>
                <div className='header-article'>
                  <div className='tags'>
                    <p>{cleanHTML(article.field_tags)}</p>
                  </div>
                  <h1>{cleanHTML(article.title)}</h1>
                  <div className='resumen' dangerouslySetInnerHTML={createMarkup(article.body_1)} />
                  <small>Por {article.created} - {cleanHTML(article.uid)}</small>
                </div>
                
                
                <div className='article-content'>
                  <div className='row'>
                    <div className='image'>
                      <img src={article.field_image} alt={cleanHTML(article.title)} />
                    </div>
                    <div className='content' dangerouslySetInnerHTML={createMarkup(article.body)} />                    
                  </div>
                  <div className='publicidad'>
                    <a href='/'> 
                      <img src={Publicidad} alt="Logo" />
                    </a> 
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron artículos.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Articles;
