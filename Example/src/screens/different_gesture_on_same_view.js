import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import Gestures from '../../react-native-gestures'; // this is for development only, instead of 'react-native-gestures' because react-native doesn't work with module links

export default class DifferentGestureOnSameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseFontSize: 20,
      scale: 1,
      color: 0,
      baseLeft: 10,
      baseTop: 0,
      offsetLeft: 0,
      offsetTop: 0,
      baseRotation: 0,
      offsetRotation: 0
    };

    this.onPinch = this.onPinch.bind(this);
    this.onTap = this.onTap.bind(this);
    this.onPan = this.onPan.bind(this);
    this.onRotation = this.onRotation.bind(this);
  }

  render() {
    console.log(`In render: state: ${JSON.stringify(this.state)}`);
    return (
      <View flex={1} justifyContent='center' alignItems='center'>
        <Gestures.View
          onPinch={this.onPinch}
          onTap={this.onTap}
          onPan={this.onPan}
          onRotation={this.onRotation}
          style={{
              left: this.state.baseLeft + this.state.offsetLeft,
              top: this.state.baseTop + this.state.offsetTop,
              backgroundColor: this.state.color ? 'yellow' : 'cyan',
              flexDirection: 'row',
              transform: [{rotate: `${this.state.baseRotation + this.state.offsetRotation} rad`}]
          }}
        >
          <Image
            style={{width: 100, height: 100}}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
          <Text style={{
              flex:1,
              margin: 10,
              fontSize: this.state.baseFontSize * this.state.scale
            }}>
            -> pinch to change fontSize{'\n'}
            -> tap to change bg color{'\n'}
            -> drag to move{'\n'}
            -> rotate to rotate
          </Text>
        </Gestures.View>
      </View>
    );
  }

  onPinch(event) {
    if(event.nativeEvent.action !== 'finish') {
      this.setState({scale: event.nativeEvent.scale});
      return;
    }

    let newFontSize = this.state.baseFontSize * event.nativeEvent.scale;
    if(newFontSize < 10) newFontSize = 10;
    this.setState({
      baseFontSize: newFontSize,
      scale: 1
    });
  }

  onTap(event) {
    this.setState({
      color: (this.state.color + 1) % 2
    })
  }

  onPan(event) {
    if(event.nativeEvent.action !== 'finish') {
      this.setState({
        offsetLeft: event.nativeEvent.x,
        offsetTop: event.nativeEvent.y
      });
      return;
    }

    this.setState({
      baseLeft: event.nativeEvent.x + this.state.baseLeft,
      baseTop: event.nativeEvent.y + this.state.baseTop,
      offsetLeft: 0,
      offsetTop: 0
    })
  }

  onRotation(event) {
    if(event.nativeEvent.action !== 'finish') {
      this.setState({offsetRotation: event.nativeEvent.rotation});
      return;
    }

    this.setState({
      baseRotation: this.state.baseRotation + event.nativeEvent.rotation,
      offsetRotation: 0
    })
  }
}
