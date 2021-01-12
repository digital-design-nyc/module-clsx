import { block } from '../src'

const styles = {
  element: 'element_1234',
  element_modifier: 'element_modifier_1234',
  element_modifier_value: 'element_modifier_value_1234',
}


const b = block(styles)

describe('module', () => {
  it('returns empty string if no element', () => {
    const cls = b('elem')

    expect(cls).toEqual('')
  })

  it('makes element', () => {
    const cls = b('element')

    expect(cls).toEqual('element_1234')
  })

  it('makes element with null modifier', () => {
    const cls = b('element', { modifier: null })

    expect(cls).toEqual('element_1234')
  })

  it('makes element with undefined modifier', () => {
    const cls = b('element', { modifier: undefined })

    expect(cls).toEqual('element_1234')
  })

  it('makes element with falsey modifier', () => {
    const cls = b('element', { modifier: false })

    expect(cls).toEqual('element_1234')
  })

  it('makes element with not existed modifier', () => {
    const cls = b('element', { visible: true })

    expect(cls).toEqual('element_1234')
  })

  it('makes element with not existed modifier value', () => {
    const cls = b('element', { modifier: 'another' })

    expect(cls).toEqual('element_1234')
  })

  it('makes element with modifier', () => {
    const cls = b('element', { modifier: true })

    expect(cls).toEqual('element_1234 element_modifier_1234')
  })


  it('makes element with modifier and value', () => {
    const cls = b('element', { modifier: 'value' })

    expect(cls).toEqual('element_1234 element_modifier_value_1234')
  })

  it('makes element with mixin', () => {
    const cls = b('element', 'mixin')

    expect(cls).toEqual('element_1234 mixin')
  })

  it('makes element with modifier and mixin', () => {
    const cls = b('element', { modifier: 'value' }, 'mixin')

    expect(cls).toEqual('element_1234 element_modifier_value_1234 mixin')
  })

  it('makes element with modifier and many mixins', () => {
    const cls = b('element', { modifier: 'value' }, 'mixin', false, null, undefined, 'mix')

    expect(cls).toEqual('element_1234 element_modifier_value_1234 mixin mix')
  })
})