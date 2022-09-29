async function makeAsyncCall(
  { url, options }: any,
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
