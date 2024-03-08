(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

// Disable Submit Button After Submitting

function disabledButton () {
  let btns = document.querySelectorAll(".submitButton");
  btns.forEach((btn)=>{
    btn.disabled = true;
    btn.innerText = "Loading..";
    return btn;
  })
  
}