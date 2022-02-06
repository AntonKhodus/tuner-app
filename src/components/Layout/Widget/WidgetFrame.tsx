import { useState } from "react";
import styles from "css/Layout/WidgetFrame.module.scss"
import { WidgetFrameContext } from "components/context";
import { WidgetBody } from "./WidgetBody"
import { WidgetHeader } from "./WidgetHeader"

export const WidgetFrame: React.FC = ({children}) => {

    const [body, setBody] = useState({hidden: false});
    
    return (
        <div className={styles.frame}>
            <WidgetFrameContext.Provider value={{body: body, setBody: setBody}}>
                <WidgetHeader />
                <WidgetBody className={body.hidden ? styles.hidden : ""}>
                    {children}
                </WidgetBody>
            </WidgetFrameContext.Provider>
        </div>
    )
}