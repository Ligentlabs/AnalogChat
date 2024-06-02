import { keyVaultsConfigSelectors } from '@/store/user/selectors';
import { GlobalLLMProviderKey } from '@/types/user/settings';

import { UserStore } from '../../../store';
import { currentLLMSettings, getProviderConfigById } from '../../settings/selectors/settings';

const isProviderEnabled = (provider: GlobalLLMProviderKey) => (s: UserStore) =>
  getProviderConfigById(provider)(s)?.enabled || false;

/**
 * @description The conditions to enable client fetch
 * 1. If no baseUrl or apikey input, force on Client.
 * 2. If only contains baseUrl, force on Client
 * 3. Follow the user settings.
 * 4. On Server, by default.
 */
const isProviderFetchOnClient = (provider: GlobalLLMProviderKey | string) => (s: UserStore) => {
  const config = getProviderConfigById(provider)(s);

  // 1. If no baseUrl or apikey input, force on Client.
  const isProviderEndpointNotEmpty = keyVaultsConfigSelectors.isProviderApiKeyNotEmpty(provider)(s);
  const isProviderApiKeyNotEmpty = keyVaultsConfigSelectors.isProviderApiKeyNotEmpty(provider)(s);
  if (!isProviderEndpointNotEmpty && !isProviderApiKeyNotEmpty) return false;

  // 2. If only contains baseUrl, force on Client
  if (isProviderEndpointNotEmpty && !isProviderApiKeyNotEmpty) return false;

  // 3. Follow the user settings.
  if (typeof config?.fetchOnClient !== 'undefined') return config?.fetchOnClient;

  // 4. On Server, by default.
  return false;
};

const getCustomModelCard =
  ({ id, provider }: { id?: string; provider?: string }) =>
  (s: UserStore) => {
    if (!provider) return;

    const config = getProviderConfigById(provider)(s);

    return config?.customModelCards?.find((m) => m.id === id);
  };

const currentEditingCustomModelCard = (s: UserStore) => {
  if (!s.editingCustomCardModel) return;
  const { id, provider } = s.editingCustomCardModel;

  return getCustomModelCard({ id, provider })(s);
};

const isAutoFetchModelsEnabled =
  (provider: GlobalLLMProviderKey) =>
  (s: UserStore): boolean => {
    return getProviderConfigById(provider)(s)?.autoFetchModelLists || false;
  };

const openAIConfig = (s: UserStore) => currentLLMSettings(s).openai;
const bedrockConfig = (s: UserStore) => currentLLMSettings(s).bedrock;
const ollamaConfig = (s: UserStore) => currentLLMSettings(s).ollama;
const azureConfig = (s: UserStore) => currentLLMSettings(s).azure;

const isAzureEnabled = (s: UserStore) => currentLLMSettings(s).azure.enabled;

export const modelConfigSelectors = {
  azureConfig,
  bedrockConfig,

  currentEditingCustomModelCard,
  getCustomModelCard,

  isAutoFetchModelsEnabled,
  isAzureEnabled,
  isProviderEnabled,
  isProviderFetchOnClient,

  ollamaConfig,
  openAIConfig,
};
