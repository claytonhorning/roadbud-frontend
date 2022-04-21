export const setPolylineColor = (condition) => {
    let color = '#000'
    switch (condition) {
        case '3 - dry':
            color = 'grey'
            return color
        case '4 - wet':
            color = 'blue'
            return color
        // case '5 - ':
        //     color = 'green'
        //     return color
        // case '6 - ':
        //     color = 'green'
        //     return color
        // case '7 - ':
        //     color = 'green'
        //     return color
        // case '8 - ':
        //     color = 'green'
        //     return color
        default:
            break
    }
}
