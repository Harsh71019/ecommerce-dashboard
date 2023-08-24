import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, Textarea } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { FloppyDisk, PlusCircle, Trash } from 'phosphor-react';
import ImageUpload from '@/components/generic/fileupload/fileupload';

const schema = yup.object().shape({
  hero: yup.object().shape({
    title: yup.string().required('Title is required'),
    subtitle: yup.string().required('Subtitle is required'),
    textColor: yup.string().required('Text Color is required'),
    buttonText: yup.string().required('Button Text is required'),
    buttonLink: yup.string().required('Button Link is required'),
  }),
  frontPage: yup.object().shape({
    welcomeMessage: yup.string().required('Welcome message is required'),
    featuredProducts: yup
      .array()
      .of(yup.string().required('Product is required')),
    testimonials: yup.array().of(
      yup.object().shape({
        author: yup.string().required('Author is required'),
        text: yup.string().required('Testimonial text is required'),
      })
    ),
  }),
  mobile: yup.string().required('Mobile Number is required'),
  email: yup.string().required('Email Address is required'),
  logo: yup.string().required('Logo URL is required'),
});

export default function SettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({
    // resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [testimonials, setTestimonials] = useState([{ author: '', text: '' }]);

  const addTestimonial = () => {
    setTestimonials([...testimonials, { author: '', text: '' }]);
  };

  const removeTestimonial = (index) => {
    if (testimonials.length > 1) {
      const updatedTestimonials = [...testimonials];
      updatedTestimonials.splice(index, 1);
      setTestimonials(updatedTestimonials);
    }
  };

  const handleLogoChange = (dataUrls) => {
    setValue('logo', dataUrls);
  };

  const handleHeroChange = (dataUrls) => {
    setValue('hero.backgroundImage', dataUrls);
  };

  const onSubmit = (data) => {
    // Handle form submission, e.g., update settings in the backend
    console.log(data);
    toast.success('Settings updated successfully');
  };

  return (
    <div className='container mx-auto'>
      <div className='p-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Hero Section */}
          <h2 className='text-2xl mb-3'>Settings</h2>
          <div div className='flex'>
            <div className='flex-1'>
              <h2 className='text-lg font-semibold mb-2'>
                Generic Information
              </h2>
              <Input
                className='mt-3 pr-5'
                label='Email Address'
                placeholder='Enter email address'
                variant='bordered'
                type='text'
                name='name'
                {...register('email')}
              />
              {errors.email && (
                <p className='text-red-600'>{errors.email.message}</p>
              )}
              <Input
                className='mt-3 pr-5'
                label='Phone Number'
                placeholder='Enter phone number'
                variant='bordered'
                type='tel'
                maxLength={10}
                max={10}
                name='mobile'
                {...register('mobile')}
              />
              {errors.mobile && (
                <p className='text-red-600'>{errors.mobile.message}</p>
              )}
              <Input
                className='mt-3 pr-5'
                label='Welcome message'
                placeholder='Enter message'
                variant='bordered'
                type='text'
                name='name'
                {...register('frontPage.welcomeMessage')}
              />
              {errors.email && (
                <p className='text-red-600'>{errors.email.message}</p>
              )}

              <Textarea
                className='mt-3 pr-5'
                label='Enter product Ids'
                placeholder='Enter product id comma seperated'
                variant='bordered'
                type='text'
                name='frontPage.featuredProducts'
                {...register('frontPage.featuredProducts')}
              />
              {errors.email && (
                <p className='text-red-600'>{errors.email.message}</p>
              )}
            </div>
            <div className='flex-1'>
              <h2 className='text-lg font-semibold mb-2'>Hero Section</h2>
              <Input
                className='mt-3'
                label='Title'
                placeholder='Enter title'
                variant='bordered'
                type='text'
                name='hero.title'
                {...register('hero.title')}
              />
              {errors.hero?.title && (
                <p className='text-red-600'>{errors.hero.title.message}</p>
              )}

              <Input
                className='mt-3'
                label='Subtitle'
                placeholder='Enter subtitle'
                variant='bordered'
                type='text'
                name='hero.subtitle'
                {...register('hero.subtitle')}
              />
              {errors.hero?.subtitle && (
                <p className='text-red-600'>{errors.hero.subtitle.message}</p>
              )}

              <Input
                className='mt-3'
                label='Text Color'
                placeholder='Enter text color'
                variant='bordered'
                type='text'
                name='hero.textColor'
                {...register('hero.textColor')}
              />
              {errors.hero?.textColor && (
                <p className='text-red-600'>{errors.hero.textColor.message}</p>
              )}

              <Input
                className='mt-3'
                label='Button Text'
                placeholder='Enter button text'
                variant='bordered'
                type='text'
                name='hero.buttonText'
                {...register('hero.buttonText')}
              />
              {errors.hero?.buttonText && (
                <p className='text-red-600'>{errors.hero.buttonText.message}</p>
              )}
              <Input
                className='mt-3'
                label='Button Link'
                placeholder='Enter button link'
                variant='bordered'
                type='url'
                name='hero.buttonLink'
                {...register('hero.buttonLink')}
              />
              {errors.hero?.buttonLink && (
                <p className='text-red-600'>{errors.hero.buttonLink.message}</p>
              )}
            </div>
          </div>
          <h2 className='text-lg font-semibold mb-2'>Testimonials</h2>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='flex mb-3'>
              <Input
                className='pr-3'
                label={`Author #${index + 1}`}
                placeholder='Enter author'
                variant='bordered'
                type='text'
                name={`frontPage.testimonials[${index}].author`}
                {...register(`frontPage.testimonials[${index}].author`)}
              />
              <Input
                label={`Text #${index + 1}`}
                placeholder='Enter text'
                variant='bordered'
                type='text'
                name={`frontPage.testimonials[${index}].text`}
                {...register(`frontPage.testimonials[${index}].text`)}
              />
              {index !== 0 && (
                <span
                  className='cursor-pointer flex items-center ms-2' // Added flex and items-center
                  onClick={() => removeTestimonial(index)}
                >
                  <Trash size={22} color='red' weight='fill' />
                </span>
              )}
            </div>
          ))}

          <Button
            color='secondary'
            onClick={addTestimonial}
            startContent={<PlusCircle size={22} color='white' weight='fill' />}
          >
            Add Testimonial
          </Button>

          <div className='mt-5'>
            <h2 className='text-lg font-semibold mb-2'>Logo</h2>
            <ImageUpload
              label='Upload Images (max 1)'
              accept='image/*'
              multiple
              name='logo'
              showPreview
              theme='dark'
              {...register('logo')}
              onFileChange={handleLogoChange} // Pass the callback
              number='1'
              maxHeight={500}
              maxWidth={500}
              maxSizeKB={100}
            />
          </div>

          <div className='mt-5'>
            <h2 className='text-lg font-semibold mb-2'>Homepage Carousel</h2>
            <ImageUpload
              label='Upload Images (max 5)'
              accept='image/*'
              multiple
              name='hero'
              showPreview
              theme='dark'
              {...register('hero')}
              onFileChange={handleHeroChange} // Pass the callback
              number='5'
            />
          </div>

          <div className='flex justify-end'>
            <Button
              color='primary'
              type='submit'
              startContent={
                <FloppyDisk size={22} color='white' weight='fill' />
              }
            >
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
