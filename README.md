
# Vue 3 Color Picker

A colour selective component for Vue 3. Fast and with small package size. 
Gradient and Solid in one!
No dependency!
Fully customisable!

#### Features with Version 2.0

* Ability to change mode instantly
* Change the value in the colour list
* Delete a value in the colour list
* New style variables
* New ui design

Don't forget to star for motivation :)

Try it now [Live Demo](https://cyhnkckali.github.io/vue3-color-picker/)

Download 1.1.9 to continue with the old version !!!



![gradient](https://github.com/cyhnkckali/vue3-color-picker/assets/93313260/71d94ada-5c38-4fcb-b1be-610193c55112)
![solid](https://github.com/cyhnkckali/vue3-color-picker/assets/93313260/67511957-7983-4056-b136-54ccbaad9baf)



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
| `local` | `object` | default `{ angle: '', positionX: '', positionY: '', solid: '', gradient: '', linear: '', radial: '', colorPalette: '', btnSaveLabel:'Save', btnCancelLabel:'Cancel'  }` |
| `colorListCount` | `number` | Determines how many colours to keep in the colour list default `18`|
| `showColorList` | `boolean` | default `true` |
| `showEyeDrop` | `boolean` | default `true` Supports Chrome and Edge only |
| `showAlpha` | `boolean` | default `true` |
| `showInputMenu` | `boolean` | default `true` |
| `showInputSet` | `boolean` | default `true` |
| `showPickerMode` | `boolean` | default `true` |
| `iconClasses` | `object` | default `{ ruler: '', eyeDroper: '', arrowDown: '', save: '', delete: '' }` |
| `gradientMode` | `linear` or `radial` | default `linear` Sets the initial gradient mode when the picker is started |
| `showButtons` | `boolean` | default `true` |


## Emits

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `update:model-value` | `event` | return `'color value'`|
| `onSave` | `event` | return `'color value'`|
| `onCancel` | `event` | return `'color value'`|


## CSS Colour Variables


| Variables Name             | Hex | Dark Hex
| :----------------- | :--------------------------- | :-------------------------------------- |
| --cp-primary| ![#5983fc](https://placehold.co/10x10/5983fc/5983fc) #5983fc  |![#5983fc](https://placehold.co/10x10/5983fc/5983fc) #5983fc |
| --cp-container-bg | ![#FFF](https://placehold.co/10x10/ffffff/FFF) #FFF  |![#212529](https://placehold.co/10x10/212529/212529) #212529 |
| --cp-select-color| ![#2c5ae6af](https://placehold.co/10x10/2c5ae6af/2c5ae6af) #2c5ae6af  |![#2c5ae6af](https://placehold.co/10x10/2c5ae6af/2c5ae6af) #2c5ae6af |
| --cp-range-border| ![#f7f7f7](https://placehold.co/10x10/f7f7f7/f7f7f7) #f7f7f7  |![#f7f7f7](https://placehold.co/10x10/f7f7f7/f7f7f7) #f7f7f7 |
| --cp-range-shadow| ![#4c86f3](https://placehold.co/10x10/4c86f3/4c86f3) #4c86f3  |![#4c86f3](https://placehold.co/10x10/4c86f3/4c86f3) #4c86f3 |
| --cp-container-shadow| ![#58585881](https://placehold.co/10x10/58585881/58585881) #58585881  |![#2b262696](https://placehold.co/10x10/2b262696/2b262696) #2b262696 |
| --cp-gray-100 | ![#f9f9f9](https://placehold.co/10x10/F9F9F9/F9F9F9) #f9f9f9 |![#1b1c22](https://placehold.co/10x10/1b1c22/1b1c22) #1b1c22 |
| --cp-gray-200 | ![#f1f1f4](https://placehold.co/10x10/f1f1f4/f1f1f4) #f1f1f4 |![#26272f](https://placehold.co/10x10/26272f/26272f) #26272f |
| --cp-gray-300 | ![#dbdfe9](https://placehold.co/10x10/dbdfe9/dbdfe9) #dbdfe9 |![#363843](https://placehold.co/10x10/363843/363843) #363843 |
| --cp-gray-400 | ![#c4cada](https://placehold.co/10x10/c4cada/c4cada) #c4cada |![#464852](https://placehold.co/10x10/464852/464852) #464852 |
| --cp-gray-500 | ![#99a1b7](https://placehold.co/10x10/99a1b7/99a1b7) #99a1b7 |![#636674](https://placehold.co/10x10/636674/636674) #636674 |
| --cp-gray-600 | ![#78829d](https://placehold.co/10x10/78829d/78829d) #78829d |![#808290](https://placehold.co/10x10/808290/808290) #808290 |
| --cp-gray-700 | ![#4b5675](https://placehold.co/10x10/4b5675/4b5675) #4b5675 |![#9a9cae](https://placehold.co/10x10/9a9cae/9a9cae) #9a9cae |
| --cp-gray-800 | ![#252f4a](https://placehold.co/10x10/252f4a/252f4a) #252f4a |![#b5b7c8](https://placehold.co/10x10/b5b7c8/b5b7c8) #b5b7c8 |
| --cp-gray-900 | ![#071437](https://placehold.co/10x10/071437/071437) #071437 |![#f5f5f5](https://placehold.co/10x10/f5f5f5/f5f5f5) #f5f5f5 |
| --cp-inverse-dark | ![#57575723](https://placehold.co/10x10/57575723/57575723) #57575723 |![#6b6b6b56](https://placehold.co/10x10/6b6b6b56/6b6b6b56) #6b6b6b56 |
| --cp-inverse-white | ![#9292920d](https://placehold.co/10x10/9292920d/9292920d) #9292920d |![#92929256](https://placehold.co/10x10/92929256/92929256) #92929256 |

## Roadmap

- Widget type to add

