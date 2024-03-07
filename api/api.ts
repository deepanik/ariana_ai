// api/api.ts
const API_TOKEN = "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";

interface QueryData {
  inputs: string;
  // Add other required properties in the data object
}

export const query = async (data: QueryData): Promise<string> => {
  try {
    // Add a random string to the input to introduce variability
    const randomString = Math.random().toString(36).substring(7);
    const inputWithRandomness = data.inputs + randomString;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/SaiRaj03/Text_To_Image",
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ...data, inputs: inputWithRandomness }),
      }
    );

    if (!response.ok) {
      console.error(`API request failed with status ${response.status}`);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.blob();
    return URL.createObjectURL(result);
  } catch (error) {
    console.error(`Error querying the API: ${error.message}`);
    throw error;
  }
};
