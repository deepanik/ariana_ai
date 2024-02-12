// api/Api.js
const API_TOKEN = "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";

export const query = async (data) => {
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
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.blob();
    return URL.createObjectURL(result);
  } catch (error) {
    throw new Error(`Error querying the API: ${error.message}`);
  }
}; 
