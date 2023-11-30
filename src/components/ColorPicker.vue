<template>
    <div class="ck-cp-container">
        <div ref="pickerWrap" class="cp-picker-wrap" @mousedown="handlePickerStartOnMouseDown"
            @dragstart="handleItemDragStart">
            <canvas ref="canvas" class="colour-area"> </canvas>
            <div class="colour-area-mask"></div>
            <div ref="pickerPointer" class="colour-area-point-circle"></div>
        </div>

        <div class="ck-cp-menu" :style="mode == 'gradient' ? '' : 'justify-content: end;'">
            <div v-if="mode == 'gradient'" class="ck-cp-controller-bar ">
                <button class="cp-btn" :class="gradientType == 'linear' ? 'active' : ''"
                    @click="setBackgroundType('linear')">
                    <i class="icon-right-up-down-up-arrow"></i>
                </button>
                <button class="cp-btn" :class="gradientType == 'radial' ? 'active' : ''"
                    @click="setBackgroundType('radial')">
                    <i class="icon-circle"></i>
                </button>

                <button v-show="gradientType == 'linear'" class="cp-btn" :class="isShowLinearAngleRange ? 'active' : ''"
                    @click="openLinearAngleRange" style="width: auto">
                    <i class="icon-ruler-cobined"></i>
                </button>

                <button v-show="gradientType == 'radial'" class="cp-btn" :class="isShowRadialAngleRange ? 'active' : ''"
                    @click="openRadialAngleRange" style="width: auto">
                    <i class="icon-ruler-cobined"></i>
                </button>
            </div>
            <div class="ck-cp-controller-bar" style="display: inline-flex; justify-content: end">
                <button v-if="isEyeDropperUsing && showEyeDrop" id="cp-btn-eyedropper" class="cp-btn"
                    @click="handleOnClickEyeDropper">
                    <i class="icon-eye-dropper"></i>
                </button>
                <!-- NPM ARACI OLDUĞUNDA SET EDİLCEK RGB RGBA HEX -->
                <!-- <button class="cp-btn" @click="handleOnClickEyeDropper">
                    <i class="icon-palette"></i>
                </button> -->
                <button v-if="showColorList" class="cp-btn" @click="saveColor">
                    <i class="icon-flopy-disk"></i>
                </button>
                <button v-if="mode == 'gradient'" class="cp-btn" @click="deleteColor">
                    <i class="icon-trash"></i>
                </button>
            </div>
        </div>

        <div v-if="mode == 'gradient'" v-show="gradientType == 'linear' && isShowLinearAngleRange"
            class="ck-cp-linear-angle-container">
            <div>
                <p>
                    Angle <span>{{ gradientAngle.angle }}°</span>
                </p>
                <input type="range" min="0" max="360" v-model="gradientAngle.angle" @input="setGradientBarColor" />
            </div>
        </div>

        <div v-if="mode == 'gradient'" v-show="gradientType == 'radial' && isShowRadialAngleRange"
            class="ck-cp-linear-angle-container">
            <div>
                <p>
                    Position X <span>{{ gradientAngle.percentageX }}%</span>
                </p>
                <input type="range" min="0" max="100" v-model="gradientAngle.percentageX" @input="setGradientBarColor" />
            </div>
            <div style="margin-top: 1rem">
                <p>
                    Position Y <span>{{ gradientAngle.percentageY }}%</span>
                </p>
                <input type="range" min="0" max="100" v-model="gradientAngle.percentageY" @input="setGradientBarColor" />
            </div>
        </div>

        <div v-if="mode == 'gradient'" class="gradient-bar" @mousedown="handleGradientItemOnMouseDown"
            @dragstart="handleItemDragStart">
            <div ref="gradientBar" class="gradient-container" @dblclick="addColor"></div>

            <!-- Target Created -->
            <div class="gradient-handle" style="left: 0; z-index: -1000; pointer-events: none">
                <div class="gradient-handle-content"></div>
            </div>

            <!-- <template v-if="isReady">
                <template v-for="colorItem in colorList" :key="colorItem.id">
                    <div
                        :id="`clr-gb-${colorItem.id}`"
                        class="gradient-handle"
                        :style="{
                            left: setToLeftGradientBarItem(colorItem.percent),
                        }"
                    >
                        <div
                            class="gradient-handle-content"
                            :class="colorItem.select ? 'select' : ''"
                        ></div>
                    </div>
                </template>
            </template> -->
        </div>

        <div class="picker-hue">
            <input ref="rangeInput" v-model="hue" class="picker-hue-range-slider" type="range" min="0" max="360" step="0.1"
                @input="setHue(false)" @change="handleHueChange" />
        </div>

        <div class="opacity-bar">
            <div class="opacity-bar-background"></div>
            <div class="picker-opacity-slider">
                <input ref="opacitySlider" v-model="opacity" class="opacity__slider" type="range" min="0" max="100"
                    @input="setOpacity" />
            </div>
        </div>

        <div v-show="false" id="ck-cp-target-background"></div>

        <div v-if="isReady" class="ck-cp-input-container">
            <div class="ck-cp-input-content">
                <span class="ck-cp-input-label">HEX</span>
                <input type="text" v-model="hexVal" @input="handleHexOnChange" @blur="handleHexOnBlur" />
            </div>
            <div class="ck-cp-input-content">
                <span class="ck-cp-input-label">R</span>
                <input type="number" min="0" max="255" v-model.number="colorList.find((item) => item.select == true).r
                    " @input="handleRGBAInput($event, 'r')" @keydown="handleRGBAOnKeydown" />
            </div>
            <div class="ck-cp-input-content">
                <span class="ck-cp-input-label">G</span>
                <input type="number" min="0" max="255" v-model.number="colorList.find((item) => item.select == true).g
                    " @input="handleRGBAInput($event, 'g')" @keydown="handleRGBAOnKeydown" />
            </div>
            <div class="ck-cp-input-content">
                <span class="ck-cp-input-label">B</span>
                <input type="number" min="0" max="255" v-model.number="colorList.find((item) => item.select == true).b
                    " @input="handleRGBAInput($event, 'b')" @keydown="handleRGBAOnKeydown" />
            </div>
            <div class="ck-cp-input-content">
                <span class="ck-cp-input-label">A</span>
                <input type="number" min="0" max="100" v-model.number="colorList.find((item) => item.select == true).a
                    " @input="handleRGBAInput($event, 'a')" @keydown="handleRGBAOnKeydown" />
            </div>
        </div>

        <div v-if="localColorList.length > 0 && showColorList" class="ck-cp-local-color-conatiner">
            <div v-for="color in localColorList" :key="`color-${color}`" class="ck-cp-color-item"
                :style="{ backgroundColor: color }" @click="handleColorItemOnClick(color)"></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeMount, ref, reactive } from 'vue'

