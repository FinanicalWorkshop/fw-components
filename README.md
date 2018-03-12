# Financial Workshop React components

### Usage

抽象出了公共组件, 方便其它项目使用.

#### 创建临时DOM节点
 
`createTemporaryDOMNode`

```javascript

    import { createTemporaryDOMNode } from 'fw-components'

    let id = '_this_is_a_global_element',
        node = createTemporaryDOMNode(id);

```

#### 警告弹出框

`showAlert`

```javascript

    import { showAlert } from 'fw-components'

    showAlert('Test').then(()=> {
        // until user click confirm button, go next step
    })
```

![showAlert](https://raw.githubusercontent.com/FinanicalWorkshop/fw-components/master/images/QQ20180111-103139.png)

#### 展示一个警告框
  
* showLoading

* hideLoading
  
* showToast

#### 弹出提示框(2s后自动隐藏)

`showToast`

```javascript

    import { showToast } from 'fw-components'

    showToast('Test').then(()=> {
        // until toast disappeared go next step
    })
   
```

![showToast](https://raw.githubusercontent.com/FinanicalWorkshop/fw-components/master/images/QQ20180111-103056.png)

#### 滑动组图

`BannerGroup`

```javascript

    import { BannerGroup } from 'fw-components'

    // jsx
    <BannerGroup images={[img1, img2, img3]}/>
   
```

![BannerGroup](https://raw.githubusercontent.com/FinanicalWorkshop/fw-components/master/images/QQ20180110-175832.png)

#### 选择省市县

`showAreaSelector`

```javascript

    import { showAreaSelector } from 'fw-components/react/area-selector'

    showAreaSelector(['北京', '北京市', '朝阳区'], false)
        .then(data => {
            console.log(...data) // => 辽宁省, 沈阳市, 皇姑区
        })
   
```

showAreaSelector(selected, autoComplete)

* selected : 已选择地区
* autoComplete : 是否在选择完最后一个地区后, 自动完成当前交互并返回结果

![showAreaSelector](https://raw.githubusercontent.com/FinanicalWorkshop/fw-components/master/images/QQ20180111-103201.png)
