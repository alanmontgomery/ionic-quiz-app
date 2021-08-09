import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonNote, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter, useIonViewDidEnter } from '@ionic/react';

import styles from "./Quiz.module.scss";
import { useStoreState } from 'pullstate';
import { SettingsStore } from '../store';
import { getCategories, getChosenCategory, getChosenDifficulty, getDifficulties } from '../store/Selectors';
import { Category, Difficulty } from '../components/Settings';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchQuestions } from '../questions';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import { useRef } from 'react';
import { updateChosenCategory, updateChosenDifficulty } from '../store/SettingsStore';
import { Answer } from '../components/Answer';
import { CompletedCard } from '../components/CompletedCard';
import { QuizStats } from '../components/QuizStats';

const Questions = () => {

    const mainContainerRef = useRef();
    const completionContainerRef = useRef();
    const swiperRef = useRef(null);

    const router = useIonRouter();
    const chosenCategory = useStoreState(SettingsStore, getChosenCategory);
    const chosenDifficulty = useStoreState(SettingsStore, getChosenDifficulty);

    const [ currentQuestion, setCurrentQuestion ] = useState(1);
    const [ score, setScore ] = useState(0);
    const [ completed, setCompleted ] = useState(false);

    const [ questions, setQuestions ] = useState(false);
    const [ slideSpace, setSlideSpace ] = useState(0);


    useEffect(() => {

        const getQuestions = async () => {

            const fetchedQuestions = await fetchQuestions(chosenCategory, chosenDifficulty);
            setQuestions(fetchedQuestions);
        }

        getQuestions();
    }, []);

    useIonViewDidEnter(() => {

        setSlideSpace(40);
    });

    const handleAnswerClick = (event, answer, question) => {
        
        const isCorrect = question.correct_answers[`${ answer }_correct`] === "true";

        if (isCorrect) {

            event.target.setAttribute("color", "success");
        } else {

            event.target.setAttribute("color", "danger");
        }
        
        setTimeout(() => {

            isCorrect && setScore(score => score + 1);
            event.target.setAttribute("color", "light");
            swiperRef.current.swiper.slideNext();
            checkIfComplete();
        }, 1000);
    }

    const checkIfComplete = () => {

        if (currentQuestion === questions.length) {

            //  Quiz has finished
            //  Hide Slides and show completion screen
            mainContainerRef.current.classList.add("animate__zoomOutDown");

            setTimeout(() => {

                setCompleted(true);
                completionContainerRef.current.classList.add("animate__zoomInUp");
            }, 1000);
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
                { !completed &&
                
                    <IonGrid className={ `${ styles.mainGrid } animate__animated` } ref={ mainContainerRef }>
                        
                        <QuizStats chosenCategory={ chosenCategory } chosenDifficulty={ chosenDifficulty } questionsLength={ questions.length } currentQuestion={ currentQuestion } score={ score } />

                        <IonRow className={ styles.mainRow }>
                            <IonCol size="12">
                                <IonRow>
                                    <Swiper ref={ swiperRef } spaceBetween={ slideSpace } slidesPerView={ 1 } onSlideChange={ e => setCurrentQuestion(e.activeIndex + 1) }>
                                        { questions && questions.map((question, index) => {

                                            return (

                                                <SwiperSlide key={ `question_${ index }`}>
                                                    <IonCard id="questionCard" className="animate__animated">

                                                        <IonCardHeader className="ion-text-center">
                                                            <IonCardSubtitle>{ question.category }</IonCardSubtitle>
                                                            { question.tags.length > 0 && 
                                                                <IonBadge color="success">
                                                                    { question.tags[0].name }
                                                                </IonBadge>
                                                            }
                                                            <IonCardTitle className={ styles.questionTitle }>{ question.question }</IonCardTitle>
                                                        </IonCardHeader>

                                                        <IonCardContent>
                                                            { Object.keys(question.answers).map((answer, index) => {

                                                                if (question.answers[answer] !== null) {
                                                                    return <Answer key={ `answer_${ index }`} answer={ answer } question={ question } handleAnswerClick={ handleAnswerClick } />;
                                                                }
                                                            })}
                                                        </IonCardContent>
                                                    </IonCard>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                }

                { completed &&
                    <CompletedCard completionContainerRef={ completionContainerRef } score={ score } questionsLength={ questions.length } />
                }
			</IonContent>
		</IonPage>
	);
};

export default Questions;