import {mapmodeUI} from './UIconnections.js'

document.querySelector('#mapmode').addEventListener('click', (event) => {
  if (mapmodeUI.checked) {
    event.target.classList.remove('checked')
    mapmodeUI.checked = false
  } else {
    event.target.classList.add('checked')
    mapmodeUI.checked = true
  }
  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("change", false, true);
  mapmodeUI.dispatchEvent(evt);
})
