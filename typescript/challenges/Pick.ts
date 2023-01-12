const a = {};
type b = keyof typeof a; // never

const aa = { name: 'chin', age: 88 };
type bb = keyof typeof aa; // "name" | "age"

const c = '1';
type cc = keyof typeof c; //
