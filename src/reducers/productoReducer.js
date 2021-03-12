import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    COMENZAR_PRODUCTO_EDITAR,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_ELIMINADO_EXITO
}from '../types'

// cada reducer tiene su propio state
const initialState = {
    productos:[],
    error:null,
    loading:false,
    productoeliminar:null,
    productoeditar:null
}
export default function(state = initialState,action){
    switch (action.type) {
        case COMENZAR_DESCARGA_PRODUCTOS:
        case COMENZAR_PRODUCTO_EDITAR:
        case AGREGAR_PRODUCTO:
            return{
                ...state,
                loading:true,
                error:null
            };
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading:false,
                error:null,
                productos:[...state.productos,action.payload]
            };
        case AGREGAR_PRODUCTO_ERROR:
            return{
                    ...state,
                    loading:false,
                    error:action.payload
                };
        case DESCARGA_PRODUCTOS_EXITO:
            return{
                    ...state,
                    loading:false,
                    error:null,
                    productos:action.payload
                };
        case DESCARGA_PRODUCTOS_ERROR:
            return{
                ...state,
                loading:false,
                error:action.payload
            };
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoeliminar:action.payload
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                productos:state.productos.filter(producto =>producto.id !== state.productoeliminar),
                productoeliminar:null,
                productoeditar:null
            }
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productoeliminar:null,
                productoeditar:action.payload
            }
        case PRODUCTO_EDITAR_EXITO:
                return {
                    ...state,
                    loading:false,
                    productoeliminar:null,
                    productoeditar:null,
                    productos:state.productos.map(prod=>
                        prod.id === action.payload.id ? prod = action.payload:
                        prod
                        )
                }

        default:
            return state;
    }
}