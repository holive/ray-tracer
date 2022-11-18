/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bounds/BoundingBox.ts":
/*!***********************************!*\
  !*** ./src/bounds/BoundingBox.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BoundingBox = void 0;\nconst tuples_1 = __webpack_require__(/*! ../tuples */ \"./src/tuples/index.ts\");\nconst matrices_1 = __webpack_require__(/*! ../matrices */ \"./src/matrices/index.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\nclass BoundingBox {\n    constructor(min, max) {\n        this.min = new tuples_1.Point(Infinity, Infinity, Infinity);\n        this.max = new tuples_1.Point(-Infinity, -Infinity, -Infinity);\n        this.min = min || this.min;\n        this.max = max || this.max;\n    }\n    addPoint({ x, y, z }) {\n        if (x < this.min.x)\n            this.min.x = x;\n        if (y < this.min.y)\n            this.min.y = y;\n        if (z < this.min.z)\n            this.min.z = z;\n        if (x > this.max.x)\n            this.max.x = x;\n        if (y > this.max.y)\n            this.max.y = y;\n        if (z > this.max.z)\n            this.max.z = z;\n    }\n    addBox(box) {\n        this.addPoint(box.min);\n        this.addPoint(box.max);\n    }\n    containsPoint({ x, y, z }) {\n        return (x >= this.min.x &&\n            x <= this.max.x &&\n            y >= this.min.y &&\n            y <= this.max.y &&\n            z >= this.min.z &&\n            z <= this.max.z);\n    }\n    containsBox(box) {\n        return this.containsPoint(box.min) && this.containsPoint(box.max);\n    }\n    transform(matrix) {\n        const p1 = this.min;\n        const p2 = new tuples_1.Point(this.min.x, this.min.y, this.max.z);\n        const p3 = new tuples_1.Point(this.min.x, this.max.y, this.min.z);\n        const p4 = new tuples_1.Point(this.min.x, this.max.y, this.max.z);\n        const p5 = new tuples_1.Point(this.max.x, this.min.y, this.min.z);\n        const p6 = new tuples_1.Point(this.max.x, this.min.y, this.max.z);\n        const p7 = new tuples_1.Point(this.max.x, this.max.y, this.min.z);\n        const p8 = this.max;\n        const newBbox = new BoundingBox();\n        const points = [p1, p2, p3, p4, p5, p6, p7, p8];\n        points.forEach((point) => {\n            newBbox.addPoint(new matrices_1.Matrix(matrix).multiplyByTupleP(point));\n        });\n        return newBbox;\n    }\n    intersects(r) {\n        const [xtMin, xtMax] = this.checkAxis(r.origin.x, r.direction.x, this.min.x, this.max.x);\n        const [ytMin, ytMax] = this.checkAxis(r.origin.y, r.direction.y, this.min.y, this.max.y);\n        const [ztMin, ztMax] = this.checkAxis(r.origin.z, r.direction.z, this.min.z, this.max.z);\n        const tMin = Math.max(xtMin, ytMin, ztMin);\n        const tMax = Math.min(xtMax, ytMax, ztMax);\n        return tMin <= tMax;\n    }\n    checkAxis(origin, direction, min, max) {\n        const tMinNumerator = min - origin;\n        const tMaxNumerator = max - origin;\n        let tMin;\n        let tMax;\n        if (Math.abs(direction) >= utils_1.EPSILON) {\n            tMin = tMinNumerator / direction;\n            tMax = tMaxNumerator / direction;\n        }\n        else {\n            tMin = tMinNumerator * Number.POSITIVE_INFINITY;\n            tMax = tMaxNumerator * Number.POSITIVE_INFINITY;\n        }\n        if (tMin > tMax) {\n            return [tMax, tMin];\n        }\n        return [tMin, tMax];\n    }\n}\nexports.BoundingBox = BoundingBox;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/bounds/BoundingBox.ts?");

/***/ }),

/***/ "./src/bounds/index.ts":
/*!*****************************!*\
  !*** ./src/bounds/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./BoundingBox */ \"./src/bounds/BoundingBox.ts\"), exports);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/bounds/index.ts?");

/***/ }),

/***/ "./src/camera/Camera.ts":
/*!******************************!*\
  !*** ./src/camera/Camera.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Camera = void 0;\nconst matrices_1 = __webpack_require__(/*! ../matrices */ \"./src/matrices/index.ts\");\nconst rays_1 = __webpack_require__(/*! ../rays */ \"./src/rays/index.ts\");\nconst tuples_1 = __webpack_require__(/*! ../tuples */ \"./src/tuples/index.ts\");\nconst canvas_1 = __webpack_require__(/*! ../canvas */ \"./src/canvas/index.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\nclass Camera {\n    constructor(hSize, vSize, fieldOfView) {\n        this.transform = matrices_1.IDENTITY_MATRIX;\n        this.hSize = hSize;\n        this.vSize = vSize;\n        this.fieldOfView = fieldOfView;\n        const halfView = Math.tan(fieldOfView / 2);\n        const aspect = hSize / vSize;\n        if (aspect >= 1) {\n            this.halfWidth = halfView;\n            this.halfHeight = halfView / aspect;\n        }\n        else {\n            this.halfWidth = halfView * aspect;\n            this.halfHeight = halfView;\n        }\n        this.pixelSize = (0, utils_1.toFixed)((this.halfWidth * 2) / hSize);\n    }\n    rayForPixel(px, py) {\n        const xOffset = (px + 0.5) * this.pixelSize;\n        const yOffset = (py + 0.5) * this.pixelSize;\n        const worldX = this.halfWidth - xOffset;\n        const worldY = this.halfHeight - yOffset;\n        if (!this.inverseTransformMatrix) {\n            this.inverseTransformMatrix = new matrices_1.Matrix(matrices_1.Matrix.inverse(this.transform));\n        }\n        const pixel = this.inverseTransformMatrix.multiplyByTupleV(new tuples_1.Point(worldX, worldY, -1));\n        const origin = this.inverseTransformMatrix.multiplyByTupleP(new tuples_1.Point(0, 0, 0));\n        return new rays_1.Ray(origin, pixel.subtractV(origin).normalize());\n    }\n    render(world) {\n        const image = new canvas_1.Canvas(this.hSize, this.vSize);\n        for (let y = 0; y <= this.vSize - 1; y++) {\n            console.log(y);\n            for (let x = 0; x <= this.hSize - 1; x++) {\n                const ray = this.rayForPixel(x, y);\n                const color = world.colorAt(ray);\n                image.writePixel(x, y, color);\n            }\n        }\n        return image;\n    }\n    renderPartial(world, start, end, canvasSize) {\n        const result = [];\n        for (let y = 0; y <= canvasSize - 1; y++) {\n            for (let x = start; x < end - 1; x++) {\n                result.push({ x, y, color: world.colorAt(this.rayForPixel(x, y)) });\n            }\n        }\n        return result;\n    }\n}\nexports.Camera = Camera;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/camera/Camera.ts?");

