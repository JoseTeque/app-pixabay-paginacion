import React, {useState, useEffect} from 'react';
import Formulario from './componentes/Formulario';
import ListadoImagen from './componentes/ListadoImagenes';


function App() {
  
  const [busqueda, setbusqueda] = useState('');
  const [resultadoImagen, setresultadoImagen] = useState([]);
  const [paginaactual, setpaginaActual] = useState(1);
  const [totalpaginas, settotalPaginas] = useState(1);

  useEffect(() => {
    
      const consultaApi = async() => {
        if(busqueda === '') return;

        const ImagenesPorPagina = 30;
        const key = '17381582-932af7d8bbd650a5948ec9a88';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${ImagenesPorPagina}&page=${paginaactual}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setresultadoImagen(resultado.hits);

        // CALCULAR EL TOTAL DE PAGINAS

        const totalPaginas = Math.ceil(resultado.totalHits / ImagenesPorPagina);
        settotalPaginas(totalPaginas);

        //Mover la pantalla hacia arriba

        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({behavior:"smooth"});
      }

      consultaApi();
  }, [busqueda, paginaactual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1 ;

    if(nuevaPaginaActual > 0){
      setpaginaActual(nuevaPaginaActual);
    }

    
  }

  const paginaSiguiente = () => {
    const paginaSiguiente = paginaactual + 1;

    if(paginaSiguiente > totalpaginas) return;

      setpaginaActual(paginaSiguiente);

  }

  return (
    <div className="container">
      <div className="jumbotron">
        <div>
          <p className="lead text-center">Buscador de Imagenes</p>
        </div>
        <Formulario 
          setbusqueda={setbusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagen
          imagenes = {resultadoImagen}
        />

       {paginaactual === 1 ? null : (

        <button 
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >
        &laquo; Anterior 
        </button>
       )}

       {paginaactual === totalpaginas ? null : (
        <button 
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >
          Siguiente &raquo;
        </button>
       )}
      </div>
    </div>
  );
}

export default App;
