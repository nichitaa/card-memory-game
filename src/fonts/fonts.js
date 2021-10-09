import {createGlobalStyle} from 'styled-components';

import PokemonSolid from './PokemonSolid.woff2';

export default createGlobalStyle`
  @font-face {
    font-family: 'PokemonSolid';
    src: local('PokemonSolid'), local('PokemonSolid'),
    url(${PokemonSolid}) format('woff2');
    font-weight: 300;
    font-style: normal;
  }
`;
