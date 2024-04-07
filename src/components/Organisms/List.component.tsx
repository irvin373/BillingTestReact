import { List } from "@mui/material";

type Props<T> = {
  listItems: T[];
  renderItem: (item: T) => JSX.Element;
}

export default function CustomList<T>({ listItems = [], renderItem }: Props<T>) {
  return (
    <List disablePadding >
      {listItems.map(renderItem)}
    </List>
  );
}
