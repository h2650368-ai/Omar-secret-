/*
  ✦ SECRET LETTER
  لتعديل الرسالة: غيّر النصوص داخل مصفوفة messageParagraphs و extra message في index.html.
  لتشغيل الموسيقى: ضع ملف MP3 باسم music.mp3 بجوار الملفات. المتصفح يحتاج ضغطة المستخدم قبل التشغيل.
*/
const messageParagraphs = [
  "يا صاحبي… يمكن مش كل يوم بقولك إنت غالي عندي قد إيه، ويمكن ساعات بنهزر ونضحك ونعدّي الكلام اللي جوانا كأنه عادي… بس الحقيقة إن وجودك في حياتي حاجة أنا مقدّرها بجد.",
  "الصاحب الجدع مش لازم يكون موجود كل ثانية، ولا لازم الكلام بينكم يفضل شغال طول اليوم. كفاية إنك تبقى عارف إن فيه حد تقدر ترجعله، تضحك معاه من قلبك، وتحكيله من غير ما تحس إنك محتاج تمثّل أو تشرح نفسك كتير.",
  "أنا بتمنالك أيام أهدى من اللي فاتت، وضحكة من قلبك، وراحة بال تستاهلها. ولو الدنيا ضغطت عليك في يوم، أتمنى تفتكر إنك مش قليل، وإن وجودك فارق، وإنك تستاهل كل حاجة حلوة جاية في طريقك.",
  "شكرًا على كل ذكرى حلوة، وكل موقف خلّى اليوم أخف، وكل مرة كنت فيها على طبيعتك. يمكن الرسالة دي بسيطة، بس اللي وراها أكبر من الكلام… إنت مش مجرد صاحب، إنت أخ اختارته الأيام. 🫂❤️"
];

const openLetter = document.getElementById('openLetter');
const envelope = document.getElementById('envelope');
const tapText = document.getElementById('tapText');
const messageSection = document.getElementById('messageSection');
const messageText = document.getElementById('messageText');
const signature = document.getElementById('signature');
const extraButton = document.getElementById('extraButton');
const extraMessage = document.getElementById('extraMessage');
const restartButton = document.getElementById('restartButton');
const soundToggle = document.getElementById('soundToggle');
const soundLabel = document.getElementById('soundLabel');
const ambientAudio = document.getElementById('ambientAudio');
const toast = document.getElementById('toast');
let opened = false;
let typingTimer = null;
let toastTimer = null;
let soundOn = false;

function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function burst(x, y, count = 20) {
  const symbols = ['♥', '♡', '✦', '✧', '✨', '🤍', '❤️'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = `${x + (Math.random() - .5) * 100}px`;
    p.style.top = `${y + (Math.random() - .5) * 45}px`;
    p.style.setProperty('--dx', `${(Math.random() - .5) * 190}px`);
    p.style.setProperty('--dy', `${-70 - Math.random() * 180}px`);
    p.style.setProperty('--duration', `${1.7 + Math.random() * 1.7}s`);
    p.style.setProperty('--size', `${10 + Math.random() * 15}px`);
    p.style.color = ['#ed7187', '#d7b879', '#fff0f3', '#bd8bd4'][Math.floor(Math.random() * 4)];
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 3700);
  }
}

function typeMessage() {
  clearTimeout(typingTimer);
  messageText.innerHTML = '';
  signature.hidden = true;
  const paragraphNodes = messageParagraphs.map(() => {
    const p = document.createElement('p');
    p.className = 'paragraph';
    messageText.appendChild(p);
    return p;
  });

  function typeParagraph(pIndex, cIndex, caret) {
    if (pIndex >= messageParagraphs.length) {
      signature.hidden = false;
      return;
    }
    const txt = messageParagraphs[pIndex];
    if (cIndex < txt.length) {
      caret.before(document.createTextNode(txt.charAt(cIndex)));
      const ch = txt.charAt(cIndex);
      typingTimer = setTimeout(
        () => typeParagraph(pIndex, cIndex + 1, caret),
        /[،…؛.!؟]/.test(ch) ? 145 : 27
      );
    } else {
      caret.remove();
      if (pIndex + 1 < messageParagraphs.length) {
        const nextCaret = document.createElement('span');
        nextCaret.className = 'typed-caret';
        paragraphNodes[pIndex + 1].appendChild(nextCaret);
        typingTimer = setTimeout(() => typeParagraph(pIndex + 1, 0, nextCaret), 320);
      } else {
        signature.hidden = false;
      }
    }
  }
  const caret = document.createElement('span');
  caret.className = 'typed-caret';
  paragraphNodes[0].appendChild(caret);
  typeParagraph(0, 0, caret);
}

