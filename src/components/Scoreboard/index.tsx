import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Button, Col, Row} from 'antd';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {getBestGameScore} from '../../store/game/actions';
import {useDispatch} from 'react-redux';
import {toggleCardRetroImages} from '../../store/cards/actions';

const StyledScoreboard = styled.div`
  box-shadow: rgba(0, 0, 0, 0.01) 0 1px 4px;
  margin: 5px;
  padding: 10px;
  border-radius: 3px;
  width: 100%;
  text-align: center;
`;

export const StyledText = styled.div`
  font-family: 'PokemonSolid', 'Maven Pro', sans-serif;
  letter-spacing: 3px;
  font-weight: normal;
  font-size: 22px;
  color: #FB1B1B;
`;

export const StyledButton = styled.div`
  .ant-btn {
    height: 100%;
    border: 2px solid;
    border-radius: 4px;
  }

  button.ant-btn.ant-btn-text {
    color: #FB1B1B;
    letter-spacing: 3px;
  }
`;


const Scoreboard = () => {
    const {game: {bestScore, currentScore}, cards: {isRetro}} = useTypedSelector(state => state);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBestGameScore());
    }, [dispatch]);

    const toggleRetro = () => {
        dispatch(toggleCardRetroImages(!isRetro));
    };

    return (
        <StyledScoreboard>
            <Row gutter={[10, 10]} justify={'space-between'}>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Row gutter={[10, 10]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <StyledText>
                                Generation
                            </StyledText>
                        </Col>
                        <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                            <StyledText>
                                <StyledButton>
                                    <Button block={true} type={'text'} onClick={toggleRetro}>
                                        {isRetro ? 'gen-iv' : 'dream-world'}
                                    </Button>
                                </StyledButton>
                            </StyledText>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <StyledText>
                        Current Score : {currentScore}
                    </StyledText>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <StyledText>
                        {currentScore >= bestScore && bestScore !== 0 ? `NEW Best Score : ${bestScore}` : `Best Score : ${bestScore}`}
                    </StyledText>
                </Col>
            </Row>
        </StyledScoreboard>
    );
};

export default Scoreboard;