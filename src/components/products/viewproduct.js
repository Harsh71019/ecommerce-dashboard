import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles

const ViewProductModal = ({ product, isOpen, onClose }) => {
  return (
    <Modal backdrop='blur' size='5xl' isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1 text-white'>
              View Product
            </ModalHeader>
            <ModalBody>
              <div className='flex gap-6'>
                <div className='w-1/2'>
                  <Carousel showThumbs={false}>
                    {product.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image.url}
                          alt={`Image ${index + 1}`}
                          className='w-full h-auto rounded-lg mb-4'
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
                <div className='w-1/2 text-white'>
                  <h2 className='text-xl font-semibold'>{product.name}</h2>
                  <p className='text-gray-300'>{product.description}</p>
                  <div className='mt-4'>
                    <p className='text-gray-400'>
                      Category: {product.category}
                    </p>
                    <p className='text-gray-400'>Brand: {product.brand}</p>
                    <p className='text-gray-400'>Price: ₹{product.price}</p>
                    <p className='text-gray-400'>
                      Count in Stock: {product.countInStock}
                    </p>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewProductModal;