const props = defineProps({modelValue:{default:null},mode:{default:'gradient'},showColorList:{default:true},showEyeDrop:{default:true},type:{default:'HEX8'}})
const emits = defineEmits(['update:modelValue'])
const colorList = ref([
    { id: 1, r: 68, g: 71, b: 119, a: 100, percent: 0, hue: 0, select: true },
    { id: 2, r: 0, g: 0, b: 255, a: 100, percent: 100, hue: 0, select: false },
])

const localColorList = ref([])

const isEyeDropperUsing = ref(false)
const gradientType = ref('linear')
const isShowLinearAngleRange = ref(false)
const isShowRadialAngleRange = ref(false)
const gradientAngle = reactive({
    angle: 90,
    percentageX: 50,
    percentageY: 50,
})

const hexVal = ref('')

const isReady = ref(false)
const opacitySlider = ref()
const gradientBar = ref()
const canvas = ref()
const pickerWrap = ref()
const pickerPointer = ref()
let divX = 0
let divY = 0

let offsetX = 0
let offsetY = 0
let BottomPoint = 0
let RightPoint = 0

const handlePickerStartOnMouseDown = (event) => {
    BottomPoint =
        pickerWrap.value.offsetHeight - pickerPointer.value.offsetHeight
    RightPoint = pickerWrap.value.offsetWidth - pickerPointer.value.offsetWidth

    offsetX = event.clientX - event.target.getBoundingClientRect().left
    offsetY = event.clientY - event.target.getBoundingClientRect().top

    divX = offsetX - pickerPointer.value.offsetWidth / 2
    divY = offsetY - pickerPointer.value.offsetHeight / 2

    pickerPointer.value.style.left = `${divX}px`
    pickerPointer.value.style.top = `${divY}px`

    updatePickerPosition()
    onChangeSetToHexValue()

    window.addEventListener('mousemove', handlePickerOnMouseMove)
    window.addEventListener('mouseup', handlePickerOnMouseUp)
}

const handlePickerOnMouseMove = (event) => {
    event.preventDefault()
    const client = pickerWrap.value.getBoundingClientRect()

    const newX =
        event.clientX - client.left - pickerPointer.value.offsetWidth / 2
    const newY =
        event.clientY - client.top - pickerPointer.value.offsetHeight / 2

    if (newX >= 0 && newX <= RightPoint) {
        divX = newX
        pickerPointer.value.style.left = `${newX}px`
    } else if (0 > newX) {
        divX = 0
        pickerPointer.value.style.left = `${0}px`
    } else if (newX > RightPoint) {
        divX = RightPoint
        pickerPointer.value.style.left = `${RightPoint}px`
    }

    if (newY >= 0 && newY <= BottomPoint) {
        divY = newY
        pickerPointer.value.style.top = `${newY}px`
    } else if (0 > newY) {
        divY = 0
        pickerPointer.value.style.top = `${0}px`
    } else if (newY > BottomPoint) {
        divY = BottomPoint
        pickerPointer.value.style.top = `${BottomPoint}px`
    }
    updatePickerPosition()
    onChangeSetToHexValue()
}

const handlePickerOnMouseUp = () => {
    window.removeEventListener('mousemove', handlePickerOnMouseMove)
    window.removeEventListener('mouseup', handlePickerOnMouseUp)
}

const updatePickerPosition = (isNotUpdate) => {
    if (!isNotUpdate) {
        let SL = calculateSL()
        // const val = hexToRgb(hslToHex(`hsl(${hue.value}, ${SL.s}%, ${SL.l}%)`))

        const val = hslToRgb(hue.value, SL.s, SL.l)
        if (val) {
            if (isReady.value) {
                let colorItem = colorList.value.find(
                    (item) => item.select == true,
                )
                colorItem.r = val.r
                colorItem.g = val.g
                colorItem.b = val.b
            }
            setOpacityBarColor()
            setGradientBarColor()
        }
    }
}


// HUE FONKSİYONLARI
const hue = ref(0)
const rangeInput = ref(null)

const setHue = async (isUpdate) => {
    const { rgb } = hsl2Hex(hue.value, 100, 50)
    redrawTheCanvas(rgb)
    setTimeout(() => {
        updatePickerPosition(isUpdate)
        onChangeSetToHexValue()
    }, 0)
}



const calculateSL = () => {
    let obj = { s: 0, l: 0 }

    let rightLine =
        pickerWrap.value.offsetWidth - pickerPointer.value.offsetWidth
    let bottomLine =
        pickerWrap.value.offsetHeight - pickerPointer.value.offsetHeight
    let x = parseInt(pickerPointer.value.style.left)
    let y = parseInt(pickerPointer.value.style.top)

    let hsv_value = 1 - y / bottomLine
    let hsv_saturation = x / rightLine

    obj.l = (hsv_value / 2) * (2 - hsv_saturation)
    obj.s = (hsv_value * hsv_saturation) / (1 - Math.abs(2 * obj.l - 1))

    if (Number.isNaN(obj.s)) {
        obj.s = obj.l
    }

    obj.l = obj.l > 1 ? 1 : obj.l
    obj.s = obj.s > 1 ? 1 : obj.s
    return obj
}

function findColorCoordinates() {
    const targetColor = colorList.value.find((item) => item.select == true)

    const { l, s } = rgbToHsl(targetColor.r, targetColor.g, targetColor.b)
    let lightness = l
    let saturation = s

    if (Number.isNaN(saturation)) {
        saturation = lightness
    }

    let coordinates = { x: 0, y: 0 }
    let rightLine =
        pickerWrap.value.offsetWidth - pickerPointer.value.offsetWidth
    let bottomLine =
        pickerWrap.value.offsetHeight - pickerPointer.value.offsetHeight

    const [posx_inv, posy_inv] =
        2 * lightness - 1 < 0
            ? [
                  (rightLine * 2 * saturation) / (1 + saturation),
                  bottomLine * (1 - lightness * (1 + saturation)),
              ]
            : [
                  (-rightLine * 2 * (lightness - 1) * saturation) /
                      (lightness + saturation - lightness * saturation),
                  bottomLine * (lightness - 1) * (saturation - 1),
              ]

    coordinates.x = posx_inv
    coordinates.y = posy_inv
    return coordinates
}

