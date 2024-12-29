import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ItemForm from '../../components/ItemForm';

type Item = {
  id: string;
  title: string;
  description: string;
};

export default function EditItem() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    async function fetchItem() {
      if (id) {
        const response = await fetch(`/api/items/${id}`);
        const data: Item = await response.json();
        setItem(data);
      }
    }
    fetchItem();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
      <ItemForm item={item} />
    </div>
  );
}
