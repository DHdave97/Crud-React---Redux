import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
//actions redux
import {crearNuevoProductoAction} from '../actions/productoActions'
import { Link, useHistory } from 'react-router-dom'

export default function NuevoProducto() {
    const [nombre,guardarNombre] = useState('')
    const [precio,guardarPrecio] = useState(0)
    const dispatch = useDispatch()
    const history = useHistory()
    const cargando = useSelector(state=>state.productos.loading)
    const error = useSelector(state=>state.productos.error)
    const agregarProducto = (producto)=> dispatch(crearNuevoProductoAction(producto))
    const submitNew = (e) => {
        e.preventDefault();
        agregarProducto({nombre,precio})
        history.push('/')
    }
    
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Nuevo Producto</h2>
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
                                Agregar
                            </button>
                        </form>
                        {cargando ? <p>Cargando...</p>:null}
                        {error ? <p>No se pudo guardar el producto. Inténtelo de nuevo.</p>:null}
                    </div>
                </div>
            </div>
        </div>
    )
}
