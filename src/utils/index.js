export const formatDate = (date) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const formattedDate = new Date(date).toLocaleDateString('en-US', options)
    return formattedDate
}

export const formatDateWithTime = (date) => {
    const options = {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }
    const formattedDate = new Date(date).toLocaleDateString('en-US', options)
    return formattedDate
}

export const formatLatLonString = (location) => {
    const shortLon = location.longitude.toPrecision(5)
    const shortLat = location.latitude.toPrecision(5)

    return `Lon: ${shortLon}, Lat: ${shortLat}`
}

export const formatUnixTimeString = (date) => {
    const options = {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }

    const formattedDate = new Date(date).toLocaleDateString('en-US', options)

    return formattedDate
}