const handleHueChange = () => {
    colorList.value.find((item) => item.select == true).hue = parseInt(
        hue.value,
    )
}

// Opacity Bar Funcs

const opacity = ref(100)
const setOpacity = (event) => {
    colorList.value.find((item) => item.select == true).a = event.target.value
    setGradientBarColor()
}

// Gradient Bar Funcs
const setToLeftGradientBarItem = (val) => {
    let handleClient = document
        .querySelector('.gradient-handle-content')
        .getBoundingClientRect()
    if (val == 0) {
        return '0px'
    } else if (val == 100) {
        let gw = gradientBar.value.offsetWidth
        return `${gw - handleClient.width}px`
    } else {
        let gw = (gradientBar.value.offsetWidth * val) / 100

        return `${gw - handleClient.width / 2}px`
    }
}

let gradientMouseBar = null
let selectedGradientItem = null
const handleGradientItemOnMouseDown = (event) => {
    if (event.target.offsetParent.id.includes('clr-gb-')) {
        let id = event.target.offsetParent.id.replace('clr-gb-', '')
        selectedGradientItem = event.target.offsetParent
        const selectedItem = colorList.value.find((item) => item.select == true)

        if (selectedItem.id != id) {
            document
                .querySelector('.gradient-handle.select')
                .classList.remove('select')
            event.target.offsetParent.classList.add('select')

            selectedItem.select = false
            for (let i = 0; i < colorList.value.length; i++) {
                const item = colorList.value[i]
                if (item.id == id) {
                    item.select = true
                    opacity.value = item.a
                    setToChangeVariebles(item.r, item.g, item.b, item.hue, true)
                    setOpacityBarColor()
                    onChangeSetToHexValue()
                    break
                }
            }
        }
        window.addEventListener('mousemove', handleGradientMouseMove)
        window.addEventListener('mouseup', handleGradientItemOnMouseUp)
    }
}

const handleItemDragStart = (e) => {
    e.preventDefault()
}

const handleGradientItemOnMouseUp = () => {
    window.removeEventListener('mousemove', handleGradientMouseMove)
    window.removeEventListener('mouseup', handleGradientItemOnMouseDown)
}

const handleGradientMouseMove = (e) => {
    e.preventDefault()
    let handleClient = document
        .querySelector('.gradient-handle-content')
        .getBoundingClientRect()
    let client = gradientMouseBar.getBoundingClientRect()
    let lastRightPoint = client.width - handleClient.width
    let newX = e.clientX - client.left - handleClient.width / 2

    if (0 > newX) {
        newX = 0
    } else if (newX > lastRightPoint) {
        newX = lastRightPoint
    }
    selectedGradientItem.style.left = `${newX}px`

    let percent = parseFloat(
        ((newX / (client.width - handleClient.width)) * 100).toFixed(0),
    )

    colorList.value.find(
        (item) => item.id == selectedGradientItem.id.replace('clr-gb-', ''),
    ).percent = percent

    setGradientBarColor()
}

const addColor = (e) => {
    let client = gradientMouseBar.getBoundingClientRect()
    let percent = Math.round(((e.clientX - client.x) / client.width) * 100)

    let selectIndex = colorList.value.findIndex((item) => item.select == true)

    let selectItem = colorList.value[selectIndex]

    let item = {
        id: Date.now(),
        r: selectItem.r,
        g: selectItem.g,
        b: selectItem.b,
        a: selectItem.a,
        percent: percent,
        hue: selectItem.hue,
        select: true,
    }

    colorList.value[selectIndex].select = false
    document.querySelector('.gradient-handle.select').classList.remove('select')

    colorList.value = [...colorList.value, item]

    createGradientItem(item)
    selectedGradientItem = document.querySelector(`#clr-gb-${item.id}`)
    setGradientBarColor()
}

// Extra Funcs

const isColorInStrip=(selectedColor)=> {
    if (selectedColor.r == 0 && selectedColor.g == 0 && selectedColor.b == 0) {
        return true
    } else if (
        selectedColor.r == 255 &&
        selectedColor.g == 255 &&
        selectedColor.b == 255
    ) {
        return true
    } else {
        const ctx = canvas.value.getContext('2d', { willReadFrequently: true })
        const width = canvas.value.width
        const height = canvas.value.height
        const imageData = ctx.getImageData(0, 0, width, height).data

        // Seçilen renk bileşenlerini al
        const selectedR = selectedColor.r
        const selectedG = selectedColor.g
        const selectedB = selectedColor.b

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4 // Her piksel 4 bileşenli (RGBA)
                const r = imageData[i]
                const g = imageData[i + 1]
                const b = imageData[i + 2]

                // Seçilen renkle piksel renklerini karşılaştır
                if (r === selectedR && g === selectedG && b === selectedB) {
                    return true // Eşleşme bulundu, renk color-strip içinde
                }
            }
        }

        return false // Eşleşme bulunamadı, renk color-strip dışında
    }
}

const setToChangeVariebles = (r, g, b, hueVal, isNotUpdate) => {
    setTimeout(() => {
        if (!isColorInStrip({ r, g, b })) {
            let coord = findColorCoordinates()
            pickerPointer.value.style.left = `${coord.x}px`
            pickerPointer.value.style.top = `${coord.y}px`
            hue.value = hueVal
            setHue(isNotUpdate)
        } else {
            let coord = findColorCoordinates()
            pickerPointer.value.style.left = `${coord.x}px`
            pickerPointer.value.style.top = `${coord.y}px`
        }
    }, 0)
}

const setFirstEmptyValue = () => {
    colorList.value.forEach((item) => createGradientItem(item))

    firstSetHue()
    const clr = colorList.value[0]
    hue.value = clr.hue
    setHue(true)

    let coord = findColorCoordinates()
    pickerPointer.value.style.left = `${coord.x}px`
    pickerPointer.value.style.top = `${coord.y}px`

    setOpacityBarColor()
    setGradientBarColor()
}

// SET ITEMS COLORS FUNCS

const createGradientItem = (item) => {
   if(props.mode=='gradient'){
    let el = document.createElement('div')
    el.id = `clr-gb-${item.id}`
    el.classList.add('gradient-handle')
    el.style.left = setToLeftGradientBarItem(item.percent)

    let elChild = document.createElement('div')
    elChild.classList.add('gradient-handle-content')
    if (item.select == true) {
        el.classList.add('select')
    }

    el.appendChild(elChild)

    gradientMouseBar.appendChild(el)
   }
}