/***/ }),

/***/ "./src/camera/index.ts":
/*!*****************************!*\
  !*** ./src/camera/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./Camera */ \"./src/camera/Camera.ts\"), exports);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/camera/index.ts?");

/***/ }),

/***/ "./src/canvas/Canvas.ts":
/*!******************************!*\
  !*** ./src/canvas/Canvas.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Canvas = void 0;\nconst helpers_1 = __webpack_require__(/*! ./helpers */ \"./src/canvas/helpers.ts\");\nclass Canvas {\n    constructor(width, height) {\n        this.width = width;\n        this.height = height;\n        this.canvas = (0, helpers_1.createBlackCanvas)(height, width);\n    }\n    writePixel(x, y, color) {\n        this.canvas[y][x] = (0, helpers_1.scaleColorValue)(color);\n    }\n    pixelAt(x, y) {\n        return this.canvas[y][x];\n    }\n    toPPM(index) {\n        const header = `P3\\n${this.width} ${this.height}\\n255\\n`;\n        const data = [];\n        this.canvas.forEach((items) => items.forEach((color) => data.push(color)));\n        return (0, helpers_1.writeFile)(header + (0, helpers_1.colorArrayToString)(data), index);\n    }\n    getCanvas() {\n        return this.canvas;\n    }\n}\nexports.Canvas = Canvas;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/canvas/Canvas.ts?");

/***/ }),

/***/ "./src/canvas/constants.ts":
/*!*********************************!*\
  !*** ./src/canvas/constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.PPM_MAX_COLORS_PER_LINE = void 0;\nexports.PPM_MAX_COLORS_PER_LINE = 5;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/canvas/constants.ts?");

/***/ }),

/***/ "./src/canvas/helpers.ts":
/*!*******************************!*\
  !*** ./src/canvas/helpers.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.writeFile = exports.colorArrayToString = exports.createBlackCanvas = exports.scaleColorValue = void 0;\nconst tuples_1 = __webpack_require__(/*! ../tuples */ \"./src/tuples/index.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/canvas/constants.ts\");\nconst fs = __webpack_require__(/*! fs/promises */ \"?1f26\");\nconst scaleColorValue = ({ red, green, blue }) => {\n    const clamp = (c) => c < 0 ? 0 : c > 255 ? 255 : Math.round(c);\n    return new tuples_1.Color(clamp(red * 255), clamp(green * 255), clamp(blue * 255));\n};\nexports.scaleColorValue = scaleColorValue;\nconst createBlackCanvas = (width, height) => {\n    const matrix = [];\n    for (let i = 0; i < width; i++) {\n        matrix.push(new Array(height).fill(tuples_1.BLACK));\n    }\n    return matrix;\n};\nexports.createBlackCanvas = createBlackCanvas;\nconst colorToString = ({ red, green, blue }) => {\n    return `${red} ${green} ${blue}`;\n};\nconst colorArrayToString = (colors, maxColorsPerLine = constants_1.PPM_MAX_COLORS_PER_LINE) => {\n    let body = '';\n    let counter = 0;\n    colors.forEach((color) => {\n        counter += 1;\n        let divider = ` `;\n        if (counter >= maxColorsPerLine) {\n            divider = `\\n`;\n            counter = 0;\n        }\n        body += `${colorToString(color)}${divider}`;\n    });\n    return body + '\\n';\n};\nexports.colorArrayToString = colorArrayToString;\nconst writeFile = (content, index) => {\n    var _a;\n    try {\n        void fs.writeFile(`./render${index || ''}.ppm`, content);\n        return content;\n    }\n    catch (err) {\n        return `Couldn't write the file: ${(_a = (err || undefined)) === null || _a === void 0 ? void 0 : _a.message}`;\n    }\n};\nexports.writeFile = writeFile;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/canvas/helpers.ts?");

/***/ }),

/***/ "./src/canvas/index.ts":
/*!*****************************!*\
  !*** ./src/canvas/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./Canvas */ \"./src/canvas/Canvas.ts\"), exports);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/canvas/index.ts?");

/***/ }),

/***/ "./src/errors/index.ts":
/*!*****************************!*\
  !*** ./src/errors/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.InvalidTupleAddition = void 0;\nclass InvalidTupleAddition extends Error {\n    constructor() {\n        super('Invalid Tuple Addition');\n        this.name = 'InvalidTupleAddition';\n    }\n}\nexports.InvalidTupleAddition = InvalidTupleAddition;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/errors/index.ts?");

/***/ }),

/***/ "./src/intersections/Intersection.ts":
/*!*******************************************!*\
  !*** ./src/intersections/Intersection.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Intersection = void 0;\nconst tuples_1 = __webpack_require__(/*! ../tuples */ \"./src/tuples/index.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\nclass Intersection {\n    constructor(t, object, u, v) {\n        this.t = t;\n        this.object = object;\n        this.u = u;\n        this.v = v;\n    }\n    prepareComputations(r, xs) {\n        const t = this.t;\n        const object = this.object;\n        const point = r.position(t);\n        const eyeV = this.negateVector(r.direction);\n        let normalV = object.normalAt(point, this);\n        let inside = false;\n        if (normalV.dot(eyeV) < 0) {\n            inside = true;\n            normalV = this.negateVector(normalV);\n        }\n        const overPoint = point.add(normalV.multiply(utils_1.EPSILON));\n        const underPoint = point.subtract(normalV.multiply(utils_1.EPSILON));\n        const reflectV = r.direction.reflect(normalV);\n        const { n1, n2 } = this.calculateN1N2(xs || []);\n        return {\n            t,\n            eyeV,\n            point,\n            object,\n            normalV,\n            inside,\n            overPoint,\n            underPoint,\n            reflectV,\n            n1,\n            n2\n        };\n    }\n    calculateN1N2(xs) {\n        let n1 = NaN;\n        let n2 = NaN;\n        let containers = [];\n        for (const intersection of xs) {\n            if (this === intersection) {\n                n1 = containers.length\n                    ? containers[containers.length - 1].material.refractiveIndex\n                    : 1;\n            }\n            const filtered = [];\n            containers = containers.filter((container) => {\n                if (container !== intersection.object)\n                    return true;\n                filtered.push(container);\n            });\n            if (filtered.length == 0)\n                containers.push(intersection.object);\n            if (this === intersection) {\n                n2 = containers.length\n                    ? containers[containers.length - 1].material.refractiveIndex\n                    : 1;\n                break;\n            }\n        }\n        return { n1, n2 };\n    }\n    negateVector(value) {\n        const n = (v) => (v != 0 ? -v : v);\n        return new tuples_1.Vector(n(value.x), n(value.y), n(value.z));\n    }\n    static intersections(...args) {\n        return args;\n    }\n    static hit(intersections) {\n        function removeNegativeResults(item) {\n            return item.t >= 0;\n        }\n        const hits = [...intersections]\n            .sort((a, b) => a.t - b.t)\n            .filter(removeNegativeResults);\n        return hits.length ? hits[0] : null;\n    }\n    static schlick(comps) {\n        let cos = comps.eyeV.dot(comps.normalV);\n        if (comps.n1 > comps.n2) {\n            const n = comps.n1 / comps.n2;\n            const sin2T = n ** 2 * (1 - cos ** 2);\n            if (sin2T > 1)\n                return 1;\n            const cosT = Math.sqrt(1 - sin2T);\n            cos = cosT;\n        }\n        const r0 = ((comps.n1 - comps.n2) / (comps.n1 + comps.n2)) ** 2;\n        return r0 + (1 - r0) * (1 - cos) ** 5;\n    }\n}\nexports.Intersection = Intersection;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/intersections/Intersection.ts?");

