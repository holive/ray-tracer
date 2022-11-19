import { scaleColorValue } from '../../canvas/helpers'
import { BLACK, Color } from '../../tuples'

const numberOfCPUCores = navigator.hardwareConcurrency || 1
const workerList: Worker[] = []

type Result = { x: number; y: number; color: Color }
type MessageResult = {
  data: {
    result: Result[]
  }
}
;(function render(scene: string) {
  let canvasSize = 120
  if (scene == '2') canvasSize = 600
  const stepSize = Math.floor(canvasSize / numberOfCPUCores)
  const hSize = canvasSize
  const vSize = canvasSize

  const { canvas, context: canvasCtx } = createCanvas(hSize, vSize)
  document.body.appendChild(canvas)

  // ❇️ INSTANTIATE WORKERS
  for (let i = 0; i < numberOfCPUCores; i++) {
    // @ts-ignore
    workerList.push(new Worker(new URL('./worker.ts', import.meta.url)))
  }

  const startTime = performance.now()
  let completedWorkerCount = 0

  workerList.forEach((worker, index) => {
    const start = index * stepSize
    const end = start + stepSize

    // ❇️ IGNITES THE PROCESSING ON EACH WORKER
    worker.postMessage({ canvasSize, start, end, scene })

    // ❇️ GET THE RESULT WHEN FINISHED
    worker.onmessage = ({ data: { result } }: MessageResult) => {
      completedWorkerCount++
      renderResultOnScreen(result, canvasCtx)
      logStats(completedWorkerCount, startTime)
    }
  })
})(location.search.split('scene=')[1])

function logStats(completedWorkerCount: number, startTime: number) {
  if (completedWorkerCount == numberOfCPUCores) {
    const p = document.createElement('p')
    p.innerText = `Rendered ${((performance.now() - startTime) * 0.001).toFixed(
      1
    )} in seconds using ${numberOfCPUCores} workers.`

    document.body.appendChild(p)
  }
}

function renderResultOnScreen(
  result: Result[],
  canvasCtx: CanvasRenderingContext2D | null
) {
  result.forEach(({ color: c, x, y }: Result) => {
    const color = scaleColorValue(c)
    draw({ color, x, y }, canvasCtx)
  })
}

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
  pixel: { color: Color; x: number; y: number },
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
    pixel.x,
    pixel.y
  )
}
