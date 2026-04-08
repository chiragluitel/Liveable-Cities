import React from "react";
import { Button } from "react-native";

type ItemProps = {
  title: string
  value: string
  onPressFunc: Function
}

export default function DropDownItem({title = "{title}", value, onPressFunc}: ItemProps) {
  return (
    <Button onPress={() => onPressFunc(value)} title={title} />
  );
}