/***/ }),

/***/ "./src/intersections/index.ts":
/*!************************************!*\
  !*** ./src/intersections/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./Intersection */ \"./src/intersections/Intersection.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./types */ \"./src/intersections/types.ts\"), exports);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/intersections/index.ts?");

/***/ }),

/***/ "./src/intersections/types.ts":
/*!************************************!*\
  !*** ./src/intersections/types.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/intersections/types.ts?");

/***/ }),

/***/ "./src/lights/Material.ts":
/*!********************************!*\
  !*** ./src/lights/Material.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Material = void 0;\nconst tuples_1 = __webpack_require__(/*! ../tuples */ \"./src/tuples/index.ts\");\nclass Material {\n    constructor() {\n        this.ambient = 0.1;\n        this.diffuse = 0.9;\n        this.specular = 0.9;\n        this.shininess = 200;\n        this.reflective = 0;\n        this.transparency = 0;\n        this.refractiveIndex = 1;\n        this.color = new tuples_1.Color(1, 1, 1);\n    }\n    lighting(light, position, eyeV, normalV, inShadow = false, object) {\n        if (this.pattern) {\n            this.color = this.pattern.patternAtShape(object, position);\n        }\n        const effectiveColor = this.color.multiplyByColor(light.intensity);\n        const ambient = effectiveColor.multiplyByScalar(this.ambient);\n        if (inShadow) {\n            return ambient;\n        }\n        const pos = light.position.subtract(position);\n        const lightV = new tuples_1.Vector(pos.x, pos.y, pos.z, pos.w).normalize();\n        const lightDotNormal = lightV.dot(normalV);\n        let diffuse = tuples_1.BLACK;\n        let specular = tuples_1.BLACK;\n        if (lightDotNormal >= 0) {\n            diffuse = effectiveColor\n                .multiplyByScalar(this.diffuse)\n                .multiplyByScalar(lightDotNormal);\n            const { x, y, z, w } = lightV.negate();\n            const reflectDotEye = new tuples_1.Vector(x, y, z, w).reflect(normalV).dot(eyeV);\n            if (reflectDotEye <= 0) {\n                specular = tuples_1.BLACK;\n            }\n            else {\n                specular = light.intensity\n                    .multiplyByScalar(this.specular)\n                    .multiplyByScalar(reflectDotEye ** this.shininess);\n            }\n        }\n        return ambient.add(diffuse).add(specular);\n    }\n}\nexports.Material = Material;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/lights/Material.ts?");

/***/ }),

/***/ "./src/lights/PointLight.ts":
/*!**********************************!*\
  !*** ./src/lights/PointLight.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.PointLight = void 0;\nclass PointLight {\n    constructor(position, intensity) {\n        this.intensity = intensity;\n        this.position = position;\n    }\n}\nexports.PointLight = PointLight;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/lights/PointLight.ts?");

/***/ }),

/***/ "./src/lights/index.ts":
/*!*****************************!*\
  !*** ./src/lights/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./PointLight */ \"./src/lights/PointLight.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./Material */ \"./src/lights/Material.ts\"), exports);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/lights/index.ts?");

/***/ }),

