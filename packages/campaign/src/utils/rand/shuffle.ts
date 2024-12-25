import { RandHelper } from "./base";

export class ShuffleService extends RandHelper {

  public static shuffle<T>(arr: T[]): T[] {
    const result = [...arr]
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]] as [T, T]
    }
    return result
  }


  static pickOne<T>(arr: T[]): T {
    if(arr.length === 0) {
      throw new Error("can not pick from empty arr")
    }
   const idx =  Math.floor(Math.random() * arr.length)
   return arr[idx]
  }

  static pickMany<T>(arr: T[], count: number): T[] {
    if(count > arr.length) {
      throw new Error("can not pick more elem than arr length")
    }
    return this.shuffle(arr).slice(0, count)
  }

  static weightedPick<T>(arr: ReadonlyArray<{
    weight: number,
    value: T  
  }>):T{
      if(arr.length === 0) {
        throw new Error("expects an arr with at least one elem")
      }
      if(!arr.every(el => el.weight > 0)) {
        throw new Error("expects an arr of {weight, value} object where weight is a positive number"
        )
      }

      const total = arr.reduce((acc, {weight}) => acc + weight, 0)
      const rand = Math.floor(Math.random() * total)
      let current = 0
      for (const {weight, value} of arr) {
        current += weight
        if(rand < current) {
          return value
        }
      } 
      return arr.at(-1)!.value
  }
 }