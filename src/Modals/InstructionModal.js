
import React, { useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
//context
//context
import { useComponentContext } from '../context/componentContext';

const FundEthModal = () => {
    const { instructionsModal,
        SetInstuctionModal } = useComponentContext()




    function closeModal() {
        SetInstuctionModal(false)
    }
    return (
        <>
            <Transition appear show={instructionsModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-bg-color-Primary p-6 text-left text-white align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-bold leading-6 text-textcolor3"
                                    >
                                        ADD TRON WALLET

                                    </Dialog.Title>
                                    <div className="flex flex-col  mt-8">

                                        <div>1- Go to Google extension</div>
                                        <div>2- Sreach TronLink and add to Chrome </div>
                                        <div>3- Make a wallet on TronLink</div>
                                        <div className='font-bold mt-2'>Already Installed</div>
                                        <div>Unlock Your TronLink wallet and try again</div>


                                    </div>

                                    <a href='https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec?hl=en' target='_blank' className="mt-8 flex justify-center bg-yellow-200/20 rounded-md py-1">
                                        Install Tron Wallet

                                    </a>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default FundEthModal
