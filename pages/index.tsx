import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import ItemForm from '../components/ItemForm';
import Loading from '../components/Loading';
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export type Item = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
};

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState<Item | null>(null);

  const fetchItems = async () => {
    setLoading('loading');
    try {
      const response = await axios.get<Item[]>(`${API_BASE_URL}/api/items`);
      setItems(response.data);
    } catch {
      console.error('Failed fetching notes: ');
    } finally {
      setLoading('');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (_id: string) => {
    console.log(_id);
    setLoading('deleting');
    try {
      await axios.delete<Item[]>(`${API_BASE_URL}/api/items/${_id}`);
      // console.log(response.data);
      setItems((prevItems) => prevItems.filter((item) => item._id !== _id));
    } catch {
      console.error('got error');
    } finally {
      setLoading('');
    }
  };

  const openModal = (item?: Item) => {
    setModalItem(item || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalItem(null);
  };

  return (
    <div className='flex flex-col container mx-auto p-4 '>
      {loading && <Loading status={loading} />}
      <h1 className='text-2xl font-bold mb-4'>Item List</h1>
      {items.length != 0 && (
        <button
          onClick={() => openModal()}
          className='text-blue-500 mx-auto'>
          <PlusCircleIcon className='w-8 h-8 text-white ' />
        </button>
      )}
      <ul className='flex flex-col mt-4 space-y-4'>
        {items.length > 0 ? (
          items.map((item) => (
            <li
              key={item._id}
              className='border rounded p-4 shadow bg-slate-100 truncate text-wrap oversflow-hidden tegxt-wrap'>
              <h3 className='text-lg text-black font-semibold'>{item.title}</h3>
              <p className='text-sm text-gray-700 mt-2'>{item.description}</p>
              <div className='h-[1px] w-full mb-2 mt-4 bg-slate-400' />
              <div className='flex justify-between  space-x-4 mt-4 w-full'>
                <div className='flex gap-5  w-max'>
                  <button
                    onClick={() => openModal(item)}
                    className='text-blue-500'>
                    <PencilIcon className='w-5 h-5' />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='text-red-500'>
                    <TrashIcon className='w-5 h-5' />
                  </button>
                </div>
                <div className='flex gap-1 text-xs w-auto justify-end'>
                  <h1 className=' text-slate-800'>Updated:</h1>
                  <p className='  text-slate-600'>
                    {new Date(item.createdAt).toLocaleDateString(
                      'en-US-u-nu-latn',
                      {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className='flex flex-col h-full w-full border bg-[#852ed7] border-white p-2 rounded-lg justify-center items-center'>
            <h1 className='text-lg font-semibold'>Add Your First Note Now!</h1>
            <button
              onClick={() => openModal()}
              className='m-auto p-2 rounded-xl text-purple-900 focus:outline-none'>
              <PlusCircleIcon className='w-12 h-12 text-white ' />
            </button>
          </div>
        )}
      </ul>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          setItems={setItems}>
          <ItemForm
            item={modalItem as Item}
            onClose={closeModal}
            fetchItems={fetchItems}
            setLoading={setLoading}
          />
        </Modal>
      )}
    </div>
  );
}
