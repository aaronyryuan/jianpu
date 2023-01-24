import { GetNoteDuration } from "../utils/NoteInputUtils";

export function Note({index, noteInput, onUpdateNote, onDeleteNote, onNextNote}:{index:number, noteInput:string, onUpdateNote:(noteInput:string) => void, onDeleteNote?:()=> void, onNextNote?:(numeral:number)=> void}) {
    const duration = GetNoteDuration(noteInput);
    let width = '2em'
    if (duration < .5) {
        width = '1em'
    } else if (duration < 1) {
        width = '1.25em'
    } else if (duration > 1 && duration < 2) {
        width = '3em'
    } else {
        width = 1.5*Math.trunc(duration) + 'em'
    }
    console.log(duration)
    return (<div className="note" style={{marginBottom:'1em', width: width}}>
        <div className="note-display">{noteInput[0]}</div>
        <input className="note-input" type="text" value={noteInput} onChange={(e) => onUpdateNote(e.currentTarget.value)}/>
    </div>);
}
