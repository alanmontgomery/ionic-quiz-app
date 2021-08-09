import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonNote, IonRow, useIonRouter } from "@ionic/react";
import styles from "../pages/Quiz.module.scss";
import { updateChosenCategory, updateChosenDifficulty } from "../store/SettingsStore";

export const CompletedCard = ({ completionContainerRef, score, questionsLength }) => {

    const router = useIonRouter();

    const playAgain = () => {

        updateChosenCategory(false);
        updateChosenDifficulty(false);
        router.push("/");
    }

    return (
        <IonGrid className="animate__animated" ref={ completionContainerRef }>
            <IonRow className="ion-text-center">
                <IonCol size="12">
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>Congratulations</IonCardSubtitle>
                            <IonCardTitle>Quiz Complete!</IonCardTitle>
                            <p className={ styles.emoji }>🎉</p>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonNote>You scored</IonNote>

                            <IonCardTitle className="ion-margin-bottom">
                                { score }/{ questionsLength }
                            </IonCardTitle>

                            <IonButton onClick={ playAgain } color="success" expand="block" className="ion-margin-top">Play Again!</IonButton>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}