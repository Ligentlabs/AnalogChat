import { Avatar, Icon, Tag } from '@lobehub/ui';
import { Tag as ATag, Badge, Button, Input, Popover, Typography } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import {
  LucideCloud,
  LucideCloudCog,
  LucideLaptop,
  LucideRefreshCw,
  LucideSmartphone,
} from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useGlobalStore } from '@/store/global';
import { settingsSelectors } from '@/store/global/slices/settings/selectors';

export const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    fill: ${token.colorText};
  `,
  top: css`
    position: sticky;
    top: 0;
  `,
}));

const SyncStatusTag = memo(() => {
  const [isSyncing, enableSync, channelName, setSettings] = useGlobalStore((s) => [
    s.syncStatus === 'syncing',
    s.syncEnabled,
    settingsSelectors.syncConfig(s).channelName,
    s.setSettings,
  ]);
  const users = useGlobalStore((s) => s.syncAwareness, isEqual);

  const theme = useTheme();
  return enableSync ? (
    <Popover
      arrow={false}
      content={
        <Flexbox gap={8}>
          <Flexbox align={'center'} horizontal style={{ fontSize: 12 }}>
            <span>频道：</span>
            <div>
              <Input
                onChange={(e) => {
                  setSettings({ sync: { channelName: e.target.value } });
                }}
                size={'small'}
                value={channelName}
                variant={'borderless'}
              />
            </div>
          </Flexbox>
          <Flexbox gap={12}>
            {users.map((user) => (
              <Flexbox gap={12} horizontal key={user.clientID}>
                <Avatar
                  avatar={
                    <Icon
                      color={theme.purple}
                      icon={user.isMobile ? LucideSmartphone : LucideLaptop}
                      size={{ fontSize: 24 }}
                    />
                  }
                  background={theme.purple1}
                  shape={'square'}
                />

                <Flexbox>
                  <Flexbox gap={8} horizontal>
                    {user.name || user.id}
                    {user.current && (
                      <ATag bordered={false} color={'blue'}>
                        current
                      </ATag>
                    )}
                  </Flexbox>
                  <Typography.Text type={'secondary'}>
                    {user.device} · {user.os} · {user.browser}
                  </Typography.Text>
                </Flexbox>
              </Flexbox>
            ))}
          </Flexbox>
        </Flexbox>
      }
      open
      placement={'bottomLeft'}
    >
      <Tag
        bordered={false}
        color={isSyncing ? 'blue' : 'green'}
        icon={<Icon icon={isSyncing ? LucideRefreshCw : LucideCloud} spin={isSyncing} />}
      >
        {isSyncing ? '同步中' : '已同步'}
      </Tag>
    </Popover>
  ) : (
    <Popover
      arrow={false}
      content={
        <Flexbox gap={12} width={320}>
          会话数据仅存储于当前使用的浏览器。如果使用不同浏览器打开时，数据不会互相同步。如你需要在多个设备间同步数据，请配置并开启云端同步。
          <Link href={'/settings/sync'}>
            <Button block icon={<Icon icon={LucideCloudCog} />} type={'primary'}>
              配置云端同步
            </Button>
          </Link>
        </Flexbox>
      }
      placement={'bottomLeft'}
    >
      <div>
        <Tag>
          <Badge status="default" /> 本地
        </Tag>
      </div>
    </Popover>
  );
});

export default SyncStatusTag;