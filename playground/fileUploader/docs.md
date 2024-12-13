## props


### setting limits

`maxFileSize`
`maxFileCount`
`acceptedFileTypes` 


:::info limiting accepted file types
The accept attribute takes  its value as a comma-separated list of one or more file types,
accept="image/png" or accept=".png" — Accepts PNG files.
accept="image/png, image/jpeg" or accept=".png, .jpg, .jpeg" — Accept PNG or JPEG files.
accept="image/*"  - Accept any file with an `image/*` MIME type (Many mobile devices also let the user take a picture with the camera when this is used.)

:::

### pasuable/resumable uploads

`isResumable`

### pre-uploadProcessing


```ts
const preUploadProcessing = ({file}) => {
  const fileExtension = file.name.split('.').pop()
  return file
  .arrayBuffer()
  .then(fileBuffer => window.crypto.subtle.digest('SHA-1', filebuffer))
  .then(hashBuffer => {
    const hashArr = Arrary.from(new Uint8Array(hashBuffer))
    const hashHex = hashArr
      .map(a => a.toString(16).padStart(2, '0'))
      .join('') 
      return {file, key: `${hash}`, metadata: {
        id: key
      }}
  })
}
```


### state-based event handling

`onUploadStart`, `onUploadSuccess`, `onUploadError`, `onFileRemove`


## customization


### texts and labels

```tsx

<FileUploader
  
  displayText={{
    dropFilesText: 'drag-and-drop-here',
    browseFilesText: 'Open file picker',
    getFilesUploadedText(count){
      return `${count} images uploaded`
    }
  }}
/>
```


## i118n
Use an open source library like i18next, react-intl

```tsx
const dictionary = {
  en: null,
  zh: {
    getFilesUploadedText(count) {
      return '文件上传成功'
    },
    getFilesSizeErrorText(sizeText) {
      return `${sizeText}`
    },
    getRemainingFilesText(count) {
      return `剩余${count}文件`
    }，
    getPausedText(percent){
      return `上传进度: ${percent}%`
    },
    getUploadButtonText(count) {
        return '上传'
    },
    getMaxFilesErrorText(count){
        return `上传文件出错`
    },
    doneButtonText: '上传完成',
    clearAllButtonText: '清楚所有',
    extensionNotAllowedText: "不允许的文件类型",
    browseFilesText: '浏览文件',
    dropFilesText: "拖拽上传",
    pauseButtonText: "暂停",
    resumeButtonText: "恢复",
    getPausedText()
  }
}

```

```dotnetcli

e.target.contains
e.target.closest
e.target.match
e.dataTransfer
```ts
e.state: PopStateEvent: state property,  history.pushState() or history.replaceState()
if (event.state && event.state.type === 'reload') {
        // Reload detected
}
```
e.stopPropagation
```



## flex布局

存在剩余空间： flex-item会瓜分剩余空间，flex-grow属性控制瓜分比例，default: `0`


存在溢出空间： 子元素父容器宽度之和超过父容器
换行： flex-wrap， default: `nowrap`
压缩: flex-shrink， default: `1`, 大多时候不希望被压缩设置为0


flex item 宽：
flex-basis: auto, which falls back to the width if not specified.

when a flex-basis is specified, the width of our boxes is ignored,

flex-basis (restricted by max-width & min-width)
> width is just a fallback when flex-basis is missing, and min-width and max-width are just upper and lower limits for the final flex-basis

flex container: 
intrinstic width: content width
extrinstic width: respected



::: info width:auto
auto 从对应的属性（width 或 height）那里获得尺寸，如果没有设置尺寸，根据内容确定大小
:::
```css
crossbow {
  // 抬起十字弓 turn on
  display: flex;
  // aiming direction
 // fallback to `row` if not specific
  flex-direction: row-end;
  // target position of shooting
  // fallback to line up items to `flex-start` if not specific
 // space-around: even space around items
  justify-content: flex-end;
  // alignment layser
  // fallback to `stretch` if not specified
}


```

justify-content: fallback to `flex-start` if not specific