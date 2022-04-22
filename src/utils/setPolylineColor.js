const HIGH_WIND = '1 - high wind'
const DRY = '3 - dry'
const WET = '4 - wet'
const SLUSHY = '7 - slushy'
const ADVERSE_CONDITIONS = '25 - adverse conditions'

export const setPolylineColor = (conditions) => {
    let color = 'black'

    if (conditions.includes(DRY)) {
        color = 'grey'
        return color
    } else if (conditions.includes(WET)) {
        color = 'blue'
        return color
    } else if (conditions.includes(HIGH_WIND)) {
        color = 'orange'
        return color
    } else if (conditions.includes(SLUSHY)) {
        color = 'green'
        return color
    } else if (conditions.includes(ADVERSE_CONDITIONS)) {
        color = 'yellow'
        return color
    } else {
        return color
    }
}
