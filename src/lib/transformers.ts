export function camelToSnake(camelCaseStr: string): string {
  return camelCaseStr.replace(/[A-Z]/g, (match, index) =>
    index === 0 ? match.toLowerCase() : `_${match.toLowerCase()}`
  );
}

export function snakeToCamel(str: string): string {
  return str.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
}

export function stringFormatter(str: string, ...args: any[]): string {
  let i = 0

  if (!args.length || !args) return str

  return str.replace(/%[@ds]/g, function (letter) {
    if (!args[i]) return letter
    return args[i++]
  })
}
//@ts-ignore
const get = (obj, prop, ...props) => {
  if (!obj || !prop)
    return null;

  const val = obj[prop];

  if (typeof val === 'undefined') {
    return null
  }

  if (!props.length || !val) {
    return val;
  }

  //@ts-ignore
  return get(val, ...props);
};
//@ts-ignore
const propertyPathToArray = (path) => path.replace(/\[/g, '.').replace(/\]/g, '').split('.');
//@ts-ignore
export const getProperty = (path: string, obj: object | null | undefined) => get(obj, ...propertyPathToArray(path));

