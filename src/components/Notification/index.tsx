'use client';

import { ActionIcon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { XIcon } from 'lucide-react';
import { rgba } from 'polished';
import { memo } from 'react';
import { Flexbox, FlexboxProps } from 'react-layout-kit';

const useStyles = createStyles(({ css, token, isDarkMode }) => ({
  cancelIcon: css`
    position: absolute;
    z-index: 100;
    top: 8px;
    right: 8px;
  `,
  container: css`
    position: absolute;
    z-index: 1100;
    bottom: 16px;
    inset-inline-end: 20px;

    overflow: hidden;

    background: ${token.colorBgContainer};
    border: 1px solid ${token.colorSplit};
    border-radius: 8px;
    box-shadow: ${token.boxShadowSecondary};
  `,
  mobileContainer: css`
    bottom: 8px;
    inset-inline-start: 8px;
  `,
  wrapper: css`
    background: linear-gradient(
        180deg,
        ${rgba(token.colorBgContainer, 0)},
        ${token.colorBgContainer} ${isDarkMode ? '80' : '140'}px
      ),
      url("");
  `,
}));

interface NotificationProps extends FlexboxProps {
  height?: number | string;
  mobile?: boolean;
  onCancel?: (show?: boolean) => void;
  show: boolean;
  showCloseIcon?: boolean;
  width?: number | string;
  wrapper?: FlexboxProps;
}

const Notification = memo<NotificationProps>(
  ({
    mobile,
    children,
    show,
    onCancel,
    showCloseIcon = true,
    width = 422,
    height = 'auto',
    wrapper = {},
    className,
    ...rest
  }) => {
    const { styles, cx } = useStyles();
    const { className: wrapperClassName, ...restWrapper } = wrapper;
    return (
      show && (
        <Flexbox
          className={cx(styles.container, mobile && styles.mobileContainer, className)}
          height={height}
          width={mobile ? 'calc(100% - 16px)' : width}
          {...rest}
        >
          {showCloseIcon && (
            <ActionIcon className={styles.cancelIcon} icon={XIcon} onClick={() => onCancel?.()} />
          )}
          <Flexbox
            className={cx(styles.wrapper, wrapperClassName)}
            gap={16}
            horizontal
            padding={'20px 20px 16px'}
            {...restWrapper}
          >
            {children}
          </Flexbox>
        </Flexbox>
      )
    );
  },
);

export default Notification;
