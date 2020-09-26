import {getListProductService, deleteProductService, addProductService, getProductServiceByID, updateProductService,callAPI} from "./utils/callAPI.js";
import Product from "./models/Product.js";


const renderHTML = ()=>{
    const contentHTML =`
    <div class="card text-white bg-dark">
    <div class="card-body">
      <h4 class="card-title">Danh sách sản phẩm</h4>
      <div class='container'>
        <div class="row">
          <div class="col-md-3">
            <input id="maSP" class="form-control" placeholder="Mã SP" disabled />
          </div>
          <div class="col-md-3">
            <input id="tenSP" class="form-control" placeholder="Tên SP" />
          </div>
          <div class="col-md-3">
            <input id="gia" class="form-control" placeholder="Giá" />
          </div>
          <div class="col-md-3">
            <input id="hinhAnh" class="form-control" placeholder="Link hình" />
          </div>
        </div>
        <br />
        <button id="btnThem" class="btn btn-success" onclick="addProduct()">Thêm sản phẩm</button>
        <button id="btnCapNhat" class="btn btn-success" onclick="updateProduct()">Cap nhat</button>
      </div>
    </div>
  </div>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>Mã SP</th>
          <th>Tên SP</th>
          <th>Giá </th>
          <th>Hình ảnh</th>
          <th>Chức Năng</th>
        </tr>
      </thead>
      <tbody id="tblDanhSachSanPham">

      </tbody>
    </table>
  </div>
    `
    document.getElementById("root").innerHTML = contentHTML;
}
const renderListProduct =()=>{
    callAPI("SanPham", "GET",null)
    .then((result)=>{
        const contentTbody = renderListHTML(result.data);
        getEle("tblDanhSachSanPham").innerHTML = contentTbody;
        
    })
    .catch((err)=>{
        console.log(err);
    })
    
}


renderListProduct();
renderHTML();
const renderListHTML=(listProduct)=>{
    
    if(listProduct && listProduct.length >0){
        let contentTable = "";
        listProduct.map((product)=>{
            contentTable +=`
            <tr>
                <td>${product.id}</td>
                <td>${product.tenSP}</td>
                <td>${product.gia}</td>
                <td>
                    <img src="${product.hinhAnh}" width="50px" />    
                </td>
                <td>
                    <div class"buttons>
                      <button id="btnThem" class="btn btn-info" onclick="EditProduct(${product.id})">Edit</button>
                      <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                    </div>
                </td>
            </tr>
            `
        })
        return contentTable;
    }
    
}
window.deleteProduct = deleteProduct;
function deleteProduct(id){

    callAPI(`SanPham/${id}`, "DELETE", null)
    .then((rs)=>{
      alert("Delete successful");
      
      renderListProduct();
    })
    .catch((err)=>{
      console.log(err);
    })

}
window.addProduct = addProduct;
function addProduct(){
  let ten = getEle("tenSP").value;
  let gia = getEle("gia").value;
  let hinhAnh = getEle("hinhAnh").value;
  let product = new Product("",ten, gia, hinhAnh);
  console.log(product);
  callAPI(`SanPham`, "POST", product)
  .then((rs)=>{
      alert("Add Succesful");
      renderListProduct();
  })
}
window.updateProduct = updateProduct;
function updateProduct(){
  let maSP = getEle("maSP").value;
  let ten = getEle("tenSP").value;
  let gia = getEle("gia").value;
  let hinhAnh = getEle("hinhAnh").value;  
  let product = new Product(maSP,ten, gia, hinhAnh);
  callAPI(`SanPham/${product.id}`,"PUT",product)
  .then((rs)=>{
      alert("Update Successful");
      renderListProduct();
  })
  .catch((err)=>{
    console.log(err);
  })
  
}
window.EditProduct =EditProduct;
function EditProduct(id){
  callAPI(`SanPham/${id}`, "GET", null)
  .then((rs)=>{
      /**
       * gán tất cả dữ liệu trả về 4 ô input
       */
      getEle("maSP").value = rs.data.id;
      getEle("tenSP").value = rs.data.tenSP;
      getEle("gia").value = rs.data.gia;
      getEle("hinhAnh").value = rs.data.hinhAnh;
  })
  .catch((err)=>{
    console.log(err);
  })

}
const getEle =(id)=>{
    return document.getElementById(id);
}