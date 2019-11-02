export default function tableScopedSlots (slots: any):object {
  let result = {}
  for (var slot in slots) {
    if (slot.startsWith('itemTable')) {
      let slotName = slot.replace('itemTable', 'item')
      let slotnew = {} as any
      slotnew[slotName] = slots[slot]
      result = Object.assign(result, slotnew)
    } else if (slot.startsWith('headerTable')) {
      let slotName = slot.replace('headerTable', 'header')
      let slotnew = {} as any
      slotnew[slotName] = slots[slot]
      result = Object.assign(result, slotnew)
    }
  }
  return result
}
