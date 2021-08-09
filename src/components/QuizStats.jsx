import { IonCard, IonCardContent, IonCardSubtitle, IonCol, IonItem, IonLabel, IonNote, IonRow } from "@ionic/react";

export const QuizStats = ({ chosenCategory, chosenDifficulty, currentQuestion, questionsLength, score }) => (

    <IonRow>
        <IonCol size="12">
            <IonCard>
                <IonCardContent className="ion-text-center">
                    <IonCardSubtitle>{ chosenCategory } | { chosenDifficulty }</IonCardSubtitle>
                    <IonItem lines="none">
                        <IonLabel className="ion-text-center">
                            <IonCardSubtitle>Question</IonCardSubtitle>
                            <IonNote>{ currentQuestion } / { questionsLength }</IonNote>
                        </IonLabel>

                        <IonLabel className="ion-text-center">
                            <IonCardSubtitle>Score</IonCardSubtitle>
                            <IonNote>{ score }</IonNote>
                        </IonLabel>
                    </IonItem>
                </IonCardContent>
            </IonCard>
        </IonCol>
    </IonRow>
);