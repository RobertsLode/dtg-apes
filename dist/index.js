"use strict";var e=require("react");function t({details:t,editClick:l,deleteClick:a}){const[n,c]=e.useState(!1);return e.createElement(e.Fragment,null,e.createElement("tbody",{className:"wh-table"},e.createElement("tr",{className:"active tr--bold "+(n?"expanded":"not--expanded")},e.createElement("td",{onClick:()=>{c(!n)}},e.createElement("span",{className:"svg"},e.createElement("svg",{style:n?{rotate:"90deg"}:{},xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},e.createElement("path",{d:"M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"})))),t?.tableSlotTitles?.map((t=>e.createElement("td",{onClick:()=>{c(!n)}},e.createElement("div",{className:"td--center tr--bold"},t)))),e.createElement("td",{style:{width:"100px"}},e.createElement("div",{className:"td--center button--container",style:{gap:"20px"}},e.createElement("button",{onClick:l,className:"table--button"},e.createElement("img",{width:20,height:20,src:Pencil,alt:"pencil"})),e.createElement("button",{onClick:a,className:"table--button"},e.createElement("img",{width:20,height:20,src:Trash,alt:"pencil"}))))),t?.details?.map((t=>e.createElement("tr",{className:n?"active expanded":"visually--hidden"},e.createElement("td",null),t?.map((t=>e.createElement("td",null,e.createElement("div",{className:"td--center"},t)))),e.createElement("td",{style:{width:"100px"}},e.createElement("div",{className:"td--center button--container",style:{gap:"20px"}},e.createElement("button",{onClick:l,className:"table--button"},e.createElement("img",{width:20,height:20,src:Pencil,alt:"pencil"})),e.createElement("button",{onClick:a,className:"table--button"},e.createElement("img",{width:20,height:20,src:Trash,alt:"pencil"}))))))),e.createElement("div",{className:"table--break"})))}exports.Table=function({tHead:l,data:a,editClick:n,deleteClick:c}){return e.createElement("div",null,e.createElement("table",{className:"wh-table table tbody"},e.createElement("thead",null,e.createElement("tr",{className:"tr--bold"},e.createElement("th",{className:"toggle"},e.createElement("span",{className:"visually--hidden"},"Toggle")),l?.map((t=>e.createElement("th",null,e.createElement("div",null,t)))),e.createElement("th",null))),e.createElement("div",{className:"table--break"}),a?.length&&a.map((l=>e.createElement(t,{details:l,editClick:n,deleteClick:c})))))},exports.Test=()=>e.createElement("div",null,"man besii");
