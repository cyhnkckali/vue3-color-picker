<template>
    <div class="ck-cp-menu" :style="mode == 'gradient' ? '' : 'justify-content: end;'">
        <div v-if="mode == 'gradient'" class="ck-cp-controller-bar ">
            <button class="cp-btn" :class="gradientType == 'linear' ? 'active' : ''"
                @click="$emit('onChangeMode', 'linear')" :style="`${iconClasses.linear ? '' : 'padding: 7px;'}`">

                <i v-if="iconClasses.linear" :class="iconClasses.linear"></i>
                <svg v-else version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path
                        d="M21.5 0h9c0.831 0 1.5 0.669 1.5 1.5v9c0 0.606-0.363 1.156-0.925 1.387s-1.206 0.106-1.637-0.325l-2.438-2.438-5.438 5.438c-0.587 0.588-1.538 0.588-2.119 0l-2-2c-0.587-0.588-0.587-1.537 0-2.119l5.438-5.438-2.444-2.444c-0.431-0.431-0.556-1.075-0.325-1.637s0.781-0.925 1.387-0.925zM10.5 32h-9c-0.831 0-1.5-0.669-1.5-1.5v-9c0-0.606 0.362-1.156 0.925-1.387s1.206-0.106 1.637 0.325l2.438 2.438 5.438-5.438c0.588-0.587 1.537-0.587 2.119 0l2 2c0.588 0.587 0.588 1.538 0 2.119l-5.438 5.438 2.438 2.438c0.431 0.431 0.556 1.075 0.325 1.637s-0.781 0.925-1.387 0.925z">
                    </path>
                </svg>

            </button>
            <button class="cp-btn" :class="gradientType == 'radial' ? 'active' : ''"
                @click="$emit('onChangeMode', 'radial')" :style="`${iconClasses.radial ? '' : 'padding: 6px;'}`">
                <i v-if="iconClasses.radial" :class="iconClasses.radial"></i>
                <svg v-else version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path
                        d="M29 16c0-7.18-5.82-13-13-13s-13 5.82-13 13v0c0 7.18 5.82 13 13 13s13-5.82 13-13v0zM0 16c0-8.837 7.163-16 16-16s16 7.163 16 16v0c0 8.837-7.163 16-16 16s-16-7.163-16-16v0z">
                    </path>
                </svg>

            </button>

            <button v-show="gradientType == 'linear'" class="cp-btn" :class="isShowLinearAngleRange ? 'active' : ''"
                @click="isShowLinearAngleRange = !isShowLinearAngleRange"
                :style="`${iconClasses.ruler ? '' : 'padding: 7px;'}`">
                <i v-if="iconClasses.ruler" :class="iconClasses.ruler"></i>
                <svg v-else version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path
                        d="M0.013 29.306c0.156 1.512 1.431 2.694 2.987 2.694h26c1.656 0 3-1.344 3-3v-6c0-1.656-1.344-3-3-3h-3v5c0 0.55-0.45 1-1 1s-1-0.45-1-1v-5h-4v5c0 0.55-0.45 1-1 1s-1-0.45-1-1v-5h-4v5c0 0.55-0.45 1-1 1s-1-0.45-1-1v-5h-5c-0.55 0-1-0.45-1-1s0.45-1 1-1h5v-4h-5c-0.55 0-1-0.45-1-1s0.45-1 1-1h5v-4h-5c-0.55 0-1-0.45-1-1s0.45-1 1-1h5v-3c0-1.656-1.344-3-3-3h-6c-1.656 0-3 1.344-3 3v26c0 0.106 0.006 0.206 0.013 0.306z">
                    </path>
                </svg>

            </button>

            <button v-show="gradientType == 'radial'" class="cp-btn" :class="isShowRadialAngleRange ? 'active' : ''"
                @click="isShowRadialAngleRange = !isShowRadialAngleRange"
                :style="`${iconClasses.ruler ? '' : 'padding: 7px;'}`">
                <i v-if="iconClasses.ruler" :class="iconClasses.ruler"></i>
                <svg v-else version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path
                        d="M0.013 29.306c0.156 1.512 1.431 2.694 2.987 2.694h26c1.656 0 3-1.344 3-3v-6c0-1.656-1.344-3-3-3h-3v5c0 0.55-0.45 1-1 1s-1-0.45-1-1v-5h-4v5c0 0.55-0.45 1-1 1s-1-0.45-1-1v-5h-4v5c0 0.55-0.45 1-1 1s-1-0.45-1-1v-5h-5c-0.55 0-1-0.45-1-1s0.45-1 1-1h5v-4h-5c-0.55 0-1-0.45-1-1s0.45-1 1-1h5v-4h-5c-0.55 0-1-0.45-1-1s0.45-1 1-1h5v-3c0-1.656-1.344-3-3-3h-6c-1.656 0-3 1.344-3 3v26c0 0.106 0.006 0.206 0.013 0.306z">
                    </path>
                </svg>

            </button>
        </div>
        <div ref="rightContainer" class="ck-cp-controller-bar"
            style="display: inline-flex; justify-content: end;position: relative;">
            <button v-if="isEyeDropperUsing && showEyeDrop" id="cp-btn-eyedropper" class="cp-btn"
                :style="`${iconClasses.eyeDroper ? '' : 'padding: 7px;'}`" @click="$emit('onClickEyeDropper')">
                <i v-if="iconClasses.eyeDroper" :class="iconClasses.eyeDroper"></i>
                <svg v-else version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path
                        d="M21.35 1.825l-6.344 6.35-0.588-0.588c-0.781-0.781-2.050-0.781-2.831 0s-0.781 2.050 0 2.831l10 10c0.781 0.781 2.050 0.781 2.831 0s0.781-2.050 0-2.831l-0.587-0.587 6.344-6.35c2.438-2.438 2.438-6.388 0-8.819s-6.387-2.438-8.819 0zM3.462 20.206c-0.938 0.938-1.462 2.212-1.462 3.538v2.65l-1.663 2.494c-0.531 0.794-0.425 1.85 0.25 2.525s1.731 0.781 2.525 0.25l2.494-1.663h2.65c1.325 0 2.6-0.525 3.537-1.462l7.544-7.544-2.831-2.831-7.544 7.544c-0.188 0.188-0.444 0.294-0.706 0.294h-2.256v-2.256c0-0.262 0.106-0.519 0.294-0.706l7.544-7.544-2.831-2.831-7.544 7.544z">
                    </path>
                </svg>
            </button>
            <!-- NPM ARACI OLDUĞUNDA SET EDİLCEK RGB RGBA HEX -->
            <button v-if="showInputMenu" class="cp-btn" @click="onShowInputMenu" :class="isInputMenuShow ? 'active' : ''"
                :style="`${iconClasses.inputMenu ? '' : 'padding: 7px;'}`">
                <i v-if="iconClasses.inputMenu" :class="iconClasses.inputMenu"></i>
                <svg v-else version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path
                        d="M32 16c0 0.056 0 0.113 0 0.169-0.025 2.281-2.1 3.831-4.381 3.831h-6.119c-1.656 0-3 1.344-3 3 0 0.212 0.025 0.419 0.063 0.619 0.131 0.637 0.406 1.25 0.675 1.869 0.381 0.863 0.756 1.719 0.756 2.625 0 1.988-1.35 3.794-3.337 3.875-0.219 0.006-0.438 0.012-0.662 0.012-8.831 0-15.994-7.162-15.994-16s7.162-16 16-16 16 7.162 16 16zM8 18c0-1.105-0.895-2-2-2s-2 0.895-2 2v0c0 1.105 0.895 2 2 2s2-0.895 2-2v0zM8 12c1.105 0 2-0.895 2-2s-0.895-2-2-2v0c-1.105 0-2 0.895-2 2s0.895 2 2 2v0zM18 6c0-1.105-0.895-2-2-2s-2 0.895-2 2v0c0 1.105 0.895 2 2 2s2-0.895 2-2v0zM24 12c1.105 0 2-0.895 2-2s-0.895-2-2-2v0c-1.105 0-2 0.895-2 2s0.895 2 2 2v0z">
                    </path>
                </svg>

            </button>
            <ColorInputMenu v-show="isInputMenuShow" :inputType="inputType" @onChangeInputName="handleChangeInputType">
            </ColorInputMenu>
            <button v-if="showColorList" class="cp-btn" @click="$emit('onSaveColor')"
                :style="`${iconClasses.save ? '' : 'padding: 7px;'}`">
                <i v-if="iconClasses.save" :class="iconClasses.save"></i>
                <svg v-else version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32">
                    <path
                        d="M4 2c-2.206 0-4 1.794-4 4v20c0 2.206 1.794 4 4 4h20c2.206 0 4-1.794 4-4v-15.169c0-1.063-0.419-2.081-1.169-2.831l-4.831-4.831c-0.75-0.75-1.769-1.169-2.831-1.169h-15.169zM4 8c0-1.106 0.894-2 2-2h12c1.106 0 2 0.894 2 2v4c0 1.106-0.894 2-2 2h-12c-1.106 0-2-0.894-2-2v-4zM14 18c2.209 0 4 1.791 4 4s-1.791 4-4 4v0c-2.209 0-4-1.791-4-4s1.791-4 4-4v0z">
                    </path>
                </svg>
            </button>
            <button v-if="mode == 'gradient'" class="cp-btn" @click="$emit('onDeleteColor')"
                :style="`${iconClasses.delete ? '' : 'padding: 7.5px;'}`">
                <i v-if="iconClasses.delete" :class="iconClasses.delete"></i>
                <svg v-else version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32">
                    <path
                        d="M8.45 1.106l-0.45 0.894h-6c-1.106 0-2 0.894-2 2s0.894 2 2 2h24c1.106 0 2-0.894 2-2s-0.894-2-2-2h-6l-0.45-0.894c-0.337-0.681-1.031-1.106-1.788-1.106h-7.525c-0.756 0-1.45 0.425-1.787 1.106zM26 8h-24l1.325 21.188c0.1 1.581 1.413 2.813 2.994 2.813h15.362c1.581 0 2.894-1.231 2.994-2.813l1.325-21.188z">
                    </path>
                </svg>
            </button>
        </div>
    </div>
    <div v-if="mode == 'gradient'" v-show="gradientType == 'linear' && isShowLinearAngleRange"
        class="ck-cp-linear-angle-container">
        <div>
            <p class="ck-gradient-set-label">
                {{ local.angle ? local.angle : 'Angle' }} <span>{{ angle }}°</span>
            </p>
            <input type="range" min="0" max="360" :value="angle" @input="handleInput($event, 'angle')" />
        </div>
    </div>

    <div v-if="mode == 'gradient'" v-show="gradientType == 'radial' && isShowRadialAngleRange"
        class="ck-cp-linear-angle-container">
        <div>
            <p class="ck-gradient-set-label">
                {{ local.positionX ? local.positionX : 'Position X' }} <span>{{ percentageX }}%</span>
            </p>
            <input type="range" min="0" max="100" :value="percentageX" @input="handleInput($event, 'percentageX')" />
        </div>
        <div style="margin-top: 1rem">
            <p class="ck-gradient-set-label">
                {{ local.positionY ? local.positionY : 'Position Y' }} <span>{{ percentageY }}%</span>
            </p>
            <input type="range" min="0" max="100" :value="percentageY" @input="handleInput($event, 'percentageY')" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Mode, InputType, Local, IconClasses } from '../core/types/types.ts';