const redrawTheCanvas = (rgb) => {
    const context = canvas.value.getContext('2d', { willReadFrequently: true })
    const endX = canvas.value.width
    const endY = canvas.value.height

    context.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
    context.fillRect(0, 0, endX, endY)

    let grdWhite = context.createLinearGradient(0, 0, endX - 12, 0)
    grdWhite.addColorStop(0.01, 'rgb(255,255,255)')
    grdWhite.addColorStop(0.75, 'rgba(255,255,255,0)')
    context.fillStyle = grdWhite
    context.fillRect(0, 0, endX, endY)

    let grdBlack = context.createLinearGradient(0, 0, 0, endY)
    grdBlack.addColorStop(0.10, 'rgba(0,0,0,0)')
    grdBlack.addColorStop(1, 'rgb(10,10,10)')
    context.fillStyle = grdBlack
    context.fillRect(0, 0, endX, endY)
}

const setOpacityBarColor = () => {
    let colorItem = colorList.value.find((item) => item.select == true)
    opacitySlider.value.style.background = ` linear-gradient(90deg,rgba(255, 255, 255, 0) 0%, rgba(${
        colorItem.r
    }, ${colorItem.g}, ${colorItem.b}, 100) 100%)`
}

const setGradientBarColor = () => {
    if(props.mode=="gradient"){
    colorList.value.sort((a, b) => {
        return a.percent - b.percent
    })

    let barBackground = 'linear-gradient(90deg, '
    let gradientBarBackgroundImage

    if (gradientType.value == 'linear') {
        gradientBarBackgroundImage = `linear-gradient(${gradientAngle.angle}deg, `
        for (let i = 0; i < colorList.value.length; i++) {
            const { r, g, b, a, percent } = colorList.value[i]

            if (colorList.value.length - 1 == i) {
                barBackground =
                    barBackground +
                    `rgba(${r},${g},${b},${a / 100}) ${percent}%)`
                gradientBarBackgroundImage =
                    gradientBarBackgroundImage +
                    `rgba(${r},${g},${b},${a / 100}) ${percent}%)`
            } else {
                barBackground =
                    barBackground +
                    `rgba(${r},${g},${b},${a / 100}) ${percent}%, `
                gradientBarBackgroundImage =
                    gradientBarBackgroundImage +
                    `rgba(${r},${g},${b},${a / 100}) ${percent}%, `
            }
        }
    } else {
        gradientBarBackgroundImage = `radial-gradient(circle at ${gradientAngle.percentageX}% ${gradientAngle.percentageY}%, `
        for (let i = 0; i < colorList.value.length; i++) {
            const { r, g, b, a, percent } = colorList.value[i]

            if (colorList.value.length - 1 == i) {
                barBackground =
                    barBackground +
                    `rgba(${r},${g},${b},${a / 100}) ${percent}%)`
                gradientBarBackgroundImage =
                    gradientBarBackgroundImage +
                    `rgba(${r},${g},${b},${a / 100}) ${percent}%)`
            } else {
                barBackground =
                    barBackground +
                    `rgba(${r},${g},${b},${a / 100}) ${percent}%, `
                gradientBarBackgroundImage =
                    gradientBarBackgroundImage +
                    `rgba(${r},${g},${b},${a / 100}) ${percent}%, `
            }
        }
    }

    

        gradientBar.value.style.backgroundImage = barBackground
        
        let target = document.querySelector('#ck-cp-target-background')
        target.style.backgroundImage = gradientBarBackgroundImage
        if (isReady.value) {
        emits('update:modelValue', target.style.backgroundImage)
    }
    // document.body.style.backgroundImage = gradientBarBackgroundImage
    }else{
        const { r, g, b, a } = colorList.value[0]
        let val =null

        switch (props.type) {
            case 'HEX8':
            val= rgbaToHex8(r,g,b,a/100)
                break;
            case 'RGBA':
            val= `rgba(${r},${g},${b},${a / 100})`
                break;            
            case 'RGB':
            val= `rgb(${r},${g},${b})`
                break;
            case 'HEX':
            val= rgb2Hex(r,g,b)
                break;
            default:
                break;
        }        
        emits('update:modelValue', val)
        // document.body.style.backgroundColor = val
    }
}

const firstSetHue = () => {
    colorList.value.forEach((clr) => {
        clr.hue = rgbToHue(clr.r, clr.g, clr.b)
    })
}

// Menu Func

const openLinearAngleRange = () => {
    isShowLinearAngleRange.value = !isShowLinearAngleRange.value
}

const openRadialAngleRange = () => {
    isShowRadialAngleRange.value = !isShowRadialAngleRange.value
}

const setBackgroundType = (event) => {
    gradientType.value = event

    setGradientBarColor()
}

const deleteColor = () => {
    if (colorList.value.length > 2) {
        let index = colorList.value.findIndex((item) => item.select == true)
        let deleteItemID = colorList.value[index].id
        colorList.value.splice(index, 1)
        document.querySelector(`#clr-gb-${deleteItemID}`).remove()
        let item = colorList.value[0]

        item.select = true
        selectedGradientItem = document.querySelector(`#clr-gb-${item.id}`)
        selectedGradientItem.classList.add('select')
        setToChangeVariebles(item.r, item.g, item.b, item.hue)
        onChangeSetToHexValue()
        setGradientBarColor()
    }
}

const handleOnClickEyeDropper = () => {
    let el = document.querySelector('#cp-btn-eyedropper')
    el.classList.add('active')
    const eyeDropper = new EyeDropper()

    eyeDropper
        .open()
        .then((result) => {
            const { sRGBHex } = result

            let item = colorList.value.find((item) => item.select == true)
            const val = hexToRgb(sRGBHex)
            const hueVal = rgbToHue(val.r, val.g, val.b)
            item.hue = hueVal
            item.r = val.r
            item.g = val.g
            item.b = val.b

            if (!isColorInStrip(val)) {
                hue.value = hueVal
                const { rgb } = hsl2Hex(hueVal, 100, 50)
                redrawTheCanvas(rgb)
                let coord = findColorCoordinates()
                pickerPointer.value.style.left = `${coord.x}px`
                pickerPointer.value.style.top = `${coord.y}px`
            } else {
                let coord = findColorCoordinates()
                pickerPointer.value.style.left = `${coord.x}px`
                pickerPointer.value.style.top = `${coord.y}px`
            }
            onChangeSetToHexValue()
            setOpacityBarColor()
            setGradientBarColor()

            el.classList.remove('active')
        })
        .catch((e) => {
            el.classList.remove('active')
        })
}

