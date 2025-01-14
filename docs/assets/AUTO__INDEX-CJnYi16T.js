import{_ as y,o as g,g as m,r as c,w as p,b as u,d as s,a as n,t as v,l as I,v as S,s as j,T as D,c as T,f as O}from"./main-jX54Ljut.js";const P={data(){return{header:[{label:"姓名",key:"name",width:100},{label:"时间",key:"date",width:100},{label:"地址",key:"address"}],data:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}]}}};function B(t,a,k,d,o,e){const l=c("vc-table");return g(),m(l,{data:o.data,header:o.header},null,8,["data","header"])}const E=y(P,[["render",B]]),N={data(){return{header:[{label:"姓名",key:"name",width:"100px"},{label:"时间",key:"date",width:"100px"},{label:"地址",key:"address"}],data:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}]}}};function V(t,a,k,d,o,e){const l=c("vc-table");return g(),m(l,{data:o.data,header:o.header,border:""},null,8,["data","header"])}const z=y(N,[["render",V]]),A={data(){return{nameList:["秦一世","秦二世","秦三世","秦四世"],data:[{date:"2020-9-14",name:0,address:"上海市普陀区金沙江路 1518 弄"},{date:"2020-9-15",name:1,address:"上海市普陀区金沙江路 1517 弄"},{date:"2020-9-16",name:2,address:"上海市普陀区金沙江路 1519 弄"},{date:"2020-9-17",name:3,address:"上海市普陀区金沙江路 1516 弄"}]}},computed:{header(){return[{label:"姓名",key:t=>this.nameList[t.name],width:100},{label:"时间",key:"date",width:100},{label:"地址",key:"address"}]}}};function U(t,a,k,d,o,e){const l=c("vc-table");return g(),m(l,{data:o.data,header:e.header},null,8,["data","header"])}const L=y(A,[["render",U]]),F={data(){return{header:[{label:"姓名",key:"name",width:"300px"},{label:"时间",key:"date",width:"300px"},{label:"地址",key:"address",width:"400px"}],data:[],index:1}},methods:{showDetail(t,a){console.log(t,a),t.name="zwl"},add(){for(let t=0;t<1e3;t++)this.data.push({date:`${2020+t}-09-09`,name:`秦${t}世`,address:`上海市普陀区金沙江路 ${1518+t} 弄`})}}};function M(t,a,k,d,o,e){const l=c("vc-button"),r=c("vc-table");return g(),m(r,{header:o.header,data:o.data,pageIndex:o.index,"onUpdate:pageIndex":a[0]||(a[0]=i=>o.index=i),"page-total":o.data.length,height:"400px",border:""},{empty:p(()=>[u(l,{onClick:e.add},{default:p(()=>a[1]||(a[1]=[s("添加 1000 条数据")])),_:1},8,["onClick"])]),_:1},8,["header","data","pageIndex","page-total"])}const X=y(F,[["render",M]]),G={data(){return{header:[{label:"姓名",key:"name",width:"180px"},{label:"时间",key:"date",width:"180px"},{label:"地址",key:"address"}],data:[],index:1,total:0,loading:!1}},methods:{showDetail(t,a){console.log(t,a),t.name="zwl"},pageChange(t){this.data=[],this.loading="加载中...",setTimeout(()=>{debugger;this.loading=!1,t===1&&(this.total=1e3);let a=(t-1)*10,k=a+10;for(;a<k;a++)this.data.push({date:`${2020+a}-09-09`,name:`秦${a+1}世`,address:`上海市普陀区金沙江路 ${1518+a} 弄`})},1e3)}}};function H(t,a,k,d,o,e){const l=c("vc-button"),r=c("vc-table");return g(),m(r,{asyncData:"",height:"400px",header:o.header,data:o.data,loading:o.loading,pageIndex:o.index,"onUpdate:pageIndex":a[1]||(a[1]=i=>o.index=i),"page-total":o.total,onPageChange:e.pageChange},{empty:p(()=>[a[3]||(a[3]=n("p",null,"没有数据",-1)),u(l,{onClick:a[0]||(a[0]=i=>e.pageChange(1))},{default:p(()=>a[2]||(a[2]=[s("添加数据")])),_:1})]),_:1},8,["header","data","loading","pageIndex","page-total","onPageChange"])}const J=y(G,[["render",H]]),K={data(){return{header:[{label:"姓名",key:"name",width:100},{label:"时间",key:"date",width:100},{label:"地址",key:"address"},{label:"设置",slot:"setting",width:100}]}}};function Q(t,a,k,d,o,e){const l=c("vc-table");return g(),m(l,{height:"200px",header:o.header,data:[],loading:""},null,8,["header"])}const R=y(K,[["render",Q]]),W={data(){return{header:[{label:"姓名",key:"name",width:100},{label:"时间",key:"date",width:100},{label:"地址",key:"address"}],data:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄",classes:"warning"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄",classes:"success"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄",classes:"error"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}],index:1}}};function Y(t,a,k,d,o,e){const l=c("vc-button"),r=c("vc-table");return g(),m(r,{header:o.header,data:o.data,index:o.index,total:o.data.length},{setting:p(({item:i,index:h})=>[u(l,{onClick:b=>t.showDetail(i,h)},{default:p(()=>a[0]||(a[0]=[s("详情")])),_:2},1032,["onClick"])]),_:1},8,["header","data","index","total"])}const Z=y(W,[["render",Y]]),nn={data(){return{header:[{label:"姓名",key:"name",slot:"name",width:100},{label:"时间",key:"date",slot:"date",width:180},{label:"地址",key:"address",slot:"address"}],data:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}]}}},sn=["onUpdate:modelValue"];function an(t,a,k,d,o,e){const l=c("vc-button"),r=c("vc-table");return g(),m(r,{header:o.header,data:o.data,total:o.data.length},{name:p(({item:i,index:h})=>[s(v(h+1)+".",1),u(l,null,{default:p(()=>[s(v(i.name),1)]),_:2},1024)]),date:p(({item:i,index:h})=>[a[0]||(a[0]=n("i",{class:"vc-icon-time"},null,-1)),s(v(i.date),1)]),address:p(({item:i,index:h})=>[I(n("input",{"onUpdate:modelValue":b=>i.address=b},null,8,sn),[[S,i.address]])]),_:1},8,["header","data","total"])}const tn=y(nn,[["render",an]]),on={data(){return{header:[{label:"ID",key:"id",width:100},{label:"姓名",key:"name",width:100},{label:"数值1",key:"amount1",width:100},{label:"数值2",key:"amount2",width:100},{label:"数值3",key:"amount3"}],data:[{id:"0x0001",name:"王小虎",amount1:"234",amount2:"3.2",amount3:10},{id:"0x0001",name:"王小虎",amount1:"165",amount2:"4.43",amount3:10},{id:"0x0001",name:"王小军",amount1:"324",amount2:"1.9",amount3:9},{id:"0x0001",name:"王小虎",amount1:"324",amount2:"1.9",amount3:9},{id:"0x0002",name:"王小军",amount1:"539",amount2:"4.1",amount3:15},{id:"0x0002",name:"王小虎",amount1:"621",amount2:"2.2",amount3:17},{id:"0x0002",name:"王小虎",amount1:"621",amount2:"2.1",amount3:18},{id:"0x0003",name:"王小虎",amount1:"621",amount2:"2.2",amount3:17}]}},computed:{style(){let t={};return this.data.forEach((a,k,d)=>{this.header.forEach((o,e,l)=>{let r=a[o.key];if(r in t){let i=t[r].slice(-1)[0];if(e>0&&k>0){let h=d[k-1][l[e].key],b=d[k][l[e-1].key];r===h?t[b].slice(-1)[0].row>1?(k>i.y&&(i.row+=1),e>i.x&&(i.col+=1)):t[r].push({x:e,y:k,row:1,col:1}):t[r].push({x:e,y:k,row:1,col:1})}else k>i.y&&(i.row+=1),e>i.x&&(i.col+=1)}else t[r]=[{x:e,y:k,row:1,col:1}]})}),{mergeSpan:Object.values(t).flat().filter(a=>a.row>1||a.col>1)}}}};function pn(t,a,k,d,o,e){const l=c("vc-table");return g(),m(l,{data:o.data,header:o.header,border:"",style:j(e.style)},null,8,["data","header","style"])}const en=y(on,[["render",pn]]),cn={data(){return{header:[{label:"姓名",key:"name",width:100},{label:"时间",key:"date"},{label:"地址",key:"address"}],data:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}]}},methods:{change(t){console.log(t)}}};function ln(t,a,k,d,o,e){const l=c("vc-table");return g(),m(l,{data:o.data,header:o.header,"show-select-column":"radio","highlight-selected-row":"",onSelectChange:e.change},null,8,["data","header","onSelectChange"])}const rn=y(cn,[["render",ln]]),un={data(){return{header:[{label:"姓名",key:"name",width:100},{label:"时间",key:"date"},{label:"地址",key:"address"}],data:[{date:"2016-05-02",name:"王小虎",checked:!0,address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}]}},methods:{change(t){console.log(t)}}};function kn(t,a,k,d,o,e){const l=c("vc-table");return g(),m(l,{data:o.data,header:o.header,"show-select-column":"checkbox","highlight-selected-row":"",onSelectChange:e.change},null,8,["data","header","onSelectChange"])}const dn=y(un,[["render",kn]]),yn={name:"table-auto-view",components:{IncludeChild_1:E,IncludeChild_2:z,IncludeChild_3:L,IncludeChild_4:X,IncludeChild_5:J,IncludeChild_6:R,IncludeChild_7:Z,IncludeChild_8:tn,IncludeChild_9:en,IncludeChild_10:rn,IncludeChild_11:dn},mounted(){this.setTOCData()},updated(){this.setTOCData()},methods:{setTOCData(){let t=[];this.$el.querySelectorAll(":scope > .vipress-heading").forEach(k=>t.push(k)),D.value=t}}},gn={class:"vipress-article"};function mn(t,a,k,d,o,e){const l=c("IncludeChild_1"),r=c("codeBox"),i=c("IncludeChild_2"),h=c("IncludeChild_3"),b=c("IncludeChild_4"),w=c("IncludeChild_5"),f=c("IncludeChild_6"),x=c("IncludeChild_7"),_=c("IncludeChild_8"),C=c("IncludeChild_9"),q=c("IncludeChild_10"),$=c("IncludeChild_11");return g(),T("article",gn,[a[14]||(a[14]=n("h1",{id:"Table-表格",class:"vipress-heading"},"Table 表格",-1)),a[15]||(a[15]=n("p",null,"用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。",-1)),a[16]||(a[16]=n("h2",{id:"基础表格",class:"vipress-heading"},"基础表格",-1)),a[17]||(a[17]=n("p",null,"基础的表格展示用法。",-1)),u(r,null,{child:p(()=>[u(l)]),default:p(()=>[a[0]||(a[0]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-table")]),s(),n("span",{class:"token attr-name"},":data"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":header"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("header"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},"/>")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"data"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"header"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'姓名'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'name'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'时间'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'date'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'地址'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'address'"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"data"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-02"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1518 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-04"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1517 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-01"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1519 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-03"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1516 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"]"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),a[18]||(a[18]=n("h2",{id:"带边框表格",class:"vipress-heading"},"带边框表格",-1)),u(r,null,{child:p(()=>[u(i)]),default:p(()=>[a[1]||(a[1]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-table")]),s(),n("span",{class:"token attr-name"},":data"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":header"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("header"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},"border"),n("span",{class:"token punctuation"},"/>")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"data"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"header"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'姓名'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'name'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'100px'"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'时间'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'date'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'100px'"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'地址'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'address'"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"data"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-02"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1518 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-04"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1517 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-01"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1519 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-03"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1516 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"]"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),a[19]||(a[19]=n("h2",{id:"函数式表头",class:"vipress-heading"},"函数式表头",-1)),a[20]||(a[20]=n("p",null,"通过函数方法来指定列有渲染内容。",-1)),u(r,null,{child:p(()=>[u(h)]),default:p(()=>[a[2]||(a[2]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-table")]),s(),n("span",{class:"token attr-name"},":data"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":header"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("header"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},"/>")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"data"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"nameList"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},"'秦一世'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'秦二世'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'秦三世'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'秦四世'"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"data"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2020-9-14"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1518 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2020-9-15"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1517 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2020-9-16"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1519 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2020-9-17"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"3"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1516 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"computed"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"header"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'姓名'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token function-variable function"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token parameter"},"item"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("nameList"),n("span",{class:"token punctuation"},"["),s("item"),n("span",{class:"token punctuation"},"."),s("name"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'时间'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'date'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'地址'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'address'"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"]"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),a[21]||(a[21]=n("h2",{id:"带有分页",class:"vipress-heading"},"带有分页",-1)),a[22]||(a[22]=n("h3",{id:"同步模式",class:"vipress-heading"},"同步模式",-1)),a[23]||(a[23]=n("p",null,"一次加载所有表格的数据.",-1)),u(r,null,{child:p(()=>[u(b)]),default:p(()=>[a[3]||(a[3]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-table")]),s(` 
    `),n("span",{class:"token attr-name"},":header"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("header"),n("span",{class:"token punctuation"},'"')]),s(` 
    `),n("span",{class:"token attr-name"},":data"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data"),n("span",{class:"token punctuation"},'"')]),s(` 
    `),n("span",{class:"token attr-name"},[n("span",{class:"token namespace"},"v-model:"),s("pageIndex")]),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("index"),n("span",{class:"token punctuation"},'"')]),s(` 
    `),n("span",{class:"token attr-name"},":page-total"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data.length"),n("span",{class:"token punctuation"},'"')]),s(`
    `),n("span",{class:"token attr-name"},"height"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("400px"),n("span",{class:"token punctuation"},'"')]),s(`
    `),n("span",{class:"token attr-name"},"border"),s(`
  `),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),s(),n("span",{class:"token attr-name"},"#empty"),n("span",{class:"token punctuation"},">")]),s(`
      `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-button")]),s(),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("add"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("添加 1000 条数据"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("vc-button")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("vc-table")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"data"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"header"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'姓名'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'name'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'300px'"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'时间'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'date'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'300px'"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'地址'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'address'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'400px'"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"data"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"index"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"1"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"methods"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"showDetail"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("item"),n("span",{class:"token punctuation"},","),s(" index")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),s("item"),n("span",{class:"token punctuation"},","),s(" index"),n("span",{class:"token punctuation"},")"),s(`
      item`),n("span",{class:"token punctuation"},"."),s("name "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token string"},"'zwl'"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token function"},"add"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"for"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"let"),s(" i "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(" i "),n("span",{class:"token operator"},"<"),s(),n("span",{class:"token number"},"1000"),n("span",{class:"token punctuation"},";"),s(" i"),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("data"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"push"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),n("span",{class:"token number"},"2020"),s(),n("span",{class:"token operator"},"+"),s("i"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"},"-09-09"),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},"秦"),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),s("i"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"},"世"),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},"上海市普陀区金沙江路 "),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),n("span",{class:"token number"},"1518"),s(),n("span",{class:"token operator"},"+"),s(" i"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"}," 弄"),n("span",{class:"token template-punctuation string"},"`")]),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),a[24]||(a[24]=n("h3",{id:"异步模式",class:"vipress-heading"},"异步模式",-1)),a[25]||(a[25]=n("p",null,"每次加载部分数据。",-1)),u(r,null,{child:p(()=>[u(w)]),default:p(()=>[a[4]||(a[4]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-table")]),s(` 
    `),n("span",{class:"token attr-name"},"asyncData"),s(`
    `),n("span",{class:"token attr-name"},"height"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("400px"),n("span",{class:"token punctuation"},'"')]),s(`
    `),n("span",{class:"token attr-name"},":header"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("header"),n("span",{class:"token punctuation"},'"')]),s(` 
    `),n("span",{class:"token attr-name"},":data"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data"),n("span",{class:"token punctuation"},'"')]),s(`
    `),n("span",{class:"token attr-name"},":loading"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("loading"),n("span",{class:"token punctuation"},'"')]),s(` 
    `),n("span",{class:"token attr-name"},[n("span",{class:"token namespace"},"v-model:"),s("pageIndex")]),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("index"),n("span",{class:"token punctuation"},'"')]),s(` 
    `),n("span",{class:"token attr-name"},":page-total"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("total"),n("span",{class:"token punctuation"},'"')]),s(`
    `),n("span",{class:"token attr-name"},"@page-change"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("pageChange"),n("span",{class:"token punctuation"},'"')]),s(`
  `),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),s(),n("span",{class:"token attr-name"},"#empty"),n("span",{class:"token punctuation"},">")]),s(`
      `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("p")]),n("span",{class:"token punctuation"},">")]),s("没有数据"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("p")]),n("span",{class:"token punctuation"},">")]),s(`
      `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-button")]),s(),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("pageChange(1)"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("添加数据"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("vc-button")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("vc-table")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"data"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"header"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'姓名'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'name'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'180px'"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'时间'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'date'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'180px'"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'地址'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'address'"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"data"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"index"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"total"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"loading"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"false"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"methods"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"showDetail"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("item"),n("span",{class:"token punctuation"},","),s(" index")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),s("item"),n("span",{class:"token punctuation"},","),s(" index"),n("span",{class:"token punctuation"},")"),s(`
      item`),n("span",{class:"token punctuation"},"."),s("name "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token string"},"'zwl'"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token function"},"pageChange"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"index"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("data "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),s(`
      `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("loading "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token string"},"'加载中...'"),s(`

      `),n("span",{class:"token function"},"setTimeout"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"debugger"),s(`
        `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("loading "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token boolean"},"false"),s(`
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("index "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("total "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"1000"),s(`
  
        `),n("span",{class:"token keyword"},"let"),s(" i "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),s("index "),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"*"),s(),n("span",{class:"token number"},"10"),s(`
        `),n("span",{class:"token keyword"},"let"),s(" l "),n("span",{class:"token operator"},"="),s(" i "),n("span",{class:"token operator"},"+"),s(),n("span",{class:"token number"},"10"),s(`
  
        `),n("span",{class:"token keyword"},"for"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},";"),s(" i "),n("span",{class:"token operator"},"<"),s(" l"),n("span",{class:"token punctuation"},";"),s(" i"),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("data"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"push"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),n("span",{class:"token number"},"2020"),s(),n("span",{class:"token operator"},"+"),s("i"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"},"-09-09"),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},","),s(`
            `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},"秦"),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),s("i "),n("span",{class:"token operator"},"+"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"},"世"),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},","),s(`
            `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},"上海市普陀区金沙江路 "),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),n("span",{class:"token number"},"1518"),s(),n("span",{class:"token operator"},"+"),s(" i"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"}," 弄"),n("span",{class:"token template-punctuation string"},"`")]),s(`
          `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token number"},"1000"),n("span",{class:"token punctuation"},")"),s(`

    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),a[26]||(a[26]=n("h2",{id:"加载中",class:"vipress-heading"},"加载中",-1)),u(r,null,{child:p(()=>[u(f)]),default:p(()=>[a[5]||(a[5]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-table")]),s(),n("span",{class:"token attr-name"},"height"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("200px"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":header"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("header"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":data"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("[]"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},"loading"),n("span",{class:"token punctuation"},"/>")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"data"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"header"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'姓名'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'name'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'时间'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'date'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'地址'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'address'"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'设置'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"slot"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'setting'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),a[27]||(a[27]=n("h2",{id:"自定义样式",class:"vipress-heading"},"自定义样式",-1)),a[28]||(a[28]=n("p",null,"可将表格内容高亮显示，方便区分「成功、信息、警告、危险」等内容。",-1)),u(r,null,{child:p(()=>[u(x)]),default:p(()=>[a[6]||(a[6]=n("blockquote",null,[n("p",null,[s("通过在 data 中添加 "),n("code",null,"classes"),s(" 属性，可以自定义当前行的颜色。")])],-1)),a[7]||(a[7]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-table")]),s(),n("span",{class:"token attr-name"},":header"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("header"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":data"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":index.sync"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("index"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":total"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data.length"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),s(),n("span",{class:"token attr-name"},[n("span",{class:"token namespace"},"v-slot:"),s("setting")]),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("{item, index}"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s(`
      `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-button")]),s(),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("showDetail(item, index)"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("详情"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("vc-button")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("vc-table")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"data"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"header"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'姓名'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'name'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'时间'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'date'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'地址'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'address'"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"data"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-02"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1518 弄"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"classes"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'warning'"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-04"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1517 弄"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"classes"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"success"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-01"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1519 弄"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"classes"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"error"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-03"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1516 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"index"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"1"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("style")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token style"},[n("span",{class:"token language-css"},[s(`
`),n("span",{class:"token selector"},".vc-table .warning td"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},"color"),n("span",{class:"token punctuation"},":"),s(" #fff"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token property"},"background"),n("span",{class:"token punctuation"},":"),s(" #f90"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token selector"},".vc-table .success td"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},"color"),n("span",{class:"token punctuation"},":"),s(" #fff"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token property"},"background"),n("span",{class:"token punctuation"},":"),s(" green"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token selector"},".vc-table .error td"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},"color"),n("span",{class:"token punctuation"},":"),s(" #fff"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token property"},"background"),n("span",{class:"token punctuation"},":"),s(" red"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("style")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),a[29]||(a[29]=n("h2",{id:"自定义列模板",class:"vipress-heading"},"自定义列模板",-1)),a[30]||(a[30]=n("p",null,"自定义列的显示内容，可组合其他组件使用。",-1)),u(r,null,{child:p(()=>[u(_)]),default:p(()=>[a[8]||(a[8]=n("blockquote",null,[n("p",null,[s("通过在 header 的数组对象中，添加 "),n("code",null,"slot"),s(" 具名插槽可以自定义显示内容。")])],-1)),a[9]||(a[9]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-table")]),s(),n("span",{class:"token attr-name"},":header"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("header"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":data"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":total"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data.length"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),s(),n("span",{class:"token attr-name"},"#name"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("{item, index}"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s(`
      `),n("span",null,"{{"),s("index +1}}."),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-button")]),n("span",{class:"token punctuation"},">")]),n("span",null,"{{"),s("item.name}}"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("vc-button")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),s(),n("span",{class:"token attr-name"},"#date"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("{item, index}"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s(`
      `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("i")]),s(),n("span",{class:"token attr-name"},"class"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("vc-icon-time"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("i")]),n("span",{class:"token punctuation"},">")]),n("span",null,"{{"),s(`item.date}}
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),s(),n("span",{class:"token attr-name"},[n("span",{class:"token namespace"},"v-slot:"),s("address")]),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("{item, index}"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s(`
      `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("input")]),s(),n("span",{class:"token attr-name"},"v-model"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("item.address"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token punctuation"},"/>")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("vc-table")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"data"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"header"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'姓名'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'name'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"slot"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'name'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'时间'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'date'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"slot"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'date'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"180"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'地址'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'address'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"slot"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'address'"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"data"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-02"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1518 弄"'),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-04"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1517 弄"'),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-01"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1519 弄"'),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-03"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1516 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"]"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),a[31]||(a[31]=n("h2",{id:"表格合并方案",class:"vipress-heading"},"表格合并方案",-1)),u(r,null,{child:p(()=>[u(C)]),default:p(()=>[a[10]||(a[10]=n("blockquote",null,[n("p",null,[s("通过 "),n("code",null,"style.mergeSpan"),s(" 来手动控制合并对象。")])],-1)),a[11]||(a[11]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-table")]),s(),n("span",{class:"token attr-name"},":data"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":header"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("header"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},"border"),s(),n("span",{class:"token attr-name"},":style"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("style"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},"/>")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"data"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"header"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'ID'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'id'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'姓名'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'name'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'数值1'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'amount1'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'数值2'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'amount2'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'数值3'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'amount3'"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"data"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"id"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'0x0001'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'王小虎'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount1"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'234'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount2"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'3.2'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount3"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"10"),n("span",{class:"token punctuation"},","),s(`
         
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(` 
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"id"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'0x0001'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'王小虎'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount1"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'165'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount2"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'4.43'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount3"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"10"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(` 
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"id"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'0x0001'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'王小军'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount1"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'324'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount2"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'1.9'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount3"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"9"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(` 
         `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"id"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'0x0001'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'王小虎'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount1"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'324'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount2"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'1.9'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount3"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"9"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(` 
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"id"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'0x0002'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'王小军'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount1"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'539'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount2"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'4.1'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount3"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"15"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"id"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'0x0002'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'王小虎'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount1"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'621'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount2"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'2.2'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount3"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"17"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(` 
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"id"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'0x0002'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'王小虎'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount1"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'621'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount2"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'2.1'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount3"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"18"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(` 
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"id"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'0x0003'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'王小虎'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount1"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'621'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount2"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'2.2'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"amount3"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"17"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(` 
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token comment"},"// style: {"),s(`
      `),n("span",{class:"token comment"},"//   mergeSpan: ["),s(`
      `),n("span",{class:"token comment"},"//     {"),s(`
      `),n("span",{class:"token comment"},"//       x: 1,"),s(`
      `),n("span",{class:"token comment"},"//       y: 0,"),s(`
      `),n("span",{class:"token comment"},"//       row: 2,"),s(`
      `),n("span",{class:"token comment"},"//       col: 1"),s(`
      `),n("span",{class:"token comment"},"//     },"),s(`
      `),n("span",{class:"token comment"},"//     {"),s(`
      `),n("span",{class:"token comment"},"//       x: 0,"),s(`
      `),n("span",{class:"token comment"},"//       y: 0,"),s(`
      `),n("span",{class:"token comment"},"//       row: 3,"),s(`
      `),n("span",{class:"token comment"},"//       col: 1"),s(`
      `),n("span",{class:"token comment"},"//     },"),s(`
      `),n("span",{class:"token comment"},"//   ]"),s(`
      `),n("span",{class:"token comment"},"// }"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"computed"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"style"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"let"),s(" result "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),s(`
      `),n("span",{class:"token keyword"},"let"),s(" obj "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),s(`

      `),n("span",{class:"token comment"},"// 树型数据自动合并"),s(`
      `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("data"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"forEach"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("item"),n("span",{class:"token punctuation"},","),s(" y"),n("span",{class:"token punctuation"},","),s(" data")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("header"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"forEach"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("head"),n("span",{class:"token punctuation"},","),s(" x"),n("span",{class:"token punctuation"},","),s(" header")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token keyword"},"let"),s(" val "),n("span",{class:"token operator"},"="),s(" item"),n("span",{class:"token punctuation"},"["),s("head"),n("span",{class:"token punctuation"},"."),s("key"),n("span",{class:"token punctuation"},"]"),s(`

          `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("val "),n("span",{class:"token keyword"},"in"),s(" obj"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token keyword"},"let"),s(" arr "),n("span",{class:"token operator"},"="),s(" obj"),n("span",{class:"token punctuation"},"["),s("val"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"slice"),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),s(`

            `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("x "),n("span",{class:"token operator"},">"),s(),n("span",{class:"token number"},"0"),s(),n("span",{class:"token operator"},"&&"),s(" y "),n("span",{class:"token operator"},">"),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
              `),n("span",{class:"token keyword"},"let"),s(" prevSibling "),n("span",{class:"token operator"},"="),s(" data"),n("span",{class:"token punctuation"},"["),s("y "),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"["),s("header"),n("span",{class:"token punctuation"},"["),s("x"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"."),s("key"),n("span",{class:"token punctuation"},"]"),s(`
              `),n("span",{class:"token keyword"},"let"),s(" thisSiblingParentVal "),n("span",{class:"token operator"},"="),s(" data"),n("span",{class:"token punctuation"},"["),s("y"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"["),s("header"),n("span",{class:"token punctuation"},"["),s("x "),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"."),s("key"),n("span",{class:"token punctuation"},"]"),s(`

              `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("val "),n("span",{class:"token operator"},"==="),s(" prevSibling"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
                `),n("span",{class:"token comment"},"// 获取父级对象"),s(`
                `),n("span",{class:"token keyword"},"let"),s(" thisParentObj "),n("span",{class:"token operator"},"="),s(" obj"),n("span",{class:"token punctuation"},"["),s("thisSiblingParentVal"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"slice"),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),s(`
                `),n("span",{class:"token comment"},"// 如果需要在已经存在的对象上进行行例合并"),s(`
                `),n("span",{class:"token comment"},"// 则父级合并的行数必须大于 1 "),s(`
                `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("thisParentObj"),n("span",{class:"token punctuation"},"."),s("row "),n("span",{class:"token operator"},">"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
                  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("y "),n("span",{class:"token operator"},">"),s(" arr"),n("span",{class:"token punctuation"},"."),s("y"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
                    arr`),n("span",{class:"token punctuation"},"."),s("row "),n("span",{class:"token operator"},"+="),s(),n("span",{class:"token number"},"1"),s(`
                  `),n("span",{class:"token punctuation"},"}"),s(`
  
                  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("x "),n("span",{class:"token operator"},">"),s(" arr"),n("span",{class:"token punctuation"},"."),s("x"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
                    arr`),n("span",{class:"token punctuation"},"."),s("col "),n("span",{class:"token operator"},"+="),s(),n("span",{class:"token number"},"1"),s(`
                  `),n("span",{class:"token punctuation"},"}"),s(`
                `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
                  obj`),n("span",{class:"token punctuation"},"["),s("val"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"push"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s("x"),n("span",{class:"token punctuation"},","),s(" y"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token literal-property property"},"row"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token literal-property property"},"col"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
                `),n("span",{class:"token punctuation"},"}"),s(`
              `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
                obj`),n("span",{class:"token punctuation"},"["),s("val"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"push"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s("x"),n("span",{class:"token punctuation"},","),s(" y"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token literal-property property"},"row"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token literal-property property"},"col"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
              `),n("span",{class:"token punctuation"},"}"),s(`
            `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
              `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("y "),n("span",{class:"token operator"},">"),s(" arr"),n("span",{class:"token punctuation"},"."),s("y"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
                arr`),n("span",{class:"token punctuation"},"."),s("row "),n("span",{class:"token operator"},"+="),s(),n("span",{class:"token number"},"1"),s(`
              `),n("span",{class:"token punctuation"},"}"),s(`
  
              `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("x "),n("span",{class:"token operator"},">"),s(" arr"),n("span",{class:"token punctuation"},"."),s("x"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
                arr`),n("span",{class:"token punctuation"},"."),s("col "),n("span",{class:"token operator"},"+="),s(),n("span",{class:"token number"},"1"),s(`
              `),n("span",{class:"token punctuation"},"}"),s(`
            `),n("span",{class:"token punctuation"},"}"),s(`

          `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
            obj`),n("span",{class:"token punctuation"},"["),s("val"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"{"),s("x"),n("span",{class:"token punctuation"},","),s(" y"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token literal-property property"},"row"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token literal-property property"},"col"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},"]"),s(`
          `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`

      `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token literal-property property"},"mergeSpan"),n("span",{class:"token operator"},":"),s(" Object"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"values"),n("span",{class:"token punctuation"},"("),s("obj"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"flat"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"filter"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"item"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"("),s("item"),n("span",{class:"token punctuation"},"."),s("row "),n("span",{class:"token operator"},">"),s(),n("span",{class:"token number"},"1"),s(),n("span",{class:"token operator"},"||"),s(" item"),n("span",{class:"token punctuation"},"."),s("col "),n("span",{class:"token operator"},">"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),a[32]||(a[32]=n("h2",{id:"单选功能",class:"vipress-heading"},"单选功能",-1)),u(r,null,{child:p(()=>[u(q)]),default:p(()=>[a[12]||(a[12]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-table")]),s(),n("span",{class:"token attr-name"},":data"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":header"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("header"),n("span",{class:"token punctuation"},'"')]),s(` 
    `),n("span",{class:"token attr-name"},"show-select-column"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("radio"),n("span",{class:"token punctuation"},'"')]),s(` 
    `),n("span",{class:"token attr-name"},"highlight-selected-row"),s(` 
    `),n("span",{class:"token attr-name"},"@selectChange"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("change"),n("span",{class:"token punctuation"},'"')]),s(`
  `),n("span",{class:"token punctuation"},"/>")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"data"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"header"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'姓名'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'name'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'时间'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'date'"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'地址'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'address'"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"data"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-02"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1518 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-04"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1517 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-01"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1519 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-03"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1516 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"]"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"methods"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"change"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"val"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),s("val"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),a[33]||(a[33]=n("h2",{id:"多选功能",class:"vipress-heading"},"多选功能",-1)),u(r,null,{child:p(()=>[u($)]),default:p(()=>[a[13]||(a[13]=n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("vc-table")]),s(),n("span",{class:"token attr-name"},":data"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("data"),n("span",{class:"token punctuation"},'"')]),s(),n("span",{class:"token attr-name"},":header"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("header"),n("span",{class:"token punctuation"},'"')]),s(` 
    `),n("span",{class:"token attr-name"},"show-select-column"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("checkbox"),n("span",{class:"token punctuation"},'"')]),s(` 
    `),n("span",{class:"token attr-name"},"highlight-selected-row"),s(` 
    `),n("span",{class:"token attr-name"},"@selectChange"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("change"),n("span",{class:"token punctuation"},'"')]),s(`
  `),n("span",{class:"token punctuation"},"/>")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"data"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token literal-property property"},"header"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'姓名'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'name'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"100"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'时间'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'date'"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"label"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'地址'"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"key"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'address'"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token literal-property property"},"data"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-02"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"checked"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1518 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-04"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1517 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-01"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1519 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token literal-property property"},"date"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"2016-05-03"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"王小虎"'),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token literal-property property"},"address"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"上海市普陀区金沙江路 1516 弄"'),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"]"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"methods"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"change"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"val"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),s("val"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")])])],-1))]),_:1}),a[34]||(a[34]=O('<h1 id="表格属性" class="vipress-heading">表格属性</h1><table><thead><tr><th>参数</th><th>类型</th><th>说明</th><th>默认值</th><th>可选值</th></tr></thead><tbody><tr><td>data</td><td><strong>Array</strong></td><td>表格数据</td><td>[]</td><td>-</td></tr><tr><td>header</td><td><strong>Array</strong></td><td>表格头</td><td>[]</td><td>-</td></tr><tr><td>pageTotal</td><td><strong>Number</strong></td><td>总条数</td><td>-</td><td>-</td></tr><tr><td>pageIndex</td><td><strong>Number</strong></td><td>当前页</td><td>1</td><td>-</td></tr><tr><td>pageSize</td><td><strong>Number</strong></td><td>默认每页条数</td><td>10</td><td>-</td></tr><tr><td>height</td><td><strong>String</strong></td><td>高度</td><td>auto</td><td>-</td></tr><tr><td>asyncData</td><td><strong>Boolean</strong></td><td>异步数据</td><td>false</td><td>-</td></tr><tr><td>loading</td><td><strong>Boolean/String</strong></td><td>布尔值时，控制是否加载；<br>字符串时，加载时文字</td><td>false</td><td>-</td></tr><tr><td>border</td><td><strong>Boolean</strong></td><td>显示边框，默认无</td><td>auto</td><td>-</td></tr><tr><td>style</td><td><strong>Object</strong></td><td>样式控制</td><td>{}</td><td>-</td></tr></tbody></table><h2 id="表格头属性" class="vipress-heading">表格头属性</h2><table><thead><tr><th>参数</th><th>类型</th><th>说明</th><th>默认值</th><th>可选值</th></tr></thead><tbody><tr><td>label</td><td><strong>String</strong></td><td>标签</td><td>-</td><td>-</td></tr><tr><td>key</td><td><strong>String/Function</strong></td><td>data 中 key<br>或设置方法取值，参考【函数式表头】示例</td><td>-</td><td>-</td></tr><tr><td>slot</td><td><strong>String</strong></td><td>插槽名称</td><td>-</td><td>-</td></tr><tr><td>width</td><td><strong>Number/String</strong></td><td>设置列宽</td><td>-</td><td>-</td></tr></tbody></table><h2 id="Style-Props" class="vipress-heading">Style Props</h2><table><thead><tr><th>参数</th><th>类型</th><th>说明</th><th>默认值</th><th>可选值</th></tr></thead><tbody><tr><td>mergeSpan</td><td><strong>Array</strong></td><td>表格合并对象，格式为 <code>[{x,y,row,col}]</code><br>- <code>x</code> td索引<br>- <code>y</code> tr索引<br>- <code>row</code> rowSpan值<br>- <code>col</code> colSpan值</td><td>-</td><td>-</td></tr></tbody></table><h1 id="Events" class="vipress-heading">Events</h1><table><thead><tr><th>事件名称</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>page-change</td><td>分页变化时，返回最新页码</td><td>(index) =&gt; {}</td></tr></tbody></table>',8))])}const bn=y(yn,[["render",mn]]);export{bn as default};
