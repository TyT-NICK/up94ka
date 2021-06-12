import { useCallback, useState } from 'react'

const useHttp = () => {
  const [isLoading, setLoading] = useState(false)

  const request = useCallback(
    async (path, method = 'GET', query = {}, body = {}) => {
      setLoading(true)

      const url = new URL(path)

      for ([key, value] in query) {
        url.searchParams.set(key, value)
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        setLoading(false)
        throw response
      }

      const data = await response.json()

      setLoading(false)
      return [data, response.status]
    }
  )

  return [request, isLoading]
}

export default useHttp
