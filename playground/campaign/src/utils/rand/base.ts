export class RandHelper {
  static int(min:number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static float(min: number,max:number, precision: number = 2): number {
    const value = Math.random() * (max - min) + min
    return Number(value.toFixed(precision))
  }


  static uuid():string {
    return  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8 // [8,b]
      return v.toString(16)
    })
  }
}