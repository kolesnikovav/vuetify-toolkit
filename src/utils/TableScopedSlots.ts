export default function tableScopedSlots (slots: any):object {
  let result = {}
  for (var slot in slots) {
    if (slot.startsWith('itemTable')) {
      const slotName = slot.replace('itemTable', 'item')
      const slotnew = {} as any
      slotnew[slotName] = slots[slot]
      result = Object.assign(result, slotnew)
    } else if (slot.startsWith('headerTable')) {
      const slotName = slot.replace('headerTable', 'header')
      const slotnew = {} as any
      slotnew[slotName] = slots[slot]
      result = Object.assign(result, slotnew)
    }
  }
  return result
}
