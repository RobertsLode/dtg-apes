"use strict";var e=require("react");function t({details:t}){const[l,a]=e.useState(!1);return console.log(t),e.createElement(e.Fragment,null,e.createElement("tbody",{className:"wh-table"},e.createElement("tr",{onClick:()=>{a(!l)},className:"active tr--bold "+(l?"expanded":"not--expanded")},e.createElement("td",null,e.createElement("span",{className:"svg"},e.createElement("svg",{style:l?{rotate:"90deg"}:{},xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},e.createElement("path",{d:"M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"})))),e.createElement("td",null,e.createElement("div",{className:"tr--bold "},t?.tableSlotFirstTitle)),e.createElement("td",null,e.createElement("div",{className:"td--center tr--bold"},t?.tableSlotSecondTitle)),e.createElement("td",null,e.createElement("div",{className:"td--center tr--bold"},t?.tableSlotThirdTitle)),e.createElement("td",null,e.createElement("div",{className:"td--center tr--bold"},t?.tableSlotFouthTitle))),t?.details.map((t=>e.createElement("tr",{className:l?"active expanded":"visually--hidden"},e.createElement("td",null),e.createElement("td",null,e.createElement("div",{className:"td--center"},t?.firstP)),e.createElement("td",null,e.createElement("div",{className:"td--center"},t?.secondP)),e.createElement("td",null,e.createElement("div",{className:"td--center"},t?.thirdP)),e.createElement("td",null,e.createElement("div",{className:"td--center"},t?.fourthP))))),e.createElement("div",{className:"table--break"})))}var l={Table:{Table:({firstTitle:e,secondTitle:l,thirdTitle:a,fouthTitle:c,data:n})=>React.createElement("div",null,React.createElement("table",{className:"wh-table table tbody"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{className:"toggle"},React.createElement("span",{className:"visually--hidden"},"Toggle")),React.createElement("th",null,React.createElement("div",null,e)),React.createElement("th",null,React.createElement("div",null,l)),React.createElement("th",null,React.createElement("div",null,a)),React.createElement("th",null,React.createElement("div",null,c)))),React.createElement("div",{className:"table--break"}),n?.length&&n.map((e=>React.createElement(t,{details:e})))))},Test:{Test:{Test:()=>"man besii"}}};module.exports=l;
