export const addStock = text => {
  console.log(text);
  console.log("Bio: ");
  console.log()
  return{
    type: 'ADD_STOCK',
    text
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
