import { IonCol } from "@ionic/react";
import { updateChosenCategory, updateChosenDifficulty } from "../store/SettingsStore";
import styles from "./Settings.module.scss";

export const Category = ({ label, value, set, chosen }) => (

    <IonCol id={ `categoryButton_${ value }` } size="6" className={ `${styles.category} ${chosen && styles.chosen} animate__animated` } onClick={ () => updateChosenCategory(value) }>
        <p>{ label }</p>
    </IonCol>
);

export const Difficulty = ({ label, value, set, chosen }) => (

    <IonCol id={ `difficultyButton_${ value }` } size="4" className={ `${ styles.category } ${ chosen && styles.chosen } animate__animated` } onClick={ () => updateChosenDifficulty(value) }>
        <p>{ label }</p>
    </IonCol>
);