import { Color } from '../tuples'

export class Material {
  ambient = 0.1
  diffuse = 0.9
  specular = 0.9
  shininess = 200
  color = new Color(1, 1, 1)
}
