import { ParseError } from '../common/exceptions';

export function parseJsonResponse(response: string): any {
  const jsonString = extractJsonString(response);
  let parsedData;

  try {
    parsedData = JSON.parse(jsonString);
  } catch (error) {
    throw new ParseError('Failed to parse JSON', error);
  }

  return parsedData;
}

function extractJsonString(response: string): string {
  const startIndex = response.indexOf("[");
  const endIndex = response.lastIndexOf("]") + 1;

  if (startIndex !== -1 && endIndex !== -1) {
    return response.substring(startIndex, endIndex);
  }

  const startObjectIndex = response.indexOf("{");
  const endObjectIndex = response.lastIndexOf("}") + 1;

  return response.substring(startObjectIndex, endObjectIndex);
}