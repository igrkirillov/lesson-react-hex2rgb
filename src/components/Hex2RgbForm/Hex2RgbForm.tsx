import React, {useState} from 'react'
import styles from "./hex2rgb_form.module.css"
import {convertToRGB, formatRGB, validateHex} from "../../utils";

export type Hex2RgbState = {
    rgb: number[] | null,
    isError: boolean
}

export function Hex2RgbForm(props) {
    const [state, setState] = useState<Hex2RgbState>();
    const onChangeHex = function onChangeHex(event:React.FormEvent<HTMLInputElement>) {
        const hexStr = event.currentTarget.value;
        const newState = {
            isError: !validateHex(hexStr),
            rgb: convertToRGB(hexStr)
        };
        setState(newState);

        const bodyElement = document.getElementsByTagName("body")[0];
        bodyElement.style["background"] = !newState.isError ? `#${hexStr}` : "red";
    }
    return (
        <form className={styles.container}>
            <div className={styles["input-container"]}>
                <label htmlFor="rgbInput">#</label>
                <input id="rgbInput" type="text" onChange={onChangeHex}/>
            </div>
            <div className={styles["rgb-container"]}>
                <span>{!state || state.isError ? "Ошибка!" : formatRGB(state.rgb)}</span>
            </div>
        </form>
    );
}

export default Hex2RgbForm;