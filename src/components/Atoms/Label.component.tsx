import { Typography, TypographyProps } from '@mui/material';

type Props = {
  children: React.ReactNode;
  props: TypographyProps;
};

export default function Label({ children, ...props }: Props) {
  return <Typography {...props}>{children}</Typography>
}

