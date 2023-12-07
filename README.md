
# Vue 3 Color Picker

A colour selective component for Vue 3. Fast and with small package size. 
Gradient and Solid in one!
No dependency!
Fully customisable!


[Live Demo](https://cyhnkckali.github.io/vue3-color-picker/)

![gradient](https://github.com/cyhnkckali/vue3-color-picker/assets/93313260/b6404bdc-4fc5-4d79-a9a3-0447fe6e4708)
![solid1](https://github.com/cyhnkckali/vue3-color-picker/assets/93313260/fbb8efce-b4f6-4356-8a30-fc6904404b30)

## Install

#### NPM Install

```
 npm i @cyhnkckali/vue3-color-picker
```

#### Yarn Install

```
  yarn add @cyhnkckali/vue3-color-picker
```

#### Import

##### Import where you want to use it

```
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
``` 

#### Import the style file into your main.js file

```
import '@cyhnkckali/vue3-color-picker/dist/style.css'
```

## Use/Examples

```javascript
<script setup>
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
</script>

<template>   

    <Vue3ColorPicker v-model="value" mode="solid" :showColorList="false" :showEyeDrop="false" type="RGBA"/>

    <Vue3ColorPicker v-model="value" mode="gradient" :showColorList="false" :showEyeDrop="false"/>

</template>
```
## Options

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `v-model` | `string` | default `''`|
| `mode` | `string` | `solid` or `gradient` default `gradient`|
| `theme` | `string` | `light` or `dark` default `light`|
| `type` | `string` | Return colour value type `HEX8` `RGBA` `RGB` `HEX` default `HEX8`|
| `inputType` | `string` | Input type of colour values `RGB` `HSL` `HSV` `CMYK` default `RGB`|
| `disabled` | `boolean` | default `false` |
| `local` | `object` | default `{ angle: '', positionX: '', positionY: '' }` |
| `colorListCount` | `number` | Determines how many colours to keep in the colour list default `18`|
| `showColorList` | `boolean` | default `true` |
| `showEyeDrop` | `boolean` | default `true` Supports Chrome and Edge only |
| `showAlpha` | `boolean` | default `true` |
| `showInputMenu` | `boolean` | default `true` |
| `showInputSet` | `boolean` | default `true` |
| `iconClasses` | `object` | default `{ linear: '', radial: '', ruler: '', eyeDroper: '', inputMenu: '', save: '', delete: '' }` |


## CSS Colour Variables


| Variables Name             | Hex | Dark Hex
| :----------------- | :--------------------------- | :-------------------------------------- |
| --cp-container-bg | ![#FFF](https://placehold.co/10x10/ffffff/FFF) #FFF  |![#212529](https://placehold.co/10x10/212529/212529) #212529 |
| --cp-ps-color | ![#707070](https://placehold.co/10x10/707070/707070) #707070 |
| --cp-act-color| ![#5983fc](https://placehold.co/10x10/5983fc/5983fc) #5983fc |
| --cp-range-border | ![#f7f7f7](https://placehold.co/10x10/f7f7f7/f7f7f7) #f7f7f7| 
| --cp-input-menu-bg | ![#F5F5F5](https://placehold.co/10x10/F5F5F5/F5F5F5) #F5F5F5|![#242629](https://placehold.co/10x10/242629/242629) #242629|  
| --cp-border-color | ![#e5e5e5](https://placehold.co/10x10/e5e5e5/e5e5e5) #e5e5e5| ![#43474b](https://placehold.co/10x10/43474b/43474b) #43474b|
| --cp-range-shadow | ![#4c86f3](https://placehold.co/10x10/4c86f3/4c86f3) #4c86f3| 
| --cp-label-color | ![#787878](https://placehold.co/10x10/787878/787878) #787878|
| --cp-container-shadow| ![#58585881](https://placehold.co/10x10/58585881/58585881) #58585881|![#2b262696](https://placehold.co/10x10/2b262696/2b262696) #2b262696|
| --cp-font-color | ![#141414](https://placehold.co/10x10/141414/141414) #141414|![#e7e7e7](https://placehold.co/10x10/e7e7e7/e7e7e7) #e7e7e7|
| --cp-button-color | ![#F5F5F5](https://placehold.co/10x10/F5F5F5/F5F5F5) #F5F5F5|![#1a1d20](https://placehold.co/10x10/1a1d20/1a1d20) #1a1d20|


## Roadmap

- Widget type to add

