export const fetchWrapper = async ({
  method,
  collection,
  path,
  requestParams,
}: FetchParams): Promise<any> => {
  try {
    let headers = new Headers();
    headers.append("Authorization", "Bearer TOKEN");

    let url = new URL(`${process.env.API_BASE_URL}/${collection}/${path}`);
    Object.keys(requestParams).forEach((key) =>
      url.searchParams.append(key, requestParams[key])
    );

    const response = await fetch(url, {
      method,
      headers: headers,
    });
    const data = await response.json();

    return data;
  } catch (error) {
    null;
  }
};

type FetchParams = {
  method: string;
  collection: string;
  path: string;
  requestParams: any;
};
