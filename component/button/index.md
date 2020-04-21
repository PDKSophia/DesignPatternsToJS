# Button 按钮组件

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。按钮可进行即时点击操作。

## 使用

### 普通按钮

```jsx
<Button type="main" color="orange">主按钮</Button>
<Button type="secondary" color="danger">次按钮</Button>

<Button ghost={true}>幽灵按钮</Button>
<Button antiWhite={true}>反白按钮</Button>
```

### 文本按钮

```jsx
<ButtonText type="main">普通文本主按钮</ButtonText>
<ButtonText type="secondary">强反馈文本次按钮</ButtonText>
```

### 图标按钮

如果你的图标需要交互效果结束后，Icon 会变色，那么你需要这么写

```jsx
<ButtonIcon icon={<Icon />} iconClassName="my-icon">
  加载
</ButtonIcon>
```

当然也支持这么写

```jsx
<Button>
  <Icon icon={loading.svg} />
  加载
</Button>
```

### 组合按钮

```jsx
const Group = Button.ButtonGroup;

<Group size="large" shape="circle">
  <Button>Large</Button>
  <Button>Large</Button>
</Group>

<Group shape="circle">
  <Button>Default</Button>
  <Button>Default</Button>
</Group>
```

## API

请注意，样式规则为 : props style > disabled > ghost > antiWhite > color

### Button Props

| 参数      | 说明                           | 类型                              | 默认值 | 版本 |
| --------- | ------------------------------ | --------------------------------- | ------ | ---- |
| size      | 按钮大小                       | small \| middle \| large \| thumb | small  | -    |
| type      | 设置按钮类型                   | main \| secondary                 | main   | -    |
| color     | 按钮颜色，搭配 type 共同使用   | normal \| orange \| danger        | -      | -    |
| ghost     | 幽灵属性，使按钮背景透明       | boolean                           | false  | -    |
| antiWhite | 反白属性，适用于深色背景       | boolean                           | false  | -    |
| block     | 将按钮宽度调整为其父宽度的选项 | boolean                           | false  | -    |
| disabled  | 按钮失效状态                   | boolean                           | false  | -    |
| style     | 配置按钮的样式                 | object                            | -      | -    |
| onClick   | 点击按钮时的回调               | () => void                        | -      | -    |

### ButtonIcon Props

基于 `Button Props` 属性，再扩展以下三种属性

| 参数          | 说明                   | 类型          | 默认值 | 版本 |
| ------------- | ---------------------- | ------------- | ------ | ---- |
| icon          | 设置按钮的图标组件     | ReactNode     | -      | -    |
| place         | 设置图标组件的摆放位置 | left \| right | left   | -    |
| iconClassName | 自定义按钮的 className | string        | -      | -    |

### ButtonText Props

基于 `Button Props` 属性，这里需注意一点：文字按钮下的 type 不仅是用于按钮的类型，还用于文本说明的重要程度

```js
<ButtonText type="main">普通文本主按钮</ButtonText>
<ButtonText type="secondary">强反馈文本次按钮</ButtonText>
```

### ButtonGroup

| 参数     | 说明                                                           | 类型    | 默认值  | 版本 |
| -------- | -------------------------------------------------------------- | ------- | ------- | ---- |
| size     | 按钮组合大小，可选值为 large \| small \| default \| 或者不设置 | string  | default | -    |
| shape    | 按钮组合形状，可选值为 `circle` 或者不设置                     | string  | -       | -    |
| vertical | 是否纵向排列按钮组                                             | boolean | false   | -    |
