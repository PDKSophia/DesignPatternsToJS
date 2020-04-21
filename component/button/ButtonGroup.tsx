/**
 * @desc 组合组件
 * @author {pengdaokuan}
 */
import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export type ShapeMaps = 'default' | 'circle';
export type SizeMaps = 'small' | 'middle' | 'large' | 'thumb';

export interface AbstrunctButtonGroupProps {
  prefixCls?: string;
  className?: string;
  size?: SizeMaps;
  shape?: ShapeMaps;
  vertical?: boolean;
  border?: boolean;
  style?: React.CSSProperties;
  children?: any;
}

class ButtonGroup extends React.PureComponent<AbstrunctButtonGroupProps> {
  renderButtonGroup = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      size = 'middle',
      shape = 'default',
      vertical = false,
      border = true,
      style,
      children
    } = this.props;
    const prefixCls = getPrefixCls('button-group', customizePrefixCls);

    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${size}`]: !!size,
      [`${prefixCls}-${shape}`]: !!shape,
      [`${prefixCls}-border`]: border,
      [`${prefixCls}-vertical`]: vertical
    });

    return (
      <div style={style} className={classes}>
        {children}
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderButtonGroup}</ConfigConsumer>;
  }
}

export default ButtonGroup;
