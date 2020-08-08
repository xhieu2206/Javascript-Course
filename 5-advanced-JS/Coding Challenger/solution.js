(function() {
  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  Question.prototype.displayQuestion = function() {
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
      console.log(`${i}. ${this.answers[i]}`);
    }
  }

  Question.prototype.checkAnswer = function(ans, callback) {
    var sc;
    if (ans === this.correct) {
      console.log(`Ting Ting!!!`);
      // Tại đây chúng ta sẽ truyền vào function keepScore
      sc = callback(true);
    } else {
      console.log(`Tèèèèèèèè!!!!`);
      // Tại đây chúng ta sẽ truyền vào function keepScore
      sc = callback(false);
    }
    this.displayScore(sc);
  }

  Question.prototype.displayScore = function(score) {
    console.log(`Score: ${score}`);
    console.log(`----------------------------------------`);
  }

  // Sử dụng đến closure ở đây: chúng ta sẽ viết 1 function keep score và update khi user trả lời đúng.
  function score() {
    var sc = 0;
    return function(correct) {
      if (correct) {
        sc++;
      }
      return sc;
    }
  }

  var keepScore = score();

  function nextQuestion() {
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

    var question = questions[randomQuestion(questions)];
    question.displayQuestion();
    var answer = prompt('Trả lời hộ cái', '');

    if (answer !== 'exit') {
      question.checkAnswer(parseInt(answer), keepScore);
      nextQuestion();
    }
  }

  nextQuestion();
})();
