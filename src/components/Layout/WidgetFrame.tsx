import styles from "../../css/Layout/WidgetFrame.module.scss"
import { WidgetBody } from "./WidgetBody"
import { WidgetHeader } from "./WidgetHeader"

export const WidgetFrame: React.FC = ({children}) => {
    return (
        <div className={styles.frame}>
            <WidgetHeader/>
            <WidgetBody>
                {children}
            </WidgetBody>
        </div>
    )
}