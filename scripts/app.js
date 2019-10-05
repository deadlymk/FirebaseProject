var row = document.getElementById('row2');
const createProduct = document.getElementById('product-form')

var progress = document.getElementById('uploadProgress');
var button = document.getElementById('uploadButton')

//Making the upload picture here
button.addEventListener('change', (e) => {
    var file = e.target.files[0];
    var storageRef = storage.ref('productImg/' + file.name).put(file)



    storageRef.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        function () {
            // Upload completed successfully, now we can get the download URL
            storageRef.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);


                //add product here
                createProduct.addEventListener('submit', (e) => {
                    e.preventDefault();
                    db.collection('products').add({
                        Name: createProduct.name.value,
                        category: document.querySelector('.select-category').value,
                        Price: createProduct.price.value,
                        urlPic: downloadURL,
                        details: document.getElementById('textArea-product').value
                    })

                    reload_page();
                })

            })

        });
});


// reloading page
function reload_page() {

    window.location.reload();
}



// Test number 3



function renderProduct(ids){


ids.forEach(doc => {



    let growncolum = document.createElement('div');
    let productList = document.createElement('div')
    let productImg = document.createElement('div');
    let productListImg = document.createElement('img')
    let productName = document.createElement('h1');
    let productBody = document.createElement('div');
    let productPrice = document.createElement('p')
    let categoryProduct = document.createElement('p');
    let button = document.createElement('button');
    let cross = document.createElement('button');
    let styleI = document.createElement('i');
    let addToCartDiv = document.createElement('div');
    let productDetails = document.createElement('div');
    let productDetailsList = document.createElement('div');

   
    categoryProduct.innerHTML = doc.data().category;
    productListImg.src = doc.data().urlPic;
    productName.innerHTML = doc.data().Name;
    productPrice.innerHTML = doc.data().Price + "$";
    productDetailsList.innerHTML = doc.data().details;


    productDetailsList.setAttribute('class', 'product-details') 
    addToCartDiv.setAttribute('class', 'add-to-cart')
    styleI.setAttribute('class', "fas fa-trash");

    cross.setAttribute('class', 'admin');
    cross.innerHTML = 'remove';
    //    cross.innerHTML =  style="remove"

    button.innerHTML = "add cart"
    growncolum.setAttribute('class', "col-md-4 col-xs-6");
   
    productList.setAttribute('data-id', doc.id) 
    productList.setAttribute('class', 'product');
    productImg.setAttribute('class', "product-img");
    productBody.setAttribute('class', 'product-body')
    categoryProduct.setAttribute('class', 'product-category');
    productName.setAttribute('class', 'product-name');
    productPrice.setAttribute('class', 'product-price');
    button.setAttribute('class', 'add-to-cart-btn')


    
    row.appendChild(growncolum);
    growncolum.appendChild(productList);
   
    productList.appendChild(productImg);
  //  productList.appendChild(productDetailsList);
    productList.appendChild(productBody);
    productList.appendChild(addToCartDiv);
    addToCartDiv.appendChild(cross);
    productImg.appendChild(productListImg);
  //  productImg.appendChild(productDetailsList);
    productList.appendChild(productDetails);
    productBody.appendChild(productDetailsList);
    productBody.appendChild(categoryProduct);
    productBody.appendChild(productName);
    productBody.appendChild(productPrice);
    addToCartDiv.appendChild(button)


    cross.addEventListener('click', (e) => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        db.collection('products').doc(id).delete();
        reload_page();
    })


})    
    
        }

    





function renderView () {

   var ids =[];

    db.collection('products').get().then((snapshot) => {
        snapshot.forEach(doc => {
            ids.push(doc.id)
         
        })
        renderProduct(ids)
    })


}

renderView();

