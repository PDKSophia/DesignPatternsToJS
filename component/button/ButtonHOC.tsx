/**
 * @desc 高阶组件
 * @author {pengdaokuan}
 */
import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import ButtonGroup from './ButtonGroup';
export type TypeMaps = 'main' | 'secondary';
export type ColorMaps = 'normal' | 'orange' | 'danger';
export type SizeMaps = 'small' | 'middle' | 'large' | 'thumb';

export interface WithButtonHOCProps {
  prefixCls?: string;
  className?: string;
  size?: SizeMaps;
  type?: TypeMaps;
  color?: ColorMaps;
  ghost?: boolean;
  antiWhite?: boolean;
  block?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const withButtonHOC = <P extends object>(
  WrapperComponent: React.ComponentType<P>
) => {
  return class extends React.Component<P & WithButtonHOCProps> {
    static Group: typeof ButtonGroup;
    constructor(props) {
      super(props);
    }

    handleClick = () => {
      const { disabled, onClick } = this.props;
      if (!disabled && onClick) {
        onClick();
      }
    };

    renderButtonComponent = ({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls: customizePrefixCls,
        className,
        size = 'middle',
        type = 'main',
        color = 'normal',
        ghost = false,
        antiWhite = false,
        block = false,
        style,
        disabled = false
      } = this.props;

      const prefixCls = getPrefixCls('button', customizePrefixCls);

      // 样式规则，style > disabled > antiWhite > ghost > color
      const classString = classNames(prefixCls, className, {
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-${color}`]: true,
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-ghost`]: ghost,
        [`${prefixCls}-ghost-${color}`]: !!color && ghost,
        [`${prefixCls}-antiwhite-${type}`]: !!type && antiWhite,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-disabled-${color}`]: disabled && !!color, // 主题色按钮的禁止
        [`${prefixCls}-disabled-ghost`]: disabled && ghost, // 幽灵按钮的禁止
        [`${prefixCls}-disabled-antiwhite-${type}`]: disabled && antiWhite // 反白按钮的禁止
      });

      let cssStyle: React.CSSProperties;
      if (style) {
        cssStyle = { ...style, 'line-height': style && style.height };
      }

      return (
        <div
          style={cssStyle}
          className={classString}
          onClick={this.handleClick}
        >
          <WrapperComponent {...this.props} />
        </div>
      );
    };

    render() {
      return <ConfigConsumer>{this.renderButtonComponent}</ConfigConsumer>;
    }
  };
};

export default withButtonHOC;
