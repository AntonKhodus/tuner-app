import styles from "../../css/Layout/WidgetFrame.module.scss"

interface WidgetButtonProps{
    type?: "remove" | undefined
}

export const WidgetButton: React.FC<WidgetButtonProps> = ({type}) => {
    console.log(styles);
    return (
        <button className={`${styles.controlBtn} ${type === "remove" ? styles.remove : styles.hide}`}>
                { type === "remove" ? 
                <div>
                    <span></span>
                    <span></span>
                </div> 
                :
                <div>
                    <span></span>
                </div>
                }
        </button>
    )
}