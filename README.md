# module-clsx
Simple and fast [BEM](https://en.bem.info/) class names helper for CSS Modules. Inspired by [clsx](https://github.com/lukeed/clsx) and [bem-cn](https://github.com/albburtsev/bem-cn)
- No dependencies.
- Useful for [React](#react-example)
- [TypeScript](https://www.typescriptlang.org/) definitions.
- [Configurable](#custom-separators)
- Mixins
## Installation
```
$ npm install module-clsx --save
```
or
```
$ yarn add module-clsx
```

## Usage
```scss
.element {
    &_modifier {
        disaply: block;
    }
    &_modifier_value {
        display: flex;
    }
}
```


```js
import block from 'module-clsx'
import styles from './Component.module.scss'

const b = block(styles)
```
 
### Element
```js
b('element');
// => 'element_HASH' 
b('element', { modifier: true });
// => 'element_HASH element_modifier_HASH'
b('element', { modifier: 'value' });
// => 'element_HASH element_modifier_value_HASH'
b('element', 'mixin');
// 'element_HASH mixin'
b('element', { modifier: 'value' }, 'mixin');
//=> 'element_HASH element_modifier_value_HASH mixin'
b('element', { modifier: 'value' }, 'mixin', null, false, undefined, 'mix');
//=> 'element_HASH element_modifier_value_HASH mixin mix'
```


## React example
```typescript
import React from 'react'
import block from 'bem-clsx'
import styles from './UserInfo.module.scss'

interface IProps {
  userName: string
  avatarUrl: string
  online: boolean
  className?: string
}

const b = block(styles)

const UserInfo: React.FC<IProps> = ({
  className,
  userName,
  avatarUrl,
  online
 }) => (
   <div className={b('root', className)}>
     <img className={b('avatar')} src={avatarUrl}/>
     <span className={b('name', { active: online })}>{userName}<span>
     <div className={b('status', { online })}/>
   </div>
 )
```
If props `className` is `user-info` and `online` is true, the result would be the following HTML:
```html
<div class="root_HASH user-info">
  <img class="avatar_HASH" src="https://images.com/test" />
  <span class="name_HASH name_active_HASH">Some User</span>
  <div class="status_HASH status_online_HASH" />
</div>
```
## Custom separators
For using custom element and modifier separators, you can easily create your own module that calls the original with configuration options:

```ts
// ./src/helpers/bem.ts
import block from 'module-clsx'

const  customConfig  = {
  modifierSeparator: '--',
  modifierValueSeparator: '-',
}

const customBlock = (styles: {[key: string]: string}) => (
  block(styles, customConfig)
)

export default customBlock
```
Now you can use this function in your application. Example:
```ts
import block from 'helpers/bem'
import styles from './Component.module.scss'

const b = block(styles)

b('element', { modifier: 'value' }, 'mixin', null, false, undefined, 'mix') 
// => 'element_HASH element--modifier-value_HASH mixin mix'
```
### Default options
```ts
{
  modifierSeparator: '_',
  modifierValueSeparator: '_',
}
```

## License
The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).