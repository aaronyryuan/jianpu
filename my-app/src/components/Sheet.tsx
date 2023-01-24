import { Note } from "./Note";

export function Sheet({noteInputs, setNoteInputs}: {noteInputs: string[];setNoteInputs: (noteInputs: string[])=> void}) {
    return <div className="sheet">{noteInputs.map((noteInput, index) => <Note key={index} index={index} noteInput={noteInput} onUpdateNote={()=>null}/>)}</div>
}