const handleRGBAInput = (e, type) => {
    if (type != 'a') {
        const selectItem = colorList.value.find((item) => item.select == true)
        const hueVal = rgbToHue(selectItem.r, selectItem.g, selectItem.b)
        selectItem.hue = hueVal
        setToChangeVariebles(
            selectItem.r,
            selectItem.g,
            selectItem.b,
            selectItem.hue,
            true,
        )
        setGradientBarColor()
        setOpacityBarColor()
    } else {
        opacity.value = parseInt(e.target.value)
        setGradientBarColor()
        setOpacityBarColor()
    }
}

const handleRGBAOnKeydown = (event) => {
    if (
        event.code == 'KeyE' ||
        event.code == 'Equal' ||
        event.code == 'NumpadSubtract' ||
        event.code == 'Backslash' ||
        event.code == 'Slash' ||
        event.code == 'NumpadDecimal' ||
        event.code == 'NumpadAdd'
    ) {
        event.preventDefault()
    } else {
        let max = parseInt(event.target.max)
        let val = parseInt(event.target.value + event.key)
        if (val > max) {
            event.preventDefault()
        }
    }
}
let lastHexValue = ''
const handleHexOnChange = (event, color) => {
    if (!color) {
        hexVal.value = `#${event.target.value.replaceAll('#', '')}`
    } else {
        hexVal.value = color
    }
    let val = hexToRgb(hexVal.value)

    if (val) {
        const hueVal = rgbToHue(val.r, val.g, val.b)
        lastHexValue = hexVal.value
        const selectItem = colorList.value.find((item) => item.select == true)
        selectItem.r = val.r
        selectItem.g = val.g
        selectItem.b = val.b
        selectItem.hue = hueVal

        setToChangeVariebles(val.r, val.g, val.b, selectItem.hue, true)
        setGradientBarColor()
        setOpacityBarColor()
    }
}
const handleHexOnBlur = () => {
    if (lastHexValue) {
        let val = lastHexValue.replaceAll('#', '')

        if (val.length > 6) {
            val = val.slice(0, 6)
        }
        hexVal.value = '#' + val.toUpperCase()
    }
}

const onChangeSetToHexValue = () => {
    const item = colorList.value.find((item) => item.select == true)
    hexVal.value = rgb2Hex(item.r, item.g, item.b).toUpperCase()
    lastHexValue = hexVal.value
}

const handleColorItemOnClick = (color) => {
    handleHexOnChange(null, color)
}

if ('EyeDropper' in window) {
    isEyeDropperUsing.value = true
}

const saveColor = () => {
    let status = localColorList.value.find((color) => color == hexVal.value)
    if (!status) {
        if (localColorList.value.length == 18) {
            localColorList.value.pop()
        }
        localColorList.value.unshift(hexVal.value)

        localStorage.setItem(
            'ck-cp-local-color-list',
            JSON.stringify(localColorList.value),
        )
    }
}

const parseVModelString = (value = '') => {
  if(props.mode=='gradient'){
    let type = value.includes('linear') ? 'linear' : 'radial'
    let newColorList = []

    gradientType.value = type
    if (type == 'linear') {
        let regexPattern = /^linear-gradient\((.*)\)$/
        let matches = value.replace(';', '').trim().match(regexPattern)
        let parsValueRGX = /,\s*(?![^()]*\))/

        let valueList = matches[1].split(parsValueRGX)

        for (let i = 0; i < valueList.length; i++) {
            const element = valueList[i]

            let colorObj = {
                id: i,
                r: 0,
                g: 0,
                b: 0,
                a: 100,
                percent: 100,
                hue: 0,
                select: false,
            }

            if (element.includes('deg')) {
                gradientAngle.angle = parseInt(element.replace('deg', ''))
            } else if (element.includes('rgba')) {
                let colorVal = element
                    .trim()
                    .replace(/rgba|\(|\)|%/g, '')
                    .replaceAll(',', ' ')
                    .split(' ')

                colorVal = colorVal.filter((x) => x.trim() !== '')

                colorObj.r = parseInt(colorVal[0])
                colorObj.g = parseInt(colorVal[1])
                colorObj.b = parseInt(colorVal[2])
                colorObj.a = parseInt(colorVal[3] * 100)
                colorObj.percent = parseInt(colorVal[4])

                newColorList.push(colorObj)
            } else if (element.includes('rgb')) {
                let colorVal = element
                    .trim()
                    .replace(/rgb|\(|\)|%/g, '')
                    .replaceAll(',', ' ')
                    .split(' ')

                colorVal = colorVal.filter((x) => x.trim() !== '')

                colorObj.r = parseInt(colorVal[0])
                colorObj.g = parseInt(colorVal[1])
                colorObj.b = parseInt(colorVal[2])
                colorObj.percent = parseInt(colorVal[3])

                newColorList.push(colorObj)
            }
        }
    } else {
        let regexPattern = /^radial-gradient\((.*)\)$/
        let matches = value.replace(';', '').trim().match(regexPattern)
        let parsValueRGX = /,\s*(?![^()]*\))/

        let valueList = matches[1].split(parsValueRGX)

        for (let i = 0; i < valueList.length; i++) {
            const element = valueList[i]

            let colorObj = {
                id: i,
                r: 0,
                g: 0,
                b: 0,
                a: 100,
                percent: 100,
                hue: 0,
                select: false,
            }
            if (element.includes('circle at')) {
                let angleXY = element
                    .replace('circle at ', '')
                    .replace(' ', '')
                    .replaceAll('%', ' ')
                    .trim()
                    .split(' ')
                gradientAngle.percentageX = parseInt(angleXY[0])
                gradientAngle.percentageY = parseInt(angleXY[1])
            } else if (element.includes('rgba')) {
                let colorVal = element
                    .replace(/rgba|\(|\)|%/g, '')
                    .replaceAll(',', ' ')
                    .split(' ')

                colorVal = colorVal.filter((x) => x.trim() !== '')

                colorObj.r = parseInt(colorVal[0])
                colorObj.g = parseInt(colorVal[1])
                colorObj.b = parseInt(colorVal[2])
                colorObj.a = parseInt(colorVal[3] * 100)
                colorObj.percent = parseInt(colorVal[4])

                newColorList.push(colorObj)
            } else if (element.includes('rgb')) {
                let colorVal = element
                    .replace(/rgb|\(|\)|%/g, '')
                    .replaceAll(',', ' ')
                    .split(' ')

                colorVal = colorVal.filter((x) => x.trim() !== '')

                colorObj.r = parseInt(colorVal[0])
                colorObj.g = parseInt(colorVal[1])
                colorObj.b = parseInt(colorVal[2])
                colorObj.percent = parseInt(colorVal[3])

                newColorList.push(colorObj)
            }
        }
    }

    if (newColorList.length > 1) {
        colorList.value = newColorList
        colorList.value[0].select = true
        opacity.value = colorList.value[0].a
    }
  }else{
    if(value){
        let color={r:0,g:0,b:0,a:0}
        if(value.includes('#')){
            if(value.length>=8)// Color Code HEX8
            {
               color = hex8ToRgba(value)
                
            }else{ // Color Code HEX
               color= hexToRgb(value)
               if(color){
                color.a=1
               }
            }
        }else if(value.includes('rgb')){
            if(value.includes('rgba')){ // Color Code RGBA
                color= parseRgba(value)
            }else{ // Color Code RGB
               let result=  parseRgb(value)

               if(result){
                color.a=1;
                color.r=result.r
                color.g=result.g
                color.b=result.b
               }else{
                color=null
               }
            }
        }

        if(color){
            colorList.value[0].r=color.r
            colorList.value[0].b=color.b
            colorList.value[0].g=color.g
            colorList.value[0].a=parseInt((color.a*100).toFixed(0))
            opacity.value=colorList.value[0].a
            colorList.value[0].hue=0
        }
    }
  }
}


