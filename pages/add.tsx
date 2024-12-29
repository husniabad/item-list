import ItemForm from '../components/ItemForm';

export default function AddItem() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <ItemForm />
    </div>
  );
}