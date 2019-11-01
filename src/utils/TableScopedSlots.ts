export default function tableScopedSlots (slots: any):object {
  let result = {}
  for (var slot in slots) {
    if (slot.startsWith('itemTable')) {
      let slotName = slot.replace('itemTable', 'item')
      let slotnew = {} as any
      slotnew[slotName] = (props: any) => slots[slot](props)
      result = Object.assign(result, slotnew)
    }
  }
  return result
}
