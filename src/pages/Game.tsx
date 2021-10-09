import React, {useEffect} from 'react';
import Card from '../components/Card';
import {Col, Row} from 'antd';
import {useDispatch} from 'react-redux';
import {initialCardsFetch} from '../store/cards/actions';
import {useTypedSelector} from '../hooks/useTypedSelector';
import Scoreboard from '../components/Scoreboard';
import LoadingDots from '../components/Loading';
import Modal from '../components/Modal';


const Game = () => {
    const dispatch = useDispatch();
    const {loading, cards} = useTypedSelector(state => state.cards);

    useEffect(() => {
        dispatch(initialCardsFetch(24));
    }, [dispatch]);

    return (
        <div style={{width: '100%'}}>
            <Scoreboard/>
            <Modal/>
            {loading ? <LoadingDots/> :
                <Row gutter={[8, 8]}>
                    {/*@ts-ignore*/}
                    {cards.map((el: any) => {
                        return <Col xs={24} sm={12} md={8} lg={6} xl={4} key={el.name}
                                    style={{display: 'flex', justifyContent: 'center'}}>
                            <Card poke={el}/>
                        </Col>;
                    })}
                </Row>}
        </div>
    );
};

export default Game;