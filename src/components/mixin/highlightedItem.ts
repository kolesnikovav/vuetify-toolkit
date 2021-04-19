export default function getMaskedCharacters (text: string, searchInput: string): {
      start: string
      middle: string
      end: string
    } {
  const searchInputN = (searchInput || '').toString().toLocaleLowerCase()
  const index = text.toLocaleLowerCase().indexOf(searchInputN)

  if (index < 0) return { start: text, middle: '', end: '' }

  const start = text.slice(0, index)
  const middle = text.slice(index, index + searchInput.length)
  const end = text.slice(index + searchInput.length)
  return { start, middle, end }
}
