

// Disable Submit Button After Submitting

function disabledButton () {
  let btns = document.querySelectorAll(".submitButton");
  btns.forEach((btn)=>{
    btn.disabled = true;
    return btn;
  })
  
}

