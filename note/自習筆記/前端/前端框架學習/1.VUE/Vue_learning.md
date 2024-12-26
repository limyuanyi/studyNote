# D1

容器與Vue實例只能一對一

* 插值語法 {{xxx}}，xxx是js表達式，

## 數據綁定
* v-bind: ，綁定屬性，可簡寫成:
<a :src="xxx"></a>, xxx同樣是xxx表達式

* v-model:value=" " 可簡寫為 v-model=" " 作用與v-bind功能相同，但只能應用在表單類元素(輸入)

Vue的兩種綁定方式
* 單向綁定(v-bind)
* 雙向綁定(v-model)

可讀取data内的數據
new Vue({
    el:"#root",
    data:{
        name:'abc',
        school:{
            name:'ss',
            id:'as'
        }
    }
})

el的兩種寫法
1. 直接寫在Vue實例内，定義el:
2. v.$mount("") - 指定容器

data的兩種寫法
1. 直接寫在Vue實例内 data:{ }
2. 函數式 data:function(){ return{ } }，Vue管理的函數，不能寫成箭頭函數

MVVM模型（Model-view-viewmodel）
- M：模型：對應data中的數據
- V：視窗：模板
- VM：視圖模型：Vue實例對象 （數據的監聽綁定）

## 數據代理
let person={
    name:'yuanyi',
    school:'foonyew'
}

* ES6 - 添加數據
(對象，内容，數據對象) ，畫面顯示(...)
Object.defineproperty(person,'age',{
    方法1
    <!-- value:18,
    enumerable:true,//可枚舉
    writable:true,//可修改
    configurable:true,//可被刪除 -->
    方法2 
    <!-- get(){
        return 'hello'
    },
    set(value){
    }-->
})

## 事件處理

* v-on:click="xxx",簡寫為@click="xxx"，xxx為method方法
* @click="demo" 和 @click="demo($event)" 效果一致，但後者可傳參
new Vue({
    method:{
        <!-- 畫面顯示f() -->
        <!-- 配方法(不能使用箭頭函數，因爲this指向會發生變化) -->
    }
})