import ColorInputMenu from './ColorInputMenu.vue';
defineProps({
    mode: {
        default: 'gradient',
        type: String as () => Mode,
    },
    inputType: { default: 'RGB', type: String as () => InputType, },
    gradientType: { default: 'linear', type: String },
    isEyeDropperUsing: { default: false, type: Boolean },
    showColorList: { default: true, type: Boolean },
    showEyeDrop: { default: true, type: Boolean },
    showInputMenu: { default: true, type: Boolean },
    angle: { default: 90, type: Number },
    percentageX: { default: 50, type: Number },
    percentageY: { default: 50, type: Number },
    local: { default: { angle: '', positionX: '', positionY: '' }, type: Object as () => Local },
    iconClasses: { default: { linear: '', radial: '', ruler: '', eyeDroper: '', inputMenu: '', save: '', delete: '' }, type: Object as () => IconClasses }
})

const rightContainer = ref()
const isShowLinearAngleRange = ref(false)
const isShowRadialAngleRange = ref(false)
const isInputMenuShow = ref(false)

const emits = defineEmits<{
    (e: 'onSaveColor'): void,
    (e: 'onChangeMode', value: string): void,
    (e: 'onChangeInputType', value: InputType): void,
    (e: 'onDeleteColor'): void,
    (e: 'onClickEyeDropper'): void,
    (e: 'update:angle', value: number): void,
    (e: 'update:percentageX', value: number): void,
    (e: 'update:percentageY', value: number): void,
    (e: 'onInput'): void,
}>()

const handleInput = (event: Event, type: string) => {

    switch (type) {
        case 'angle':
            emits('update:angle', parseInt((event.target as HTMLInputElement).value))
            emits('onInput')
            break;

        case 'percentageX':
            emits('update:percentageX', parseInt((event.target as HTMLInputElement).value))
            emits('onInput')
            break;
        case 'percentageY':
            emits('update:percentageY', parseInt((event.target as HTMLInputElement).value))
            emits('onInput')
            break;
    }

}

const handleChangeInputType = (event: InputType) => {
    isInputMenuShow.value = false
    emits('onChangeInputType', event)
}

const onShowInputMenu = () => {
    isInputMenuShow.value = !isInputMenuShow.value
}

</script>

<style lang="scss" scoped></style>