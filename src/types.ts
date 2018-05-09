export type Key = any;
export type Value = any;
export type Comparator<Key> = (a: Key, b:Key) => number;
export type Visitor<Key, Value> = (key: Key, value?: Value) => void;
