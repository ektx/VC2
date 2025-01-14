import{_ as d,o as k,g,r,T as y,c as v,a as t,b as u,w as i,f as m,d as n}from"./main-jX54Ljut.js";const b={data(){return{head:[{label:"名称",key:"label"},{label:"值",key:"value"}],list:[{label:"Wifi",value:1},{label:"iPhone USB",value:2},{label:"蓝牙",value:3}],value:1}},methods:{onChange(){alert("add")},onDelete(){alert("delete")}}};function f(e,s,o,h,a,p){const l=r("vc-operation-list");return k(),g(l,{modelValue:a.value,"onUpdate:modelValue":s[0]||(s[0]=c=>a.value=c),head:a.head,list:a.list,buttons:"",onAdd:p.onChange,onDelete:p.onDelete},null,8,["modelValue","head","list","onAdd","onDelete"])}const _=d(b,[["render",f]]),C={name:"operationList-auto-view",components:{IncludeChild_1:_},mounted(){this.setTOCData()},updated(){this.setTOCData()},methods:{setTOCData(){let e=[];this.$el.querySelectorAll(":scope > .vipress-heading").forEach(o=>e.push(o)),y.value=e}}},D={class:"vipress-article"};function B(e,s,o,h,a,p){const l=r("IncludeChild_1"),c=r("codeBox");return k(),v("article",D,[s[1]||(s[1]=t("h1",{id:"OperationList-操作列表",class:"vipress-heading"},"OperationList 操作列表",-1)),s[2]||(s[2]=t("h2",{id:"基础效果",class:"vipress-heading"},"基础效果",-1)),u(c,null,{child:i(()=>[u(l)]),default:i(()=>[s[0]||(s[0]=t("pre",{class:"language-vue"},[t("code",null,[t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"<"),n("template")]),t("span",{class:"token punctuation"},">")]),n(`
  `),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"<"),n("vc-operation-list")]),n(` 
    `),t("span",{class:"token attr-name"},"v-model"),t("span",{class:"token attr-value"},[t("span",{class:"token punctuation attr-equals"},"="),t("span",{class:"token punctuation"},'"'),n("value"),t("span",{class:"token punctuation"},'"')]),n(` 
    `),t("span",{class:"token attr-name"},":head"),t("span",{class:"token attr-value"},[t("span",{class:"token punctuation attr-equals"},"="),t("span",{class:"token punctuation"},'"'),n("head"),t("span",{class:"token punctuation"},'"')]),n(` 
    `),t("span",{class:"token attr-name"},":list"),t("span",{class:"token attr-value"},[t("span",{class:"token punctuation attr-equals"},"="),t("span",{class:"token punctuation"},'"'),n("list"),t("span",{class:"token punctuation"},'"')]),n(` 
    `),t("span",{class:"token attr-name"},"buttons"),n(`
    `),t("span",{class:"token attr-name"},"@add"),t("span",{class:"token attr-value"},[t("span",{class:"token punctuation attr-equals"},"="),t("span",{class:"token punctuation"},'"'),n("onChange"),t("span",{class:"token punctuation"},'"')]),n(`
    `),t("span",{class:"token attr-name"},"@delete"),t("span",{class:"token attr-value"},[t("span",{class:"token punctuation attr-equals"},"="),t("span",{class:"token punctuation"},'"'),n("onDelete"),t("span",{class:"token punctuation"},'"')]),n(`
  `),t("span",{class:"token punctuation"},"/>")]),n(`
`),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"</"),n("template")]),t("span",{class:"token punctuation"},">")]),n(`

`),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"<"),n("script")]),t("span",{class:"token punctuation"},">")]),t("span",{class:"token script"},[t("span",{class:"token language-javascript"},[n(`
`),t("span",{class:"token keyword"},"export"),n(),t("span",{class:"token keyword"},"default"),n(),t("span",{class:"token punctuation"},"{"),n(`
  `),t("span",{class:"token function"},"data"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},")"),n(),t("span",{class:"token punctuation"},"{"),n(`
    `),t("span",{class:"token keyword"},"return"),n(),t("span",{class:"token punctuation"},"{"),n(`
      `),t("span",{class:"token literal-property property"},"head"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token punctuation"},"["),n(`
        `),t("span",{class:"token punctuation"},"{"),n(`
          `),t("span",{class:"token literal-property property"},"label"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token string"},"'名称'"),t("span",{class:"token punctuation"},","),n(`
          `),t("span",{class:"token literal-property property"},"key"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token string"},"'label'"),n(`
        `),t("span",{class:"token punctuation"},"}"),t("span",{class:"token punctuation"},","),n(`
        `),t("span",{class:"token punctuation"},"{"),n(`
          `),t("span",{class:"token literal-property property"},"label"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token string"},"'值'"),t("span",{class:"token punctuation"},","),n(`
          `),t("span",{class:"token literal-property property"},"key"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token string"},"'value'"),n(`
        `),t("span",{class:"token punctuation"},"}"),n(`
      `),t("span",{class:"token punctuation"},"]"),t("span",{class:"token punctuation"},","),n(`
      `),t("span",{class:"token literal-property property"},"list"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token punctuation"},"["),n(`
        `),t("span",{class:"token punctuation"},"{"),n(`
          `),t("span",{class:"token literal-property property"},"label"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token string"},"'Wifi'"),t("span",{class:"token punctuation"},","),n(`
          `),t("span",{class:"token literal-property property"},"value"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token number"},"1"),n(`
        `),t("span",{class:"token punctuation"},"}"),t("span",{class:"token punctuation"},","),n(`
        `),t("span",{class:"token punctuation"},"{"),n(`
          `),t("span",{class:"token literal-property property"},"label"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token string"},"'iPhone USB'"),t("span",{class:"token punctuation"},","),n(`
          `),t("span",{class:"token literal-property property"},"value"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token number"},"2"),n(`
        `),t("span",{class:"token punctuation"},"}"),t("span",{class:"token punctuation"},","),n(`
        `),t("span",{class:"token punctuation"},"{"),n(`
          `),t("span",{class:"token literal-property property"},"label"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token string"},"'蓝牙'"),t("span",{class:"token punctuation"},","),n(`
          `),t("span",{class:"token literal-property property"},"value"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token number"},"3"),n(`
        `),t("span",{class:"token punctuation"},"}"),n(`
      `),t("span",{class:"token punctuation"},"]"),t("span",{class:"token punctuation"},","),n(`
      `),t("span",{class:"token literal-property property"},"value"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token number"},"1"),n(`
    `),t("span",{class:"token punctuation"},"}"),n(`
  `),t("span",{class:"token punctuation"},"}"),t("span",{class:"token punctuation"},","),n(`
  `),t("span",{class:"token literal-property property"},"methods"),t("span",{class:"token operator"},":"),n(),t("span",{class:"token punctuation"},"{"),n(`
    `),t("span",{class:"token function"},"onChange"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},")"),n(),t("span",{class:"token punctuation"},"{"),n(`
      `),t("span",{class:"token function"},"alert"),t("span",{class:"token punctuation"},"("),t("span",{class:"token string"},"'add'"),t("span",{class:"token punctuation"},")"),n(`
    `),t("span",{class:"token punctuation"},"}"),t("span",{class:"token punctuation"},","),n(`
    `),t("span",{class:"token function"},"onDelete"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},")"),n(),t("span",{class:"token punctuation"},"{"),n(`
      `),t("span",{class:"token function"},"alert"),t("span",{class:"token punctuation"},"("),t("span",{class:"token string"},"'delete'"),t("span",{class:"token punctuation"},")"),n(`
    `),t("span",{class:"token punctuation"},"}"),n(`
  `),t("span",{class:"token punctuation"},"}"),n(`
`),t("span",{class:"token punctuation"},"}"),n(`
`)])]),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"</"),n("script")]),t("span",{class:"token punctuation"},">")])])],-1))]),_:1}),s[3]||(s[3]=m('<h2 id="Poprs" class="vipress-heading">Poprs</h2><table><thead><tr><th>参数</th><th>类型</th><th>说明</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>v-model</td><td><strong>Number / String</strong></td><td>值</td><td>-</td><td></td></tr><tr><td>head</td><td><strong>Array</strong></td><td>表头</td><td>-</td><td></td></tr><tr><td>list</td><td><strong>Array</strong></td><td>列表</td><td>-</td><td></td></tr><tr><td>labelAlias</td><td><strong>String</strong></td><td>label 别名</td><td>-</td><td>label</td></tr><tr><td>keyAlias</td><td><strong>String</strong></td><td>key 别名</td><td>-</td><td>key</td></tr><tr><td>buttons</td><td><strong>Boolean</strong></td><td>key 别名</td><td>-</td><td>false</td></tr><tr><td>height</td><td><strong>Boolean</strong></td><td>设置高度</td><td>-</td><td>auto</td></tr></tbody></table><h2 id="Events" class="vipress-heading">Events</h2><table><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>add</td><td>添加按钮事件</td><td>-</td></tr><tr><td>delete</td><td>删除按钮事件</td><td>-</td></tr></tbody></table>',4))])}const A=d(C,[["render",B]]);export{A as default};
