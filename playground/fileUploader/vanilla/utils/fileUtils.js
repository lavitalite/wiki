export function formatFile(bytes){
  if(bytes < 1024 * 1024) return bytes / 1024 + 'KB'
  else if(bytes < 1024 * 1024 * 1024) return bytes / 1024 + 'MB'
  else return bytes / 1024 + 'GB'
}


export function checkFileType(file, acceptedTypes){
  if(!acceptedTypes || acceptedTypes.length === 0) return true
  return acceptedTypes.some(type => {
    const pattern = new RegExp(type.replace('*', '.*'))
    return pattern.test(file.type)
  })
}


export function genThumbnail(file) {
  return new Promise((resolve) => {
    if(!file.type.startsWith('image/')){
      resolve(null)
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}