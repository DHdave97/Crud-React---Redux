import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_ERROR,
    PRODUCTO_EDITAR_EXITO,
    COMENZAR_PRODUCTO_EDITAR
}from '../types'
import clienteAxios from '../config/axios'
//crear nuevos productos
export function crearNuevoProductoAction(producto){
    return (dispatch)=>{
        dispatch(agregarProducto());
        setTimeout(() => {
            try {
                clienteAxios.post('/productos',producto).catch(
                    ()=> dispatch(agregarProductoError(true))
                )
                dispatch(agregarProductoExito(producto));
            } catch (error) {
                dispatch(agregarProductoError(true));
            }
        }, 2000);

    }
}
const agregarProducto = () => ({
    type:AGREGAR_PRODUCTO
})
const agregarProductoExito = (producto) => ({
    type:AGREGAR_PRODUCTO_EXITO,
    payload:producto
})
const agregarProductoError = (error) => ({
    type:AGREGAR_PRODUCTO_ERROR,
    payload:error
})

export function obtenerProductosAction(){
    return async (dispatch)=>{
        dispatch(descargarProductos())
        try {
            const res = await clienteAxios.get('productos')
            dispatch(descargarProductosExito(res.data))
        } catch (error) {
            dispatch(descargarProductosError(true))
        }
    }
}
const descargarProductos = () => ({
    type:COMENZAR_DESCARGA_PRODUCTOS,
    payload:true
})
const descargarProductosExito = (productos) => ({
    type:DESCARGA_PRODUCTOS_EXITO,
    payload:productos
})
const descargarProductosError = (err) => ({
    type:DESCARGA_PRODUCTOS_ERROR,
    payload:err
})

export function borrarProductoAction(id){
    return async (dispatch)=>{
        dispatch(obtenerProductoEliminar(id))

        try {   
            const res = await clienteAxios.delete(`productos/${id}`)
            dispatch(eliminarProductoExito())
        } catch (error) {
            console.log("error eliminando ******",error)
        }
    }
}
export const obtenerProductoEliminar = id => ({
    type:OBTENER_PRODUCTO_ELIMINAR,
    payload:id
})
export const eliminarProductoExito = () => ({
    type:PRODUCTO_ELIMINADO_EXITO
})

export function obtenerProductoEditar(producto) {
    console.log("PRIMERO OBTENGO ***",producto)
    return (dispatch)=>{
        dispatch(obtenerProductoAction(producto))
    }
}


const obtenerProductoAction = producto => ({
    type:OBTENER_PRODUCTO_EDITAR,
    payload:producto
})

export function editarProductoAction(producto){
    return async(dispatch)=>{
        dispatch(editarProducto())
            try {
                await clienteAxios.put(`productos/${producto.id}`,producto)
                dispatch(editarProductoExito(producto))
            } catch (error) {
                console.log("error editando",error)
            }
    }
}   

const editarProducto = () => ({
    type:COMENZAR_PRODUCTO_EDITAR
})
const editarProductoExito = (producto) => ({
    type:PRODUCTO_EDITAR_EXITO,
    payload:producto
})
