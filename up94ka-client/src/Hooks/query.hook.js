import { useLocation } from 'react-router-dom'

export const useQuery = () => {
  const query = new URLSearchParams(useLocation().search)
  const result = {}
  for (const [key, value] of query) {
    result[key] = value
  }
  return result
}
