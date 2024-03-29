import { Material } from '../lights'
import { Point, Tuple, Vector } from '../tuples'
import { IDENTITY_MATRIX, Matrix, MatrixTypeFour } from '../matrices'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { Group } from '../groups'
import { BoundingBox } from '../bounds'

export class BaseShape {
  material = new Material()
  position = new Point(0, 0, 0)
  protected transform: MatrixTypeFour = IDENTITY_MATRIX
  savedRay: Ray = new Ray(this.position, new Vector(0, 0, 0))
  parent?: Group
  name?: string
  box = new BoundingBox()
  inverseTransform?: Matrix

  constructor() {
    this.box.min = new Point(-1, -1, -1)
    this.box.max = new Point(1, 1, 1)
  }

  boundsOf(): BoundingBox {
    return this.box
  }

  getTransform(): MatrixTypeFour {
    return this.transform
  }

  setTransform(matrix: MatrixTypeFour): void {
    this.transform = matrix
  }

  intersect(ray: Ray): Intersection[] {
    if (!this.inverseTransform) {
      this.inverseTransform = new Matrix(
        Matrix.inverse(this.transform) as MatrixTypeFour
      )
    }

    const localRay = ray.transform(this.inverseTransform)
    return this.localIntersect(localRay)
  }

  localIntersect(localRay: Ray): Intersection[] {
    if (process.env.NODE_ENV != 'test') {
      throw new Error('localIntersect must be implemented in the subclass')
    }

    this.savedRay = localRay
    return []
  }

  localNormalAt(point: Point, hit?: Intersection): Vector {
    if (process.env.NODE_ENV != 'test') {
      throw new Error('localNormalAt must be implemented in the subclass')
    }

    return new Vector(point.x, point.y, point.z)
  }

  normalAt(point: Point, hit?: Intersection): Vector {
    const localPoint = this.worldToObject(point)
    const localNormal = this.localNormalAt(localPoint, hit)
    return this.normalToWorld(localNormal)
  }

  worldToObject({ x, y, z }: Point): Point {
    let newPoint = new Point(x, y, z)
    if (this.parent) {
      newPoint = this.parent.worldToObject(newPoint)
    }

    if (!this.inverseTransform) {
      this.inverseTransform = new Matrix(
        Matrix.inverse(this.transform) as MatrixTypeFour
      )
    }

    return this.inverseTransform.multiplyByTuple(newPoint)
  }

  normalToWorld(normal: Vector): Vector {
    if (!this.inverseTransform) {
      this.inverseTransform = new Matrix(
        Matrix.inverse(this.transform) as MatrixTypeFour
      )
    }

    const newNormal: Tuple = new Matrix(
      this.inverseTransform.transpose<MatrixTypeFour>()
    ).multiplyByTuple(normal)

    let normalizedNormal = new Vector(
      newNormal.x,
      newNormal.y,
      newNormal.z
    ).normalize()

    if (this.parent) {
      normalizedNormal = this.parent.normalToWorld(normalizedNormal)
    }

    return normalizedNormal
  }

  parentSpaceBoundsOf(): BoundingBox {
    return this.boundsOf().transform(this.transform)
  }
}
