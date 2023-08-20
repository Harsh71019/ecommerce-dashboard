import React, { useState, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

//Redux Imports
import { useCreateProductMutation } from '@/redux/services/productApi'; // Adjust the path as needed

//Custom Components
import ImageUpload from '../generic/fileupload';

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
  discount: yup
    .number()
    .min(0, 'Discount must be at least 0')
    .max(100, 'Discount cannot be more than 100'),
});

export default function AddProductModal() {
  const router = useRouter();

  const [createProduct, { data, error, isLoading }] =
    useCreateProductMutation();
  const [attributes, setAttributes] = useState([
    { name: '', value: '' }, // Initial empty attribute
  ]);

  const addAttributeInput = () => {
    setAttributes([...attributes, { name: '', value: '' }]);
  };

  const handleAttributeChange = (index, field, fieldValue) => {
    const updatedAttributes = attributes.map((attr, i) =>
      i === index ? { ...attr, [field]: fieldValue } : attr
    );
    setAttributes(updatedAttributes);
  };

  const removeAttribute = (index) => {
    const updatedAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(updatedAttributes);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      attributes,
    };
    await createProduct(finalData);
  };

  const handleFileChange = (dataUrls) => {
    setValue('images', dataUrls);
  };

  useEffect(() => {
    if (error) {
      toast.error('Product Add Failed', {
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
      toast.success('Added Product', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      router.push('/dashboard/products');

      reset();
    }
  }, [error, data]);

  return (
    <>
      <h1 className='p-3 text-xl'>Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <p className='text-red-600'>{errors.description.message}</p>
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

            <Input
              label='Discount'
              placeholder='Enter product discount'
              variant='bordered'
              type='number'
              name='description'
              className='mt-5'
              {...register('description')}
            />
            {errors.description && (
              <p className='text-red-600'>{errors.description.message}</p>
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
              <p className='text-red-600'>{errors.category.message}</p>
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
              <p className='text-red-600'>{errors.countInStock.message}</p>
            )}
          </div>
        </div>

        <div className='p-3'>
          <h2 className='text-lg font-semibold mb-2'>Attributes</h2>
          {attributes.map((attr, index) => (
            <div key={index} className='flex mb-3'>
              <Input
                label='Attribute'
                placeholder='Attribute Name (For eg: Color)'
                variant='bordered'
                type='text'
                value={attr.name}
                onChange={(e) =>
                  handleAttributeChange(index, 'name', e.target.value)
                }
                className='mr-2'
              />
              <Input
                label='Value'
                placeholder='Attribute Value (for eg: Red)'
                variant='bordered'
                type='text'
                value={attr.value}
                onChange={(e) =>
                  handleAttributeChange(index, 'value', e.target.value)
                }
              />

              {index !== 0 && (
                <span
                  className='cursor-pointer flex items-center ms-2' // Added flex and items-center
                  onClick={() => removeAttribute(index)}
                >
                  <svg
                    className='remove-icon'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='red'
                    width='24px'
                    height='24px'
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
                  </svg>
                </span>
              )}
            </div>
          ))}
          <Button color='secondary' onClick={addAttributeInput}>
            + Add Attribute
          </Button>
        </div>

        <div className='p-3'>
          <ImageUpload
            label='Upload Images (max 5)'
            accept='image/*'
            multiple
            name='images'
            showPreview
            theme='dark'
            {...register('images')}
            onFileChange={handleFileChange} // Pass the callback
            number='5'
          />
        </div>

        <div className='flex justify-end p-3'>
          <Button
            color='primary'
            type='submit'
            value='submit'
            isLoading={isLoading}
            isDisabled={!isValid}
          >
            Save Product
          </Button>
        </div>
      </form>
    </>
  );
}