// CONVERT FUNCS

const parseRgb=(rgbString)=> {
    // rgb() değerini kontrol etmek için bir regex deseni kullanabiliriz
    const rgbRegex = /^rgb\((\s*\d+\s*),(\s*\d+\s*),(\s*\d+\s*)\)$/i;

    // rgb() değerinin doğruluğunu kontrol edelim
    if (!rgbRegex.test(rgbString)) {
        return null
    }

    // rgb() değerinden R, G ve B bileşenlerini ayıklayalım
    const result = rgbRegex.exec(rgbString);
    const red = parseInt(result[1].trim(), 10);
    const green = parseInt(result[2].trim(), 10);
    const blue = parseInt(result[3].trim(), 10);

    // Parçalanan değerleri nesne olarak döndürelim
    return {
       r: red,
        g:green,
        b:blue
    };
}

const parseRgba=(rgbaString)=> {
    // rgba() değerini kontrol etmek için bir regex deseni kullanabiliriz
    const rgbaRegex = /^rgba?\((\s*\d+\s*),(\s*\d+\s*),(\s*\d+\s*),(\s*[\d.]+\s*)\)$/i;

    // rgba() değerinin doğruluğunu kontrol edelim
    if (!rgbaRegex.test(rgbaString)) {
        return null
    }

    // rgba() değerinden R, G, B ve A bileşenlerini ayıklayalım
    const result = rgbaRegex.exec(rgbaString);
    const red = parseInt(result[1].trim(), 10);
    const green = parseInt(result[2].trim(), 10);
    const blue = parseInt(result[3].trim(), 10);
    const alpha = parseFloat(result[4].trim());

    // Parçalanan değerleri nesne olarak döndürelim
    return {
        r:red,
        g:green,
        b:blue,
        a:alpha
    };
}

const hex8ToRgba=(hex8)=> {
    // HEX8 değerini kontrol etmek için bir regex deseni kullanabiliriz
    const hex8Regex = /^#?([a-f\d]{8})$/i;
    
    // HEX8 değerinin doğruluğunu kontrol edelim
    if (!hex8Regex.test(hex8)) {
        return null
    }

    // HEX8 değerinden R, G, B ve A bileşenlerini ayıklayalım
    const result = hex8Regex.exec(hex8);
    const colorHex = result[1];
    const alphaHex = colorHex.substring(6, 8);

    const red = parseInt(colorHex.substring(0, 2), 16);
    const green = parseInt(colorHex.substring(2, 4), 16);
    const blue = parseInt(colorHex.substring(4, 6), 16);
    const alpha = parseInt(alphaHex, 16) / 255;// HEX8'deki alpha değerini 0-1 aralığına dönüştürme

    // RGBA değerini döndürelim
    return {r:red,g:green,b:blue,a:alpha}
}

const rgbaToHex8=(r,g,b,a)=>{
    function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  const red = componentToHex(Math.round(r));
  const green = componentToHex(Math.round(g));
  const blue = componentToHex(Math.round(b));
  const alpha = componentToHex(Math.round(a * 255));

  return `#${red}${green}${blue}${alpha}`;
}

const hexToRgb=(hex)=> {
    try {
        let val = hex
            .replace(
                /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                (m, r, g, b) => '#' + r + r + g + g + b + b,
            )
            .substring(1)
            .match(/.{2}/g)
            .map((x) => parseInt(x, 16))

        let r = val[0]
        let g = val[1]
        let b = val[2]

        if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
            return null
        } else if (r == undefined || g == undefined || b == undefined) {
            return null
        } else {
            return {
                r,
                g,
                b,
            }
        }
    } catch (error) {
        return null
    }

    // let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    // return result
    //     ? {
    //           r: parseInt(result[1], 16),
    //           g: parseInt(result[2], 16),
    //           b: parseInt(result[3], 16),
    //       }
    //     : null
}

const rgbToHue=(r, g, b)=> {
    r = r / 255
    g = g / 255
    b = b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let hue

    if (max === r) {
        hue = (g - b) / (max - min)
    } else if (max === g) {
        hue = 2 + (b - r) / (max - min)
    } else {
        hue = 4 + (r - g) / (max - min)
    }

    hue *= 60

    if (hue < 0) {
        hue += 360
    }

    if (Number.isNaN(hue)) hue = 0
    return hue
}

const hsl2Rgb = (h, s, l) => {
    s = s / 100
    l = l / 100
    let c, x, m, rgb
    c = (1 - Math.abs(2 * l - 1)) * s
    x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    m = l - c / 2
    if (h >= 0 && h < 60) rgb = [c, x, 0]
    if (h >= 60 && h < 120) rgb = [x, c, 0]
    if (h >= 120 && h < 180) rgb = [0, c, x]
    if (h >= 180 && h < 240) rgb = [0, x, c]
    if (h >= 240 && h < 300) rgb = [x, 0, c]
    if (h >= 300 && h <= 360) rgb = [c, 0, x]

    return rgb.map(function (v) {
        return (255 * (v + m)) | 0
    })
}

