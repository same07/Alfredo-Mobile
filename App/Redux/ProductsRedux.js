import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'


const { Types, Creators } = createActions({
  getProductsRequest: ['data'],
  getProductsSuccess: ['data'],
  getProductsFailure: ['error'],

  moreProductsRequest: ['data'],
  moreProductsSuccess: ['data'],
  moreProductsFailure: ['error']
})

export const ProductsTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  list: {data: [], fetching: false, error: null, page: 1, lastPage: 1, isLoadMore: false},
  detail: {data: null, fetching: false, error: null}
})

export const getProductsRequest = (state, { data }) =>
  state.merge({ ...state, list: { ...state.list, fetching: true, error: null } })
export const getProductsSuccess = (state, { data }) =>
  state.merge({ ...state, list: { ...state.list, data: data.data, page: 1, lastPage: data.lastPage, fetching: false, error: null } })
export const getProductsFailure = (state, { error }) =>
  state.merge({ ...state, list: { ...state.list, fetching: false, error } })

export const moreProductsRequest = (state, { data }) =>
  state.merge({ ...state, list: { ...state.list, isLoadMore: true, error: null } })
export const moreProductsSuccess = (state, { data }) =>
  state.merge({ ...state, list: { ...state.list, data: [...state.list.data, ...data.data], page: data.page, isLoadMore: false, error: null } })
export const moreProductsFailure = (state, { error }) =>
  state.merge({ ...state, list: { ...state.list, isLoadMore: false, error } })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUCTS_REQUEST]: getProductsRequest,
  [Types.GET_PRODUCTS_SUCCESS]: getProductsSuccess,
  [Types.GET_PRODUCTS_FAILURE]: getProductsFailure,

  [Types.MORE_PRODUCTS_REQUEST]: moreProductsRequest,
  [Types.MORE_PRODUCTS_SUCCESS]: moreProductsSuccess,
  [Types.MORE_PRODUCTS_FAILURE]: moreProductsFailure,
})
