import { useState, useEffect } from 'react'

// to fetch data from the given url
const useFetch = (url) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    // fetching data whenever there is change in url
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url, {
                    credentials: 'include'
                })


                if (!res.ok) {
                    setError('failed to fetch')
                }

                const result = await res.json()
                // setting data
                setData(result.data)
                // setting loading false
                setLoading(false)
            } catch (error) {
                // setting error if any
                setError(error.message)
                setLoading(false)
            }
        };

        fetchData();
    }, [url])

    // returning fetched data from the server
    return {
        data,
        error,
        loading
    }
}

export default useFetch
