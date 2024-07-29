import React, {useState} from 'react'
import styles from "./hex2rgb_form.module.css"
import {convertToRGB, formatRGB, isFilled, validateHex} from "../../utils";

export type Hex2RgbState = {
    rgb: number[] | null,
    isError: boolean,
    hexStr: string
}

export function Hex2RgbForm() {
    const [state, setState] = useState<Hex2RgbState>();
    const onChangeHex = function onChangeHex(event:React.FormEvent<HTMLInputElement>) {
        const hexStr = event.currentTarget.value;
        const newState: Hex2RgbState = {
            isError: !validateHex(hexStr),
            rgb: convertToRGB(hexStr),
            hexStr: hexStr
        };
        setState(newState);

        const bodyElement = document.getElementsByTagName("body")[0];
        bodyElement.style["background"] = !newState.isError ? `#${hexStr}` : getErrorColor(hexStr);
    }
    return (
        <form className={styles.container}>
            <div className={styles["input-container"]}>
                <label htmlFor="rgbInput">#</label>
                <input id="rgbInput" type="text" onChange={onChangeHex}/>
            </div>
            <div className={styles["rgb-container"]}>
                <span>{!state || state.isError ? getErrorText(state?.hexStr) : formatRGB(state.rgb)}</span>
            </div>
        </form>
    );
}

function getErrorText(hexStr: string | undefined): string {
    return isFilled(hexStr) ? "Ошибка!" : "??????";
}

function getErrorColor(hexStr: string | undefined): string {
    return isFilled(hexStr) ? "red" : "";
}

export default Hex2RgbForm;