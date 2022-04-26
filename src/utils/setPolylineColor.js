export const CONDITION_COLORS = {
    DRY: 'grey',
    WET: '#B612FF',
    ICY: '#1236FF',
    SNOWY: '#1EB2E8',
    SLUSHY: '#0FCE9A',
    ADVERSE: '#FF7612',
    WINDY: '#F50000',
}

export const setPolylineColor = (condition) => {
    let color = 'black'

    //Need to handle cases where forecast text included is first in the array

    switch (condition) {
        case 17:
            //DRY
            color = CONDITION_COLORS.DRY
            return color
        case 9:
        case 5:
        case 10:
            //WET
            color = CONDITION_COLORS.WET
            return color
        case 13:
        case 20:
        case 22:
        case 12:
            //ICY
            color = CONDITION_COLORS.ICY
            return color
        case 7:
            //SNOWY
            color = CONDITION_COLORS.SNOWY
            return color
        case 11:
            //SLUSHY
            color = CONDITION_COLORS.SLUSHY
            return color
        case 1:
            //ADVERSE CONDITIONS
            color = CONDITION_COLORS.ADVERSE
            return color
        case 2:
            //WINDY
            color = CONDITION_COLORS.WINDY
            return color
    }
}

/* Condition IDS
47 = forecast text included
7 = 6 - snow
11 = 7 - slushy
12 = 8 - icy
9 = 4 - wet
22 = 6-9-11 snow, icy spots, snow packed spots
17 = 3 - dry
5 = 21 - scattered showers
10 = 4s - wet in areas
20 = 6-8-10 snow, icy, snow packed
1 = 25 - adverse conditions
13 = 9 - icy spots
*/
