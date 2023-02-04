import { useEffect, useState } from 'react'

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    typeof window !== 'undefined' && {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
