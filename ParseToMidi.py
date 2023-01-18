#!/usr/bin/env python3

from typing import List
from midiutil import MIDIFile
import re

basePitch = 68
tempo = 80
pitchOffset = {
    "1": 0,
    "2": 2,
    "3": 4,
    "4": 5,
    "5": 7,
    "6": 9,
    "7": 11,
    "+": 12,
    "-": -12,
    "#": 1,
    "b": -1
}

class Note:
    def __init__(self, pitch, duration, volume, isRest=False, tiesNext=False):
        self.pitch = pitch
        self.duration = duration
        self.volume = volume
        self.isRest = isRest
        self.tiesNext = tiesNext

def glyphsToNote(glyphs: str) -> Note:
    pitch, duration, beatHolds = basePitch, 1, 0
    countDotHolds, dotHoldRatio = 0, 0
    isRest, tiesNext = False, False
    for glyph in glyphs:
        if glyph in pitchOffset:
            pitch += pitchOffset[glyph]
        elif glyph == '>':
            beatHolds += 1
        elif glyph == '.':
            countDotHolds += 1
            dotHoldRatio += 1/(2**countDotHolds)
        elif glyph == "/":
            duration /= 2
        elif glyph == "?":
            duration /= 3
        elif glyph == '0':
            isRest = True
        elif glyph == 't':
            tiesNext = True
    return Note(pitch, duration + beatHolds + duration * dotHoldRatio, 100, isRest, tiesNext)

def smooshTies(time:int, tiedNotes:List[Note]) -> List[Note]:
    notes = [tiedNotes[0]]
    for note in tiedNotes[1:]:
        if notes[-1].pitch != note.pitch:
            notes += [note]
        else:
            notes[-1].duration += note.duration
    return notes

def getWordsFromFile(fileName:str) -> List[str]:
    with open(fileName, 'r') as file:
        data = file.read()
        strippedData = re.sub(r"[\n\t\s]*", "", data)
        return re.findall("\d\D*", strippedData)

def writeNotesToMidi(notes:List[Note], midifile:MIDIFile):
    time = 0
    tiedNotes = []
    for note in notes:
        if note.isRest:
            time += note.duration
        elif note.tiesNext:
                tiedNotes += [note]
        elif tiedNotes:
            tiedNotes += [note]
            for tiedNote in smooshTies(time, tiedNotes):
                midifile.addNote(0, 0, tiedNote.pitch, time, tiedNote.duration, tiedNote.volume)
                time += tiedNote.duration
            tiedNotes = []
        else:
            midifile.addNote(0, 0, note.pitch, time, note.duration, note.volume)
            time += note.duration

MyMIDI = MIDIFile(1)
MyMIDI.addTempo(0, 0, tempo)

jianpuWords = getWordsFromFile("jianpu.jp")
notes = [glyphsToNote(word) for word in jianpuWords]
writeNotesToMidi(notes, MyMIDI)

with open("jianpu.mid", "wb") as output_file:
    MyMIDI.writeFile(output_file)