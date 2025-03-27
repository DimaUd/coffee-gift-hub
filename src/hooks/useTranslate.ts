
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Custom hook that provides translation functionality
 * Usage: const t = useTranslate(); t('Hello, world!');
 */
export const useTranslate = () => {
  const { translate } = useLanguage();
  
  // Return the translate function directly
  return translate;
};

export default useTranslate;
