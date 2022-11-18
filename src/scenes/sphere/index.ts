import { BLACK, Color } from '../../tuples'
import { scaleColorValue } from '../../canvas/helpers'

const numberOfCPUCores = navigator.hardwareConcurrency || 1
const workerList: Worker[] = []
const canvasSize = 240
const stepSize = Math.floor(canvasSize / numberOfCPUCores)

function render() {
  const hSize = canvasSize
  const vSize = canvasSize
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { canvas, context: canvasCtx } = createCanvas(hSize, vSize)
  document.body.appendChild(canvas)

  for (let i = 0; i < numberOfCPUCores; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    workerList.push(new Worker(new URL('./worker.ts', import.meta.url)))
  }

  const startTime = performance.now()
  let completedWorkerCount = 0
  const results: { x: number; y: number; color: Color }[] = []

  workerList.forEach((worker, index) => {
    const start = index * stepSize
    const end = start + stepSize
    worker.postMessage({ canvasSize, start, end })

    worker.onmessage = ({ data: { result } }) => {
      completedWorkerCount++
      results.push(...result)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      result.forEach(
        ({ color, x, y }: { x: number; y: number; color: Color }) => {
          draw(
            {
              color: scaleColorValue(color),
              position: { x, y }
            },
            canvasCtx
          )
        }
      )

      if (completedWorkerCount == numberOfCPUCores) {
        const time = performance.now() - startTime
        console.log(time, 'ms to render the ball')
      }
    }
  })
}
render()

function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  const { red, green, blue } = BLACK.rgb()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  context.fillStyle = `rgb(${red},${green},${blue})`
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  context.fillRect(0, 0, width, height)

  return { canvas, context }
}

function draw(
  pixel: { color: Color; position: { x: number; y: number } },
  canvas: CanvasRenderingContext2D | null
) {
  canvas?.putImageData(
    new ImageData(
      Uint8ClampedArray.of(
        pixel.color.red,
        pixel.color.green,
        pixel.color.blue,
        255
      ),
      1,
      1
    ),
    pixel.position.x,
    pixel.position.y
  )
}
