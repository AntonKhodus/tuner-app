import { SyntheticEvent, useContext } from "react";
import styles from "css/Layout/WidgetFrame.module.scss"
import { WidgetFrameContext } from "components/context";

interface WidgetButtonProps{
    type?: "remove" | undefined
}

export const WidgetButton: React.FC<WidgetButtonProps> = ({type}) => {

    const {body, setBody} = useContext(WidgetFrameContext);

    const clickHandler = (event: SyntheticEvent) => {
        if(type === "remove") {

        } else {
            setBody((prev: {}) => {
                return {...prev, hidden: !body.hidden};
            });
        }
    }

    return (
        <button onClick={clickHandler} className={`${styles.controlBtn} ${type === "remove" ? styles.remove : styles.hide}`}>
                { type === "remove" ? 
                <div>
                    <span></span>
                    <span></span>
                </div> 
                :
                <div className={body.hidden ? styles.unfold : ""}>
                    <span></span>
                    <span></span>
                </div>
                }
        </button>
    )
}