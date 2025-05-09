'use client'

import React, { useState } from 'react'
import { Button, DialogContent, List, IconButton, Typography, Avatar, CircularProgress, ListItem } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { useParams, useRouter } from 'next/navigation'
import { showToast } from '@/utils/showToast'
import { formatFileSize } from '@/utils/formatters'
import { styled } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'

// Styled Component Imports
import AppReactDropzone from '@/libs/styles/AppReactDropzone'
import { createGalleryItem } from '@/libs/api/galleyItem'

// Styled Dropzone Component
const Dropzone = styled(AppReactDropzone)<BoxProps>(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight
    }
  }
}))

type FileProp = {
  name: string
  type: string
  size: number
}

const CreateMediaModal = () => {
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const maxFiles = 5
  const router = useRouter()

  const { id: galleryId } = useParams<{ id: string }>()

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setFiles([])
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles: File[], fileRejections) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        showToast({ type: 'error', message: `حداکثر ${maxFiles} فایل می‌توانید انتخاب کنید!` })

        return
      }

      if (fileRejections.length > 0) {
        showToast({ type: 'error', message: 'فقط فایل‌های تصویری مجاز هستند!' })

        return
      }

      setFiles([...files, ...acceptedFiles.map((file: File) => Object.assign(file))])
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <i className='tabler-file-description' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const filtered = files.filter((i: FileProp) => i.name !== file.name)

    setFiles([...filtered])
  }

  const handleSubmit = async () => {
    if (!files.length) {
      showToast({ type: 'error', message: 'هیچ فایلی انتخاب نشده است!' })

      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()

      files.forEach(file => {
        formData.append('image', file)
      })
      formData.append('galleryId', galleryId)

      const res = await createGalleryItem(formData)

      if (res?.status === 200 || res?.status === 201) {
        showToast({ type: 'success', message: 'آپلود فایل با موفقیت انجام شد' })

        router.refresh()
        handleClose()
      } else {
        showToast({ type: 'error', message: 'خطایی در آپلود رخ داد!' })
      }
    } catch (error) {
      console.error('Error uploading files:', error)
      showToast({ type: 'error', message: 'خطایی در ارتباط با سرور رخ داد!' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem
      key={file.name}
      className='pis-4 plb-3'
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginBottom: '8px',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div className='file-details' style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <div className='file-preview' style={{ marginLeft: '10px' }}>
          {renderFilePreview(file)}
        </div>
        <div>
          <Typography className='file-name font-medium' color='text.primary'>
            {file.name}
          </Typography>
          <Typography className='file-size' variant='body2'>
            {formatFileSize(file.size)}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <i className='tabler-x text-xl' />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <>
      <Dropzone>
        <Button variant='contained' className='max-sm:w-full' onClick={handleOpen} startIcon={<i className='tabler-plus' />}>
          آپلود فایل جدید
        </Button>

        <CustomDialog
          open={open}
          onClose={handleClose}
          title='آپلود فایل جدید'
          defaultMaxWidth='md'
          actions={
            <>
              <Button onClick={handleClose} color='secondary'>
                انصراف
              </Button>
              <Button
                onClick={handleSubmit}
                variant='contained'
                disabled={!files.length || isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} color='inherit' /> : null}
              >
                {isSubmitting ? 'در حال آپلود...' : 'آپلود'}
              </Button>
            </>
          }
        >
          <DialogContent>
            <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #ccc', padding: 20, textAlign: 'center', marginBottom: 16 }}>
              <input {...getInputProps()} />
              <div className='flex items-center flex-col'>
                <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
                  <i className='tabler-upload' />
                </Avatar>
                <Typography variant='h6'>تصویر خود را اینجا بکشید و رها کنید.</Typography>
                <Typography color='text.disabled'>یا</Typography>
                <Button className='mt-2' onClick={e => e.preventDefault()} variant='tonal' size='small'>
                  مرور تصویر
                </Button>
                <Typography className='mt-4' color='text.disabled'>
                  حداکثر {maxFiles} تصویر می‌توانید آپلود کنید
                </Typography>
              </div>
            </div>
            {files.length > 0 && (
              <>
                <List>{fileList}</List>
                <Button color='error' variant='outlined' onClick={handleRemoveAllFiles} style={{ marginTop: 8 }}>
                  حذف همه
                </Button>
              </>
            )}
          </DialogContent>
        </CustomDialog>
      </Dropzone>
    </>
  )
}

export default CreateMediaModal
