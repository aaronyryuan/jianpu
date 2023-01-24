export enum InputAlphabet {
    do = "1",
    re = "2",
    mi = "3",
    fa = "4",
    so = "5",
    la = "6",
    ti = "7",
    rest = "0",
    octaveUp = "'",
    octaveDown = ",",
    sharp = "#",
    flat = "b",
    holdDash = '-',
    holdDot = '.',
    halveBeat = '/',
    thirdBeat = '?',
    tieNext = 't'
}

export const NUMERALS = [
    InputAlphabet.do,
    InputAlphabet.re,
    InputAlphabet.mi,
    InputAlphabet.fa,
    InputAlphabet.so,
    InputAlphabet.la,
    InputAlphabet.ti,
    InputAlphabet.do,
    InputAlphabet.rest
];

export function GetNoteDuration(noteInput:string):number {
    let duration = 1;
    let hold = 0;
    let countDots = 0;
    let dotHoldRatio = 1;
    for (const char of noteInput) {
        switch(char) {
            case InputAlphabet.halveBeat:
                duration /= 2;
                break;
            case InputAlphabet.thirdBeat:
                duration /= 3;
                break;
            case InputAlphabet.holdDash:
                hold += 1
                break;
            case InputAlphabet.holdDot:
                countDots += 1
                dotHoldRatio += 1/(2**countDots);
                break;
        }
    }
    return duration * dotHoldRatio + hold;
}
