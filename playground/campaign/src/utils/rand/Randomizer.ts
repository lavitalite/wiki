/**
 *  unpredictable with  uniform distribution , yet reproducible sequences of numbers
 */

export interface Randomizer {
  next(): number

  seed(seed:number | number[]): void
}