/***/ "./src/matrices/Matrix.ts":
/*!********************************!*\
  !*** ./src/matrices/Matrix.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Matrix = void 0;\nconst tuples_1 = __webpack_require__(/*! ../tuples */ \"./src/tuples/index.ts\");\nconst helpers_1 = __webpack_require__(/*! ./helpers */ \"./src/matrices/helpers.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\nclass Matrix {\n    constructor(matrix) {\n        this.matrix = matrix;\n    }\n    at(x, y) {\n        return this.matrix[x][y];\n    }\n    equals({ matrix }) {\n        return this.matrix.every(function goOverEachRow(row, i) {\n            return row.every(function compareColumns(element, j) {\n                return element == matrix[i][j];\n            });\n        });\n    }\n    getMatrix() {\n        return this.matrix;\n    }\n    multiply(matrix) {\n        return Matrix.multiplyMatrices(this.matrix, matrix);\n    }\n    multiplyByTuple(tuple) {\n        const newMatrix = (function convertTupleToMatrix() {\n            return new Matrix([\n                [tuple.x, 0, 0, 0],\n                [tuple.y, 0, 0, 0],\n                [tuple.z, 0, 0, 0],\n                [tuple.w, 0, 0, 0]\n            ]).getMatrix();\n        })();\n        const multiplied = Matrix.multiplyMatrices(this.matrix, newMatrix);\n        return (function returnTheFirstColumnAsTuple() {\n            return new tuples_1.Tuple((0, utils_1.toFixed)(multiplied[0][0]), (0, utils_1.toFixed)(multiplied[1][0]), (0, utils_1.toFixed)(multiplied[2][0]), (0, utils_1.toFixed)(multiplied[3][0]));\n        })();\n    }\n    multiplyByTupleP(tuple) {\n        const multiplied = Matrix.multiplyMatrices(this.matrix, [\n            [tuple.x, 0, 0, 0],\n            [tuple.y, 0, 0, 0],\n            [tuple.z, 0, 0, 0],\n            [tuple.w, 0, 0, 0]\n        ]);\n        return new tuples_1.Point(multiplied[0][0], multiplied[1][0], multiplied[2][0], multiplied[3][0]);\n    }\n    multiplyByTupleV(tuple) {\n        const multiplied = Matrix.multiplyMatrices(this.matrix, [\n            [tuple.x, 0, 0, 0],\n            [tuple.y, 0, 0, 0],\n            [tuple.z, 0, 0, 0],\n            [tuple.w, 0, 0, 0]\n        ]);\n        return new tuples_1.Vector(multiplied[0][0], multiplied[1][0], multiplied[2][0], multiplied[3][0]);\n    }\n    transpose() {\n        // removing dynamic generation to speed up\n        const newMatrix = [\n            [NaN, NaN, NaN, NaN],\n            [NaN, NaN, NaN, NaN],\n            [NaN, NaN, NaN, NaN],\n            [NaN, NaN, NaN, NaN]\n        ];\n        this.matrix.forEach(function goOverEachRow(row, rowPosit, source) {\n            row.forEach(function transposeColumnsIntoRows(element, columnPosit) {\n                newMatrix[rowPosit][columnPosit] = source[columnPosit][rowPosit];\n            });\n        });\n        return newMatrix;\n    }\n    static submatrix(matrix, rowToRemove, columnToRemove) {\n        return (0, helpers_1.removeRowAndColumn)(matrix, rowToRemove, columnToRemove);\n    }\n    static minor(matrix, row, column) {\n        const submatrix = this.submatrix(matrix, row, column);\n        return this.determinant(submatrix);\n    }\n    static cofactor(matrix, row, column) {\n        const isOdd = (row + column) % 2 != 0;\n        const minor = this.minor(matrix, row, column);\n        return isOdd ? -Number(minor) : minor;\n    }\n    static determinant(matrix) {\n        let result = 0;\n        if (matrix.length == 2) {\n            result = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];\n        }\n        else {\n            for (let column = 0; column < matrix.length; column++) {\n                result = result + matrix[0][column] * this.cofactor(matrix, 0, column);\n            }\n        }\n        return result;\n    }\n    static inverse(matrix) {\n        if (this.determinant(matrix) == 0) {\n            return;\n        }\n        // removing dynamic generation to speed up\n        const newMatrix = [\n            [NaN, NaN, NaN, NaN],\n            [NaN, NaN, NaN, NaN],\n            [NaN, NaN, NaN, NaN],\n            [NaN, NaN, NaN, NaN]\n        ];\n        for (let row = 0; row < matrix.length; row++) {\n            for (let col = 0; col < matrix.length; col++) {\n                const cofactor = this.cofactor(matrix, row, col);\n                // note that \"col, row\" here, to inverse\n                newMatrix[col][row] = cofactor / this.determinant(matrix);\n            }\n        }\n        return newMatrix;\n    }\n    toFixed() {\n        return this.matrix.map((rows) => rows.map((column) => Number(column.toFixed(5))));\n    }\n    static translation(x, y, z) {\n        return [\n            [1, 0, 0, x],\n            [0, 1, 0, y],\n            [0, 0, 1, z],\n            [0, 0, 0, 1]\n        ];\n    }\n    static translationC(x, y, z) {\n        return new Matrix(Matrix.translation(x, y, z));\n    }\n    static scaling(x, y, z) {\n        return [\n            [x, 0, 0, 0],\n            [0, y, 0, 0],\n            [0, 0, z, 0],\n            [0, 0, 0, 1]\n        ];\n    }\n    static scalingC(x, y, z) {\n        return new Matrix(Matrix.scaling(x, y, z));\n    }\n    static rotationX(radians) {\n        const { cos, sin } = (0, helpers_1.getCosSinFromRadians)(radians);\n        return [\n            [1, 0, 0, 0],\n            [0, cos, -sin, 0],\n            [0, sin, cos, 0],\n            [0, 0, 0, 1]\n        ];\n    }\n    static rotationXC(radians) {\n        return new Matrix(Matrix.rotationX(radians));\n    }\n    static rotationY(radians) {\n        const { cos, sin } = (0, helpers_1.getCosSinFromRadians)(radians);\n        return [\n            [cos, 0, sin, 0],\n            [0, 1, 0, 0],\n            [-sin, 0, cos, 0],\n            [0, 0, 0, 1]\n        ];\n    }\n    static rotationYC(radians) {\n        return new Matrix(Matrix.rotationY(radians));\n    }\n    static rotationZ(radians) {\n        const { cos, sin } = (0, helpers_1.getCosSinFromRadians)(radians);\n        return [\n            [cos, -sin, 0, 0],\n            [sin, cos, 0, 0],\n            [0, 0, 1, 0],\n            [0, 0, 0, 1]\n        ];\n    }\n    static rotationZC(radians) {\n        return new Matrix(Matrix.rotationZ(radians));\n    }\n    static shearing(xY, xZ, yX, yZ, zX, zY) {\n        return [\n            [1, xY, xZ, 0],\n            [yX, 1, yZ, 0],\n            [zX, zY, 1, 0],\n            [0, 0, 0, 1]\n        ];\n    }\n    static multiplyMatrices(a, b) {\n        return (0, helpers_1.dotProductOfEachElement)(a, b);\n    }\n}\nexports.Matrix = Matrix;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/matrices/Matrix.ts?");

/***/ }),

/***/ "./src/matrices/constants.ts":
/*!***********************************!*\
  !*** ./src/matrices/constants.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RANDOM_MATRIX = exports.IDENTITY_MATRIX = void 0;\nexports.IDENTITY_MATRIX = [\n    [1, 0, 0, 0],\n    [0, 1, 0, 0],\n    [0, 0, 1, 0],\n    [0, 0, 0, 1]\n];\nexports.RANDOM_MATRIX = [\n    [1, 3, 0, 0],\n    [0, 1, 2, 0],\n    [0, 6, 1, 6],\n    [6, 6, 0, 1]\n];\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/matrices/constants.ts?");

/***/ }),

