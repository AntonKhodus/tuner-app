import styles from "../../css/Tuner/Tuner.module.scss";

interface TunerScreenProps{
    tunerData: [string, number] | undefined
}

export const TunerScreen: React.FC<TunerScreenProps> = ({tunerData}) => {
    
    return (
        <div className={styles.tunerScreen}>
            <div className={styles.tunerNote}>
                {tunerData ? tunerData[0] : "--"}
            </div><div className={styles.tunerCents}>
                <div className={styles.tunerCentsInner}>
                    <div className={styles.tunerCentsWrapper}>
                        <div></div>
                        <div></div>
                        <div className={styles.tunerCentsNumb}>
                            {tunerData && tunerData[1] < 0 ? tunerData[1] : "0"}
                        </div>
                    </div>
                    <div className={styles.tunerCentsWrapper}>
                        <div></div>
                        <div></div>
                        <div className={`${styles.tunerCentsNumb} ${styles.right}`}>
                            {tunerData && tunerData[1] > 0 ? "+"+tunerData[1] : "0"}
                        </div>
                    </div>
                    <div className={styles.tunerCentsArrow}>
                        <div className={styles.tunerCentsArrowDot} style={tunerData ? {transform: `translateX(-50%) rotate(${tunerData[1]*1.8}deg)`} : {transform: "translateX(-50%)"}}>
                            <div className={styles.tunerCentsArrowLine}>
                                <div className={styles.tunerCentsArrowhead}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}