openLetter.addEventListener('click', () => {
  if (opened) return;
  opened = true;
  openLetter.classList.add('opened');
  tapText.textContent = 'الجواب بيتفتح… 💌';
  const rect = openLetter.getBoundingClientRect();
  burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 32);
  setTimeout(() => {
    messageSection.hidden = false;
    tapText.textContent = 'رسالتك وصلت للقلب 🤍';
    messageSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    typeMessage();
    burst(window.innerWidth / 2, window.innerHeight * .55, 18);
  }, 900);
});

extraButton.addEventListener('click', () => {
  const show = extraMessage.hidden;
  extraMessage.hidden = !show;
  extraButton.innerHTML = show ? 'خبّي الكلام ده تاني <span>✦</span>' : 'لسه في كلام مستخبي <span>✦</span>';
  if (show) {
    burst(extraButton.getBoundingClientRect().left + extraButton.offsetWidth / 2, extraButton.getBoundingClientRect().top, 16);
    setTimeout(() => extraMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150);
  }
});

restartButton.addEventListener('click', () => {
  clearTimeout(typingTimer);
  opened = false;
  openLetter.classList.remove('opened');
  messageSection.hidden = true;
  tapText.innerHTML = '<span class="pulse-dot"></span> دوس على الجواب عشان تفتحه';
  messageText.innerHTML = '';
  signature.hidden = true;
  extraMessage.hidden = true;
  extraButton.innerHTML = 'لسه في كلام مستخبي <span>✦</span>';
  document.getElementById('letterSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

soundToggle.addEventListener('click', async () => {
  if (!soundOn) {
    try {
      await ambientAudio.play();
      soundOn = true;
      soundToggle.classList.add('active');
      soundLabel.textContent = 'الصوت شغال';
      showToast('الموسيقى اشتغلت 🎵');
    } catch (e) {
      showToast('ضيف ملف music.mp3 في مجلد الموقع لتشغيل الموسيقى 🎵');
    }
  } else {
    ambientAudio.pause();
    soundOn = false;
    soundToggle.classList.remove('active');
    soundLabel.textContent = 'الصوت مقفول';
    showToast('تم إيقاف الصوت');
  }
});

document.getElementById('secretButton').addEventListener('click', () => {
  showToast('سر صغير: الصحاب الحقيقية نعمة مش بتتعوّض 🫂');
  burst(35, window.innerHeight - 35, 12);
});

// لعبة الأسئلة: لا نحكم على إجابات الصداقة تلقائيًا؛ النتيجة تعتمد على عدد الإجابات المكتوبة فقط.
document.getElementById('quizSubmit').addEventListener('click', () => {
  const fields = [...document.querySelectorAll('.quiz-question input, .quiz-question textarea')];
  const answered = fields.filter(field => field.value.trim().length > 0).length;
  const result = document.getElementById('quizResult');
  let title, message;
  if (answered <= 3) {
    title = 'صديق من بعيد 😄';
    message = `جاوبت على ${answered} من 10. لسه قدامك فرصة تعرفني أكتر!`;
  } else if (answered <= 7) {
    title = 'إحنا نص نص 😂';
    message = `كتبت إجابات ${answered} أسئلة. محتاجين شوية قعدات وحكاوي زيادة!`;
  } else if (answered <= 9) {
    title = 'إنت أخويا ❤️🫂';
    message = `جاوبت على ${answered} من 10. واضح إنك مركز معايا يا صاحبي!`;
  } else {
    title = 'أقرب حد ليا 😉❤️';
    message = 'جاوبت على العشرة كلهم! كده بقى لازم نراجع الإجابات ونشوف إنت حافظني قد إيه 😂';
  }
  result.innerHTML = `<strong>${title}</strong><span>${message}</span><br><small>دي نتيجة حسب عدد الإجابات المكتوبة، مش تصحيح لإجاباتك.</small>`;
  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  burst(window.innerWidth / 2, result.getBoundingClientRect().top, 18);
});

// نجوم خفيفة مرسومة على canvas، من غير مكتبات خارجية
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
function resizeStars() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  stars = Array.from({ length: Math.min(100, Math.floor(window.innerWidth / 8)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.2 + .2,
    alpha: Math.random() * .45 + .1,
    speed: Math.random() * .006 + .002,
    phase: Math.random() * Math.PI * 2
  }));
}
function drawStars(time = 0) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const s of stars) {
    const a = s.alpha + Math.sin(time * s.speed + s.phase) * .16;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(238,215,225,${Math.max(.04, a)})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
window.addEventListener('resize', resizeStars);
resizeStars();
requestAnimationFrame(drawStars);
  
