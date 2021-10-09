import React, {useState} from 'react';
import styled from 'styled-components';
import Modal, {BaseModalBackground, ModalProvider} from 'styled-react-modal';
import {StyledText} from '../Scoreboard';
import {LOCAL_STORAGE_KEY} from '../../store/game/types';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useDispatch} from 'react-redux';
import {toggleEndGameModal} from '../../store/game/actions';

const StyledModal = Modal.styled`
  width: 23rem;
  height: 13rem;
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(239, 252, 213, 1);
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;
  border-radius: 3px;
 `;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

export default function EndGameModal() {
    const dispatch = useDispatch();
    const {endGameModal, endGameScore, bestScore} = useTypedSelector(state => state.game);
    const [opacity, setOpacity] = useState(0);

    const toggleModal = () => {
        setOpacity(0);
        dispatch(toggleEndGameModal(!endGameModal));
    };

    const afterOpen = () => {
        setTimeout(() => {
            setOpacity(1);
        }, 100);
    };

    const beforeClose = () => {
        return new Promise((resolve) => {
            setOpacity(0);
            setTimeout(resolve, 300);
        });
    };

    const isNewBiggestScore = () => {
        const storageScores = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storageScores) {
            const arr: number[] = JSON.parse(storageScores);
            const max = Math.max(...arr);
            return endGameScore === max;
        } else {
            return false;
        }
    };

    return (
        <ModalProvider backgroundComponent={FadingBackground}>
            <StyledModal
                isOpen={endGameModal}
                afterOpen={afterOpen}
                beforeClose={beforeClose}
                onBackgroundClick={toggleModal}
                onEscapeKeydown={toggleModal}
                opacity={opacity}
                backgroundProps={{opacity}}
            >
                <StyledText>
                    Game Over !
                </StyledText>
                <br/>
                <StyledText>
                    {isNewBiggestScore() ?
                        <>
                            <StyledText>
                                NEW Best Score : {endGameScore}
                            </StyledText>
                        </> :
                        <>
                            <StyledText>
                                Score : {endGameScore}
                            </StyledText>
                            <br/>
                            <StyledText>
                                Best : {bestScore}
                            </StyledText>
                        </>}
                </StyledText>
            </StyledModal>
        </ModalProvider>
    );
}