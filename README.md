# why
mom runs a chinese choir. their parts are notated using jianpu.

mom asks aaron to make recordings of these parts for her singers to practice against.

aaron does not want to use his brain to translate jianpu into western notation while typing it into musescore

# what is jianpu
[JianPu](https://en.wikipedia.org/wiki/Numbered_musical_notation#Examples) is a numeric musical notation method.

If a Note is a pitch with a duration, jianpu anchors pitch with a `numeral 1-7` representing its position on the ionian mode, and modifies that pitch with a `#, b, and dots above and below` the numeral, each representing an octive up or down. `0` is a rest
Jianpu notes/rests default to one beat. Subsequent `horizontal lines above or below` the numeral represent halving of the beat. A `horizontal line to the side` means to hold the note for another beat. A `dot to the side` means to hold the note for another half duration of the note. A tie is a tie

This project explores the input of jianpu into a computer. I might explore character recognition later, but for now...

## .jp input language
requirements by importance
1. brainless to type
2. simple to read

jp inputs start with a numeral, followed by whatever modifications. Each modification should be a single character, mapped 1:1 with a jianpu decoration. Modifications are stackable. Whitespace is ignored

mappings:
- numerals: `{0, 1, 2, 3, 4, 5, 6, 7}`
  - rest, do, re, mi ...
- pitch modifiers: `{', ,, #, b}`
  - `'` in place of dot above
  - `,` in place of dot below
  - `#` sharp
  - `b` flat
- duration modifiers: `{-, ., /, ?, t}`
  - `-` in place of dash to the side
  - `.` in place of dot to the side
  - `/` in place of line above/below
  - `?` in place of triplet line above/below
  - `t` tie to next note

General dificulties are due to notation having contextual meaning. IE a side dot usually represents holding an extra half-beat. However, if it's followed by a triplet, it would mean holding a third-beat.
Likewise, triplet decorations apply to a group of notes. Currently one would have to see that, do some mental math, and apply a mixture of `/` and `?`
