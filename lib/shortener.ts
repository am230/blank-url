export const characters = [
    "\u061c",
    "\u115f",
    "\u1160",
    "\u180e",
    "\u2000",
    "\u2001",
    "\u2002",
    "\u2003",
    "\u2004",
    "\u2005",
    "\u2006",
    "\u2007",
    "\u2008",
    "\u2009",
    "\u200a",
    "\u200b",
    "\u200d",
    "\u200e",
    "\u200f",
    "\u202f",
    "\u205f",
    "\u2060",
    "\u2061",
    "\u2062",
    "\u2063",
    "\u2064",
    "\u206a",
    "\u206b",
    "\u206c",
    "\u206d",
    "\u206e",
    "\u206f",
    "\u3000",
    "\u2800",
    "\u3164",
    "\ufeff",
    "\uffa0",
]

const length = characters.length;

export const encode = (i: number) => {
    let result = '';
    while (i) {
        result = (characters[(i % length)] + result);
        i = ((i / length) >> 0)
    }

    if (!result) {
        result = characters[0]
    }

    return result
};

export const decode = (s: string) => {
    let result = 0;
    for (let i = 0, j = s.length; i < j; i++) {
        result = ((result * length) + characters.indexOf(s[i]))
    }

    return result
}