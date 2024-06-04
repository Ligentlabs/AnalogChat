'use client';

import { ChatHeader } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo } from 'react';

import ShareAgentButton from '../../features/ShareAgentButton';

export const useStyles = createStyles(({ css, token }) => ({
  // You can remove this style since the Logo component is being removed
  // logo: css`
  //   color: ${token.colorText};
  //   fill: ${token.colorText};
  // `,
}));

const Header = memo(() => {
  // No need to get styles since they are not used anymore
  // const { styles } = useStyles();

  return (
    <ChatHeader
      // Remove the left prop which contained the Logo component
      right={<ShareAgentButton />}
    />
  );
});

export default Header;
