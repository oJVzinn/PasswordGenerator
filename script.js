let sizeNow;

function generatePassword() {
    let size = document.getElementById("size").value;
    if (size === "" || size <= 0) {
        alert("Coloque uma quantia válida!");
        return;
    }

    setValueInPassword(`Senha gerada: ${loadPassword(size)}`)
    alert("Senha gerada com sucesso!")
}

async function copyPassword() {
    let passNow = document.getElementById("passGen").textContent;
    if (passNow === "Senha gerada: ...") return;
    try {
        await navigator.clipboard.writeText(passNow.replace("Senha gerada: ", ""));
        alert("Senha copiada!");
    } catch (err) {
        alert(`Falha ao copiar: ${err}`)
        throw new Error(err)
    }
}

function loadPassword(length){
    const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const especiais = "!@#$%&*";

    const todos = maiusculas + minusculas + numeros + especiais;

    if (length < 4) {
        alert("A senha deve ter pelo menos 4 caracteres para atender todos os requisitos.")
        throw new Error("A senha deve ter pelo menos 4 caracteres para atender todos os requisitos.")
    }

    let senha = [];

    senha.push(maiusculas[Math.floor(Math.random() * maiusculas.length)]);
    senha.push(minusculas[Math.floor(Math.random() * minusculas.length)]);
    senha.push(numeros[Math.floor(Math.random() * numeros.length)]);
    senha.push(especiais[Math.floor(Math.random() * especiais.length)]);

    for (let i = senha.length; i < length; i++) senha.push(todos[Math.floor(Math.random() * todos.length)]);

    return senha.join("");
}

function setValueInPassword(value) {
    document.getElementById("passGen").textContent = value;
}

onload = function() {
    setValueInPassword(`Senha gerada: ...`)
    sizeNow = document.getElementById("size").value;
    document.getElementById("size").addEventListener("input", ()=> {
        if (document.getElementById("size").value > 20) {
            document.getElementById("size").value = sizeNow;
            return
        }

        sizeNow = document.getElementById("size").value;
    });
}