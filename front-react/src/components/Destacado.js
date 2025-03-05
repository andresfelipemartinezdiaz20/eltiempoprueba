import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const cleanHTML = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};

const Destacado = () => {
  const url = '/destacado';  
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
      } 
    } catch (error) {
      console.error("Error al obtener los artículos:", error.response || error.message || error);
      Swal.fire('Error', 'Hubo un problema al cargar los artículos', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container-fluid'>
    {loading ? (
        <p>Cargando artículos...</p>
    ) : (
        articles.length > 0 ? (
          articles.map((article, index) => (
            <div className="article" key={index}>
              <div className='article-content'>
                <a className="tags" href={cleanHTML(article.view_node)}>{cleanHTML(article.field_tags)}</a>
                <h2><a className="title" href={cleanHTML(article.view_node)}>{cleanHTML(article.title)}</a></h2>
                <a className="description" href={cleanHTML(article.view_node)}><p>{cleanHTML(article.body)}</p></a>
                <a className="create" href={cleanHTML(article.view_node)}><small>Por {article.created} - {cleanHTML(article.uid_1)}</small></a>
              </div>
              <div className='image'>
                <a className="link" href={cleanHTML(article.view_node)}><img src={article.field_image} alt={cleanHTML(article.title)} /></a>
              </div>
            </div>
          ))
        ) : (
        <p></p>
        )
    )}
    </div>
  );
};

export default Destacado;
