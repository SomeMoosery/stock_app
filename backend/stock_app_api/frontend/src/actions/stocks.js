export const addStock = text => {
  return{
    type: 'ADD_STOCK',
    text
  }
}

export const updateStock = (id, text) => {
  return {
    type: 'UPDATE_STOCK',
    id,
    text
  }
}

export const deleteStock = id => {
  return{
    type: 'DELETE_STOCK',
    id
  }
}
