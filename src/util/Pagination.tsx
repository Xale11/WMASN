export const paginateData = (page: number, limit: number, length: number) => {
  const startPoint = (page - 1) * limit
  let endPoint = (page * limit) 
  if (endPoint > length){
    endPoint = length
  }
  let maxPage = length / limit
  if (maxPage < 1){
    maxPage = 1
  }
  return {start: startPoint, end: endPoint, maxPage: Math.ceil(maxPage)}
}