/***/ "./src/matrices/helpers.ts":
/*!*********************************!*\
  !*** ./src/matrices/helpers.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getCosSinFromRadians = exports.generateNewMatrix = exports.dotProductOfEachElement = exports.removeRowAndColumn = void 0;\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\nfunction removeRowAndColumn(matrix, row, column) {\n    let newRowPosition = 0;\n    let newColumnPosition = 0;\n    const length = matrix.length;\n    const newMatrix = generateNewMatrix(length - 1);\n    for (let rowPosition = 0; rowPosition < length; rowPosition++) {\n        if (rowPosition == row)\n            continue;\n        for (let columnPosition = 0; columnPosition < length; columnPosition++) {\n            const isLastColumn = columnPosition == length - 1;\n            const shouldSkipTheCurrentColumn = columnPosition == column;\n            if (shouldSkipTheCurrentColumn) {\n                if (isLastColumn)\n                    newColumnPosition = 0;\n                continue;\n            }\n            newMatrix[newRowPosition][newColumnPosition] =\n                matrix[rowPosition][columnPosition];\n            if (isLastColumn)\n                newColumnPosition = 0;\n            else\n                newColumnPosition++;\n        }\n        newRowPosition++;\n    }\n    return newMatrix;\n}\nexports.removeRowAndColumn = removeRowAndColumn;\nfunction dotProductOfEachElement(a, b) {\n    // removing dynamic generation to speed up\n    const newMatrix = [\n        [NaN, NaN, NaN, NaN],\n        [NaN, NaN, NaN, NaN],\n        [NaN, NaN, NaN, NaN],\n        [NaN, NaN, NaN, NaN]\n    ];\n    a.forEach(function goOverEachRow(row, rowPosition) {\n        row.forEach(function dotProductOfEveryColumnCombination(columnElement, columnPosition) {\n            newMatrix[rowPosition][columnPosition] =\n                a[rowPosition][0] * b[0][columnPosition] +\n                    a[rowPosition][1] * b[1][columnPosition] +\n                    a[rowPosition][2] * b[2][columnPosition] +\n                    a[rowPosition][3] * b[3][columnPosition];\n        });\n    });\n    return newMatrix;\n}\nexports.dotProductOfEachElement = dotProductOfEachElement;\nfunction generateNewMatrix(length) {\n    const newMatrix = [];\n    for (let i = 0; i < length; i++) {\n        newMatrix.push(new Array(length).fill(null));\n    }\n    return newMatrix;\n}\nexports.generateNewMatrix = generateNewMatrix;\nfunction getCosSinFromRadians(radians) {\n    return {\n        cos: (0, utils_1.toFixed)(Math.cos(radians)),\n        sin: (0, utils_1.toFixed)(Math.sin(radians))\n    };\n}\nexports.getCosSinFromRadians = getCosSinFromRadians;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/matrices/helpers.ts?");

/***/ }),

/***/ "./src/matrices/index.ts":
/*!*******************************!*\
  !*** ./src/matrices/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./Matrix */ \"./src/matrices/Matrix.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./types */ \"./src/matrices/types.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./helpers */ \"./src/matrices/helpers.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./constants */ \"./src/matrices/constants.ts\"), exports);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/matrices/index.ts?");

/***/ }),

/***/ "./src/matrices/types.ts":
/*!*******************************!*\
  !*** ./src/matrices/types.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/matrices/types.ts?");

/***/ }),

/***/ "./src/rays/Ray.ts":
/*!*************************!*\
  !*** ./src/rays/Ray.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Ray = void 0;\nclass Ray {\n    constructor(origin, direction) {\n        this.origin = origin;\n        this.direction = direction;\n    }\n    position(time) {\n        return this.direction.multiply(time).add(this.origin);\n    }\n    transform(matrix) {\n        return new Ray(matrix.multiplyByTupleP(this.origin), matrix.multiplyByTupleV(this.direction));\n    }\n}\nexports.Ray = Ray;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/rays/Ray.ts?");

/***/ }),

/***/ "./src/rays/index.ts":
/*!***************************!*\
  !*** ./src/rays/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./Ray */ \"./src/rays/Ray.ts\"), exports);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/rays/index.ts?");

/***/ }),

/***/ "./src/scenes/sphere/index.ts":
/*!************************************!*\
  !*** ./src/scenes/sphere/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst camera_1 = __webpack_require__(/*! ../../camera */ \"./src/camera/index.ts\");\nconst transformations_1 = __webpack_require__(/*! ../../transformations */ \"./src/transformations/index.ts\");\nconst tuples_1 = __webpack_require__(/*! ../../tuples */ \"./src/tuples/index.ts\");\nconst world_1 = __webpack_require__(/*! ../../world */ \"./src/world/index.ts\");\nconst lights_1 = __webpack_require__(/*! ../../lights */ \"./src/lights/index.ts\");\nconst spheres_1 = __webpack_require__(/*! ../../spheres */ \"./src/spheres/index.ts\");\nconst matrices_1 = __webpack_require__(/*! ../../matrices */ \"./src/matrices/index.ts\");\nconst numberOfCPUCores = navigator.hardwareConcurrency || 1;\nconst workerList = [];\nconst stepSize = 5;\nfunction createCanvas(width, height) {\n    const element = document.createElement('canvas');\n    const context = element.getContext('2d');\n    element.width = width;\n    element.height = height;\n    element.style.width = `${width}px`;\n    element.style.height = `${height}px`;\n    const { red, green, blue } = tuples_1.BLACK.rgb();\n    // @ts-ignore\n    context.fillStyle = `rgb(${red},${green},${blue})`;\n    // @ts-ignore\n    context.fillRect(0, 0, width, height);\n    return element;\n}\nfunction draw(pixel, canvas) {\n    canvas === null || canvas === void 0 ? void 0 : canvas.putImageData(new ImageData(Uint8ClampedArray.of(pixel.color.red, pixel.color.green, pixel.color.blue, 255), 1, 1), pixel.position.x, pixel.position.y);\n}\nfunction createWorkersNotSure(canvasSize, world, camera) {\n    for (let i = 0; i < numberOfCPUCores; i++) {\n        workerList.push(new Worker('./worker.js'));\n    }\n    workerList.forEach((worker, index) => {\n        const start = index * stepSize;\n        const end = start + stepSize;\n        worker.postMessage({ canvasSize, world, start, end, camera });\n        worker.onmessage = ({ data }) => {\n            console.log(data);\n            // if (data.pixels) {\n            //   data.pixels.forEach(({ x, y, color }) => {\n            //     this.canvas.writePixel(x, y, Color.of(...color))\n            //     pixelWriteCount++\n            //   })\n            // } else {\n            //   completedWorkerCount++\n            //   if (completedWorkerCount == WORKER_COUNT) {\n            //     const time = performance.now() - startTime\n            //     resolve({ time, pixelWriteCount })\n            //   }\n            // }\n        };\n    });\n}\nfunction render() {\n    const hSize = 180;\n    const vSize = 180;\n    document.body.appendChild(createCanvas(hSize, vSize));\n    const camera = new camera_1.Camera(hSize, vSize, 1.152);\n    camera.transform = (0, transformations_1.viewTransform)(new tuples_1.Point(-2.6, 1.5, -3.9), new tuples_1.Point(3, -1.5, 4), new tuples_1.Vector(0, 1, 0));\n    const sphere = new spheres_1.Sphere();\n    sphere.material;\n    sphere.material.color = new tuples_1.Color(0.1, 0.5, 0.9);\n    sphere.material.reflective = 0.1;\n    sphere.material.shininess = 50;\n    sphere.material.specular = 0.2;\n    sphere.material.diffuse = 0.95;\n    sphere.setTransform(matrices_1.Matrix.scaling(2.1, 2.1, 2.1));\n    const world = new world_1.World();\n    world.lights = [new lights_1.PointLight(new tuples_1.Point(-7, 4.9, -5), new tuples_1.Color(1, 1, 1))];\n    world.objects.push(sphere);\n    // hSize in case we're dealing with a square canvas\n    createWorkersNotSure(hSize, world, camera);\n}\nrender();\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/scenes/sphere/index.ts?");

