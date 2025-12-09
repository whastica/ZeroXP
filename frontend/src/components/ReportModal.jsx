// src/components/ReportModal.jsx
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from './ui/Button';

export default function ReportModal({ isOpen, onClose, job, user }) {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert('Debes iniciar sesión');
    alert(`Reportaste el trabajo ${job?.title} con razón: "${reason}"`);
    setReason('');
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
                <Dialog.Title className="text-lg font-bold mb-4">
                  Reportar Trabajo: {job?.title}
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <textarea
                    placeholder="Describe la razón del reporte"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2"
                    rows={4}
                    required
                  />

                  <div className="flex justify-end gap-2 mt-2">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                      Reportar
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
