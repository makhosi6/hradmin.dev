import { FetchParams, Status } from "./global_types";

export const fetchWrapper = async ({
  method,
  collection,
  path,
  requestParams = {},
  body,
}: FetchParams): Promise<any> => {
  try {
    let headers = new Headers();
    headers.append("Authorization", "Bearer TOKEN");
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002/api";
    let url = new URL(`${baseUrl}/${collection}/${path}`);

    console.log({ URL: url.toString(), requestParams });
    if (JSON.stringify(requestParams) != "{}") {
      Object.keys(requestParams).forEach((key) =>
        url.searchParams.append(key, requestParams[key])
      );
    }

    const response = await fetch(url, {
      method,
      headers: headers,
      body: body || undefined,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log({ error });

    null;
  }
};


export function statusAsBool(status: string){
  return status.toLowerCase() == Status.active
}