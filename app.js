const loadPhones = async(searchText ,dataLimit)=>{
    const URL =`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res =await fetch(URL);
    const data=await res.json();
    // console.log(data.data);
    displayPhones(data.data,dataLimit);
};


const displayPhones=(phones,dataLimit)=>{
    // console.log(phones);
    
    const phoneContainer=document.getElementById("phone-container");
    phoneContainer.textContent="";

    // display 10 phones only
    const showAll= document.getElementById('show-all');
    if (dataLimit && phones.length >10) {
         phones=phones.slice(0,10);
         showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none')
    }
    // phones=phones.slice(0,10);


// display no phones found
  const noPhone=document.getElementById('no-found-message')
    if(phones.length ===0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none');
    }
// display all phones

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
        <div class="card p-4 shadow-lg">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 class="card-title">${phone.phone_name}</h5>
               <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
               <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"data-bs-target="#phoneDetailModal">Show-Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv);
    });
    // stop spinner or loader
    toggleSpinner(false);

};

const processSearch =(dataLimit)=>{
    toggleSpinner(true);
    const searchField=document.getElementById('input-field');
    const searchText =searchField.value ;
    loadPhones(searchText,dataLimit);
}

// handle search button click
document.getElementById('btn-search').addEventListener('click',function () {

    // start loader
            //     toggleSpinner(true);
            //     const searchField=document.getElementById('input-field');
            //     const searchText =searchField.value ;
            //     loadPhones(searchText);

            processSearch(10)
})

// search input field enter key handler
document.getElementById('input-field').addEventListener('keypress',function(e){
    // console.log(e.key);
    if(e.key === 'Enter'){
        // Code for enter
        processSearch(10)
    }
})

const toggleSpinner =isLoading => {
    const loaderSection=document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}



// no the best way to load show all 
document.getElementById('btn-show-all')/addEventListener('click',function(){
    processSearch();
})

const loadPhoneDetails = async id=>{
    const URL=` https://openapi.programming-hero.com/api/phone/${id}`;
    const res =await fetch(URL);
    const data= await res.json();
    // console.log(data.data);
    displayPhoneDetails(data.data);
}
const displayPhoneDetails =phone =>{
   console.log(phone);
   const modalTitle =document.getElementById('phoneDetailModalLabel');
   modalTitle.innerText=phone.name;

   const phoneDetails=document.getElementById('phone-details');
   phoneDetails.innerHTML=`
   <P>Release Date:${phone.releaseDate ? phone.releaseDate : 'No releaseDate found'}</P>
   <p>Storage:${phone.mainFeatures ?phone.mainFeatures.storage :'No storage information found'}</p>
   <p>Others:${phone.others ? phone.others.Bluetooth: 'No Bluetooth Information'}</p>
   `
}



loadPhones('apple');