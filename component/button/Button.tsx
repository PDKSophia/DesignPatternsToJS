/**
 * @desc Button
 * @author {pengdaokuan}
 */
import * as React from 'react';
import ButtonHOC from './ButtonHOC';

export interface ButtonProps {
  children?: React.ReactNode;
}
class Button extends React.PureComponent<ButtonProps, {}> {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default ButtonHOC(Button);
