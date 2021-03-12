import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { editarProductoAction } from '../actions/productoActions'

export default function EditarProducto() {
    const producto = useSelector(state=>state.productos.productoeditar)
    const history = useHistory()
    const [nombre,guardarNombre] = useState(producto.nombre)
    const [precio,guardarPrecio] = useState(producto.precio)
    const dispatch = useDispatch()
    const editarProducto = (producto)=> dispatch(editarProductoAction(producto))
    const submitNew = (e) => {
        e.preventDefault();
        editarProducto({id:producto.id,nombre,precio})
        history.push('/')
    }
    const cargando = useSelector(state=>state.productos.loading)
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Editar Producto</h2>
                        <form
                            onSubmit={submitNew}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input type="text" className="form-control" 
                                 placeholder="Nombre"
                                 name="nombre" 
                                 value={nombre}
                                 onChange={(e)=>guardarNombre(e.target.value)}
                                 />
                            </div>
                            <div className="form-group">
                                <label>Precio</label>
                                <input type="text" 
                                className="form-control" 
                                placeholder="0.00" 
                                name="precio"
                                 value={precio}
                                 onChange={(e)=>guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                                Guardar
                            </button>
                        </form>
                        {cargando ? <p>Guardando...</p>:null}
                    </div>
                </div>
            </div>
        </div>
    )
}
