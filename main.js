document.getElementById('generate-btn').addEventListener('click', generateLottoGames);

function generateLottoNumbers() {
  const numbers = [];
  while (numbers.length < 6) {
    const r = Math.floor(Math.random() * 45) + 1;
    if (numbers.indexOf(r) === -1) numbers.push(r);
  }
  return numbers.sort((a, b) => a - b);
}

function getBallClass(num) {
  if (num <= 10) return 'ball-1';
  if (num <= 20) return 'ball-11';
  if (num <= 30) return 'ball-21';
  if (num <= 40) return 'ball-31';
  return 'ball-41';
}

function generateLottoGames() {
  const resultsContainer = document.getElementById('lotto-results');
  resultsContainer.innerHTML = ''; // 기존 결과 삭제

  for (let i = 0; i < 5; i++) {
    const gameNumbers = generateLottoNumbers();
    const gameDiv = document.createElement('div');
    gameDiv.className = 'lotto-set';

    gameNumbers.forEach(num => {
      const ball = document.createElement('div');
      ball.className = `ball ${getBallClass(num)}`;
      ball.innerText = num;
      gameDiv.appendChild(ball);
    });

    resultsContainer.appendChild(gameDiv);
  }
}

// 초기 로드시 한 번 생성
generateLottoGames();