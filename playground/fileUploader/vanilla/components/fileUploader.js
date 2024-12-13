import { DISPLAY_TEXT, FILE_STATUS } from "../utils/constants.js"
import { checkFileType, formatFile, genThumbnail } from "../utils/fileUtils.js"


export class FileUploader {
  constructor(options = {}) {
    this.options = {
      container: null,
      acceptedFileTypes: [],
      maxFileSize: Infinity,
      maxFileCount: Infinity,
      showThumbnails: true,
      onUploadSuccess: null,
      onUploadFaile: null,
      ...options
    }
    this.files = new Map()
    this.init()
  }

  init() {
    this.createUI();
    this.setupEventListeners();
  }
  createUI() {
    const container = document.createElement('div')
    container.className = 'file-uploader'
    const dropZone = document.createElement('div')
    dropZone.className = 'file-uploader__dropzone'
    dropZone.innerHTML = `
      <span class="file-uploader__dropzone-icon"> 
        <span class="x-icon">
         <svg >
          <use href="#uil--file-upload" />
         </svg>
        </span>
      </span>
      <p>${DISPLAY_TEXT.dropFilesText}</p>
      <button class="file-uploader__browse>${DISPLAY_TEXT.browseFilesText}</button>
      <input type="file" class="file-uploader__input" multiple hidden>
  `
    const fileList = document.createElement('div')
    fileList.className = 'file-uploader__list'
    container.appendChild(dropZone)
    container.appendChild(fileList)
    this.options.container.appendChild(container)
    this.elements = {
      dropZone,
      fileList,
      input: dropZone.querySelector('input'),
      browseButton: dropZone.querySelector('button')
    }
  }

  setupEventListeners() {
    const { dropZone, input, browseButton, fileList } = this.elements


    // dropZone events
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault()
      dropZone.classList.add('file-uploader__dropzone--active')
    })

    dropZone.addEventListener('dragleave', (e) => {
      dropZone.classList.remove('file-uploader__dropzone--active')
    })

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault()
      dropZone.classList.remove('file-uploader__dropzone--active')
      this.handleFiles(Array.from(e.dataTransfer.files))
    })

    // File Items drag events
    fileList.addEventListener('dragStart', (e) => {
      const fileItem = e.target.closest('.file-uploader__item')
      if (fileItem) {
        e.dataTransfer.setData('text/plain', fileItem.dataset.fileId)
        fileItem.classList.add('file-uploader__item--dragging')
      }
    })

    fileList.addEventListener('dragend', (e) => {
      const fileItem = e.target.closest('.file-uploader__item')
      if (fileItem) {
        fileItem.classList.remove('file-uploader__item--dragging')
      }
    })

    // Delete zone events
    dropZone.addEventListener('dragenter', (e) => {
      // receice the drop event
      e.preventDefault()
      if (e.dataTransfer.types.include('text/plain')) {
        dropZone.classList.add('file-uploader__dropzone--delete')
      }
    })

    dropZone.addEventListener('dragleave', (e) => {
      dropZone.classList.remove('file-uploader__dropzone--delete')
    })


    dropZone.addEventListener('drop', (e) => {
      e.preventDefault()
      dropZone.classList.remove('file-uploader__dropzone--delete')
      const fileId = e.dataTransfer.getData('text/plain')
      if (fileId) {
        this.deleteFile(fileId)
      }
    })


  }

  deleteFile(fileId) {
    const fileData = this.files.get(fileId)
    if (!fileId) return
    // remove from UI
    const fileElem = this.elements.fileList.querySelector(`[data-file-id="${fileId}"]`)
    if (fileElem) {
      fileElem.remove()
    }

    // remove from data strcture
    this.files.delete(fileId)
  }
  async handleFiles(fileList) {
    const validFiles = fileList.filter(file => {
      const isValidType = checkFileType(file, this.options.acceptedFileTypes)
      const isValidSize = file.size <= this.options.maxFileSize
      return isValidType && isValidSize
    })

    for (const file of validFiles) {
      const fileId = crypto.randomUUID()
      const thumbnail = this.options.showThumbnails ? await genThumbnail(file) : null
      this.files.set(fileId, {
        id: fileId,
        file,
        status: this.options.autoUpload ? FILE_STATUS.UPLOADING : FILE_STATUS.QUEUED,
        progress: 0,
        thumbnail
      })

      this.renderFile(fileId)

      if (this.otpions.autoUpload) {
        this.uploadFile(fileId)
      }
    }
  }
  renderFile(fileId) {
    const fileData = this.files.get(fileId)
    const fileElement = document.createElement('div')
    fileElement.className = 'file-uploader__item'
    fileElement.dataset.fileId = fileId
    fileElement.draggable = true

    fileElement.innerHTML = `
      ${fileData.thumbnail ? `<img src="${fileData.thumbnail}" class="file-uploader__thumbnail">` : ''}
      <div class="file-uploader__info">
        <div class="file-uploader__name">${fileData.file.name}</div>
        <div class="file-uploader__size">${formatFile(fileData.file.size)}</div>
        <div class="file-uploader__progress">
          <div class="file-uploader__progress-bar" style="wdith: ${fileData.progress}%"></div>
        </div>
      </div>
      <div class="file-uploader__actions>
        ${this.renderFileActions(fileData)}
      </div>
    `
    this.elements.fileList.appendChild(fileElement)
  }

  renderFileActions(fileData) {
    switch (fileData.status) {
      case FILE_STATUS.ADDED:
        reuturn`<button class="file-uploader__action-upload">上传</button>`
      case FILE_STATUS.UPLOADING:
        return `<button class="file-uploader__action-pause>暂停</button>`
      case FILE_STATUS.PAUSED:
        return `<button class="file-uploader__action-resume>恢复</button>`
      case FILE_STATUS.UPLOADED:
        return `<button class="file-uploader__action-delete>删除</button>`
    }
  }

  uploadFile(fileId) {
    const fileData = this.files.get(fileId)
    if (!fileData) return

    let progress = 0
    // 模拟上传进度
    const interval = setInterval(() => {
      progress += 10
      if (progress <= 100) {
        this.updateFileProgress(fileId, progress)
      } else {
        clearInterval(interval)
        this.updateFileStatus(fileId, FILE_STATUS.UPLOADED)
        if (this.options.onUploadSuccess) {
          this.options.onUploadSuccess(fileData.file)
        }
      }

    }, 500)
  }

  updateFileProgress(fileId, progress) {
    const fileData = this.files.get(fileId)
    fileData.progress = progress
    const progressBar = this.elements.fileList.querySelector(`[data-file-id="${fileId}"] .file-uploader__progress-bar`)
    if (progressBar) {
      progressBar.sytle.width = `${progress}%`
    }
  }

  updateFileStatus(fileId, status) {
    const fileData = this.files.get(fileId)
    if (!fileData) return;
    const actionsContainer = this.elements.fileList
      .querySelector(`[data-file-id="${fileId}"] .file-uploader__actions`)
    actionsContainer.innerHTML = this.renderFileActions(fileData)
  }
}