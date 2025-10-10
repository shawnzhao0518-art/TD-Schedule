import { db } from "./firebase.js";
import { ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const scheduleEl=document.getElementById("schedule");
const weekRangeEl=document.getElementById("week-range");
const addBtn=document.getElementById("add-btn");
const modal=document.getElementById("modal");
const saveBtn=document.getElementById("save-task");
const cancelBtn=document.getElementById("cancel-task");

function getMonday(d){d=new Date(d);const day=d.getDay(),diff=d.getDate()-day+(day===0?-6:1);return new Date(d.setDate(diff));}
function fmt(d){return `${d.getMonth()+1}.${d.getDate()}`;}
function buildWeeks(){const now=new Date();const monday=getMonday(now);const nextWeek=new Date(monday);nextWeek.setDate(monday.getDate()+7);const week1End=new Date(monday);week1End.setDate(monday.getDate()+5);const week2End=new Date(nextWeek);week2End.setDate(nextWeek.getDate()+5);weekRangeEl.textContent=`【本周 ${fmt(monday)}–${fmt(week1End)}】 | 【下周 ${fmt(nextWeek)}–${fmt(week2End)}】`;return [monday,nextWeek];}

function renderGrid(){scheduleEl.innerHTML="";const[w1,w2]=buildWeeks();const days=[];for(let i=0;i<6;i++)days.push(new Date(w1.getFullYear(),w1.getMonth(),w1.getDate()+i));for(let i=0;i<6;i++)days.push(new Date(w2.getFullYear(),w2.getMonth(),w2.getDate()+i));days.forEach(date=>["AM","PM"].forEach(p=>{const div=document.createElement("div");div.className="day-cell";div.dataset.key=`${date.toISOString().split("T")[0]}_${p}`;scheduleEl.appendChild(div);}));}
renderGrid();

onValue(ref(db),snap=>{const data=snap.val()||{};document.querySelectorAll(".day-cell").forEach(c=>{c.innerHTML="";const key=c.dataset.key;const list=data[key]||[];list.forEach(i=>{const div=document.createElement("div");div.className="task"+(i.status?" done":"");div.textContent=`${i.time} ${i.service}`;c.appendChild(div);});});});

addBtn.onclick=()=>modal.classList.remove("hidden");
cancelBtn.onclick=()=>modal.classList.add("hidden");
saveBtn.onclick=()=>{const d=document.getElementById("task-date").value,t=document.getElementById("task-time").value;if(!d||!t){alert("请选择日期和时间");return;}const obj={time:t,model:task-model.value,mileage:task-mileage.value,plate:task-plate.value,service:task-service.value,price:task-price.value,phone:task-phone.value,note:task-note.value,status:false};const p=parseInt(t.split(":")[0])<12?"AM":"PM";const key=`${d}_${p}`;const r=ref(db,key);get(r).then(s=>{const l=s.val()||[];l.push(obj);set(r,l);modal.classList.add("hidden");});};
