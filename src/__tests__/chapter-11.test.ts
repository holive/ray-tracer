import { Camera } from '../camera'
import { viewTransform } from '../transformations'
import { Color, Point, Vector } from '../tuples'
import { World } from '../world'
import { Material, PointLight } from '../lights'
import { StripePattern } from '../patterns/StripePattern'
import { Matrix } from '../matrices'
import { Plane } from '../plane'
import { CheckersPattern } from '../patterns/CheckersPattern'
import { Sphere } from '../spheres'

describe('Putting together chapter 11', () => {
  it.skip('renders the scene', () => {
    // camera
    const camera = new Camera(400, 200, 1.152)
    camera.transform = viewTransform(
      new Point(-2.6, 1.5, -3.9),
      new Point(-0.6, 1, -0.8),
      new Vector(0, 1, 0)
    )

    const world = new World()
    world.lights = [
      new PointLight(new Point(-4.9, 4.9, -1), new Color(1, 1, 1))
    ]

    // Define constants to avoid duplication.
    const wallMaterial = new Material()
    wallMaterial.pattern = new StripePattern(
      new Color(0.45, 0.45, 0.45),
      new Color(0.55, 0.55, 0.55)
    )
    wallMaterial.pattern.setPatternTransform(
      Matrix.scalingC(0.25, 0.25, 0.25).multiply(Matrix.rotationY(1.5708))
    )
    wallMaterial.ambient = 0
    wallMaterial.diffuse = 0.4
    wallMaterial.specular = 0
    wallMaterial.reflective = 0.3

    // Describe the elements of the scene.
    const checkeredFloor = new Plane()
    checkeredFloor.setTransform(Matrix.rotationY(0.31415))
    checkeredFloor.material.pattern = new CheckersPattern(
      new Color(0.35, 0.35, 0.35),
      new Color(0.65, 0.65, 0.65)
    )
    checkeredFloor.material.specular = 0
    checkeredFloor.material.reflective = 0.4

    const ceiling = new Plane()
    ceiling.setTransform(Matrix.translation(0, 5, 0))
    ceiling.material.color = new Color(0.8, 0.8, 0.8)
    ceiling.material.ambient = 0.3
    ceiling.material.specular = 0

    const westWall = new Plane()
    westWall.setTransform(
      Matrix.translationC(-5, 0, 0).multiply(
        Matrix.rotationZC(1.5708).multiply(Matrix.rotationY(1.5708))
      )
    )
    westWall.material = wallMaterial

    const eastWall = new Plane()
    eastWall.setTransform(
      Matrix.translationC(5, 0, 0).multiply(
        Matrix.rotationZC(1.5708).multiply(Matrix.rotationY(1.5708))
      )
    )
    eastWall.material = wallMaterial

    const northWall = new Plane()
    northWall.setTransform(
      Matrix.translationC(0, 0, 5).multiply(Matrix.rotationX(1.5708))
    )
    northWall.material = wallMaterial

    const southWall = new Plane()
    southWall.setTransform(
      Matrix.translationC(0, 0, -5).multiply(Matrix.rotationX(1.5708))
    )

    world.objects.push(
      checkeredFloor,
      ceiling,
      westWall,
      eastWall,
      northWall,
      southWall
    )

    // background balls
    const sphere1 = new Sphere()
    sphere1.setTransform(
      Matrix.translationC(4.6, 0.4, 1).multiply(Matrix.scaling(0.4, 0.4, 0.4))
    )
    sphere1.material.color = new Color(0.8, 0.5, 0.3)
    sphere1.material.shininess = 50

    const sphere2 = new Sphere()
    sphere2.setTransform(
      Matrix.translationC(4.7, 0.3, 0.4).multiply(Matrix.scaling(0.3, 0.3, 0.3))
    )
    sphere2.material.color = new Color(0.9, 0.4, 0.5)
    sphere2.material.shininess = 50

    const sphere3 = new Sphere()
    sphere3.setTransform(
      Matrix.translationC(-1, 0.5, 4.5).multiply(Matrix.scaling(0.5, 0.5, 0.5))
    )
    sphere3.material.color = new Color(0.4, 0.9, 0.6)
    sphere3.material.shininess = 50

    const sphere4 = new Sphere()
    sphere4.setTransform(
      Matrix.translationC(-1.7, 0.3, 4.7).multiply(
        Matrix.scaling(0.3, 0.3, 0.3)
      )
    )
    sphere4.material.color = new Color(0.4, 0.6, 0.9)
    sphere4.material.shininess = 50

    world.objects.push(sphere1, sphere2, sphere3, sphere4)

    // foreground balls
    const redSphere = new Sphere()
    redSphere.setTransform(Matrix.translation(-0.6, 1, 0.6))
    redSphere.material.color = new Color(1, 0.3, 0.2)
    redSphere.material.specular = 0.4
    redSphere.material.shininess = 5

    const blueGlassSphere = new Sphere()
    blueGlassSphere.setTransform(
      Matrix.translationC(0.6, 0.7, -0.6).multiply(
        Matrix.scaling(0.7, 0.7, 0.7)
      )
    )
    blueGlassSphere.material.color = new Color(0, 0, 0.2)
    blueGlassSphere.material.ambient = 0
    blueGlassSphere.material.diffuse = 0.4
    blueGlassSphere.material.specular = 0.9
    blueGlassSphere.material.shininess = 300
    blueGlassSphere.material.reflective = 0.9
    blueGlassSphere.material.transparency = 0.9
    blueGlassSphere.material.refractiveIndex = 1.5

    const greenGlassSphere = new Sphere()
    greenGlassSphere.setTransform(
      Matrix.translationC(-0.7, 0.5, -0.8).multiply(
        Matrix.scaling(0.5, 0.5, 0.5)
      )
    )
    greenGlassSphere.material.color = new Color(0, 0.2, 0)
    greenGlassSphere.material.ambient = 0
    greenGlassSphere.material.diffuse = 0.4
    greenGlassSphere.material.specular = 0.9
    greenGlassSphere.material.shininess = 300
    greenGlassSphere.material.reflective = 0.9
    greenGlassSphere.material.transparency = 0.9
    greenGlassSphere.material.refractiveIndex = 1.5

    world.objects.push(redSphere, greenGlassSphere, blueGlassSphere)

    camera.render(world).toPPM()
  })
})

// https://forum.raytracerchallenge.com/thread/4/reflection-refraction-scene-description
