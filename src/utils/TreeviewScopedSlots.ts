export default function treeviewScopedSlots (slots: any):object {
  let result = {}
  if (slots.prependTree) {
    result = Object.assign(result, { prepend: (props: any) => slots.prependTree(props) })
  }
  if (slots.appendTree) {
    slots = Object.assign(slots, { append: (props: any) => slots.prependTree(props) })
  }
  if (slots.labelTree) {
    slots = Object.assign(slots, { label: (props: any) => slots.labelTree(props) })
  }
  return result
}
