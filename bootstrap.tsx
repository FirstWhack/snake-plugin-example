import {
  CONSTANTS as GameConstants, GameStoreInstance
} from '@micro-snake/engine';
import React from 'react';
import ReactDOM from 'react-dom';
import { Stage } from 'react-konva';
import Apple from './src/components/apple/apple';
import Plums from './src/components/plum/plumContainer';


// this file is used for local testing, it is using compile time import of the store singleton

ReactDOM.render(
  <Stage width={GameConstants.canvasSize} height={GameConstants.canvasSize}>
    <Apple gameStore={GameStoreInstance}/>
    <Plums gameStore={GameStoreInstance}/>
  </Stage>,
  document.getElementById('root')
);
