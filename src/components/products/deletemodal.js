import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useDeleteProductMutation } from '@/redux/services/productApi'; // Adjust the path as needed

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
                action! {selectedProductId}
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
