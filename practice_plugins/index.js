let fruits = [
    {id: 1, title: 'Apples', price: 20, img: 'https://www.osfhealthcare.org/blog/wp-content/uploads/2019/08/apples-OG-765x310.jpg'},
    {id: 2, title: 'Orages', price: 30, img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/half-of-orange-on-the-heap-of-oranges-royalty-free-image-1598525395.jpg'},
    {id: 3, title: 'Mangos', price: 40, img: 'https://www.thespruceeats.com/thmb/5qpYw9qwG7yRaqE3sob2c169gV4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/mango-at-the-market-506813675-587e60f53df78c17b6967f5e.jpg'},
]
/**
 * 1.add fruits cards with js (dynamic)
 */
const toHTML = fruit => `
<div class="col">
          <div class="card">
            <img class="card-img-top" style="height: 300px" src="${fruit.img}" alt="${fruit.title}">
            <div class="card-body">
              <h5 class="card-title">${fruit.title}</h5>
              <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">See the price</a>   <!-- atribute data  -->
              <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
            </div>
          </div>
        </div>
`

 function render() {
     //const html = fruits.map(fruit => toHTML(fruit))
     //or shorter way because we recive parameter fruit , anable to write 
     const html = fruits.map(toHTML).join('')

    document.querySelector('#fruits').innerHTML= html
 }

 render()

const priceModal = $.modal({
    title: 'Price of Product',
    closable: true,
    width: '400px',
    footerButtons:[
        {text: 'Close', type: 'primary', handler(){
            //console.log('Primary btn clicked')
            priceModal.close()
        }}//,
        // { text: 'Cancel', type: 'danger', handler(){
        //    // console.log('Danger btn clicked')
        //     modal.close()
        // }}     
    ]
})

/**this not got good , make new plugin  */
// const confirmModal = $.modal({
//     title: 'Do you sure?',
//     closable: true,
//     width: '400px',
//     footerButtons:[
//         {text: 'Cancel', type: 'secondary', handler(){
           
//             confirmModal.close()
//         }},
//         {text: 'Delete', type: 'danger', handler(){
           
//             confirmModal.close()
//         }}
//     ]
// })




document.addEventListener("click", event => {
    event.preventDefault() // dont show '#' in browser addres
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id // '+' because id is a number  
    const fruit = fruits.find(f => f.id === id)
   if(btnType === 'price') {
       priceModal.setContent(`
         <p>Price of ${fruit.title}: <strong>${fruit.price}$</strong></p>
       `)
       
       priceModal.open()
       console.log(fruit)
   }
   else if (btnType === 'remove'){
       $.confirm({
           title: 'Do you sure?',
           content:`<p>You delete fruit <strong>${fruit.title}</strong></p>` 
       }).then(() => {
           console.log('Remove')
           fruits = fruits.filter(f => f.id !== id)
           render()
       }).catch(() => {
           console.log('Cancel')
       })
    //    confirmModal.setContent(`
    //    <p>You delete fruit <strong>${fruit.title}</strong></p>   
    //    `)
    //    confirmModal.open()
   }
})

