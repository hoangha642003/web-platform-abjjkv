let n = 4;
// khoi tao mang
let caros = [];
for (i = 0; i < n; i++) {
  // i = 1
  let item = [];
  for (j = 0; j < n; j++) {
    item.push('_'); // [+,.+,+,+]
  }
  caros.push(item);
}

renderBoard(caros);
let userRound = 1;
let user1Hand = [];
let user2Hand = [];

function renderBoard(carosRender) {
  let board = document.querySelector('#board');
  let boardHtml = ``;
  for (let index in carosRender) {
    let caroItem = carosRender[index];
    boardHtml += '<div>';
    for (let index1 in caroItem) {
      boardHtml += `
                <button data-x="${index}" 
                data-y="${index1}" 
                class="control" >
                ${caroItem[index1]}
                 </button>`;
    }
    boardHtml += `</div>`;
  }
  board.innerHTML = boardHtml;
  let carrorControlBtns = document.querySelectorAll('.control');
  // let carrorControlBtns1 = document.getElementsByClassName('control')
  carrorControlBtns.forEach(function (item) {
    item.addEventListener('click', function () {
      let x = item.getAttribute('data-x');
      let y = item.getAttribute('data-y');
      // check bi trung
      let status = false;
      for (let index4 in user1Hand) {
        let itemHand1 = user1Hand[index4];
        // [1,2]
        let xHand1 = itemHand1[0];
        let yHand1 = itemHand1[1];
        if (x == xHand1 && y == yHand1) {
          status = true;
          break;
        }
      }

      for (let index5 in user2Hand) {
        let itemHand2 = user2Hand[index5];
        // [1,2]
        let xHand2 = itemHand2[0];
        let yHand2 = itemHand2[1];
        if (x == xHand2 && y == yHand2) {
          status = true;
          break;
        }
      }
      // end check
      if (status) {
        console.log('bi trung roi');
      } else {
        // khong bi trung thi hien thi
        let mesage = '0';
        if (userRound == 1) {
          mesage = 'x';
          user1Hand.push([x, y]);
          userRound = 2;
        } else {
          userRound = 1;
          user2Hand.push([x, y]);
        }
        caros[x][y] = mesage;

        console.log(user1Hand, user2Hand);
        // check o da chon
        // user hand1

        item.innerHTML = mesage;

        // kiem tra chien thang

        if (user1Hand.length > 4) {
          // check ket thuc

          for (let inded = 0; inded < user1Hand.length; inded++) {
            let itemHan1 = user1Hand[inded];
            let itemHan2 = user1Hand[inded + 1];
            let itemHan3 = user1Hand[inded + 2];
            let itemHan4 = user1Hand[inded + 3];

            if (itemHan2 && itemHan3 && itemHan4) {
              // check theo chieu ngang
              let xBangNhau =
                ((itemHan1[0] == itemHan2[0]) == itemHan3[0]) == itemHan4[0];
              let yLienTiep =
                itemHan3[1] - itemHan2[1] == 1 &&
                itemHan4[1] - itemHan3[1] == 1 &&
                itemHan3[1] - itemHan2[1] == 1 &&
                itemHan2[1] - itemHan1[1] == 1;
              console.log(xBangNhau, yLienTiep);
              if (xBangNhau && yLienTiep) {
                alert('nguoi 1 thang');
                break;
              }

              // check theo chieu doc
              let yBangNhau =
                ((itemHan1[1] == itemHan2[1]) == itemHan3[1]) == itemHan4[1];
              let xLienTiep =
                itemHan3[0] - itemHan2[0] == 1 &&
                itemHan4[0] - itemHan3[0] == 1 &&
                itemHan3[0] - itemHan2[0] == 1 &&
                itemHan2[0] - itemHan1[0] == 1;
              if (yBangNhau && xLienTiep) {
                alert('nguoi 1 thang');
                break;
              }
            } else {
              console.log('chua chien thang');
            }
          }
        }

        // renderBoard(caros)
      }

      console.log('click', x, y);
    });
  });
}