/***/ }),

/***/ "./src/shapes/BaseShape.ts":
/*!*********************************!*\
  !*** ./src/shapes/BaseShape.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BaseShape = void 0;\nconst lights_1 = __webpack_require__(/*! ../lights */ \"./src/lights/index.ts\");\nconst tuples_1 = __webpack_require__(/*! ../tuples */ \"./src/tuples/index.ts\");\nconst matrices_1 = __webpack_require__(/*! ../matrices */ \"./src/matrices/index.ts\");\nconst rays_1 = __webpack_require__(/*! ../rays */ \"./src/rays/index.ts\");\nconst bounds_1 = __webpack_require__(/*! ../bounds */ \"./src/bounds/index.ts\");\nclass BaseShape {\n    constructor() {\n        this.material = new lights_1.Material();\n        this.position = new tuples_1.Point(0, 0, 0);\n        this.transform = matrices_1.IDENTITY_MATRIX;\n        this.savedRay = new rays_1.Ray(this.position, new tuples_1.Vector(0, 0, 0));\n        this.box = new bounds_1.BoundingBox();\n        this.box.min = new tuples_1.Point(-1, -1, -1);\n        this.box.max = new tuples_1.Point(1, 1, 1);\n    }\n    boundsOf() {\n        return this.box;\n    }\n    getTransform() {\n        return this.transform;\n    }\n    setTransform(matrix) {\n        this.transform = matrix;\n    }\n    intersect(ray) {\n        if (!this.inverseTransform) {\n            this.inverseTransform = new matrices_1.Matrix(matrices_1.Matrix.inverse(this.transform));\n        }\n        const localRay = ray.transform(this.inverseTransform);\n        return this.localIntersect(localRay);\n    }\n    localIntersect(localRay) {\n        if (true) {\n            throw new Error('localIntersect must be implemented in the subclass');\n        }\n        this.savedRay = localRay;\n        return [];\n    }\n    localNormalAt(point, hit) {\n        if (true) {\n            throw new Error('localNormalAt must be implemented in the subclass');\n        }\n        return new tuples_1.Vector(point.x, point.y, point.z);\n    }\n    normalAt(point, hit) {\n        const localPoint = this.worldToObject(point);\n        const localNormal = this.localNormalAt(localPoint, hit);\n        return this.normalToWorld(localNormal);\n    }\n    worldToObject({ x, y, z }) {\n        let newPoint = new tuples_1.Point(x, y, z);\n        if (this.parent) {\n            newPoint = this.parent.worldToObject(newPoint);\n        }\n        if (!this.inverseTransform) {\n            this.inverseTransform = new matrices_1.Matrix(matrices_1.Matrix.inverse(this.transform));\n        }\n        return this.inverseTransform.multiplyByTuple(newPoint);\n    }\n    normalToWorld(normal) {\n        if (!this.inverseTransform) {\n            this.inverseTransform = new matrices_1.Matrix(matrices_1.Matrix.inverse(this.transform));\n        }\n        const newNormal = new matrices_1.Matrix(this.inverseTransform.transpose()).multiplyByTuple(normal);\n        let normalizedNormal = new tuples_1.Vector(newNormal.x, newNormal.y, newNormal.z).normalize();\n        if (this.parent) {\n            normalizedNormal = this.parent.normalToWorld(normalizedNormal);\n        }\n        return normalizedNormal;\n    }\n    parentSpaceBoundsOf() {\n        return this.boundsOf().transform(this.transform);\n    }\n}\nexports.BaseShape = BaseShape;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/shapes/BaseShape.ts?");

/***/ }),

/***/ "./src/shapes/index.ts":
/*!*****************************!*\
  !*** ./src/shapes/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./BaseShape */ \"./src/shapes/BaseShape.ts\"), exports);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/shapes/index.ts?");

/***/ }),

/***/ "./src/spheres/Sphere.ts":
/*!*******************************!*\
  !*** ./src/spheres/Sphere.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Sphere = void 0;\nconst tuples_1 = __webpack_require__(/*! ../tuples */ \"./src/tuples/index.ts\");\nconst shapes_1 = __webpack_require__(/*! ../shapes */ \"./src/shapes/index.ts\");\nconst intersections_1 = __webpack_require__(/*! ../intersections */ \"./src/intersections/index.ts\");\nclass Sphere extends shapes_1.BaseShape {\n    constructor() {\n        super();\n        this.box.min = new tuples_1.Point(-1, -1, -1);\n        this.box.max = new tuples_1.Point(1, 1, 1);\n    }\n    localNormalAt(p) {\n        const { x, y, z } = p.subtract(this.position);\n        return new tuples_1.Vector(x, y, z);\n    }\n    localIntersect(ray) {\n        const { origin, direction } = ray;\n        // the vector from the sphere's center, to the ray origin\n        const { x, y, z } = origin.subtract(this.position);\n        const sphereToRay = new tuples_1.Vector(x, y, z);\n        const a = direction.dot(direction);\n        const b = 2 * direction.dot(sphereToRay);\n        const c = sphereToRay.dot(sphereToRay) - 1;\n        const discriminant = b * b - 4 * a * c;\n        if (discriminant < 0) {\n            return [];\n        }\n        const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);\n        const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);\n        return [new intersections_1.Intersection(t1, this), new intersections_1.Intersection(t2, this)];\n    }\n    boundsOf() {\n        return this.box;\n    }\n    static glassSphere() {\n        const s = new Sphere();\n        s.material.transparency = 1;\n        s.material.refractiveIndex = 1.5;\n        return s;\n    }\n}\nexports.Sphere = Sphere;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/spheres/Sphere.ts?");

/***/ }),

/***/ "./src/spheres/index.ts":
/*!******************************!*\
  !*** ./src/spheres/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./Sphere */ \"./src/spheres/Sphere.ts\"), exports);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/spheres/index.ts?");

/***/ }),

/***/ "./src/transformations/index.ts":
/*!**************************************!*\
  !*** ./src/transformations/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./viewTransform */ \"./src/transformations/viewTransform.ts\"), exports);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/transformations/index.ts?");

/***/ }),

