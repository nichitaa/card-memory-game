import React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {updateGameScore} from '../../store/game/actions';

const StyledCardCover = styled.div<{ img: string }>`
  height: 100%;
  width: 100%;
  background-image: url(${props => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 3px;
`;

const StyledCardContent = styled.div`
  flex: 1;
  transition: ease 100ms;
  background: rgba(0, 0, 0, 0.0);
  text-align: center;
  font-family: 'PokemonSolid', 'Maven Pro', sans-serif;
  letter-spacing: 3px;
  font-weight: 200;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.8)
`;

const StyledCard = styled.div`
  transition: ease 350ms;
  margin: 5px;
  display: flex;
  flex-direction: column;
  border: 3px solid rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.01) 0 1px 4px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  max-width: 230px;
  height: 260px;

  &:hover {
    background: rgba(0, 0, 0, 0.07);
    box-shadow: rgba(0, 0, 0, 0.2) 0 12px 28px 0, rgba(0, 0, 0, 0.1) 0 2px 4px 0, rgba(255, 255, 255, 0.05) 0 0 0 1px inset;
    cursor: pointer;

    ${StyledCardContent} {
      color: rgba(0, 117, 190, 1);
    }
  }
`;

const Card = ({poke}) => {
    const dispatch = useDispatch();

    const onClick = () => dispatch(updateGameScore(poke.id));

    return (
        <StyledCard onClick={onClick}>
            <StyledCardCover img={poke.img}/>
            <StyledCardContent>
                {poke.name}
            </StyledCardContent>
        </StyledCard>
    );
};

export default Card;