const rgb2Hex = (r, g, b) => {
    let rgb = b | (g << 8) | (r << 16)
    return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

const hsl2Hex = (h, s, l) => {
    let rgb = hsl2Rgb(h, s, l)
    return { rgb, hexA: rgb2Hex(rgb[0], rgb[1], rgb[2]) }
}

const rgbToHsl=(r, g, b)=> {
    let min,
        max,
        i,
        l,
        s,
        maxcolor,
        h,
        rgb = []
    rgb[0] = r / 255
    rgb[1] = g / 255
    rgb[2] = b / 255
    min = rgb[0]
    max = rgb[0]
    maxcolor = 0
    for (i = 0; i < rgb.length - 1; i++) {
        if (rgb[i + 1] <= min) {
            min = rgb[i + 1]
        }
        if (rgb[i + 1] >= max) {
            max = rgb[i + 1]
            maxcolor = i + 1
        }
    }
    if (maxcolor == 0) {
        h = (rgb[1] - rgb[2]) / (max - min)
    }
    if (maxcolor == 1) {
        h = 2 + (rgb[2] - rgb[0]) / (max - min)
    }
    if (maxcolor == 2) {
        h = 4 + (rgb[0] - rgb[1]) / (max - min)
    }
    if (isNaN(h)) {
        h = 0
    }
    h = h * 60
    if (h < 0) {
        h = h + 360
    }
    l = (min + max) / 2
    if (min == max) {
        s = 0
    } else {
        if (l < 0.5) {
            s = (max - min) / (max + min)
        } else {
            s = (max - min) / (2 - max - min)
        }
    }
    // eslint-disable-next-line no-self-assign
    s = s
    return { h: h, s: s, l: l }
}

const hslToRgb=(h, s, l)=> {
    // Hue değerini 0 ile 360 arasına dönüştürün (istenirse 0 ile 1 arasında olabilir)
    h = (h % 360) / 360

    // Doygunluk ve Parlaklık değerlerini 0 ile 1 arasına sınırlayın
    s = Math.min(1, Math.max(0, s))
    l = Math.min(1, Math.max(0, l))

    // RGB değerlerini hesaplayın
    let r, g, b
    if (s === 0) {
        r = g = b = l
    } else {
        const hueToRgb = (p, q, t) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q

        r = hueToRgb(p, q, h + 1 / 3)
        g = hueToRgb(p, q, h)
        b = hueToRgb(p, q, h - 1 / 3)
    }

    // RGB değerlerini 0 ile 255 arasına dönüştürün

    r = Math.round(r * 255)
    g = Math.round(g * 255)
    b = Math.round(b * 255)

    return { r, g, b }
}


onBeforeMount(() => {
    let val = localStorage.getItem('ck-cp-local-color-list')
    if (val) {
        localColorList.value = JSON.parse(val)
    }
})
onMounted(() => {
if(props.mode=="gradient"){
    gradientMouseBar = document.querySelector('.gradient-bar')
}
    if (!props.modelValue) {
        setFirstEmptyValue()
    } else {
        parseVModelString(props.modelValue)
        setFirstEmptyValue()
    }
    isReady.value = true
})
</script>

<style lang="scss">
@import url('../assets/icons/icon.css');

.ck-cp-controller-bar {
    // height: 35px;
    // background-color: #f1f1f1;
    margin-top: 0.5rem;
    border-radius: 0.475rem;
    display: flex;
    align-items: center;
    gap: 5px;
}

.ck-cp-menu {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.cp-btn {
    border: 0;
    height: 28px !important;
    width: 28px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 0.475rem;
    color: #303030;
    opacity: 0.65;
}

.cp-btn.active {
    opacity: 1;
    background-color: #fff;
    color: #5983fc;
    box-shadow: 0px 0px 3px 0px rgba(216, 216, 216, 1);
}

.ck-cp-container {
    left: 0;
    background-color: #fff;
    border-radius: 1rem;
    padding: 10px;
    width: 250px;
    height: auto;
    box-shadow: 0px 0px 34px 1px rgba(88, 88, 88, 0.507);
}

.ck-cp-container * {
    outline: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cp-picker-wrap {
    width: 100%;
    height: 145px;
    position: relative;
    overflow: hidden;

}

.picker-saturation {
    cursor: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.colour-area-point-circle {
    pointer-events: none;
    cursor: pointer;
    position: absolute;
    width: 12px;
    height: 12px;
    box-shadow:
        0 0 0 1.5px #fff,
        inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
        0 0 1px 2px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
}

.colour-area-mask {

    border-radius: 0.5rem;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: inset rgba(0, 0, 0, 0.075) 0 0 0 1px;
}

.colour-area {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
}

.picker-hue {
    width: 100%;
    height: 14px;
    margin: 1rem 0;
}

.picker-hue-range-slider {
    margin: 0;
    border-radius: 10px;
    position: relative;
    z-index: 1;
    appearance: none;
    height: 100%;
    width: 100%;
    display: block;
    outline: none;
    transition: color 0.05s linear;
    background: linear-gradient(to right,
            #ff0000 0%,
            #ffff00 17%,
            #00ff00 33%,
            #00ffff 50%,
            #0000ff 67%,
            #ff00ff 83%,
            #ff0000 100%);

    &:focus {
        outline: none;
    }

    &:active,
    &:hover:active {
        cursor: grabbing;
        cursor: -webkit-grabbing;
    }

    &::-moz-range-track {
        appearance: none;
        opacity: 0;
        outline: none;
    }

    &::-ms-track {
        outline: none;
        appearance: none;
        opacity: 0;
    }

    &::-webkit-slider-thumb {
        box-shadow: 0px -0px 6px 0px rgba(12, 90, 235, 0.651);
        border: 0.2em solid #f7f7f7;
        background-color: #5983fc;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        appearance: none;
        cursor: pointer;
        cursor: move;
        cursor: grab;
        cursor: -webkit-grab;
    }

    &::-moz-range-thumb {
        box-shadow: 0px -0px 6px 0px rgba(12, 90, 235, 0.651);
        border: 0.2em solid #f7f7f7;
        background-color: #5983fc;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        appearance: none;
        cursor: pointer;
        cursor: move;
        cursor: grab;
        cursor: -webkit-grab;
    }
}

.picker-opacity-slider {
    top: 0px;
    position: absolute;
    left: 0;
    width: 100%;
    height: 14px;
}

.opacity__slider {
    border-radius: 10px;
    z-index: 10;
    appearance: none;
    background-color: rgba(0, 0, 0, 0.1);
    height: 100%;
    width: 100%;
    display: block;
    outline: none;
    transition: color 0.05s linear;
    margin: 0;

    &:focus {
        outline: none;
    }

    &:active,
    &:hover:active {
        cursor: grabbing;
        cursor: -webkit-grabbing;
    }

    &::-moz-range-track {
        appearance: none;
        opacity: 0;
        outline: none;
    }

    &::-ms-track {
        outline: none;
        appearance: none;
        opacity: 0;
    }

    &::-webkit-slider-thumb {
        box-shadow: 0px -0px 6px 0px rgba(12, 90, 235, 0.651);
        border: 0.2em solid #f7f7f7;
        background-color: #5983fc;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        appearance: none;
        cursor: pointer;
        cursor: move;
        cursor: grab;
        cursor: -webkit-grab;
    }

    &::-moz-range-thumb {
        box-shadow: 0px -0px 6px 0px rgba(12, 90, 235, 0.651);
        border: 0.2em solid #5983fc;
        background-color: #5983fc;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        appearance: none;
        cursor: pointer;
        cursor: move;
        cursor: grab;
        cursor: -webkit-grab;
    }
}

.gradient-bar {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    margin-top: 17px;
    margin-bottom: 4px;
}

.gradient-container {
    width: 100%;
    height: 14px;
    border-radius: 10px;
}

.gradient-handle {
    position: absolute;
    z-index: 1;
    top: -5px;
    outline: none;
}

.gradient-handle .gradient-handle-content {
    cursor: ew-resize;
    box-shadow: 0px -0px 6px 0px rgba(12, 90, 235, 0.651);
    background-color: #f7f7f7;
    border-radius: 50%;
    height: 24px;
    width: 24px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.2em solid #5983fc;
}

.gradient-handle.select .gradient-handle-content {
    background-color: #5983fc;
    border: 0.2em solid #f7f7f7;
}

.gradient-handle.select {
    z-index: 2;
}

.opacity-bar {
    position: relative;
    height: 20px;
    box-sizing: border-box;
    margin-top: 16px;
    margin-bottom: 4px;
}

.opacity-bar-background {
    position: absolute;
    background:
        linear-gradient(45deg,
            rgba(0, 0, 0, 0.18) 25%,
            transparent 25%,
            transparent 75%,
            rgba(0, 0, 0, 0.18) 75%,
            rgba(0, 0, 0, 0.18) 0px) 0px 0px / 14px 14px repeat padding-box border-box,
        linear-gradient(45deg,
            rgba(0, 0, 0, 0.18) 25%,
            transparent 25%,
            transparent 75%,
            rgba(0, 0, 0, 0.18) 75%,
            rgba(0, 0, 0, 0.18) 0px) 7px 7px / 14px 14px repeat padding-box border-box,
        white;
    transform-origin: 0px 0px 0px;
    box-shadow: none;
    text-shadow: none;
    transition: none 0s ease 0s;
    transform: scaleX(1) scaleY(1) scaleZ(1);
    border-radius: 0.5rem;
    width: 100%;
    height: 14px;
    z-index: 0;
}

.ck-cp-linear-angle-container {
    margin: 1rem 0 2rem 0;
}

.ck-cp-linear-angle-container input[type='range'] {

    border-radius: 10px;
    z-index: 10;
    appearance: none;
    background-color: rgba(0, 0, 0, 0.1);
    height: 5px;
    width: 100%;
    display: block;
    outline: none;
    transition: color 0.05s linear;

    &:focus {
        outline: none;
    }

    &:active,
    &:hover:active {
        cursor: grabbing;
        cursor: -webkit-grabbing;
    }

    &::-moz-range-track {
        appearance: none;
        opacity: 0;
        outline: none;
    }

    &::-ms-track {
        outline: none;
        appearance: none;
        opacity: 0;
    }

    &::-webkit-slider-thumb {
        box-shadow: 0px -0px 6px 0px rgba(12, 90, 235, 0.651);
        background-color: #5983fc;
        height: 24px;
        width: 6px;
        border-radius: 2px;
        appearance: none;
        cursor: pointer;
        cursor: move;
        cursor: grab;
        cursor: -webkit-grab;
    }

    &::-moz-range-thumb {
        box-shadow: 0px -0px 6px 0px rgba(12, 90, 235, 0.651);
        background-color: #5983fc;
        height: 24px;
        width: 6px;
        border-radius: 2px;
        appearance: none;
        cursor: pointer;
        cursor: move;
        cursor: grab;
        cursor: -webkit-grab;
    }
}

.ck-cp-linear-angle-container p {
    text-align: start;
    margin-bottom: 0.6rem;
    font-size: 0.85rem;
    color: #787878;
    font-weight: 500;
}

.ck-cp-linear-angle-container p span {
    color: #5983fc;
    font-weight: 700;
}

.ck-cp-linear-angle-container p span::before {
    content: '→ ';
}

.ck-cp-input-container {
    width: 100%;
    display: flex;
    gap: 8px;
    margin-top: 0.85rem;
    margin-bottom: 12px;
}

.ck-cp-input-container input[type='text'] {
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    width: 92%;
    text-align: center;
    height: 30px;
    flex-shrink: 0;
    outline: none;
}

.ck-cp-input-container input[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
    -webkit-appearance: textfield;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    width: 30px;
    text-align: center;
    height: 30px;
    flex-shrink: 0;
    outline: none;
}

.ck-cp-input-container input[type='number']:focus-visible,
.ck-cp-input-container input[type='text']:focus-visible {
    border: 1px solid #5983fc;
}

.ck-cp-input-container input[type='number']::-webkit-inner-spin-button,
.ck-cp-input-container input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    display: none;
    margin: 0;
}

.ck-cp-input-container .ck-cp-input-content {
    position: relative;
    display: flex;
    flex-direction: column;
}

.ck-cp-input-container .ck-cp-input-content .ck-cp-input-label {
    position: absolute;
    background-color: #fff;
    font-size: 10px;
    top: -6px;
    left: -6px;
    font-weight: 500;
    color: #787878;
    padding: 0 4px;
    // border-radius: 50%;
}

.ck-cp-local-color-conatiner {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding-bottom: 12px;
}

.ck-cp-local-color-conatiner .ck-cp-color-item {
    cursor: pointer;
    width: 23px;
    height: 23px;
    // border: 1px solid #e5e5e5;
    border-radius: 5px;
}
</style>
