interface requestObj {
  url: string;
  options: {
    method: string;
    headers?: {
      "Content-Type": string;
      Authorization: string;
    };
  };
}

async function makeAsyncCall(
  { url, options }: requestObj,
  onSuccess: any,
  onFailure: any
) {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err: any) => {
      onFailure(err);
    });
}

export default makeAsyncCall;
