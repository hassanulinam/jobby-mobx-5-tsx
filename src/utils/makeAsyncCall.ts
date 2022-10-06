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
  onSuccess: (data: any) => void,
  onFailure: (err: any) => void
) {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err) => {
      onFailure(err);
    });
}

export default makeAsyncCall;
