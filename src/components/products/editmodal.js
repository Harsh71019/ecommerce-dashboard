import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//Redux Imports
import { useUpdateProductMutation } from '@/redux/services/productApi'; // Adjust the path as needed

//Custom Components
import ImageUpload from '../generic/fileupload/fileupload';

const schema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .min(0, 'Price must be at least 0')
    .required('Price is required'),
  category: yup.string().required('Category is required'),
  brand: yup.string().required('Brand is required'),
  countInStock: yup
    .number()
    .min(0, 'Count in stock must be at least 0')
    .required('Count in stock is required'),
  // images: yup.array().max(5, 'Maximum 5 images allowed'),
});

export default function EditProductModal({
  product,
  onUpdateSuccess,
  isOpen,
  onClose,
  setProduct,
}) {
  const [updateProduct, { data, error, isLoading }] =
    useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      images: product.images,
    };
    await updateProduct({ id: product._id, updatedProduct: data });
  };

  const handleOpen = () => {
    onOpen();
  };

  useEffect(() => {
    if (error) {
      toast.error('Product Update Failed', {
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
      toast.success('Updated Product', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      onUpdateSuccess();
      onClose();
    }
  }, [error, data]);

  const handleFileChange = (dataUrls) => {
    setValue('newImages', dataUrls);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setValue('images', updatedImages);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: updatedImages,
    }));
  };

  return (
    <>
      <Modal backdrop='blur' size='5xl' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className='flex flex-col gap-1'>
                  Edit Product
                </ModalHeader>
                <ModalBody>
                  <div className='flex'>
                    <div className='flex-1 p-3'>
                      <Input
                        label='Product Name'
                        placeholder='Enter product name'
                        variant='bordered'
                        type='text'
                        name='name'
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className='text-red-600'>{errors.name.message}</p>
                      )}
                      <Input
                        label='Description'
                        placeholder='Enter product description'
                        variant='bordered'
                        type='text'
                        name='description'
                        className='mt-5'
                        {...register('description')}
                      />
                      {errors.description && (
                        <p className='text-red-600'>
                          {errors.description.message}
                        </p>
                      )}
                      <Input
                        label='Price'
                        placeholder='Enter product price'
                        variant='bordered'
                        type='number'
                        name='price'
                        className='mt-5'
                        {...register('price')}
                      />
                      {errors.price && (
                        <p className='text-red-600'>{errors.price.message}</p>
                      )}
                    </div>
                    <div className='flex-1 p-3'>
                      <Input
                        label='Category'
                        placeholder='Enter product category'
                        variant='bordered'
                        type='text'
                        name='category'
                        {...register('category')}
                      />
                      {errors.category && (
                        <p className='text-red-600'>
                          {errors.category.message}
                        </p>
                      )}
                      <Input
                        label='Brand'
                        placeholder='Enter product brand'
                        variant='bordered'
                        type='text'
                        name='brand'
                        className='mt-5'
                        {...register('brand')}
                      />
                      {errors.brand && (
                        <p className='text-red-600'>{errors.brand.message}</p>
                      )}
                      <Input
                        label='Count in Stock'
                        placeholder='Enter count in stock'
                        variant='bordered'
                        type='number'
                        name='countInStock'
                        className='mt-5'
                        {...register('countInStock')}
                      />
                      {errors.countInStock && (
                        <p className='text-red-600'>
                          {errors.countInStock.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='p-3'>
                    <ImageUpload
                      label='Upload Images (max 5)'
                      accept='image/*'
                      multiple
                      name='newImages'
                      showPreview
                      theme='dark'
                      {...register('newImages')}
                      onFileChange={handleFileChange} // Pass the callback
                    />
                    <div className='mt-3'>
                      {product &&
                        product.images.map((image, index) => (
                          <div
                            key={index}
                            className='flex items-center gap-2 p-2'
                          >
                            <img
                              src={image.url}
                              alt={`Image ${index + 1}`}
                              className='w-16 h-16 object-cover rounded-md'
                            />
                            <Button
                              color='danger'
                              size='sm'
                              onClick={() => handleDeleteImage(index)}
                            >
                              Delete
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='light' onClick={onClose}>
                    Close
                  </Button>
                  <div>
                    <Button
                      color='primary'
                      type='submit'
                      value='submit'
                      isLoading={isLoading}
                    >
                      Update Product
                    </Button>
                  </div>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
