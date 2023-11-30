
# Vue 3 Color Picker

A colour selective component for Vue 3. Fast and with small package size

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
import {ColorPicker} from '@cyhnkckali/vue3-color-picker';
``` 

#### Import the style file into your main.js file

```
import '@cyhnkckali/vue3-color-picker/dist/style.css'
``` 
## Options

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `mode` | `string` | `solid` or `gradient` default `gradient`|
| `showColorList` | `boolean` | default `true` |
| `showEyeDrop` | `boolean` | default `true` Supports Chrome and Edge only |
| `type` | `string` | Return colour value type `HEX8` `RGBA` `RGB` `HEX` default `HEX8`  |

## Use/Examples

```javascript
<script setup>
import {ColorPicker} from '@cyhnkckali/vue3-color-picker';
</script>

<template>   

    <ColorPicker v-model="value" mode="solid" :showColorList="false" :showEyeDrop="false" type="RGBA"/>

    <ColorPicker v-model="value" mode="gradient" :showColorList="false" :showEyeDrop="false"/>

</template>
```

  
