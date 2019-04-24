
//when document is ready, then run the js.file
$(document).ready(function() {

  let guess = 0;
  let selectedColor = '';
  let bGround = 'rgba(0, 0, 0, 0) linear-gradient(rgb(0, 0, 102), blue) repeat scroll 0% 0% / auto padding-box border-box';
  //hide SUBMIT buttom until the row is filled
  $('.submit-btn').hide();
  let clickCount = 0;
  let isSelected = false;
  let answerRay = makeAnswer();
  let tempRay = $('.guess-pegs');
  let guessBoxArray = [];
  let nextGrade = $($('.first-grade')[0]).parent()[0];
  let isWin = false;
  let starttrigger = false;

  if(!starttrigger){
    $('.start').fadeIn(500);
  }
  $('.start-button').click(function(){
     starttrigger=true;
     $('.start').hide();
  });
  
    //start game
    for(let i = 9; i >= 0; i-- ) {
      guessBoxArray.push(tempRay[i]);
    }

    for(let i = 0; i < 10; i++) {
      let guessArray = guessBoxArray[i].getElementsByClassName("guess-peg");
      for(let j = 0; j < 4; j++) {
        //`g-${i}-${j}` : assign the string number
        $(guessArray[j]).attr('id',`g-${i}-${j}`);
      }
    }

    let masterGuessArray = [[-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1]];

    $('.submit-btn').click(function() {
      //once submit, the original row should not be changable.
      $('.active').removeClass('active');
      let gradeRay = getGrade();
      checkWin(gradeRay);
      let gradeBox = getGradeBox();
      placePegs(gradeRay, gradeBox);
      //guess is tracking the row
      guess++;
      for(let i = 0; i < 4; i++) {
        $(`#g-${guess}-${i}`).addClass('active');
      }
      $('.submit-btn').hide();
      if(guess === 10 && !isWin){
        $('.lose').fadeIn(200);
      }
    });

  //choose from kegs
    $('.selector-inner').click(function () {
      isSelected = true;
      $('.selector-outer').css('background-color', 'rgba(90, 126, 232,1)');
      let peg = ($(this).parent())[0];
      selectedColor = $(this).css('background-color');
      $(peg).css('background-color', selectedColor);
    });


    $('.guess-peg').click(function() {
      if(isSelected) {
        /*
        'active' indicates the row that player can put the kegs
        */
        if ($(this).hasClass('active')) {
          /*
          when the guess peg has not been selected, 
          number will be 1.
          When the guess peg has been selected and assigned to
          a color, numbe will be 2.
          We use this to distinguish which guess peg we allow to 
          put kegs. 
          */ 
          let number = parseInt($(this).css('border'));
          if(number === 1) { //insert peg
          $(this).css('background', 'none');
          $(this).css('background-color', selectedColor);
          $(this).css('border', '2px solid white');
          let coord = $(this).attr('id');
          updateMasterArray(selectedColor, coord);
          clickCount++;
          if(clickCount === 4) {
              $('.submit-btn').show();
              clickCount = 0;
          }
        } else { //peg removed
            $(this).css('background', bGround);
            //we use border "x"px to convert to number, distinguishing 
            //whether the kegs has been assigned color.
            $(this).css('border', '1px solid white');
            // updateMasterArray(selectedColor, coord);
            clickCount--;
          }
        }
      }
    });

    function makeAnswer() {
      let ray = [];
      for(let i = 0; i < 4; i++) {
        ray.push(Math.floor(Math.random() * 6));
      }
      return ray;
    }

    function updateMasterArray(col, xy) {
      let ray = xy.split('-');
      let x = ray[1];
      let y = ray[2];
      masterGuessArray[x][y] = makeColorANumber(col);
    }

    function makeColorANumber(col) {
      if(col === 'rgb(255, 0, 0)') return 0;
      if(col === 'rgb(0, 128, 0)') return 1;
      if(col === 'rgb(255, 255, 0)') return 2;
      if(col === 'rgb(0, 0, 0)') return 3;
      if(col === 'rgb(255, 255, 255)') return 4;
      if(col === 'rgb(165, 42, 42)') return 5;
    }

    function getGrade() {
      let gradRay = [];
      let aRay = [];
      for(let i = 0; i < 4; i++) {
        aRay.push(answerRay[i]);
      }
      // Black Peg Check
      for(let i = 0; i < 4; i++) {
        if(masterGuessArray[guess][i] === aRay[i]) {
          gradRay.push('black-peg');
          aRay[i] = -1;
          masterGuessArray[guess][i] = -2;
        }
      }
      // White Peg Check
      for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
          if(masterGuessArray[guess][i] === aRay[j]) {
            gradRay.push('white-peg');
            aRay[j] = -1;
            masterGuessArray[guess][i] = -2;
          }
        }
      }
      return gradRay;
    }

    function getGradeBox() {
      let activeGrade =  nextGrade.getElementsByClassName("grade-pegs")[0];
      nextGrade = $(nextGrade).prev()[0];
      return activeGrade;
    }

    function placePegs(ray, box) {
      let pegRay = box.getElementsByClassName("grade-peg");
      for(let i = 0; i < ray.length; i++) {
        $(pegRay[i]).addClass(`${ray[i]}`);
      }
      $('.white-peg').css('background', 'none').css('background-color', 'white');
      $('.black-peg').css('background', 'none').css('background-color', 'black');
    }

    function checkWin(ray) {
      let rayStr = ray.join();
      if(rayStr === "black-peg,black-peg,black-peg,black-peg") {
        $('.modal').fadeIn(200);
        isWin = true;
      }
    }

  })

  