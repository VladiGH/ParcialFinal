window.onload = ()=>{
    app.init();
}
let app = {
    init: function(){
        this.addEvents();
        this.loadContent();
    },
    addEvents: function(){
        document.FPForm.addEventListener("submit", event => {
            this.submitPost(event, this.addRow);
        });
    },
    addRow: function(data){
        let tbody= document.getElementsByClassName("FPS")[0];
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${data.id}</td>
                        <td>${data.nombre}</td>
                        <td>${data.partidoPolitico}</td>
                        <td>${data.sueldo}</td>   
                        <td>
                            <a href="#" class="update"> Update </a>
                            <a href="#" class="delete"> Delete </a>
                        </td>     
                        `
        document.getElementsByName("update")[0].addEventListener('click', event =>{
            this.submitPost(event, this.updatePost());
        });
        document.getElementsByName("delete")[0].addEventListener('click', event =>{
            this.submitPost(event, this.deletePost());
        });
        tbody.appendChild(tr);
    },
    submitPost: (event, addRow)=>{
        event.preventDefault();
        let data ={
            nombre: document.FPForm.nombre.value,
            partidoPolitico: document.FPForm.partidoPolitico.value,
            sueldo: document.FPForm.sueldo.value
        }
        fetch('/api/FuncionarioPublico',{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(_data =>{
            if(_data.ok){
                addRow(_data.guardado);
            }else{
                document.getElementsByClassName("errors")[0].innerText = 'No se guardó'
            }
        });
    },
    loadContent: function(){
        fetch('/api/FuncionarioPublico',{
            method: 'GET'
        })
        .then(res => {return res.json()})
        .then(data =>{
            if(data.ok){
                data.FPS.forEach(elemento => {
                    this.addRow(elemento);
                })
            }
        });
    },
    deletePost:(event, data, tr, tbody)=>{
        event.preventDefault();
        fetch('/api/FuncionarioPublico/'+ data._id,{
            method: 'DELETE'
        }).then(res => res.json())
        .then(res =>{
            if(res.ok){
                tbody.removeChild(tr);
            }
            else{
                document.getElementsByClassName("errors")[0].innerText = "No se puede eliminar"
            }
        });
    },
    updatePost:(tr, tbody, data)=>{

    }

}