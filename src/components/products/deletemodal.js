import React, { useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useDeleteProductMutation } from '@/redux/services/productApi'; // Adjust the path as needed
import { toast } from 'react-toastify';

export default function DeleteProduct({
  isOpen,
  onClose,
  selectedProductId,
  onDeleteSuccess,
}) {
  const [deleteProduct, { data, error, isLoading }] =
    useDeleteProductMutation();

  async function deleteProductFinal(id) {
    await deleteProduct(id);
  }

  useEffect(() => {
    if (error) {
      toast.error('Product Delete Failed', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }

    if (data) {
      toast.success('Deleted Product Successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }, [error, data]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Delete Product
              </ModalHeader>
              <ModalBody>
                Are you sure you wanna delete the product this is a irrevesible
                action!
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  color='danger'
                  variant='light'
                  onClick={() => {
                    deleteProductFinal(selectedProductId);
                    onClose();
                    if (!error) {
                      onDeleteSuccess();
                    }
                  }}
                >
                  Yes
                </Button>
                <Button color='primary' onPress={onClose}>
                  No
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
