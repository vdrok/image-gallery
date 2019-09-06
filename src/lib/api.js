export default async function getImages() {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos');
  return response.json();
}
