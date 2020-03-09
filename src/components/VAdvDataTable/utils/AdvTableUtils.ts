export type SelectableValue = {
    text: string,
    selected: boolean
}

export type TableHeader = {
    text: string
    value: string
    align?: 'start' | 'center' | 'end'
    sortable?: boolean
    filterable?: boolean
    divider?: boolean
    class?: string | string[]
    width?: string | number
    filter?: (value: any, search: string, item: any) => boolean
    sort?: (a: any, b: any) => number,
    datatype?: 'string' | 'number'| 'date',
    visible?: boolean,
    order?: number
  }

export type FilterCondition = {
    id: string
    text: string
  }

export type GetItem = (a: string) => string[]|number[]
