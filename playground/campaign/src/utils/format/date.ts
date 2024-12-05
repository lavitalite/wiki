const padStart = (num: number): string => {
  return num.toString().padStart(2, '0')
}


export const formatDate = (date: string | Date): string => {
  const d = new Date(date)  
  if(isNaN(d.getTime())){
    throw new Error('Invalid Date')
  }

  const year = d.getFullYear()
  const month = padStart(d.getMonth() + 1)
  const dayOfMonth = padStart(d.getDate()) // day of month

  return `${year}-${month}-${dayOfMonth}`
}

export const formatDateTime = (date:string | Date): string => {
  const d = new Date(date)
  if(isNaN(d.getTime())){
    throw new Error('Invalid Date')
  }

  const hours = padStart(d.getHours())
  const minutes = padStart(d.getMinutes())

  return `${formatDate} ${hours}:${minutes}`
}



export const addDays = (date:Date, days:number):Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}


export const addMonths = (date:Date, months: number):Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + months)
  return result
}
export const startOfDay = (date:Date):Date => {
  const result= new Date(date)
  result.setHours(0,0,0,0)
  return result
}

export const endOfDay = (date:Date): Date => {
  const result = new Date(date)
  result.setHours(23,59,59,999)
  return result
}

export const isToday = (date:Date): boolean => {
  const today = new Date()
  return formatDate(date) === formatDate(today)
}

export const isPast= (date:Date): boolean => {
  return date.getTime() < new Date().getTime()
}

export const isFuture = (date:Date):boolean => {
  return date.getTime() > new Date().getTime()
}


export const diffInDays = (dateLeft: Date, dateRight:Date):number => {
  const diffTime = Math.abs(dateLeft.getTime() - dateRight.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const formatRelative = (date:Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  if(diffInSeconds < 60) return 'just now'
  if(diffInSeconds < 3600) return `${Math.floor(diffInSeconds /60)}m ago`
  if(diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if(diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(date)
}