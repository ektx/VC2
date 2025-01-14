import{_ as m,o as v,c as f,d as s,a as n,t as c,l as g,v as d,F as y,T as x,b as k,w as i,f as C,r}from"./main-jX54Ljut.js";const E={setup(){let e=ref("composition api demo"),t=reactive({name:"vc",count:0});watch(()=>e.value,a=>console.log("test:",a));function p(){t.count++}return{msg:e,state:t,clickEvt:p,click2Evt:w}}};function w(e){e.count++}function D(e,t,p,a,l,u){return v(),f(y,null,[t[4]||(t[4]=s(" 测试 ref: ")),n("span",null,c(a.msg),1),t[5]||(t[5]=s()),t[6]||(t[6]=n("br",null,null,-1)),g(n("input",{"onUpdate:modelValue":t[0]||(t[0]=o=>a.msg=o)},null,512),[[d,a.msg]]),t[7]||(t[7]=n("hr",null,null,-1)),t[8]||(t[8]=s(" 测试 reactive:")),t[9]||(t[9]=n("br",null,null,-1)),g(n("input",{"onUpdate:modelValue":t[1]||(t[1]=o=>a.state.name=o)},null,512),[[d,a.state.name]]),t[10]||(t[10]=n("h3",null,"事件",-1)),t[11]||(t[11]=n("hr",null,null,-1)),s(" 测试内部事件："+c(a.state.count)+" ",1),t[12]||(t[12]=n("br",null,null,-1)),n("button",{onClick:t[2]||(t[2]=(...o)=>a.clickEvt&&a.clickEvt(...o))},"Click Me"),t[13]||(t[13]=n("hr",null,null,-1)),s(" 测试外部事件："+c(a.state.count)+" ",1),t[14]||(t[14]=n("br",null,null,-1)),n("button",{onClick:t[3]||(t[3]=o=>a.click2Evt(a.state))},"Click Me"),t[15]||(t[15]=n("br",null,null,-1)),s(" "+c(a.state),1)],64)}const I=m(E,[["render",D]]),j={data(){return{msg:"options api demo",count:0}},mounted(){console.log("Optins Demo is ready")},methods:{clickEvt(){this.count++}}};function V(e,t,p,a,l,u){return v(),f(y,null,[s(" 测试: "+c(l.msg)+" ",1),t[2]||(t[2]=n("br",null,null,-1)),g(n("input",{"onUpdate:modelValue":t[0]||(t[0]=o=>l.msg=o)},null,512),[[d,l.msg]]),t[3]||(t[3]=n("h3",null,"事件",-1)),t[4]||(t[4]=n("hr",null,null,-1)),t[5]||(t[5]=s(" 测试内部事件 ")),t[6]||(t[6]=n("br",null,null,-1)),n("button",{onClick:t[1]||(t[1]=(...o)=>u.clickEvt&&u.clickEvt(...o))},"Click Me "+c(l.count),1)],64)}const P=m(j,[["render",V]]),q={name:"help-auto-view",components:{IncludeChild_1:I,IncludeChild_2:P},mounted(){this.setTOCData()},updated(){this.setTOCData()},methods:{setTOCData(){let e=[];this.$el.querySelectorAll(":scope > .vipress-heading").forEach(p=>e.push(p)),x.value=e}}},O={class:"vipress-article"};function T(e,t,p,a,l,u){const o=r("IncludeChild_1"),h=r("codeBox"),b=r("IncludeChild_2");return v(),f("article",O,[t[3]||(t[3]=n("h1",{id:"Demo功能演示",class:"vipress-heading"},"Demo功能演示",-1)),t[4]||(t[4]=n("h2",{id:"Composition-API-Demo",class:"vipress-heading"},"Composition API Demo",-1)),t[5]||(t[5]=n("p",null,"以下为组合式 api 组件的 demo 写法演示：",-1)),k(h,null,{child:i(()=>[k(o)]),default:i(()=>[t[0]||(t[0]=n("blockquote",null,[n("p",null,[s("默认 "),n("code",null,"ref"),s(),n("code",null,"reactive"),s(),n("code",null,"watch"),s(),n("code",null,"inject"),s(" 都已经注入，使用时，无需导入。"),n("br"),s(" 更多内容访问："),n("a",{href:"https://composition-api.vuejs.org/"},"Vue3 Composition API")])],-1)),t[1]||(t[1]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  测试 ref: `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("span")]),n("span",{class:"token punctuation"},">")]),n("span",null,"{{"),s(" msg }}"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("span")]),n("span",{class:"token punctuation"},">")]),s(),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("br")]),n("span",{class:"token punctuation"},"/>")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("input")]),s(),n("span",{class:"token attr-name"},"v-model"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("msg"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token punctuation"},"/>")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("hr")]),n("span",{class:"token punctuation"},"/>")]),s(`
  测试 reactive:`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("br")]),n("span",{class:"token punctuation"},"/>")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("input")]),s(),n("span",{class:"token attr-name"},"v-model"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("state.name"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s(`

  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("h3")]),n("span",{class:"token punctuation"},">")]),s("事件"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("h3")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("hr")]),n("span",{class:"token punctuation"},"/>")]),s(`
  测试内部事件：`),n("span",null,"{{"),s(" state.count}} "),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("br")]),n("span",{class:"token punctuation"},"/>")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("button")]),s(),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("clickEvt"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("Click Me"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("button")]),n("span",{class:"token punctuation"},">")]),s(`
  
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("hr")]),n("span",{class:"token punctuation"},"/>")]),s(`
  测试外部事件：`),n("span",null,"{{"),s(" state.count}} "),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("br")]),n("span",{class:"token punctuation"},"/>")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("button")]),s(),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("click2Evt(state)"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("Click Me"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("button")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("br")]),n("span",{class:"token punctuation"},"/>")]),s(`
  `),n("span",null,"{{"),s(` state }}
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"setup"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// 测试字符串绑定"),s(`
    `),n("span",{class:"token keyword"},"let"),s(" msg "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"ref"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'composition api demo'"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token comment"},"// 测试对象的绑定"),s(`
    `),n("span",{class:"token keyword"},"let"),s(" state "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"reactive"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'vc'"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"count"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"0"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token comment"},"// 测试 watch"),s(`
    `),n("span",{class:"token function"},"watch"),n("span",{class:"token punctuation"},"("),s(`
      `),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(" msg"),n("span",{class:"token punctuation"},"."),s("value"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token parameter"},"val"),s(),n("span",{class:"token operator"},"=>"),s(" console"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'test:'"),n("span",{class:"token punctuation"},","),s(" val"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},")"),s(`

    `),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"clickEvt"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      state`),n("span",{class:"token punctuation"},"."),s("count"),n("span",{class:"token operator"},"++"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      msg`),n("span",{class:"token punctuation"},","),s(`
      state`),n("span",{class:"token punctuation"},","),s(`

      clickEvt`),n("span",{class:"token punctuation"},","),s(`
      click2Evt`),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"click2Evt"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"state"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  state`),n("span",{class:"token punctuation"},"."),s("count"),n("span",{class:"token operator"},"++"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("style")]),s(),n("span",{class:"token attr-name"},"lang"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("less"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},"hideInCode"),n("span",{class:"token punctuation"},">")]),n("span",{class:"token style"},[n("span",{class:"token language-css"},[s(`
`),n("span",{class:"token selector"},".display-box"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},"line-height"),n("span",{class:"token punctuation"},":"),s(" 2"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token property"},"font-size"),n("span",{class:"token punctuation"},":"),s(" 14px"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token selector"},"hr"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},"margin"),n("span",{class:"token punctuation"},":"),s(" 10px 0"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token property"},"border"),n("span",{class:"token punctuation"},":"),s(" 1px solid #eee"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("style")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),t[6]||(t[6]=n("h2",{id:"Options-API-Demo",class:"vipress-heading"},"Options API Demo",-1)),t[7]||(t[7]=n("p",null,"以下是选项式 api 的组件 demo 写法演示：",-1)),k(h,null,{child:i(()=>[k(b)]),default:i(()=>[t[2]||(t[2]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  测试: `),n("span",null,"{{"),s(" msg }} "),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("br")]),n("span",{class:"token punctuation"},"/>")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("input")]),s(),n("span",{class:"token attr-name"},"v-model"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("msg"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token punctuation"},"/>")]),s(`

  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("h3")]),n("span",{class:"token punctuation"},">")]),s("事件"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("h3")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("hr")]),n("span",{class:"token punctuation"},"/>")]),s(`
  测试内部事件 `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("br")]),n("span",{class:"token punctuation"},"/>")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("button")]),s(),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("clickEvt"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("Click Me "),n("span",null,"{{"),s(" count }}"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("button")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"data"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"msg"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'options api demo'"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"count"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"0"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token function"},"mounted"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'Optins Demo is ready'"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"methods"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"clickEvt"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("count"),n("span",{class:"token operator"},"++"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),t[8]||(t[8]=C(`<h2 id="Poprs-格式示例" class="vipress-heading">Poprs 格式示例</h2><p><strong>代码：</strong></p><pre class="language-"><code>| 参数 | 类型 | 说明 | 默认值 | 可选值 |
|---|---|---|:---:|:---:|
| type | **string** | 定义按钮的外形 | - | &#39;&#39; |</code></pre><p><strong>效果：</strong></p><table><thead><tr><th>参数</th><th>类型</th><th>说明</th><th style="text-align:center;">默认值</th><th style="text-align:center;">可选值</th></tr></thead><tbody><tr><td>type</td><td><strong>string</strong></td><td>定义按钮的外形</td><td style="text-align:center;">-</td><td style="text-align:center;">&#39;&#39;</td></tr></tbody></table><h2 id="Events-格式示例" class="vipress-heading">Events 格式示例</h2><p><strong>代码：</strong></p><pre class="language-"><code>| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击事件 | - |</code></pre><p><strong>效果：</strong></p><table><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>click</td><td>点击事件</td><td>-</td></tr></tbody></table><h2 id="辅助功能" class="vipress-heading">辅助功能</h2><h3 id="创建组件" class="vipress-heading">创建组件</h3><pre class="language-bash"><code><span class="token comment"># 启动，然后按提示输入名称，如：colorPicker</span>
<span class="token function">yarn</span> run create</code></pre><p>自动创建以下内容</p><pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">---- VC2
</span><span class="token prefix unchanged"> </span><span class="token line">|-- doc
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">|  |-- colorPicker.md 创建示例文档
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">|-- example
</span><span class="token prefix unchanged"> </span><span class="token line">|  |-- src
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">|    |-- menu.js 更新菜单
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">|-- packages
</span><span class="token prefix unchanged"> </span><span class="token line">|  |-- components
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">|  | |-- colorPicker 创建组件相关目录
</span><span class="token prefix inserted">+</span><span class="token line">|  |   |-- index.vue
</span><span class="token prefix inserted">+</span><span class="token line">|  |-- index.js 更新
</span><span class="token prefix inserted">+</span><span class="token line">|  |-- layout.less 更新
</span></span></code></pre><h1 id="资料参考" class="vipress-heading">资料参考</h1><p><a href="http://v3.vuejs.org/">Vue3.js</a><br><a href="https://github.com/vuejs/vue-next">Vue-next</a><br><a href="https://github.com/vuejs/rfcs">rfc</a><br><a href="https://composition-api.vuejs.org/">composition api</a></p>`,17))])}const M=m(q,[["render",T]]);export{M as default};
