import React, { useState } from 'react';
import styles from './fileupload.module.css';
import { toast } from 'react-toastify';

function ImageUpload({
  name,
  label,
  accept,
  multiple,
  showPreview = true,
  theme = 'light',
  onFileChange,
  number,
  maxWidth,
  maxHeight,
  maxSizeKB,
  ...rest
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  // const handleFileChange = (event) => {
  //   const files = event.target.files;
  //   setSelectedFiles(files);
  //   const newPreviewUrls = Array.from(files).map((file) =>
  //     URL.createObjectURL(file)
  //   );
  //   setPreviewUrls(newPreviewUrls);

  //   if (onFileChange) {
  //     const newFileDataUrls = Array.from(files).map((file) => {
  //       const reader = new FileReader();
  //       return new Promise((resolve) => {
  //         reader.onload = () => {
  //           resolve(reader.result);
  //         };
  //         reader.readAsDataURL(file);
  //       });
  //     });

  //     Promise.all(newFileDataUrls).then((dataUrls) => {
  //       onFileChange(dataUrls);
  //     });
  //   }
  // };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newSelectedFiles = [];
    const newPreviewUrls = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = function () {
        const img = new Image();

        img.onload = function () {
          if (
            (maxWidth && img.width > maxWidth) ||
            (maxHeight && img.height > maxHeight)
          ) {
            toast.error(
              `Image dimensions exceed the maximum allowed size (${maxWidth}x${maxHeight})`,
              {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
              }
            );
          } else if (maxSizeKB && file.size > maxSizeKB * 1024) {
            toast.error(
              `File size exceeds the maximum allowed size (${maxSizeKB} KB)`,
              {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
              }
            );
          } else {
            newSelectedFiles.push(file);
            newPreviewUrls.push(URL.createObjectURL(file));
          }

          if (newSelectedFiles.length === files.length) {
            setSelectedFiles(newSelectedFiles);
            setPreviewUrls(newPreviewUrls);

            if (onFileChange) {
              const newFileDataUrls = newSelectedFiles.map((file) => {
                const reader = new FileReader();
                return new Promise((resolve) => {
                  reader.onload = () => {
                    resolve(reader.result);
                  };
                  reader.readAsDataURL(file);
                });
              });

              Promise.all(newFileDataUrls).then((dataUrls) => {
                onFileChange(dataUrls);
              });
            }
          }
        };

        img.src = reader.result;
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    let files = event.dataTransfer.files;
    if (files.length > number) {
      files = Array.from(files).slice(0, number);
      toast.error(`Cannot upload more than ${number} images`, {
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
    setSelectedFiles(files);
    const newPreviewUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewUrls(newPreviewUrls);

    if (onFileChange) {
      const newFileDataUrls = Array.from(files).map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newFileDataUrls).then((dataUrls) => {
        onFileChange(dataUrls);
      });
    }
  };

  const handleDelete = (index) => {
    const newSelectedFiles = [...selectedFiles];
    const newPreviewUrls = [...previewUrls];
    newSelectedFiles.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
    setPreviewUrls(newPreviewUrls);

    if (onFileChange) {
      const newFileDataUrls = newSelectedFiles.map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newFileDataUrls).then((dataUrls) => {
        onFileChange(dataUrls);
      });
    }
  };

  const containerClassName = theme === 'dark' ? 'bg-zinc-900' : 'bg-white';
  const borderClassName = dragOver
    ? 'border-blue-500'
    : 'border-r border-divider';

  return (
    <div
      className={`mb-4 p-4 rounded border ${borderClassName} ${containerClassName}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {label && <label className='block font-semibold mb-1'>{label}</label>}
      <input
        type='file'
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className='hidden'
        {...rest}
      />
      <div className='mb-2'>
        <p className='text-gray-500'>
          Drag &amp; drop your images here, or click to select files.
        </p>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        {showPreview &&
          previewUrls.map((url, index) => (
            <div key={index} className='relative'>
              <img
                src={url}
                alt={`Preview ${index}`}
                className={styles.previewImages}
              />
              <button
                className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full'
                onClick={() => handleDelete(index)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='12'
                  height='12'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                  <line x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ImageUpload;
