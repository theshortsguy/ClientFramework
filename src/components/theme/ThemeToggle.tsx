'use client';

import { LuEye as Eye, LuMoon as Moon, LuSun as Sun, LuGitlab as Batman } from 'react-icons/lu';
import { useTheme } from './useTheme';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const icons = {
  dark: <Moon className='h-[1.2rem] w-[1.2rem]' />,
  'dark-knight': <Batman className='h-[1.2rem] w-[1.2rem]' />,
  colorblind: <Eye className='h-[1.2rem] w-[1.2rem]' />,
  light: <Sun className='h-[1.2rem] w-[1.2rem]' />,
  default: <Sun className='h-[1.2rem] w-[1.2rem]' />,
} as const;

export function ThemeToggle({ initialTheme }: { initialTheme?: string }) {
  const { currentTheme, themes, setTheme } = useTheme([], initialTheme);

  const key =
    currentTheme === 'dark-knight'
      ? 'dark-knight'
      : currentTheme?.includes('colorblind')
        ? 'colorblind'
        : currentTheme?.includes('dark')
          ? 'dark'
          : currentTheme === 'default'
            ? 'default'
            : 'light';

  const Icon = icons[key as keyof typeof icons];

  // Render in enforced order; only include items that exist in `themes`
  const ordered = ['default', 'dark', 'dark-knight', 'colorblind', 'colorblind-dark'].filter((t) => themes.includes(t));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='rounded-full'>
          {Icon}
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {ordered.map((t) => {
          const label =
            t === 'default'
              ? 'Light'
              : t === 'dark'
                ? 'Dark'
                : t === 'dark-knight'
                  ? 'Dark-Knight'
                  : t === 'colorblind'
                    ? 'Colorblind'
                    : t === 'colorblind-dark'
                      ? 'Colorblind-Dark'
                      : t;
          return (
            <DropdownMenuItem key={t} onClick={() => setTheme(t)} className='capitalize'>
              {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
