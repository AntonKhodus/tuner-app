import styles from "css/Layout/WidgetFrame.module.scss"
import { WidgetButton } from "./WidgetButton"

export const WidgetHeader: React.FC = () => {
    return (
        <div className={styles.heading}>
            <WidgetButton />
            <WidgetButton type="remove"/>
        </div>
    )
}