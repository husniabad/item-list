import { Item } from '@/pages';
import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  setItems: Dispatch<SetStateAction<Item[]>>;
}

export default function Modal({
  isOpen,
  closeModal,
  children,
}: ModalProps) {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-50' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-100 p-6 text-left align-middle shadow-xl transition-all'>
                <button
                  onClick={closeModal}
                  className='absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-800'>
                  <XMarkIcon className='w-6 h-6 text-red-400 ' />
                </button>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
