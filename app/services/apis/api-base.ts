export class InvalidRefreshTokenError extends Error {}

interface MakeRequestProps {
  headers?: { [key: string]: string } | undefined;
  path: string;
  method: string;
  body?: any | undefined;
}

const ACCEPTED_HTTP_CODES = [200, 201];
export class ApiBase {

  static makeRequest = async (requestProps: MakeRequestProps) => {
    const headers: {
      [key: string]: string;
    } = {
      'Content-Type': 'application/json',
      ...requestProps.headers,
    };
    const url = requestProps.path;
    const response = await fetch(url, {
      method: requestProps.method,
      headers,
      body: requestProps.body,
    });

    if (!ACCEPTED_HTTP_CODES.includes(response.status)) {
      throw new Error(`Invalid response from the server: ${response.status}`);
    }

    return response;
  };
}

/**
 * Will remove all null/undefined entries from the object
 * @param {*} obj
 */
export function cleanObject(obj: any) {
  const objClone = { ...obj };
  // eslint-disable-next-line no-restricted-syntax
  for (const propName in objClone) {
    if (objClone[propName] === null || objClone[propName] === undefined) {
      delete objClone[propName];
    }
  }

  return objClone;
}
