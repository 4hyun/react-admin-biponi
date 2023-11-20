const pagination = (currentPage: number, data: any[], pageSize = 10) => {
  const indexOfLastTodo = currentPage * pageSize;
  const indexOfFirstTodo = indexOfLastTodo - pageSize;
  const currentData = data.slice(indexOfFirstTodo, indexOfLastTodo);

  return currentData;
};

export default pagination;
