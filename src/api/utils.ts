export const errorInstance = {
  succeed: false,
  data: null,
};

const transformResponse = (response: any) => {
  if (response.status === 200 && response.data.succeed) {
    return {
      succeed: true,
      data: response.data.data,
    };
  }
  return errorInstance;
};

export const fetchApiAsync = async (cb: any) => {
  try {
    return transformResponse(await cb());
  } catch {
    return errorInstance;
  }
};
