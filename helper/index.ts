// import twillio from 'twilio';

// const accountSid = process.env.TWILIO_ACCOUNT_SI;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// export const createTwilioClient = () => twillio(accountSid, authToken);

export const parseError = (error: any) => {
  if (error.response) {
    // Request made and server responded

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
