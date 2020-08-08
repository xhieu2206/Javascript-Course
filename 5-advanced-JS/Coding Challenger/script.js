var Question = function(question, answers, correctAnswerIndex) {
  this.question = question;
  this.answers = answers;
  this.correctAnswerIndex = correctAnswerIndex;
}

var Program = function() {
  var points = 0;
  var questions = [
    new Question(
      'Ai đang học khóa JS này?',
      [
        'Xuan Hieu',
        'Nguyen Van A',
        'Tran Van C'
      ],
      0
    ),
    new Question(
      'JS học khó hay dễ?',
      [
        'Kho vl',
        'De vl',
        'Binh thuong'
      ],
      2
    ),
    new Question(
      'Học JS có vui không?',
      [
        'Vui vl',
        'Đéo vui gì hết',
        'Vui bình thường',
        'Chán lắm',
      ],
      2
    ),
    new Question(
      'Khóa này học ở đâu?',
      [
        'tinhte.vn',
        'techrum.vn',
        'Udemy'
      ],
      2
    )
  ];
  var randomQuestion = function(questions) {
    var max = Math.floor(questions.length);
    return Math.floor(Math.random() * max);
  };
  this.execute = function() {
    while (true) {
      var question = questions[randomQuestion(questions)];
      console.log(`Question: ${question.question}`)
      for (var i = 0; i < question.answers.length; i ++) {
        console.log(`${i}. ${question.answers[i]}`);
      }
      var answer = prompt("Please enter your answer or enter 'exit' to exit the game", "Type your answer here");
      if (answer === 'exit') {
        console.log('----------------');
        console.log("Final result: " + points);
        break;
      } else if (parseInt(answer) === question.correctAnswerIndex) {
        points++;
        console.log("Correct Answer");
        console.log(`Your point: ${points}`)
        console.log('----------------');
      } else if (parseInt(answer) !== question.correctAnswerIndex) {
        console.log("Wrong answer, try again");
        console.log('----------------');
      }
    }
  }
}

var program = new Program();
program.execute();