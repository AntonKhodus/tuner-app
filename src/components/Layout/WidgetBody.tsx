import styles from "../../css/Layout/WidgetFrame.module.scss"

interface WidgetBodyProps {
    children: React.ReactNode,
    className: string
}

export const WidgetBody: React.FC<WidgetBodyProps> = ({children, className}) => {

    return (
        <div className={`${styles.body} ${className}`}>
            {children}
        </div>
    )
}