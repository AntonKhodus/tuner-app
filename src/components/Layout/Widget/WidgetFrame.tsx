import { useState } from "react";
import styles from "css/Layout/WidgetFrame.module.scss"
import { WidgetFrameContext } from "components/context";
import { WidgetBody } from "./WidgetBody"
import { WidgetHeader } from "./WidgetHeader"

interface WidgetFrameProps {
    destroy: Function
}

export const WidgetFrame: React.FC<WidgetFrameProps> = ({children, destroy}) => {

    const [body, setBody] = useState({hidden: false});
    
    return (
        <div className={styles.frame}>
            <WidgetFrameContext.Provider value={{body: body, setBody: setBody, destroy: destroy}}>
                <WidgetHeader />
                <WidgetBody className={body.hidden ? styles.hidden : ""}>
                    {children}
                </WidgetBody>
            </WidgetFrameContext.Provider>
        </div>
    )
}