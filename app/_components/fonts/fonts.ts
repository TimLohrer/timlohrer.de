import localFont from 'next/font/local';

export const sfMono = localFont({
  src: [
    { path: '../../../public/fonts/SFMonoRegular.otf', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/SFMonoBold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-sf-mono',
});   