/***/ "./src/transformations/viewTransform.ts":
/*!**********************************************!*\
  !*** ./src/transformations/viewTransform.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.viewTransform = void 0;\nconst tuples_1 = __webpack_require__(/*! ../tuples */ \"./src/tuples/index.ts\");\nconst matrices_1 = __webpack_require__(/*! ../matrices */ \"./src/matrices/index.ts\");\nfunction viewTransform(from, to, up) {\n    const f = to.subtract(from);\n    const forward = new tuples_1.Vector(f.x, f.y, f.z).normalize();\n    const upn = up.normalize();\n    const left = forward.cross(upn);\n    const trueUp = left.cross(forward);\n    const orientation = new matrices_1.Matrix([\n        [left.x, left.y, left.z, 0],\n        [trueUp.x, trueUp.y, trueUp.z, 0],\n        [-forward.x, -forward.y, -forward.z, 0],\n        [0, 0, 0, 1]\n    ]);\n    return orientation.multiply(matrices_1.Matrix.translation(-from.x, -from.y, -from.z));\n}\nexports.viewTransform = viewTransform;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/transformations/viewTransform.ts?");

/***/ }),

/***/ "./src/tuples/Color.ts":
/*!*****************************!*\
  !*** ./src/tuples/Color.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Color = void 0;\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\nclass Color {\n    constructor(red, green, blue) {\n        this.red = red;\n        this.green = green;\n        this.blue = blue;\n    }\n    add(color) {\n        return new Color(this.red + color.red, this.green + color.green, this.blue + color.blue);\n    }\n    subtract(color) {\n        return new Color(this.red - color.red, this.green - color.green, this.blue - color.blue);\n    }\n    multiplyByScalar(scalar) {\n        if (scalar == 0)\n            return new Color(0, 0, 0);\n        return new Color(this.red * scalar, this.green * scalar, this.blue * scalar);\n    }\n    multiplyByColor(color) {\n        return new Color(this.red * color.red, this.green * color.green, this.blue * color.blue);\n    }\n    rgb() {\n        return new Color(Math.round(this.red * 255), Math.round(this.green * 255), Math.round(this.blue * 255));\n    }\n    toFixed() {\n        return new Color((0, utils_1.toFixed)(this.red), (0, utils_1.toFixed)(this.green), (0, utils_1.toFixed)(this.blue));\n    }\n}\nexports.Color = Color;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/tuples/Color.ts?");

/***/ }),

/***/ "./src/tuples/Point.ts":
/*!*****************************!*\
  !*** ./src/tuples/Point.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Point = void 0;\nconst Tuple_1 = __webpack_require__(/*! ./Tuple */ \"./src/tuples/Tuple.ts\");\nconst types_1 = __webpack_require__(/*! ./types */ \"./src/tuples/types.ts\");\nconst Vector_1 = __webpack_require__(/*! ./Vector */ \"./src/tuples/Vector.ts\");\nclass Point extends Tuple_1.Tuple {\n    constructor(x, y, z, w) {\n        super(x, y, z, w || types_1.PointOrVector.POINT);\n    }\n    subtractV(t) {\n        return new Vector_1.Vector(this.x - t.x, this.y - t.y, this.z - t.z);\n    }\n}\nexports.Point = Point;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/tuples/Point.ts?");

/***/ }),

/***/ "./src/tuples/Tuple.ts":
/*!*****************************!*\
  !*** ./src/tuples/Tuple.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Tuple = void 0;\nconst types_1 = __webpack_require__(/*! ./types */ \"./src/tuples/types.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\nconst errors_1 = __webpack_require__(/*! ../errors */ \"./src/errors/index.ts\");\nclass Tuple {\n    constructor(x, y, z, w) {\n        this.x = x;\n        this.y = y;\n        this.z = z;\n        this.w = w;\n    }\n    equal(t) {\n        return ((0, utils_1.compareFloat)(this.x, t.x) &&\n            (0, utils_1.compareFloat)(this.y, t.y) &&\n            (0, utils_1.compareFloat)(this.z, t.z) &&\n            (0, utils_1.compareFloat)(this.w, t.w));\n    }\n    add(t) {\n        if (this.w === types_1.PointOrVector.POINT && t.w === types_1.PointOrVector.POINT) {\n            throw new errors_1.InvalidTupleAddition();\n        }\n        return new Tuple(this.x + t.x, this.y + t.y, this.z + t.z, this.w + t.w);\n    }\n    subtract(t) {\n        return new Tuple(this.x - t.x, this.y - t.y, this.z - t.z, this.w - t.w);\n    }\n    subtractV(t) {\n        throw new Error('subtractV must be implemented in the subclass');\n    }\n    multiply(scalar) {\n        return new Tuple(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);\n    }\n    multiplyP(scalar) {\n        throw new Error('subtractV must be implemented in the subclass');\n    }\n    negate() {\n        return new Tuple(-this.x, -this.y, -this.z, -this.w);\n    }\n}\nexports.Tuple = Tuple;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/tuples/Tuple.ts?");

/***/ }),

/***/ "./src/tuples/Vector.ts":
/*!******************************!*\
  !*** ./src/tuples/Vector.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Vector = void 0;\nconst Tuple_1 = __webpack_require__(/*! ./Tuple */ \"./src/tuples/Tuple.ts\");\nconst types_1 = __webpack_require__(/*! ./types */ \"./src/tuples/types.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\nconst Point_1 = __webpack_require__(/*! ./Point */ \"./src/tuples/Point.ts\");\nclass Vector extends Tuple_1.Tuple {\n    constructor(x, y, z, w = types_1.PointOrVector.VECTOR) {\n        super(x, y, z, w);\n    }\n    magnitude() {\n        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);\n    }\n    normalize() {\n        const m = this.magnitude();\n        return new Vector(this.x / m, this.y / m, this.z / m, this.w / m);\n    }\n    dot(v) {\n        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;\n    }\n    cross(v) {\n        return new Vector(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);\n    }\n    reflect(normal) {\n        return this.subtractV(normal.multiply(this.dot(normal) * 2));\n    }\n    toFixed(decimals) {\n        return new Vector((0, utils_1.toFixed)(this.x, decimals), (0, utils_1.toFixed)(this.y, decimals), (0, utils_1.toFixed)(this.z, decimals));\n    }\n    multiplyP(scalar) {\n        return new Point_1.Point(this.x * scalar, this.y * scalar, this.z * scalar);\n    }\n    subtractV(t) {\n        return new Vector(this.x - t.x, this.y - t.y, this.z - t.z);\n    }\n}\nexports.Vector = Vector;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/tuples/Vector.ts?");

/***/ }),

/***/ "./src/tuples/constants.ts":
/*!*********************************!*\
  !*** ./src/tuples/constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GRAY = exports.ALMOST_WHITE = exports.WHITE = exports.BLACK = void 0;\nconst Color_1 = __webpack_require__(/*! ./Color */ \"./src/tuples/Color.ts\");\nexports.BLACK = new Color_1.Color(0, 0, 0);\nexports.WHITE = new Color_1.Color(255, 255, 255);\nexports.ALMOST_WHITE = new Color_1.Color(0.9, 0.9, 0.9);\nexports.GRAY = new Color_1.Color(32 * 0.01, 32 * 0.01, 32 * 0.01);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/tuples/constants.ts?");

