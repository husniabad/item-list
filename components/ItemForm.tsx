import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

type ItemFormProps = {
  item?: {
    _id: string;
    title: string;
    description: string;
  };
  fetchItems: () => void;
  onClose: () => void;
  setLoading: Dispatch<SetStateAction<string>>;
};

export default function ItemForm({
  item,
  onClose,
  fetchItems,
  setLoading,
}: ItemFormProps) {
  const [title, setTitle] = useState(item?.title || '');
  const [description, setDescription] = useState(item?.description || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, description };

    if (item) {
      setLoading('updating');
      console.log('put', item);
      try {
        await axios.put(`${API_BASE_URL}/api/items/${item._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: data,
        });
      } catch  {
        console.error('Failed updating note:');
      }
    } else {
      try {
        setLoading('adding');
        const response = await axios.post(`${API_BASE_URL}/api/items`, {
          body: data,
        });
        console.log('response', response.data);
      } catch  {
        console.error('Failed to add note');
      }
    }

    // router.push('/');
    onClose();
    fetchItems();
    setLoading('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col space-y-4'>
      <div>
        <label className='block text-black font-medium'>Title:</label>
        <input
          type='text'
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className='w-full border text-slate-500 rounded-lg p-2 focus:outline-none'
        />
      </div>
      <div>
        <label className='block text-black font-medium'>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full border text-slate-500 rounded-lg p-2 focus:outline-none'
        />
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'>
        {item ? 'Update' : 'Add'} Item
      </button>
    </form>
  );
}
