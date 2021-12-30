import { alpha, Card, styled } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const SectionWrapper = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(14),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(14)
  }
}));

export const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 380,
    height: '100%',
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(4),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none'
      // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    '&.cardLeft': {},
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0px 40px 80px 0 ${shadowCard(0.4)}`
      }
    }
  };
});

export const shadowIcon = (color: string) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

export const CardIconStyle = styled('img')(({ theme }) => ({
  width: 54,
  height: 54,
  margin: '0 auto',
  marginBottom: theme.spacing(6),
  filter: shadowIcon(theme.palette.primary.main)
}));

export const useHomeStyles = makeStyles({
  animatedItem: {
    animation: `$myEffect`,
    animationDuration: '2s',
    animationDelay: '1s',
    animationFillMode: 'backwards',
    animationIterationCount: 'infinite',
    animationDirection: 'alternateReverse'
  },
  '@keyframes myEffect': {
    from: {
      top: '83%'
    },
    to: {
      top: '88%'
    }
  }
});
