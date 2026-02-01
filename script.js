// ⭐ BINTANG (LEBIH BANYAK)
for(let i=0;i<200;i++){
    let star=document.createElement("div");
    star.className="star";
    star.style.top=Math.random()*100+"%";
    star.style.left=Math.random()*100+"%";
    star.style.animationDelay=Math.random()*2+"s";
    document.body.appendChild(star);
}

let mode="login";
const audio=document.getElementById("bgm");

// 🎵 Musik langsung siap (play saat klik pertama)
document.body.addEventListener("click",()=>{
    audio.volume=0.6;
    audio.play().catch(()=>{});
},{once:true});

// Ambil data user
let users = JSON.parse(localStorage.getItem("users")) || [];
renderUsers();

function toggleMode(){
    mode = mode==="login" ? "register" : "login";
    document.getElementById("title").innerText =
        mode==="login" ? "Login" : "Daftar";
    document.querySelector("button").innerText =
        mode==="login" ? "Masuk" : "Daftar";
    document.querySelector(".toggle").innerText =
        mode==="login" ? "Belum punya akun? Daftar" : "Sudah punya akun? Login";
    document.getElementById("msg").innerText="";
}

function submitForm(){
    const user=document.getElementById("username").value.trim();
    const pass=document.getElementById("password").value.trim();
    const msg=document.getElementById("msg");

    if(!user || !pass){
        msg.innerText="Lengkapi semua data";
        return;
    }

    if(mode==="register"){
        if(users.find(u=>u.username===user)){
            msg.innerText="Username sudah terdaftar";
            return;
        }

        users.push({username:user,password:pass});
        localStorage.setItem("users",JSON.stringify(users));
        msg.innerText="Akun berhasil dibuat 💜";
        renderUsers();
        toggleMode();
    }else{
        const found = users.find(u=>u.username===user && u.password===pass);
        if(found){
            msg.innerText="Login berhasil ✨";
        }else{
            msg.innerText="Username atau password salah";
        }
    }
}

function renderUsers(){
    const list=document.getElementById("userList");
    list.innerHTML="";
    users.forEach(u=>{
        const li=document.createElement("li");
        li.textContent="• "+u.username;
        list.appendChild(li);
    });
}
