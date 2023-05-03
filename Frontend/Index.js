
const url="http://localhost:4000"


document.getElementById("DashBoard").addEventListener("click",(e)=>{
    let token=localStorage.getItem("token");
    console.log(token);
    if(token){
        inventoryData()
        PostFormOfInventory()
        document.getElementById("Register").innerHTML=null
    }else{
        alert("go for login")
    }
})



function RegstrationButton(e){
   let div= document.getElementById("Register")
   let btnText=document.getElementById("Change")
   let PostFromDiv=document.getElementById("PostFrom");
   PostFromDiv.innerHTML=null
   let ItemsDiv=document.getElementById("Items");
   ItemsDiv.innerHTML=null

   console.log(btnText.innerText);
   if(btnText.innerText=="SignIn"){
    div.innerHTML=`
    <form action="" id="Login" >
            <input type="text" placeholder="email" id="email">
            <input type="password" placeholder="password" id="password">
            <input type="submit" class="submit">
        </form>
    `
  document.getElementById("Login").addEventListener("submit",(e)=>{
    e.preventDefault()
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let obj={
        email,password
    }
    console.log(email,password);
    LoginApi(obj)
  })
  
    btnText.innerText="SignUp"
   }
   else if(btnText.innerText=="SignUp"){
    div.innerHTML=`
    <form action="" id="Signup">
            <input type="text" placeholder="name" id="name">
            <input type="text" placeholder="age" id="age">
            <input type="text" placeholder="email" id="email">
            <input type="password" placeholder="password" id="password">
            <input type="submit" class="submit">
        </form>
    `
    document.getElementById("Signup").addEventListener("submit",(e)=>{
        console.log("1");
        e.preventDefault()
        let name=document.getElementById("name").value;
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;
        let age=document.getElementById("age").value;
        age=+age;
        let obj={
            name,age,email,password
        }
        console.log(obj);
        RegisterApi(obj)
    })

    btnText.innerText="SignIn"
   }
}




//////  SocketIo Emitting the message   //////
    function ConnectSocket(){
     const socket=io("ws://localhost:4000",{transports:["websocket"]});
     socket.on("welcome",(msg)=>{
  })
  socket.emit("hello","hellofrom user")
  socket.on("addInventery",(msg)=>{
     alert(msg)
  })
  socket.on("get",(msg)=>{
    console.log(msg);
     alert(msg);
  })
    }


/////////

////Signup

async function RegisterApi(obj){
    try {
        let response=await fetch(`${url}/user/registration`,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(obj)
        })
        let result=await response.json();
        console.log(result.msg);
        alert(result.msg)
        // window.location.href="./index.html"
    } catch (error) {
        
    }
}

/////Login

async function LoginApi(obj){
    console.log(obj);
    try {
        let response=await fetch(`${url}/user/login`,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(obj)
        })
        console.log(response);
        let result=await response.json();
        console.log(result);
        alert(result.msg)
        localStorage.setItem("token",result.token)
        window.location.href="./index.html"
    } catch (error) {
        console.log(error);
    }
}


    async function fetchInvetntory(){
     console.log("object");
     try {
         const response=await fetch("http://localhost:4000/inventory");
         if(response.ok){
             const result=await response.json();
            
             ConnectSocket()
             console.log(result);
             
         }          
           
     } catch (error) {
         console.log(error);
     }
    }

    // document.getElementById("btn").addEventListener("click",()=>{
    //  fetchInvetntory()
    // })

    
async function inventoryData(){
    let token=localStorage.getItem("token")
    try {
        let response=await fetch(`${url}/inventory`,{
            method:"GET",
            headers:{
                "Conent-Type":"Application/json",
                Authorization:`${token}`
            }
        })
        let result=await response.json();
        displayData(result)
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

function displayData(result){
    console.log(result);
let appenddiv=document.getElementById("Items");
appenddiv.innerHTML=null
    result.map((item)=>{
     let div=document.createElement("div");
     let nameDisplay=document.createElement("input");
     nameDisplay.placeholder=item.name;
     let priceDisplay=document.createElement("input");
     priceDisplay.placeholder=item.price
     let desc=document.createElement("input");
     desc.placeholder=item.description
     let deletebtn=document.createElement("button");
     deletebtn.innerText="Delete";
     let editBtn=document.createElement("button");
     editBtn.innerText="Edit"
     deletebtn.addEventListener("click",(e)=>{
        console.log("e");
        deleteApi(item._id)
    })
    editBtn.addEventListener("click",(e)=>{
        let price=priceDisplay.value;
        let name=nameDisplay.value;
        let description=desc.value;
        if(price==""){
            price=item.price
        }
        if(name==""){
            name=item.name
        }
        if(description==""){
            description=item.description
        }
        let obj={
            name,price,description
        }
        console.log(obj);
        editApi(item._id,obj)
    })
     div.append(nameDisplay,priceDisplay,desc,deletebtn,editBtn);
     appenddiv.append(div)
    })
    
}

async function deleteApi(id){
    try {
        let token=localStorage.getItem("token")
        console.log(token);
        console.log(id);
        let response=await fetch(`${url}/inventory/${id}`,{
            method:"Delete",
            headers:{
                "Content-Type":"Application/json",
                Authorization:`${token}`
            }
        })
        let result=await response.json();
        console.log(result);
        ConnectSocket()
        inventoryData()
    } catch (error) {
        console.log(error);
    }
}
 

function PostFormOfInventory(){
    let formdiv=document.getElementById("PostFrom");
    formdiv.innerHTML=    `
    <form id="postData">
    <input type="text" id="nameItem" placeholder="Name"><br>
    <input type="number" id="price" placeholder="Price"><br>
    <input type="text" id="desc" placeholder="Description"><br>
    <input type="submit" class="submit">
    </form>
    `
    document.getElementById("postData").addEventListener("submit",(e)=>{
        e.preventDefault()
        let name=document.getElementById("nameItem").value;
        let price=document.getElementById("price").value;
        let description=document.getElementById("desc").value;
        let obj={
            name,price,description
        }
        InventoryPost(obj)
    })
}

async function InventoryPost(obj){
    try {
        console.log(obj);
        let token=localStorage.getItem("token")
        const response=await fetch(`${url}/inventory`,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json",
                Authorization:token
            },
            body:JSON.stringify(obj)
        });
        console.log(response);
        let  result=await response.json();
        console.log(result);
        ConnectSocket()
        inventoryData()
    } catch (error) {
        console.log(error);
    }
}


async function editApi(id,obj){
    try {
        let token=localStorage.getItem("token")
        let response=await fetch(`${url}/inventory/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"Application/json",
                Authorization:token
            },
            body:JSON.stringify(obj)
        })
        let result=await response.json();
        console.log(result);
        ConnectSocket()
        inventoryData()
    } catch (error) {
        console.log(error);
    }
}
 