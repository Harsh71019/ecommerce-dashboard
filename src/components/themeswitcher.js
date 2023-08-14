// app/components/ThemeSwitcher.tsx
import { useTheme } from 'next-themes';
import { Switch } from '@nextui-org/react';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {/* <Switch
        onValueChange={() => {
          theme === 'dark' ? setTheme('light') : setTheme('dark');
        }}
      /> */}
    </div>
  );
};
