export const parseError = (error: any) => {
  if (error.response) {
    // Request made and server responded
    return `${error.response.data.errorMsg}`;
  } else if (error.request) {
    // The request was made but no response was received
    return `${error.request}`;
  } else {
    // Something happened in setting up the request that triggered an Error
    return `${error.message}`;
  }
};

export const getCurrentISODate = (): string => {
  const date = new Date();
  return date.toISOString();
};

export const getCurrentTimeStamp = (): string => {
  const date = new Date();
  return date.toLocaleTimeString();
};
