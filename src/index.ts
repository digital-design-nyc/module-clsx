export interface IOptions {
  modifierSeparator: string,
  modifierValueSeparator: string
}

export type IModifiers = Record<string, string | boolean | undefined | null>

export const DEFAULT_OPTIONS: IOptions = {
  modifierSeparator: '_',
  modifierValueSeparator: '_',
}

export type Mixin = string | boolean | undefined | null

function makeMixins(...mixins: Mixin[]): string
function makeMixins(): string {
  let cls = ''
  for (let i = 0; i < arguments.length; i++) {
    const mixin = arguments[i]
    if (mixin) {
      cls += ' ' + mixin
    }
  }
  return cls
}

export const block = (
  styles: {[key: string]: string},
  { modifierSeparator, modifierValueSeparator }: IOptions = DEFAULT_OPTIONS
) => {
  function element(elementName: string, mods: IModifiers | null | undefined, ...mixins: Mixin[]): string
  function element(elementName: string, ...mixins: Mixin[]): string
  function element(elementName: string, mods: IModifiers): string
  function element(elementName: string): string

  function element(
    elementName: string,
    modsOrMixin?: IModifiers | Mixin | null | undefined,
  ): string {
    let cls = styles[elementName] || ''

    let mods: IModifiers | null = null

    if (modsOrMixin && modsOrMixin instanceof Object) {
      mods = modsOrMixin
    }

    if (mods) {
      for (const mod in mods) {
        const modVal = mods[mod]
        if (modVal) {
          const modifierClass = modVal !== true
            ? elementName + modifierSeparator + mod + modifierValueSeparator + modVal
            : elementName + modifierSeparator + mod

          if (styles[modifierClass]) {
            cls += ' ' + styles[modifierClass]
          }
        }
      }
    }

    if (typeof modsOrMixin === 'string') {
      cls += makeMixins(modsOrMixin)
    }

    for (let i = 2; i < arguments.length; i++) {
      cls += makeMixins(arguments[i])
    }

    return cls
  }

  return element
}

export default block
