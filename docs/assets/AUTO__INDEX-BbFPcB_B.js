import{e as d,o as i,g,w as o,d as n,r as c,_ as m,T as _,c as f,a as s,b as u}from"./main-jX54Ljut.js";const h={__name:"IncludeChild_1",setup(e){const a=d([{name:"left",value:100},{name:"right"}]);return(p,t)=>{const l=c("VcSplitPanel");return i(),g(l,{sizes:a.value},{left:o(()=>t[0]||(t[0]=[n("左")])),right:o(()=>t[1]||(t[1]=[n("右")])),_:1},8,["sizes"])}}},v={name:"splitPanel-auto-view",components:{IncludeChild_1:h},mounted(){this.setTOCData()},updated(){this.setTOCData()},methods:{setTOCData(){let e=[];this.$el.querySelectorAll(":scope > .vipress-heading").forEach(p=>e.push(p)),_.value=e}}},y={class:"vipress-article"};function C(e,a,p,t,l,x){const k=c("IncludeChild_1"),r=c("codeBox");return i(),f("article",y,[a[1]||(a[1]=s("h1",{id:"SplitPanel-分割面板",class:"vipress-heading"},"SplitPanel 分割面板",-1)),a[2]||(a[2]=s("h2",{id:"基础用法",class:"vipress-heading"},"基础用法",-1)),u(r,null,{child:o(()=>[u(k)]),default:o(()=>[a[0]||(a[0]=s("pre",{class:"language-vue"},[s("code",null,[s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"<"),n("template")]),s("span",{class:"token punctuation"},">")]),n(`
  `),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"<"),n("VcSplitPanel")]),n(),s("span",{class:"token attr-name"},":sizes"),s("span",{class:"token attr-value"},[s("span",{class:"token punctuation attr-equals"},"="),s("span",{class:"token punctuation"},'"'),n("sizes"),s("span",{class:"token punctuation"},'"')]),s("span",{class:"token punctuation"},">")]),n(`
    `),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"<"),n("template")]),n(),s("span",{class:"token attr-name"},"#left"),s("span",{class:"token punctuation"},">")]),n("左"),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"</"),n("template")]),s("span",{class:"token punctuation"},">")]),n(`
    `),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"<"),n("template")]),n(),s("span",{class:"token attr-name"},"#right"),s("span",{class:"token punctuation"},">")]),n("右"),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"</"),n("template")]),s("span",{class:"token punctuation"},">")]),n(`
  `),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"</"),n("VcSplitPanel")]),s("span",{class:"token punctuation"},">")]),n(`
`),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"</"),n("template")]),s("span",{class:"token punctuation"},">")]),n(`

`),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"<"),n("script")]),n(),s("span",{class:"token attr-name"},"setup"),s("span",{class:"token punctuation"},">")]),s("span",{class:"token script"},[s("span",{class:"token language-javascript"},[n(`
`),s("span",{class:"token keyword"},"import"),n(),s("span",{class:"token punctuation"},"{"),n(" ref "),s("span",{class:"token punctuation"},"}"),n(),s("span",{class:"token keyword"},"from"),n(),s("span",{class:"token string"},"'vue'"),n(`

`),s("span",{class:"token keyword"},"const"),n(" sizes "),s("span",{class:"token operator"},"="),n(),s("span",{class:"token function"},"ref"),s("span",{class:"token punctuation"},"("),s("span",{class:"token punctuation"},"["),n(`
  `),s("span",{class:"token punctuation"},"{"),n(`
    `),s("span",{class:"token literal-property property"},"name"),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string"},"'left'"),s("span",{class:"token punctuation"},","),n(`
    `),s("span",{class:"token literal-property property"},"value"),s("span",{class:"token operator"},":"),n(),s("span",{class:"token number"},"100"),n(`
  `),s("span",{class:"token punctuation"},"}"),s("span",{class:"token punctuation"},","),n(`
  `),s("span",{class:"token punctuation"},"{"),n(`
    `),s("span",{class:"token literal-property property"},"name"),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string"},"'right'"),n(`
  `),s("span",{class:"token punctuation"},"}"),n(`
`),s("span",{class:"token punctuation"},"]"),s("span",{class:"token punctuation"},")"),n(`
`)])]),s("span",{class:"token tag"},[s("span",{class:"token tag"},[s("span",{class:"token punctuation"},"</"),n("script")]),s("span",{class:"token punctuation"},">")])])],-1))]),_:1})])}const S=m(v,[["render",C]]);export{S as default};