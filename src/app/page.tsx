const getProducts = async () => {
  const res = await fetch('http://localhost:3000/products.json');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const json = await res.json();
  return json.products;
};

const getNames = async () => {
  const res = await fetch('http://localhost:3000/names.json');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const json = await res.json();
  return json;
};

export default async function MainPage() {
  const [products, productGroups] = await Promise.all([
    getProducts(),
    getNames(),
  ]);
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold underline">Привет техлид!</h1>
    </main>
  );
}
