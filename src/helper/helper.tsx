export const getData = async (url: any): Promise<any> => {
  const data = await (await fetch(url)).json();
  return data;
};
