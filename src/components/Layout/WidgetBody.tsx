import styles from "../../css/Layout/WidgetFrame.module.scss"

export const WidgetBody: React.FC = ({children}) => {
    return (
        <div className={styles.body}>
            {children}
        </div>
    )
}