export const addStock = count => {
  return{
    type: 'ADD_STOCK',
    count
  }
}

export const updateStock = (id, count) => {
  return{
    type: 'UPDATE_STOCK',
    id,
    count
  }
}

export const deleteStock = id => {
  return{
    type: 'DELETE_STOCK',
    id
  }
}
