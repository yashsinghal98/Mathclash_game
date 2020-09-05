let columnsize = 6;
let rowsize = 6;
let grid = [];
let cursumof = 0;
let bluecolor = [];
let score=0;
let gameover1="false";
const addcells = () => {
  let arr = [];
  for (let i = 0; i < columnsize; i++) {
    arr.push(Math.ceil(Math.random() * 9));
  }
  grid.unshift(arr);
};
const updateboard = () => {
  for (let i = 0; i < rowsize; i++) {
    for (let j = 0; j < columnsize; j++) {
      const el = document.getElementById(i.toString() + j.toString());
      if(grid[i][j]==="")
      {
        el.style.backgroundColor="grey";
      }
      else
      {
         el.style.backgroundColor = "white";
      }
      el.innerHTML = grid[i][j];
    }
  }
  let arrr=[];
  for (let i = 0; i < bluecolor.length; i++) {
    let ax = parseInt(bluecolor[i][0]);
    let ay = parseInt(bluecolor[i][1]);
    ax++;
    let elem = document.getElementById(ax.toString() + ay.toString());
    arrr.push(ax.toString()+ay.toString());
    elem.style.backgroundColor = "blue";
  }
  bluecolor=arrr;
};
let startTimer = () => {
  let id = setInterval(() => {
    addcells();
    updateboard();
    if (gameover()) {
      gameover1="true";
      setTimeout(() => {
        
        alert("game is over");
        clearInterval(id);
        return;
      }, 500);
    }
  }, 3000);
};
let gameover = () => {
  for (let i = 0; i < columnsize; i++) {
    if (grid[5][i] !== "") return true;
  }
  return false;
};
const handleclick = (i, j) => {
  //console.log(i+" "+j);
  let x = document.getElementById(i.toString() + j.toString());
  if (x.innerHTML===""||gameover1==="true") return;
  if (x.style.backgroundColor==="blue") {
    //console.log("blue");
    cursumof -= parseInt(x.innerHTML);
    x.style.backgroundColor = "white";
    let val=bluecolor.indexOf(i.toString()+j.toString());
    bluecolor.splice(val, 1);
    document.getElementById("cur_sum").innerHTML = cursumof;
    return;
  } 
  bluecolor.push(i.toString() + j.toString());
  x.style.backgroundColor = "blue";
  x = parseInt(x.innerHTML);
  //console.log(x);
  cursumof += x;
  let tarval = document.getElementById("target").innerHTML;
  tarval = +tarval;
  if (cursumof >= tarval) 
  {
    if(cursumof===tarval)
    {
      score+=5;
      document.getElementById("score").innerHTML=`Score:${score}`;
    }
    for (let i = 0; i < bluecolor.length; i++) 
    {
      let ele=document.getElementById(bluecolor[i]);
      if (cursumof === tarval) 
      {
        ele.style.backgroundColor="grey";
        ele.innerHTML="";
        grid[bluecolor[i][0]][bluecolor[i][1]]="";
      }
      else
      {
        ele.style.backgroundColor="white";
      }
    }
    let arrrr=[];
    bluecolor=[];
    if(cursumof===tarval)
    {
      for(let i=0;i<columnsize;i++)
      {
        let j=0;
        for(let l=0;l<rowsize;l++)
        {
          if(grid[l][i]!=="")
          grid[j++][i]=grid[l][i];
        }
        for(;j<rowsize;j++)
        {
          grid[j][i]="";
        }
      }
      updateboard();
    }
    cursumof = 0;
    tarval=Math.floor(Math.random()*40)+10;
    document.getElementById("target").innerHTML=tarval;
  }
  document.getElementById("cur_sum").innerHTML = cursumof;
};
const board = () => {
  let brd = document.getElementById("board");
  for (let i = 0; i < columnsize; i++) {
    let arr = [];
    let el = document.createElement("div");
    el.className = "row";
    for (let j = 0; j < rowsize; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("id", i.toString() + j.toString());
      cell.className = "cell";
      cell.addEventListener("click", () => {
        handleclick(i, j);
      });
      el.appendChild(cell);
      arr.push("");
    }
    brd.appendChild(el);
    grid.push(arr);
  }
};
const resetfn=()=>
{
  location.reload();
}
board();
startTimer();
