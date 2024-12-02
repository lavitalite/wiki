
function getMonthStartTimestamp():number {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    return Math.floor(startOfMonth.getTime() / 1000) // in seconds
}


function getMonthStartDateString(): string {
    const now = new Date()
    const yearMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
    const dateString = `${yearMonth}-01 00:00:00`;
    return dateString
}



/**
 * field to map
 * 
 */


import { v4 as uuidv4 } from 'uuid';

interface RawTable {
  id: string;
  platform_id: string;
  funder_id: string;
  channel_id: string;
  // Add other fields that might be in the raw table
}

interface MappedTable {
  id: string;
  platform_id: string;
  funder_id: string;
  channel_id: string;
  at_id: string;
}

function fieldToMap(rawTable:RawTable): MappedTable{
    const fieldsToMap: (keyof RawTable)[] = ['platform_id', 'funder_id', 'channel_id'];

    // partial to build the property
   const mappedTable: Partial<MappedTable> = {
        id: uuidv4(),
    }; // 这里为什么是partial呢为什么不是satisfy ，这里只是赋初值不是吗
    fieldsToMap.forEach(field => {
        mappedTable[field] = rawTable[field]
    })
    mappedTable.at_id = rawTable.id
    // satisfies (ts 4.9+) which checks type compatibility without changing the type
    return mappedTable as MappedTable  // Type assertion


    
}

function mapFields(rawTable: RawTable): MappedTable {
    // 更大的灵活性，允许后续动态添加或移除字段
    const fieldsToMap: (keyof RawTable)[] = ['platform_id', 'funder_id', 'channel_id'];

    const mappedTable = {
      id: uuidv4() as string,
      // Spread ensures all required fields are present
      ...Object.fromEntries(
        fieldsToMap.map(field => [field, rawTable[field]])
      ),
      at_id: rawTable.id
    } as MappedTable;
    
    return mappedTable;
  }



// 生成 1-9 之间的随机数，确保第一位不为 0。
function genRandomNum(digits: number): string {
    let result = '';
    for (let i = 0; i < digits; i++) {
        const min = i === 0 ? 1 : 0;
        const max = 9;
        result += Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return result;
}


/**
 * High-precision calculation function.
 * @link 
 * @param leftOperand 
 * @param rightOperand 
 * @param op - The operator: one of '+', '-', '*', '/'.
 * @param scale - int[optional] 
 * @returns - The result of the operation, as a string.
 */

function hp_calc(
    leftOperand:string,
    rightOperand:string,
    op:string,
    scale:number = 2
){
    /* runtime validation*/
    // $allowedOps = array('+', '-', '*', '/');
    // if(!in_array($op,$allowedOps)){
    //     return ;
    // }
    const allowedOps = ['+', '-', '*', '/']
    if(!allowedOps.includes(op)){
        return '';
    }

   
    const opToMethod:Record<string, (a:string, b:string, sacle:number)=>string> = {
        '+': bcadd,
        '-': bcsub,
        '*': bcmul,
        '/': bcdiv
    }
    try {
        const result = opToMethod[op](leftOperand, rightOperand, scale);
        return result;
    } catch (e) {
        return ''; // Handle division by zero or other runtime errors
    }
}



function bcadd(a: string, b: string, scale: number): string {
    const result = (parseFloat(a) + parseFloat(b)).toFixed(scale);
    return result;
}

function bcsub(a: string, b: string, scale: number): string {
    const result = (parseFloat(a) - parseFloat(b)).toFixed(scale);
    return result;
}

function bcmul(a: string, b: string, scale: number): string {
    const result = (parseFloat(a) * parseFloat(b)).toFixed(scale);
    return result;
}

function bcdiv(a: string, b: string, scale: number): string {
    if (parseFloat(b) === 0) {
        throw new Error('Division by zero'); // Handle division by zero
    }
    const result = (parseFloat(a) / parseFloat(b)).toFixed(scale);
    return result;
}