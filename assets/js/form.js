class formSubmit {
    constructor(settings){
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySucess(){
        this.form.innerHTML = this.settings.sucess;
    }

    displayError(){
        this.form.innerHTML = this.settings.error;
    }
    getFormObject(){
        const formObject ={};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission (event) {
        event.preventDefault();
        event.target.disable = true;
        event.target.innerText = "Enviando formulário..."
    }

    async sendForm(event){
        try {
            this.onSubmission(event);
            await fetch(this.url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
            },
            body: JSON.stringify(this.getFormObject()),
        });
        this.displaySucess();
    } catch (error) {
        this.displayError();
        throw new Error(error);
    }
    }

    init(){
        if (this.form) this.formButton.addEventListener("click", () => this.sendForm);
        return this;
    }

}

const formSubmit = new formSubmit({
    form: "[data-form]",
    button: "[data-button]"
});

formSubmit.init();
