
```js
const downloadFile(filename,content){
    const aLink = document.createElement('a')
    const blob = new Blob([content])
    const evt = document.createEvent('HTMLEvents')
    evt.initEvents('click', false,false)
    aLink.download = filename
    aLink.href = URL.createObjectURL(blob)
    aLink.dispatchEvent(evt)
  	// a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}))
}

```