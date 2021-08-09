import { IonButton, IonCol, IonRow } from "@ionic/react";
import styles from "../pages/Quiz.module.scss";

export const Answer = ({ answer, handleAnswerClick, question }) => (

    <IonRow>
        <IonCol size="12">
            <IonButton onClick={e => handleAnswerClick(e, answer, question)} expand="block" color="light" className={`ion-text-wrap ${ styles.answerButton }`}>
                {question.answers[answer]}
            </IonButton>
        </IonCol>
    </IonRow>
)