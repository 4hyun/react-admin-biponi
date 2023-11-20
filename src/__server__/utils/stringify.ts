const stringify = (data: any) => {
  const stringData = JSON.stringify(data);
  return JSON.parse(stringData);
};

export default stringify;
