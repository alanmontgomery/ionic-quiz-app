import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter, useIonToast } from '@ionic/react';

import styles from "./Quiz.module.scss";
import { useStoreState } from 'pullstate';
import { SettingsStore } from '../store';
import { getCategories, getChosenCategory, getChosenDifficulty, getDifficulties } from '../store/Selectors';
import { Category, Difficulty } from '../components/Settings';

const Quiz = () => {

    const router = useIonRouter();
    const categories = useStoreState(SettingsStore, getCategories);
    const difficulties = useStoreState(SettingsStore, getDifficulties);

    const chosenCategory = useStoreState(SettingsStore, getChosenCategory);
    const chosenDifficulty = useStoreState(SettingsStore, getChosenDifficulty);

    const [ show, hide ] = useIonToast();

    const startQuiz = async () => {

        if (chosenCategory && chosenDifficulty) {
            const chosenCategoryElement = document.getElementById(`categoryButton_${ chosenCategory }`);
            const chosenDifficultyElement = document.getElementById(`difficultyButton_${ chosenDifficulty }`);

            const categoriesCardElement = document.getElementById("categoriesCard");
            const difficultiesCardElement = document.getElementById("difficultiesCard");

            chosenCategoryElement.classList.add("ontop");
            chosenDifficultyElement.classList.add("ontop");

            chosenCategoryElement.classList.add("animate__heartBeat");
            chosenDifficultyElement.classList.add("animate__heartBeat");

            setTimeout(() => {
                
                chosenCategoryElement.classList.remove("animate__heartBeat");
                chosenDifficultyElement.classList.remove("animate__heartBeat");
                chosenCategoryElement.classList.remove("ontop");
                chosenDifficultyElement.classList.remove("ontop");
            }, 1000);

            setTimeout(() => {
                
                categoriesCardElement.classList.add("animate__slideOutRight");
                difficultiesCardElement.classList.add("animate__slideOutLeft");

                setTimeout(() => {
                    
                    categoriesCardElement.classList.remove("animate__slideOutRight");
                    difficultiesCardElement.classList.remove("animate__slideOutLeft");
                }, 1000);
            }, 1100);

            setTimeout(() => {
                
                router.push("/questions");
            }, 1700);
        } else {

            show({
                header: "Hang on there!",
                message: "You must choose a category and difficulty!",
                duration: 3000,
                color: "warning"
            })
        }
    }

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
                    <IonTitle>
                        <img src="/assets/main.png" style={{ width: "30%" }} alt="logo" />
                    </IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="background">
                <IonGrid className={ styles.mainGrid }>
                    <IonRow className={ styles.mainRow }>
                        <IonCol size="12">
                            <IonCard id="categoriesCard" className="animate__animated">
                                <IonCardHeader className="ion-text-center">
                                    <IonCardSubtitle>Choose a category</IonCardSubtitle>
                                </IonCardHeader>

                                <IonCardContent>
                                    <IonRow>
                                        { categories.map((category, index) => {

                                            const chosen = category.value === chosenCategory;

                                            return <Category key={ `category_${ index }` } { ...category } chosen={ chosen } />;
                                        })}
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>

                    <IonRow className={ styles.difficultyContainer }>
                        <IonCol size="12">
                            <IonCard id="difficultiesCard" className="animate__animated">
                                <IonCardHeader className="ion-text-center">
                                    <IonCardSubtitle>Choose a difficulty</IonCardSubtitle>
                                </IonCardHeader>

                                <IonCardContent>
                                    <IonRow>
                                        { difficulties.map((difficulty, index) => {

                                            const chosen = difficulty.value === chosenDifficulty;

                                            return <Difficulty key={ `difficulty_${ index }` } { ...difficulty } chosen={ chosen } />;
                                        })}
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <div className={ styles.startButton } onClick={ startQuiz }>
                                Start Quiz!
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Quiz;