import React, { Fragment,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerProductosAction } from '../actions/productoActions';
import Producto from './Producto';

export default function Productos() {
    const dispatch = useDispatch();
    useEffect(() => {
        const cargarProductos = ()=>dispatch(obtenerProductosAction())
        cargarProductos()
        return;
    }, [])

    const productos = useSelector(state =>state.productos.productos)
    const loading = useSelector(state =>state.productos.loading)
    console.log(productos)
    return (
        <Fragment>
            <h2 className="text-center- my-5">Listado de productos</h2>

            <table className="table table-striéd">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       loading === false && productos && 
                       productos.map(producto=>(
                           <Producto key={producto.id} producto={producto} />
                       ))
                   }
                    
                </tbody>
            </table>
            {
                loading === false && productos.length === 0 &&
                <div className="d-flex w-100 justify-content-center"><p>No hay productos</p></div>
            }
            {
                loading === true && 
                <div className="d-flex w-100 justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }

        </Fragment>
    )
}
