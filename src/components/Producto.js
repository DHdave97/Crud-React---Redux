import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions'

export default function Producto(producto) {
    const {nombre,precio,id} = producto.producto

    const dispatch = useDispatch()
    const history = useHistory()
    const confirmarEliminarProducto = id => {
        dispatch(borrarProductoAction(id))
    }
    const onEdit = () => {
        dispatch(obtenerProductoEditar(producto.producto))
        history.push(`/productos/editar/${id}`)
    }
    
    return (
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button onClick={()=>onEdit()} className="btn btn-primary mr-2">Editar</button>
                <button type="button" className="btn btn-danger" onClick={()=>confirmarEliminarProducto(id)}>Eliminar</button>
            </td>
        </tr>
    )
}
