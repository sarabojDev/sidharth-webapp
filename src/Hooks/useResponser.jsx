import { useMediaQuery } from 'react-responsive'

const useResponser = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 768px)'
    })
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
    return {
        isMobile,
        isDesktopOrLaptop
    }
}

export default useResponser