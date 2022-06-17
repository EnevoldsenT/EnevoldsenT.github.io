(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userInput = answerContainer.querySelector(selector);
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer == currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = 'lightgreen';
        if (userInput != null) {
        userInput.parentElement.style.color = 'lightgreen';
      }
      }
      // if answer is wrong or blank
      else {//if (userAnswer != ''){
        // color the answers red
        //answerContainers[questionNumber].style.color = 'red';
        if (userInput != null) {

        userInput.parentElement.style.color = 'red';
        }
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `Du svarede rigtigt på ${numCorrect} ud af ${myQuestions.length}`;
if (numCorrect == myQuestions.length) {
  resultText.innerHTML = 'Super, du har fuldstændig styr på rollerne!'
} else if (numCorrect == (myQuestions.length -1)) {
  resultText.innerHTML = 'Flot, du har næsten styr på rollerne! Vil du helt i top kan du lære mere om roller i Plan2Learn eller Rollekataloget.'
} else if (numCorrect == (myQuestions.length -2)) {
  resultText.innerHTML = 'OK, du har nogenlunde styr på rollerne! overvej om ikke du bør lære lidt mere om roller i Plan2Learn eller Rollekataloget.'
} else  {
  resultText.innerHTML = 'Der er plads til forbedring. Du bør tage et kursus i Plan2Learn om roller eller et læse Rollekataloget?'
} 

    restartButton.style.display = 'inline-block';
    rolleKatalogImg.style.display = 'inline-block';
    QRrolleKatalogImg.style.display = 'inline-block';
    submitButton.style.display = 'none';

  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
     showSlide(currentSlide - 1);
  }

  function restart() {
    location.reload();
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const resultText = document.getElementById('resultText');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Hvem har ansvaret for journalisering af kontrakt, kontrol af betalinger, faktura og kontraktindhold?",
      answers: {
        a: "Systemejer",
        b: "Systemadministrator",
        c: "Leder",
        d: "IT-indkøbsansvarlig"
      },
      correctAnswer: "a"
    },
    {
      question: "Hvem er ansvarlig for, at medarbejderne har de fornødne kompetancer til at anvende et it-system?",
      answers: {
        a: "Systemejer",
        b: "Systemaansvarlig",
        c: "Leder",
        d: "Brugeransvarlig"
      },
      correctAnswer: "c"
    },
    {
      question: "Hvis opgave er det, at sørge for at systemet fungerer, administreres og supporteres?",
      answers: {
        a: "Systemejer",
        b: "Systemaansvarlig",
        c: "Superbruger",
        d: "Brugeransvarlig"
      },
      correctAnswer: "b"
    },
    {
      question: "Hvem har ansvaret for at der er økonomi til indkøb og drift af et it-system?",
      answers: {
        a: "Systemejer",
        b: "Systemadministrator",
        c: "Leder",
        d: "IT-indkøbsansvarlig"
      },
      correctAnswer: "a"
    },
    {
      question: "Hvilken rolle hjælper brugerne i det daglige og tager kontakt til den systemansvarlige ved fejl?",
      answers: {
        a: "Systemejer",
        b: "Superbruger",
        c: "Leder",
        d: "Brugeransvarlig"
      },
      correctAnswer: "b"
    },
        {
      question: "Hvis der er en databehandlerkonstruktion, hvem har så ansvaret for, at der foreligger en databehandleraftale og der føres tilsyn?",
      answers: {
        a: "Systemejer",
        b: "Systemaansvarlig",
        c: "Leder",
        d: "Systemadministrator"
      },
      correctAnswer: "a"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const restartButton = document.getElementById("restart");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  const rolleKatalogImg = document.getElementById("rollekatalogImg");
  const QRrolleKatalogImg = document.getElementById("qrRollekatalogImg");

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  restartButton.addEventListener("click", restart);
})();