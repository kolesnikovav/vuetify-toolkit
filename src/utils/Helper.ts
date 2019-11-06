const tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
} as any

export function escapeHTML (str: string): string {
  return str.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag)
}
