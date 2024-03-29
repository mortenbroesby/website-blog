import { invariant } from "./invariant"

export type Position = {
  x: number
  y: number
}

export type Rect = {
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
  x: number
  y: number
  center: Position
}

/**
 * The CSS box model
 * Link: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model
 */
export type BoxModel = {
  // content + padding + border + margin
  marginBox: Rect

  // content + padding + border
  borderBox: Rect

  // content + padding
  paddingBox: Rect

  // content
  contentBox: Rect

  // for your own consumption
  border: Spacing
  padding: Spacing
  margin: Spacing
}

export type AnyRectType = ClientRect | DOMRect | Rect | Spacing

export type Spacing = {
  top: number
  right: number
  bottom: number
  left: number
}

export const getRect = ({ top, right, bottom, left }: Spacing): Rect => {
  const width: number = right - left
  const height: number = bottom - top

  const rect: Rect = {
    // ClientRect
    top,
    right,
    bottom,
    left,
    width,
    height,

    // DOMRect
    x: left,
    y: top,

    // Rect
    center: {
      x: (right + left) / 2,
      y: (bottom + top) / 2,
    },
  }

  return rect
}

export const expand = (target: Spacing, expandBy: Spacing): Spacing => ({
  // pulling back to increase size
  top: target.top - expandBy.top,
  left: target.left - expandBy.left,

  // pushing forward to increase size
  bottom: target.bottom + expandBy.bottom,
  right: target.right + expandBy.right,
})

export const shrink = (target: Spacing, shrinkBy: Spacing): Spacing => ({
  // pushing forward to decrease size
  top: target.top + shrinkBy.top,
  left: target.left + shrinkBy.left,

  // pulling backwards to decrease size
  bottom: target.bottom - shrinkBy.bottom,
  right: target.right - shrinkBy.right,
})

const shift = (target: Spacing, shiftBy: Position): Spacing => ({
  top: target.top + shiftBy.y,
  left: target.left + shiftBy.x,
  bottom: target.bottom + shiftBy.y,
  right: target.right + shiftBy.x,
})

const noSpacing: Spacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

type CreateBoxArgs = {
  borderBox: AnyRectType
  margin?: Spacing
  border?: Spacing
  padding?: Spacing
}

export const createBox = ({
  borderBox,
  margin = noSpacing,
  border = noSpacing,
  padding = noSpacing,
}: CreateBoxArgs): BoxModel => {
  // marginBox = borderBox + margin
  const marginBox: Rect = getRect(expand(borderBox, margin))

  // borderBox = borderBox - padding
  const paddingBox: Rect = getRect(shrink(borderBox, border))

  // contentBox = paddingBox - padding
  const contentBox: Rect = getRect(shrink(paddingBox, padding))

  return {
    marginBox,
    borderBox: getRect(borderBox),
    paddingBox,
    contentBox,
    margin,
    border,
    padding,
  }
}

// Computed spacing styles will always be in pixels
// https://codepen.io/alexreardon/pen/OZyqXe
const parse = (raw: string): number => {
  const value: string = raw.slice(0, -2)
  const suffix: string = raw.slice(-2)

  if (suffix !== "px") {
    return 0
  }

  const result = Number(value)

  invariant(
    !isNaN(result),
    `Could not parse value [raw: ${raw}, without suffix: ${value}]`
  )

  return result
}

const getWindowScroll = (): Position => ({
  x: window.pageXOffset,
  y: window.pageYOffset,
})

export const offset = (original: BoxModel, change: Position): BoxModel => {
  const { borderBox, border, margin, padding } = original
  const shifted: Spacing = shift(borderBox, change)

  return createBox({
    borderBox: shifted,
    border,
    margin,
    padding,
  })
}

export const withScroll = (
  original: BoxModel,
  scroll: Position = getWindowScroll()
): BoxModel => offset(original, scroll)

export function calculateBox(
  borderBox: AnyRectType,
  styles: CSSStyleDeclaration
): BoxModel {
  const margin: Spacing = {
    top: parse(styles.marginTop),
    right: parse(styles.marginRight),
    bottom: parse(styles.marginBottom),
    left: parse(styles.marginLeft),
  }
  const padding: Spacing = {
    top: parse(styles.paddingTop),
    right: parse(styles.paddingRight),
    bottom: parse(styles.paddingBottom),
    left: parse(styles.paddingLeft),
  }
  const border: Spacing = {
    top: parse(styles.borderTopWidth),
    right: parse(styles.borderRightWidth),
    bottom: parse(styles.borderBottomWidth),
    left: parse(styles.borderLeftWidth),
  }

  return createBox({
    borderBox,
    margin,
    padding,
    border,
  })
}

export function getBox(element: Element): BoxModel {
  const borderBox: ClientRect = element.getBoundingClientRect()
  const styles: CSSStyleDeclaration = window.getComputedStyle(element)

  return calculateBox(borderBox, styles)
}

const defaultRectFactory = () => {
  return {
    bottom: 0,
    center: { x: 0, y: 0 },
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  }
}

const defaultSpacingFactory = () => {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
}

const defaultsBoxFactory: () => BoxModel = () => {
  return {
    marginBox: defaultRectFactory(),
    borderBox: defaultRectFactory(),
    paddingBox: defaultRectFactory(),
    contentBox: defaultRectFactory(),
    border: defaultSpacingFactory(),
    padding: defaultSpacingFactory(),
    margin: defaultSpacingFactory(),
  }
}

export const defaultBox: BoxModel = defaultsBoxFactory()
