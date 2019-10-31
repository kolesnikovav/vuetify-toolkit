export default function tableScopedSlots (slots: any):object {
  let result = {}
  if (slots.itemTable) {
    result = Object.assign(result, { item: (props: any) => slots.itemTable(props) })
  }
  if (slots['itemTable.data-table-select']) {
    result = Object.assign(result, { 'item.data-table-select': (props: any) => slots['itemTable.data-table-select'](props) })
  }
  return result
}