/***/ }),

/***/ "./src/tuples/index.ts":
/*!*****************************!*\
  !*** ./src/tuples/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./Tuple */ \"./src/tuples/Tuple.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./Vector */ \"./src/tuples/Vector.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./Point */ \"./src/tuples/Point.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./types */ \"./src/tuples/types.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./Color */ \"./src/tuples/Color.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./constants */ \"./src/tuples/constants.ts\"), exports);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/tuples/index.ts?");

/***/ }),

/***/ "./src/tuples/types.ts":
/*!*****************************!*\
  !*** ./src/tuples/types.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.PointOrVector = void 0;\nvar PointOrVector;\n(function (PointOrVector) {\n    PointOrVector[PointOrVector[\"VECTOR\"] = 0] = \"VECTOR\";\n    PointOrVector[PointOrVector[\"POINT\"] = 1] = \"POINT\";\n})(PointOrVector = exports.PointOrVector || (exports.PointOrVector = {}));\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/tuples/types.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.toFixed = exports.degreesToRadians = exports.pow2 = exports.compareFloat = exports.EPSILON = void 0;\nexports.EPSILON = 0.0001;\nconst compareFloat = (a, b) => Math.abs(a - b) < exports.EPSILON;\nexports.compareFloat = compareFloat;\nconst pow2 = (value) => {\n    return Math.pow(value, 2);\n};\nexports.pow2 = pow2;\nfunction degreesToRadians(degrees) {\n    return degrees * (Math.PI / 180);\n}\nexports.degreesToRadians = degreesToRadians;\nfunction toFixed(value, decimals = 5) {\n    return Number(value.toFixed(decimals));\n}\nexports.toFixed = toFixed;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/utils.ts?");

/***/ }),

/***/ "./src/world/World.ts":
/*!****************************!*\
  !*** ./src/world/World.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.World = void 0;\nconst rays_1 = __webpack_require__(/*! ../rays */ \"./src/rays/index.ts\");\nconst intersections_1 = __webpack_require__(/*! ../intersections */ \"./src/intersections/index.ts\");\nconst tuples_1 = __webpack_require__(/*! ../tuples */ \"./src/tuples/index.ts\");\nclass World {\n    constructor(objects = [], light = []) {\n        this.objects = [];\n        this.lights = [];\n        this.objects = objects;\n        this.lights = light;\n    }\n    intersect(r) {\n        var _a;\n        const intersections = [];\n        if (!((_a = this.objects) === null || _a === void 0 ? void 0 : _a.length) || !this.objects[0]) {\n            throw new Error('The world objects are empty!');\n        }\n        this.objects.forEach(function intersectEachObjectInTheWorld(obj) {\n            intersections.push(...obj.intersect(r));\n        });\n        return intersections.sort((a, b) => a.t - b.t);\n    }\n    shadeHit(comps, remaining = 5) {\n        var _a, _b;\n        if (!((_a = this.lights) === null || _a === void 0 ? void 0 : _a.length) || !this.lights[0]) {\n            throw new Error('The world light cannot be empty!');\n        }\n        const { material } = comps.object;\n        const shadowed = this.isShadowed(comps.overPoint);\n        const colors = [];\n        (_b = this.lights) === null || _b === void 0 ? void 0 : _b.forEach((light) => {\n            const surface = material.lighting(light, comps.overPoint, comps.eyeV, comps.normalV, shadowed, comps.object);\n            const reflected = this.reflectedColor(comps, remaining);\n            const refractedColor = this.refractedColor(comps, remaining);\n            if (material.reflective > 0 && material.transparency > 0) {\n                const reflectance = intersections_1.Intersection.schlick(comps);\n                colors.push(surface\n                    .add(reflected.multiplyByScalar(reflectance))\n                    .add(refractedColor.multiplyByScalar(1 - reflectance)));\n            }\n            else {\n                colors.push(surface.add(reflected).add(refractedColor));\n            }\n        });\n        if (colors.length >= 2) {\n            return colors.reduce((prev, curr) => prev.add(curr), colors[0]);\n        }\n        return colors[0];\n    }\n    colorAt(r, remaining = 5) {\n        const xs = this.intersect(r);\n        const hit = intersections_1.Intersection.hit(xs);\n        if (!hit) {\n            return tuples_1.BLACK;\n        }\n        return this.shadeHit(hit.prepareComputations(r, xs), remaining);\n    }\n    isShadowed(point) {\n        var _a;\n        if (!((_a = this.lights) === null || _a === void 0 ? void 0 : _a.length)) {\n            console.log('Hey: world initialized without lights.');\n            return true;\n        }\n        const v = this.lights[0].position.subtractV(point);\n        const distance = v.magnitude();\n        const direction = v.normalize();\n        const intersections = this.intersect(new rays_1.Ray(point, direction));\n        const h = intersections_1.Intersection.hit(intersections);\n        return h != null && h.t < distance;\n    }\n    reflectedColor(comps, remaining) {\n        if (comps.object.material.reflective == 0 || remaining < 1) {\n            return new tuples_1.Color(0, 0, 0);\n        }\n        const reflectRay = new rays_1.Ray(comps.overPoint, comps.reflectV);\n        const color = this.colorAt(reflectRay, remaining - 1);\n        return color.multiplyByScalar(comps.object.material.reflective);\n    }\n    refractedColor(comps, remaining) {\n        const nRatio = comps.n1 / comps.n2;\n        const cosI = comps.eyeV.dot(comps.normalV);\n        const sin2T = nRatio ** 2 * (1 - cosI ** 2);\n        if (comps.object.material.transparency == 0 ||\n            remaining == 0 ||\n            sin2T > 1) {\n            return new tuples_1.Color(0, 0, 0);\n        }\n        const cosT = Math.sqrt(1 - sin2T);\n        const direction = comps.normalV\n            .multiplyP(nRatio * cosI - cosT)\n            .subtractV(comps.eyeV.multiply(nRatio));\n        const refractedRay = new rays_1.Ray(comps.underPoint, direction);\n        return this.colorAt(refractedRay, remaining - 1).multiplyByScalar(comps.object.material.transparency);\n    }\n}\nexports.World = World;\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/world/World.ts?");

/***/ }),

/***/ "./src/world/index.ts":
/*!****************************!*\
  !*** ./src/world/index.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./World */ \"./src/world/World.ts\"), exports);\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/world/index.ts?");

/***/ }),

/***/ "?1f26":
/*!*****************************!*\
  !*** fs/promises (ignored) ***!
  \*****************************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://ray-tracer-challenge/fs/promises_(ignored)?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scenes/sphere/index.ts");
/******/ 	
/******/ })()
;