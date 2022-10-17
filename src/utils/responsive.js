import { useMediaQuery } from '@mantine/hooks';

const useResponsive = () => {
  const isSmall = useMediaQuery('(max-width: 768px)');
  const isMedium = useMediaQuery('(min-width: 768px)');
  const isLarge = useMediaQuery('(min-width: 1200px)');

  return {
    isSmall,
    isMedium,
    isLarge,
  };
};

export default useResponsive;