* 事件修飾符
1. prevent:阻止默認事件
2. stop:阻止事件冒泡
3. once:事件只觸發一次
4. capture：事件的捕獲模式
5. self:只有event.target是自己時后才會觸發事件，冒泡上來的不觸發
6. passive:事件的默認行爲立即觸發，無需等待 
(範例:延遲觸發后再觸發默認事件 to 會立即觸發默認事件）
- 可鏈式書寫(有順序) .prevent.stop(先阻止默認再停止)

* 鍵盤事件
placeholder @keydown/@keyup

Vue常用按鍵別名：
1. 回車 => enter
2. 刪除 => delete(捕獲“刪除”和“退格”鍵)
3. 退出 => esc
4. 空格 => space
5. 換行 => tab （只適合在keydown）
6. 上下左右 => up down left right

Vue未提供別名的案件:
- 可根據event.key找(Alt => alt , CapsLock =>caps-lock)

特殊符號 : ctrl,alt,shift,meta(win)
1. 配合keyup使用：按下修飾鍵的同時，再按下其他鍵，隨後釋放其他鍵，事件才能觸發
2. 配合keydown使用：正常觸發事件

不推薦event.keyCode使用,有些web已經停用了

可自定義修飾符
Vue.config.keyCodes.huiche = 13 //自定義enter鍵

可鏈式書寫（多個鍵按了才觸發）
@keyup.ctrl.y.x

## 計算屬性與監視
Q1 爲什麽不使用插值語法:
假設需求越多，語法表達式會越來越複雜

Q1 爲什麽不使用method：
只要data一發生改變，vue就會重新解析模板，method就會被重新調用(多次調用)

* 計算屬性
computed:{
    xxx:{
        get(){
            <!-- 此處的this指向vm -->
            <!-- get什麽時間調用？1.初次讀取數據，2.所依賴的數據發生變化 -->
            return this.xxx + this.xxx
        }
        set(value){
            <!-- set什麽時候調用？1.黨xxx被修改的時候 2.不是一定要寫 -->
            <!-- 對data内的數據進行修改 -->
            this.xxx = 
            this.xxx =
        }
    }
}
要用的屬性不存在，可拿著已存在的屬性去進行加工/計算,然後把内容存在新的屬性内並進行緩存。

黨只考慮get,不考慮set的時候才能用簡寫方式
簡寫：xxx(){ return this.xxx + this.xxx } => xxx.get( return )

* 監視屬性 - 默認只看一層
watch:{
    xxx:{
        <!-- 初始化時讓handler調用一下 -->
        immediate:true,
        <!-- handler什麽時候調用？ xxx發生變化時， xxx為已存在的屬性 -->
        handler(newValue,oldValue){
        }
    <!-- 深度監視 -->
    'xxx.a':{ }
    }
    <!-- 監視多級結構中所有的變化 -->
    xxx:{
        deep:true,
    }
}

也可以寫成vm.$watch('xxx',{ })

黨配置項不需要寫immediate和deep，就可以簡寫
xxx:{handler(){}} => xxx(){}

computed和watch的區別：
- computed能完成的功能，watch也能完成
- watch可以進行異步工作，computed不行

原則:
- 所有被vue管理的函數，最好寫成普通函數
- 所有不被vue管理的函數（例如定時器，ajax），最好寫成箭頭函數
這樣this指向才是vm或組件實例對象

## 綁定樣式
綁定class樣式 -- 字符串寫法。適用于：樣式的類名不確定，需要動態指定
<div class='normal' :class="type" @click='changeMood'>{{}}</div>

綁定class樣式 -- 數組寫法。適用于：要綁定的樣式個數不確定，名字不確定
<div class='normal' :class="classArr">{{}}</div>

綁定class樣式 -- 對象寫法。適用于：要綁定的樣式個數確定，名字確定，但要動態決定用不用
<div class='normal' :class="classObj">{{}}</div>

Vue({
    data:{
        type:"normal",
        classArr:["s1","s2","s3"],
        classObj:{
            s1:false,
            s2:false
        }
    }
})

## 條件渲染
v-show 顯示/隱藏
-不展示DOM元素未被移除，只是style隱藏掉
-不能與<template>結合使用

v-if 條件渲染
v-else-if
v-else
-注意 可以結合使用，但是中間不能被打斷
-不展示DOM時，移除元素
-可以與<template>結合使用，格式不會被改掉

## 列表渲染

* 基本列表
<v-for="(value,index) of xxx"  :key=" ">

key有什麽作用？(key的内部原理)

1. 虛擬DOM中key的作用：
    key是由虛擬DOM對象的標識，黨狀態中的數據發生變化時，Vue會根據[新數據]生成[新的虛擬DOM]，隨後Vue進行[新虛擬DOM]與[舊虛擬DOM]的差異比較，比較規則如下：

2. 對比規則:
    (1).舊虛擬DOM中找到了與新虛擬DOM相同的key:
        若虛擬DOM中内容沒變，直接使用之前的真實DOM
        若虛擬DOM中内容變了，則生成新的真實DOM，隨後替換掉頁面中之前的真實DOM.

    (2).舊虛擬DOM中未找到與新虛擬DOM相同的key
        創建新的真實DOM，隨後渲染到頁面

3. 用index作爲key可能會引發的問題：
    (1).若對數據進行：逆序添加，逆序刪除等破壞順序操作：
        會產生沒有必要的真實DOM更新 ==> 界面效果沒問題，但效率低
    
    (2).如果結構中海包含輸入類的DOM：
        會產生錯誤DOM更新 ==> 界面有問題.

4. 開發中如何選擇key?:
    (1).最好使用每條數據的唯一標識作爲key,比如id,手機號，身份證號，學號等 唯一值。
    (2).如果不存在對數據的逆序增加，逆序刪除等破壞順序操作，僅用於渲染列表用於展示，使用index作爲key是沒有問題的。

* 後期添加響應式的屬性
Vue.set(target,key,val)
vm.$set(target,key,val)

只能往data裏的某一個對象追加屬性，不能給data加屬性
data:{
    這裏不可以,
    student:[這裏可以]
}

Vue監視數據原理:
    1.vue 會監視data中所有層次的數據。
    2.如何監測對象中的數據？
        通過setter實現監視，且要在new Vue時就傳入要監測的數據。
        (1).對象中后追加的屬性，Vue默認不做響應式處理
        (2).如需給后添加的屬性做響應式，請使用如下API：
                Vue.set(target, propertyName/index, value)
                vm.$set(target, propertyName/index, value)

    3.如何監測數組中的數據？
        通過包裹數組更新元素的方法實現，本質就是做了兩件事:
        (1).調用原生對應的方法對數組進行更新。
        (2).重新解析模板，進而更新頁面

    4.在Vue修改數組中的某個元素一定要用如下方法：
        (1).使用這些API:push,pop,shift,unshift,splice,sort,reverse
        (2).Vue.set()或vm.$set()
        (3).或者直接以新數組替換舊數組

    特別注意:vue.set() 和vm.$set()不能給vm 或 vm的根數據對象 添加屬性！！！

## 收集表單數據
若：<input type='text'/>,則v-model收集的是value值，用戶輸入的就是value值
若：<input type='radio'/>,則v-model收集的是value值，且要給標簽配置value值
若：<input type='checkbox'/>
    1.沒有配置input的value屬性，那麽收集的就是checked（勾選or未勾選，是布爾值）
    2.配置input的value屬性：
        (1)v-model的初始值是非數組，那麽收集的就是checked(勾選or未勾選，是布爾值)
        (2)v-model的初始值是數組，那麽收集的就是value組成的數組
備注:v-model的三個修飾符:
        lazy:失去焦點再收集數據
        number:輸入字符串轉爲有效的數字
        trim:輸入首尾空格過濾

## 過濾器
定義：對要顯示的數據進行特定格式化后再顯示（適用與一些簡單邏輯的處理）。
語法：
    1.注冊過濾器:Vue.filter(name,callback) 或 new Vue(filters:{})
    2.使用過濾器：{{xxx | 過濾器名}} 或 v-bind：屬性 = "xxx | 過濾器名"
備注：
    1.過濾器也可以接受額外參數，多個過濾器也可以串聯
    2.並沒有改變原本的數據，是產生新的對應的數據

## 總結目前爲止的指令：
    v-bind：單向綁定解析表達式，可簡寫為：xxx
    v-model：雙向數據綁定
    v-for：遍歷數組/對象/字符串
    v-on：綁定事件監聽,可簡寫為@
    v-if：條件渲染（動態控制節點是否存存在）
    v-else：條件渲染（動態控制節點是否存存在）
    v-show：條件渲染（動態控制節點是否展示）
    v-text = "name"
        1.作用：向其所在的節點中渲染文本内容
        2.與插值語法的區別：v=text會替換掉節點中的内容，{{xx}}則不會。
    v-html指令：
        1.作用：向指定節點中渲染包含html結構的内容。
        2.與插值語法的區別：
            (1).v-html會替換掉節點中所有的内容.{{xx}}則不會。
            (2).v-html可以識別html結構。
        3.嚴重注意：v-html有安全性問題！！！！
            (1).在網站上動態渲染任意HTML是非常危險的，容易導致XSS攻擊。
            (2).一定要在可信的内容上使用v-html,用不要用在用戶提交的内容上!
    v-cloak指令(沒有值):
        1.本質是一個特殊屬性，Vue實例創建完畢並接管容器后，會刪除v-cloak屬性。
        2.使用css配合v-cloak可以解決網速慢時展示頁面出{{xxx}}的問題。
    v-once指令(沒有值):
        1.v-once所在節點在初次動態渲染后，就視爲靜態内容了。
        2.以後數據的改變不會引起v-once所在結構的更新，可以用於優化性能。
    v-pre指令(沒有值):
        1.跳過其所在節點的編譯過程。
        2.可利用它跳過:沒有使用指令語法，沒有使用插值語法的節點，會加快編譯。

## 自定義指令
//定義全局指令
Vue.directive('',{})

一，定義語法：
    (1).局部指令:
        new Vue({                               new Vue({
            directives:{指令名:配置對象} 或             directives(){}
        })                                      })
    (2).全局指令:
        - Vue.directive(指令名，配置對象)
        - Vue.directive(指令名，回調函數)

二，配置對象中常用的3個回調:
    (1).bind:指令與元素成功綁定時調用
    (2).inserted:指令所在元素被插入頁面時調用。
    (3).update:指令所在模板結構被重新解構時調用。

三，備注:
    (1).指令定義時不加v-，但使用時要加v-:
    (2).指令名如果是多個單詞，要使用kebab-case命名防守，不要用camelCase命名。

## 生命周期
1.又名:生命周期回調函數，生命周期函數，生命周期鈎子
2.是什麽:Vue在關鍵時刻幫我們調用的一些特殊名稱的函數
3.生命周期函數的名字不可更改，但函數的具體内容是程序員根據需求編寫的
4.生命周期函數中的this指向是vm 或 組件實例對象

beforeCreate
Created
beforeMount
mounted         [挂載，初始化]
beforeUpdate
Updated
BeforeDestroy   [收尾]
destroyed

常用的生命周期鈎子:
    1.mounted:發送Ajax請求，啓動定時器，綁定自定義事件，訂閲消息等[初始化工作]
    2.beforeDestroy:清除定時器，解除自定義事件，取消訂閲消息等[收尾工作]

關於銷毀Vue實例:
    1.銷毀后藉助Vue開發者工具看不到任何消息
    2.銷毀后自定義事件會失效，但原生DOM事件依然有效
    3.一般不會在beforeDestroy操作數據，因爲即便操作數據，也不會再觸發更新流程了

## Vue組件化編程

### 非單文件組件
Vue中使用組件的三大步驟:
    一，定義組件(創建組件)
    二，注冊組件
    三，使用組件(寫組件標簽)

一，如何定義一個組件?
    使用Vue.extend(option)創建，其中options和new Vue(ooptions)時傳入的那個options幾乎一樣，但區別如下:
        1.el不要寫，爲什麽？————最終所有的組件都要經過一個vm的管理，由vm中的el決定服務那個容器
        2.data必須寫成函數，爲什麽？————避免組件被複用，數據存在引用關係。
    備注：使用template可以配置組件結構。

二，如何注冊組件?
    1.局部注冊：靠new Vue的時候傳入components選項
    2.全局注冊：靠Vue.component('組件名'，組件)

三，編寫組件標簽:
    <school></school>

幾個注意點:
1.關於組件名：
    一個單詞組成:
        第一種寫法(首字母小寫):school
        第二種寫法(首字母大寫):School
    多個單詞組成:
        第一種寫法(kebab-case命名)：my-school
        第二種寫法(CameelCase命名)：MySchool(需要Vue脚手架支持)
    備注：
        (1).組件名盡可能回避HTML中已有的元素名稱，例如：h2,H2都不行
        (2).可以使用name配置項指定組件在開發者工具呈現的名字

2.關於組件標簽：
    第一種寫法：<school></sschool>
    第二種寫法：</school>
    備注：不用使用脚手架時，<school/>會導致後續組件不能渲染

3.一個簡寫方式：
    const school = Vue.extend(options)可簡寫為：const school = options

組件的嵌套式

關於VueComponent：
    1.school組件本質是一個名爲VueComponent的構造函數，並不是程序員定義的，是Vue.extend生成的。

    2.我們只需要寫<school/>或<school></school>，Vue解析時會幫我們創建school組件的實例對象，即Vue幫我們執行的：new VueComponent(options)

    3.特別注意：每次調用Vue.extend,返回的都是一個全新的VueComponent!!!!

    4.關於this指向：
        (1).組件配置中：
            data函數，methods中的函數，watch中的函數，computed中的函數 它們的this均是[VueComponent]
        (2).new Vue()配置中：
            data函數，methods中的函數，watch中的函數，computed中的函數均是[VueComponent]

    5.VueComponent的實例對象，以後簡稱vc(也可稱爲：組件實例對象)
      Vue的實例對象，以後簡稱vm


内置關係
    1.一個重要的内置關係：VueComponent.prototype.__proto__ === Vue.prototype
    2.爲什麽要有這個關係：讓組件實例對象（vc）可以訪問到Vue原型上的屬性，方法。

### 單文件組件
