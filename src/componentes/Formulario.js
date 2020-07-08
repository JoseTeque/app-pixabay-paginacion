import React, {useState} from 'react';
import Error from './Error'

const Formulario = ({setbusqueda}) => {

    const [termino, settermino] = useState('');
    const [error, seterror] = useState(false)

    const handleSubmit = e => {
        e.preventDefault();

        if(termino.trim() === ''){

            setTimeout(() => {

                seterror(true);

                setTimeout(() => {
                    seterror(false);
                },4000)
            },50)
            
            return;
        }

        setbusqueda(termino);
    }

    return ( 
        <form 
            onSubmit={handleSubmit}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Vuscar una Imagen, ejemplo: futbol o café"
                        onChange={e => settermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="BUSCAR"
                    />
                </div>
            </div>
            {error ? <Error mensaje="Agregue un termino de busqueda" /> : null}
        </form>
     );
}
 
export default Formulario;