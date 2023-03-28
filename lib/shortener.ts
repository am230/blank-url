const characters = `‎⁬⁭⁪⁫⁯⁮‬‮‭‫‪‌‍‏`;
const length = characters.length;

export const encode = (i: number) => {
    let result = '';
    while (i) {
        result = (characters[(i % length)] + result);
        i = ((i / length) >> 0)
    };
    if (!result) {
        result = characters[0]
    };
    return result
};

export const decode = (s: string) => {
    let result = 0;
    for (let i = 0, j = s.length; i < j; i++) {
        result = ((result * length) + characters.indexOf(s[i]))
    };
    return result
}