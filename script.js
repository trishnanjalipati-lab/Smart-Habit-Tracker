const habitcontainer=document.querySelector(".habits-container");
const form=document.querySelector(".habits");
show();
form.addEventListener("submit",  (e)=>{
    e.preventDefault();
    habit=document.getElementById("habit").value;
    if (!habit) return;      
    const habits=load();
        habits.push(habit);
        localStorage.setItem("habit",JSON.stringify(habits))
        document.getElementById("habit").value = "";
        show();
})
    
    

function load(){
    return JSON.parse(localStorage.getItem("habit"))|| [];
}
function show(){
    const habits=load();
    habitcontainer.innerHTML="";

    if (habits.length === 0) {
    habitcontainer.innerHTML = `<p style="color:#666;">No habits added yet.</p>`;
    return;
    }

    habits.forEach((elements,index) => {
        const habitdiv=document.createElement("div");
        habitdiv.classList.add("habit");
        const checkbox=document.createElement("input");
        checkbox.type="checkbox";
        const label=document.createElement("label")
        label.textContent=elements;

        checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
        label.style.textDecoration = "line-through";
        } 
        else{
            label.style.textDecoration="none";
        }
        });

        //delete button 
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            const habits = load();
            habits.splice(index, 1);
            localStorage.setItem("habit", JSON.stringify(habits));
            show();
        
        });
        habitdiv.appendChild(checkbox);
        habitdiv.appendChild(label);
        habitdiv.appendChild(delBtn);
        habitcontainer.appendChild(habitdiv);


    });
}

