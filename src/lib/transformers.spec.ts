import { camelToSnake, snakeToCamel, stringFormatter, getProperty } from './transformers'

describe('transformers()', () => {

  describe('camelToSnake', () => {
    it('should convert a single word camelCase string to snake_case', () => {
      const result = camelToSnake('helloWorld')
      expect(result).toBe('hello_world')
    })

    it('should convert a multi-word camelCase string to snake_case', () => {
      const result = camelToSnake('helloWorldFooBar')
      expect(result).toBe('hello_world_foo_bar')
    })

    it('should return an empty string when passed an empty string', () => {
      const result = camelToSnake('')
      expect(result).toBe('')
    })

    it('should return the original string when passed a snake_case string', () => {
      const result = camelToSnake('hello_world')
      expect(result).toBe('hello_world')
    })

    it('should return the original string when passed a kebab-case string', () => {
      const result = camelToSnake('hello-world')
      expect(result).toBe('hello-world')
    })

    it('should return the original string when passed a PascalCase string', () => {
      const result = camelToSnake('HelloWorld')
      expect(result).toBe('hello_world')
    })
  })

  describe('snakeToCamel', () => {
    it('should convert snake_case strings to camelCase', () => {
      expect(snakeToCamel('foo_bar_baz')).toBe('fooBarBaz');
      expect(snakeToCamel('hello-world')).toBe('helloWorld');
      expect(snakeToCamel('snake_case_is_fun')).toBe('snakeCaseIsFun');
    });

    it('should leave camelCase strings unchanged', () => {
      expect(snakeToCamel('camelCaseIsFun')).toBe('camelCaseIsFun');
      expect(snakeToCamel('fooBarBaz')).toBe('fooBarBaz');
    });

    it('should handle empty strings', () => {
      expect(snakeToCamel('')).toBe('');
    });
  });

  describe('stringFormatter', () => {
    it('should return the formatted string', () => {
      expect(stringFormatter('Hello, %@!', 'world')).toBe('Hello, world!')
      expect(stringFormatter('The %d %s fox', 5, 'quick')).toBe('The 5 quick fox')
      expect(stringFormatter('The %s is %s', 'sky', 'blue')).toBe('The sky is blue')
    })

    it('should handle multiple format specifiers', () => {
      expect(stringFormatter('%@ is %@ and %@ is %@', 'This', 'great', 'that', 'terrible')).toBe('This is great and that is terrible')
    })

    it('should handle missing arguments', () => {
      expect(stringFormatter('Hello, %@!')).toBe('Hello, %@!')
      expect(stringFormatter('The %s is %s')).toBe('The %s is %s')
      expect(stringFormatter('The %d %s fox', 5)).toBe('The 5 %s fox')
    })
  })

  describe('getProperty function', () => {
    interface Person {
      name: string;
      age: number;
      address: {
        street: string;
        city: string;
      };
    }

    const person: Person = {
      name: 'Alice',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
      },
    };

    it('returns the correct property value for a simple property path', () => {
      expect(getProperty('name', person)).toEqual(person.name);
      expect(getProperty('age', person)).toEqual(person.age);
      expect(getProperty('address', person)).toEqual(person.address);
      expect(getProperty('address.street', person)).toEqual(person.address.street);
      expect(getProperty('address.city', person)).toEqual(person.address.city);
    });

    it('returns null for an invalid getProperty path', () => {
      expect(getProperty('address.foo', person)).toBeNull();
      expect(getProperty('foo', person)).toBeNull();
    });

    it('returns null when the object is null or undefined', () => {
      expect(getProperty('name', null)).toBeNull();
      expect(getProperty('name', undefined)).toBeNull();
    });
  });
});