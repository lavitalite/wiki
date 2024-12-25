import './style.css'
import './styles/fileUploader.css'
import './utils/svg-symbol-register.js'
import {FileUploader} from './components/file-upload.js'

const uploader = new FileUploader({
  container: document.querySelector('.docs-content-body'),
  acceptedFileTypes: ['image/*', 'application/pdf'],
  maxFileSize: 5 * 1024 * 1024,
  maxFileCount: 5,
  autoUpload: true,
  showThumbnails: true,
  onUploadSuccess(file){
    console.log('upload with file ->', file)
  }
})

