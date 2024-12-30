import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import ItemForm from '@/components/ItemForm';
import Modal from '@/components/Modal';
import Loading from '@/components/Loading';

type Item = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export default function item() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState<string>('');
  const [item, setItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState<Item | null>(null);

  const fetchItems = async () => {
    setLoading('loading');
    try {
      const response = await axios.get<Item>(`${API_BASE_URL}/api/items/${id}`);
      console.log('got res', response.data);
      setItem(response.data);
    } catch {
      console.error('Failed fetching notes: ');
    } finally {
      setLoading('');
    }
  };

  useEffect(() => {
    if (id) {
      console.log('got id');
      fetchItems();
    } else {
      console.log('no id');
    }
  }, [id]);
  const handleDelete = async (_id: string) => {
    console.log(_id);
    setLoading('deleting');
    try {
      await axios.delete<Item[]>(`${API_BASE_URL}/api/items/${_id}`);
      router.push('/');
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

  if (!item) {
    return (
      <div className='flex gap-2 m-4'>
        <p>Item Not Found!</p>
        <Link
          className='text-blue-400'
          href='/'>
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 bg-slatde-900 h-screen w-full ctext-black p-4 md:p-8 lg:p-12 '>
      {loading && <Loading status={loading} />}
      <div className='flex items-center gap-6 border-b border-slate-800 py-2'>
        <Link href='/'>
          <ArrowLeftIcon className='w-7 h-7' />
        </Link>
        <h1 className='text-xl font-black'>Item Details</h1>
      </div>
      <div className='flex flex-col gap-2 '>
        <h1 className=' text-sm font-semibold'>Title:</h1>
        <p className='ml-4 py-1.5 px-2 text-lg font-bold  rounded-md bg-slate-700 text-slate-200'>
          {item?.title}
        </p>
      </div>
      <div className='flex flex-col  gap-2 h-max mt-2 '>
        <h1 className='text-sm font-semibold text-wrap'>The Description:</h1>
        <p className='ml-4 py-1.5 px-2 max-h-[400px] text-lg font-bold overflow-y-auto rounded-md bg-slate-700 text-slate-200'>
          {item?.description}
        </p>
      </div>
      <div className='h-full' />
      <div>
        <h1 className='text-slate-300'>
          Last Edit:{' '}
          {new Date(String(item?.createdAt)).toLocaleDateString(
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
        </h1>
      </div>
      <div className='flex space-x-2 md:space-x-4 justify-between w-full h-max mt-auto '>
        <button
          onClick={() => openModal(item as Item)}
          className='w-1/2 max-w-[400px] bg-slate-400 py-2 rounded-md'>
          Edite
        </button>
        <button
          onClick={() => handleDelete(String(id))}
          className='w-1/2 max-w-[400px] bg-red-400 py-2 rounded-md'>
          Delete
        </button>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          //   setItems={setItem}
        >
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
