import { useState } from "react";
import { Sheet } from "./Sheet";

export function JianPu() {
    const [title, setTitle] = useState('Title');
    const [beatsPerMinute, setBeatsPerMinute] = useState(60);
    const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
    const [pickupBeats, setPickupBeats] = useState(0);
    const [anchorNote, setAnchorNote] = useState(60);
    const [noteInputs, setNoteInputs] = useState<string[]>(['3//', '5//', '6//', '7//', "1'/", "1'/", "1'/", "1'/", '6/.', '7//', "1'", "1'/", "1'/", "1'/", "1'/", '6/.', '7//', "1'", "2'/", "2'/", "2'/", "1'/", '7', '5#/', '7/', '6---', '6,/', '6,/', '1/', '2/', '3.', '5/', '6/', '6,/', '1/', '2/', '3-', '2/', '2/', '2/', '3/', '5/', '5/', '5/', '6/', '3---', '6,/', '6,/', '1/', '2/', '3.', '5/', '6/', '6,/', '1/', '2/', '3-', '2/', '2/', '2/', '3/', '5/', '5/', '0/', '5,/', '6,---']);

    return (
        <div className="jianpu">
            <input className="title-input" type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <div >
                <IntegerInput label="Anchor Pitch" value={anchorNote} setValue={setAnchorNote} minValue={0} maxValue={115}/>
                <IntegerInput label="Beats per Minute" value={beatsPerMinute} setValue={setBeatsPerMinute} minValue={30} maxValue={256}/>
                <IntegerInput label="Beats per Measure" value={beatsPerMeasure} setValue={setBeatsPerMeasure} minValue={1} maxValue={256}/>
                <IntegerInput label="Pickups" value={pickupBeats} setValue={setPickupBeats} minValue={0} maxValue={beatsPerMeasure-1}/>
            </div>
            <Sheet noteInputs={noteInputs} setNoteInputs={setNoteInputs}/>
        </div>
    );
}

export function IntegerInput({label, value, setValue, minValue, maxValue}:{label: string, value: number, setValue: (value: number)=> void, minValue: number, maxValue: number}) {
    const onChange = (integer: number): void => {
        if (integer > maxValue) {
            integer = maxValue
        } else if (integer < minValue) {
            integer = minValue
        }
        setValue(integer);
    }
    return (<>
    {label + ": "}
    <input className="config-input" type="number" value={value} onChange={(e) => onChange(parseInt(e.currentTarget.value))}/>
    </>);
}
