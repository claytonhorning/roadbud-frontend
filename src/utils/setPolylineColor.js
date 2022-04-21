const HIGH_WIND = '1 - high wind'
const DRY = '3 - dry'
const WET = '4 - wet'
const SLUSHY = '7 - slushy'

export const setPolylineColor = (conditions) => {
    let color = 'black'

    if (conditions.includes(DRY)) {
        color = 'grey'
        return color
    } else if (conditions.includes(WET)) {
        color = 'green'
        return color
    } else if (conditions.includes(HIGH_WIND)) {
        color = 'pink'
        return color
    } else if (conditions.includes(SLUSHY)) {
        color = 'indigo'
        return color
    } else {
        return color
    }
}
