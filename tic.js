let game=document.querySelector(".game");
let ul=document.querySelector("ul");
let allSquare=document.querySelectorAll("ul li");
let shapes=document.querySelectorAll(".game ~ div");
let board=document.querySelector(".start-board");
let btn=document.querySelector("button");
let resultBoard=document.querySelector(".result-board");
let player1=document.querySelector(".p1");
let player2=document.querySelector(".p2");
let tie=document.querySelector(".tie");
// button to start play
btn.onclick=function () {
    board.classList.add("hide");
    game.classList.remove("hide");
    resultBoard.classList.remove("hide");
};
// counter for toggle x o
let i=0;
// counter for Tie state
let count=0;
// array from the squares
let arrayOfShapes=Array.from(allSquare);
// divide this array into 3 array of 3 elements
let arr1=arrayOfShapes.slice(0,3);
let arr2=arrayOfShapes.slice(3,6);
let arr3=arrayOfShapes.slice(6,9);
// define 2D array (grid)
var grid= {
    0:arr1,
    1:arr2,
    2:arr3
}
// flag for prevent user click while processing 
let flag=true;
allSquare.forEach(sq => {
    sq.onclick =function() {
        if(flag) {
            if(sq.innerHTML=='') {
                let div=document.createElement("div");
                div.append(shapes[i].innerHTML);
                div.className=shapes[i].className;
                sq.appendChild(div);
                count++;
                // cycle increase
                i=(i+1)%2;
            }
            let row=checkRow();
            let column=checkColumn();
            let radius=checkRadius();
            if(row>=0) {
                flag=false;
                setTimeout(function(){
                    for(let i=0;i<3;i++) {
                        if(grid[row][i].firstChild) grid[row][i].firstChild.classList.add('animate');
                    }
                    endGame();
                },300);
            }
            else if(column>=0) {
                flag=false;
                setTimeout(function(){
                    for(let i=0;i<3;i++) {
                        if(grid[i][column].firstChild) grid[i][column].firstChild.classList.add('animate');
                    }
                    endGame();
                },300);
            }
            else if(radius>0) {
                flag=false;
                if(radius===1) {
                    setTimeout(function(){
                        for(let i=0;i<3;i++) {
                            for(let j=0;j<3;j++) {
                                if(i===j) {
                                    if(grid[i][j].firstChild) grid[i][j].firstChild.classList.add('animate');
                                }
                            }
                        }
                        endGame();
                    },300);
                    
                }
                else {
                    setTimeout(function(){
                        for(let i=0;i<3;i++) {
                            for(let j=0;j<3;j++) {
                                if(i+j===2) {
                                    if(grid[i][j].firstChild) grid[i][j].firstChild.classList.add('animate');
                                }
                            }
                        }
                        endGame();
                    },300);
                }
            }
            else if(count==9) {
                ul.classList.add("animate");
                flag=false;
                endGame();
            }
        }
    }
});
function checkRow() {
    let count=0;
    for(let i=0;i<3;i++) {
        for(let j=0;j<2;j++) {
            if(grid[i][j].innerHTML===grid[i][j+1].innerHTML && grid[i][j].innerHTML!=='') count++;
        }
        if(count==2) {
            return i;
        }
        else count=0;
    }
    return -1;
};
function checkColumn() {
    let count=0;
    for(let i=0;i<3;i++) {
        for(let j=0;j<2;j++) {
            if(grid[j][i].innerHTML===grid[j+1][i].innerHTML && grid[j][i].innerHTML!=='') count++;
        }
        if(count==2) {
            return i;
        }
        else count=0;
    }
    return -1;
};
function checkRadius () {  
    let count=0;
    for(let i=0;i<2;i++) {
        for(let j=0;j<2;j++) {
            if(i==j) {
                if(grid[i][j].innerHTML==grid[i+1][j+1].innerHTML && grid[i][j].innerHTML!=='') count++;
            }
        }
    }
    if(count==2) {
        return 1;
    }
    count=0;
    for(let i=0;i<2;i++) {
        for(let j=0;j<3;j++) {
            if(i+j==2) {
                if(grid[i][j].innerHTML===grid[i+1][j-1].innerHTML && grid[i][j].innerHTML!=='') count++;
            }
        }
    }
    if(count==2) {
        return 2;
    }
    return -1;
};
function endGame() {
    // flag for winner x or o
    let winner=true;
    for(let i=0;i<3;i++) {
        for(let j=0;j<3;j++) {
            if(grid[i][j].firstChild) {
                if(!grid[i][j].firstChild.classList.contains("animate")) {
                    grid[i][j].firstChild.style.cssText='opacity:0.5;'
                }
                else {
                    if(grid[i][j].firstChild.classList.contains('o')) winner=false;
                }
            }
        }
    }
    // results
    if(!ul.classList.contains("animate")) {
        if(winner) {
            player1.innerHTML++;
            player1.classList.add("update");
        }
        else {
            player2.innerHTML++;
            player2.classList.add("update");
        }
    }
    else {
        tie.innerHTML++;
        tie.classList.add("update");
    }
    // Initial after 1.5 sec
    setTimeout(() => {
        // remove update class for animation
        let arrOfResults=[player1,player2,tie];
        arrOfResults.forEach(el => {
            if(el.classList.contains("update")) el.classList.remove("update");
        });
        if(ul.classList.contains("animate")) ul.classList.remove("animate");
        for(let i=0;i<3;++i) {
            for(let j=0;j<3;++j) grid[i][j].innerHTML='';
        }
        // initial all value
        flag=true;
        i=0;row=-1;column=-1;radius=-1;count=0;
        arrayOfShapes=Array.from(allSquare);
        arr1=arrayOfShapes.slice(0,3);
        arr2=arrayOfShapes.slice(3,6);
        arr3=arrayOfShapes.slice(6,9);
        grid= {
            0:arr1,
            1:arr2,
            2:arr3
        }
    },2000);
}