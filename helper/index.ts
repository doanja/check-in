export const parseError = (error: any) => {
  if (error.response) {
    // Request made and server responded
    console.log(error.response.data);

    // does not show helpful info
    // console.log(error.response.status);
    // console.log(error.response.headers);

    return `${error.response.data.errorMsg}`;
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
    return `${error.request}`;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    return `${error.message}`;
  }
};

export const getCurrentTimeStamp = (): string => {
  const date = new Date();
  const localTime = date.toLocaleTimeString();
  return localTime.replace(/:\d+ /, ' ');
};
