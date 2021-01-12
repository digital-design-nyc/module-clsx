import { block } from '../src'

const styles = {
  element: 'element',
  'element--modifier': 'element--modifier',
  'element--modifier-value': 'element--modifier-value',
}

const customConfig = {
  modifierSeparator: '--',
  modifierValueSeparator: '-'
}

const customBlock = (styles: {[key: string]: string}) => {
  return block(styles, customConfig)
}

const b = customBlock(styles)

describe('options', () => {
  it('uses custom options', () => {

    expect(b('element')).toEqual('element')

    expect(b('element', { modifier: 'value' })).toEqual('element element--modifier-value')

    expect(b('element', { modifier: true })).toEqual('element element--modifier')

    expect(b('element', 'mix')).toEqual('element mix')
  })
})