async function convertUrlToImageFile(url) {
  try {
    // Fetch the image from the URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Image fetch failed");
    }

    const imageBlob = await response.blob();

    return imageBlob;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export { convertUrlToImageFile };
