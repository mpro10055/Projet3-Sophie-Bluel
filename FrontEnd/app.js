console.log("App.js chargé");
const API = "http://localhost:5678/api/works";

const gallery = document.querySelector(".gallery");
let allWorks = [];

function displayWorks(works) {
  gallery.innerHTML = "";
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const caption = document.createElement("figcaption");
    caption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}

fetch(API)
  .then((response) => {
    if (!response.ok) throw new Error("Erreur données");
    return response.json();
  })

  .then((data) => {
    allWorks = data;
    console.log(allWorks);
    displayWorks(allWorks);
    console.log("premier lien image =", allWorks[0].imageUrl);
  })

  .catch((error) => {
    console.error("Erreur :", error);
  });

//////////////////////////////////////////////////////////
const apiCategories = "http://localhost:5678/api/categories";

const filtersContainer = document.querySelector("#filters");

function filterCategories(id) {
  if (id == "0") {
    displayWorks(allWorks);
    return;
  }

  const filteredWorks = allWorks.filter(
    (work) => work.categoryId === Number(id)
  );
  displayWorks(filteredWorks);
}

fetch(apiCategories)
  .then((response) => response.json())
  .then((Categories) => {
    console.log("Categories :", Categories);

    const btnall = document.createElement("button");
    btnall.textContent = "Tous";
    btnall.dataset.id = "0";

    btnall.addEventListener("click", () => {
      filterCategories(btnall.dataset.id);
    });
    filtersContainer.appendChild(btnall);

    Categories.forEach((Category) => {
      const btn = document.createElement("button");
      btn.textContent = Category.name;
      btn.dataset.id = Category.id;

      if (
        Category.name === "Appartements" ||
        Category.name === "Hotels & restaurants"
      ) {
        btn.classList.add("large-button");
      }

      console.log("btn", btn);
      btn.addEventListener("click", () => {
        filterCategories(btn.dataset.id);
      });
      filtersContainer.appendChild(btn);
    });
  
      const categorySelect = document.getElementById("categorie");
      console.log("categorySelect =", categorySelect);
      if (categorySelect) {
        Categories.forEach((Categories) => {
          const option = document.createElement("option");
          option.value = Categories.id;
          option.textContent = Categories.name;
          categorySelect.appendChild(option);
        });
      }
  })

  .catch((error) => {
    console.error("Erreur :", error);
  });

//////////////////////////////////////////////////////////////////////////////////
console.log("App.js chargé");
const loginbutton = document.getElementById("login-button");
const buttonProjets = document.getElementById("button-projets");
const buttonContact = document.getElementById("button-contact");
const buttonHome = document.getElementById("button-home");
const modificationadmin = document.getElementById("modification");
const barUi = document.getElementById("bar");

if (buttonHome) {
  buttonHome.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html";
  });
}

if (buttonProjets) {
  buttonProjets.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html#portfolio";
  });
}

if (buttonContact) {
  buttonContact.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html#contact";
  });
}

function tokenUi() {
  const token = localStorage.getItem("token");
  console.log("tokenUi exécutée, token =", token);

  if (token) {
    loginbutton.textContent = "Logout";
    modificationadmin?.classList.remove("hidden");
    barUi.classList.remove("hidden");
  } else {
    loginbutton.textContent = "Login";
    modificationadmin?.classList.add("hidden");
    barUi.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  tokenUi();

  loginbutton.addEventListener("click", (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
      tokenUi();
    } else {
      window.location.href = "login.html";
    }
  });
});

if (modificationadmin) {
  modificationadmin.addEventListener("click", (e) => {
    e.preventDefault();

    barUi.classList.remove("hidden");
    console.log("Ouverture barre d’édition");
  });
}

////////////////////////////////////////////////////////

 const pictures = document.querySelector("#modall .pictures");
  function displaymodalpictures(works) {
    if (!pictures) {
      console.error("Élément introuvable dans la modale");
      return;
    }
    pictures.innerHTML = "";
    works.forEach((work) => {


      const img = document.createElement("img");

      img.src = work.imageUrl;
      img.alt = work.title;
      img.classList.add("modal-image");
      pictures.appendChild(img);
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      deleteButton.classList.add("delete-button");
      const item=document.createElement("div");
      item.className="modal-item";
      item.appendChild(img);
        item.appendChild(deleteButton)
      pictures.appendChild(item);

      const deleteUrl = 'http://localhost:5678/api/works/' + work.id;

      deleteButton.addEventListener('click', (e) => {

      fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'œuvre' + response.status);
          }
        })
        .then(data => {
          console.log('Œuvre supprimée avec succès:', data);
          allWorks=allWorks.filter(w=>w.id !==work.id)
          displayWorks(allWorks);
          displaymodalpictures(allWorks);

        })
        .catch(error => {
          console.error('Erreur:', error);
        });
  }
      );
    });
  }

  
document.addEventListener("DOMContentLoaded", () => {

  const modall = document.getElementById("modall");
  const pictures = document.querySelector("#modall .pictures");
  const closemodal = document.getElementById("closemodal");
  const modificationadmin = document.getElementById("modification");
  const onemodal = document.getElementById("one");
  const ajoutpictures = document.getElementById("ajoutpictures"); 
  const addphoto = document.getElementById("addphoto");
  const modalwrapper = document.getElementById("modalwraper");

  if (modificationadmin) {
    modificationadmin.addEventListener("click", (e) => {
      e.preventDefault();
      modall.classList.add("active");
      ajoutpictures.classList.add("hidden");
      onemodal.classList.remove("hidden");

      displaymodalpictures(allWorks);
      console.log("Ouverture modale");
    });
  }

  if (closemodal) {
    closemodal.addEventListener("click", (e) => {
      e.preventDefault();
      modall.classList.remove("active");
      console.log("Fermeture modale");
    });
  }

  if (addphoto) {
    addphoto.addEventListener("click", (e) => {
      e.preventDefault();
    resetAddForm();
      ajoutpictures.classList.remove("hidden");
      onemodal.classList.add("hidden");
      console.log("Ouverture ajoutpictures");
    });
  }
  if (modall)
    modall.addEventListener("click", (e) => {
  if(e.target===modall){
  modall.classList.remove("active");
 }
});
})

//////////////////////////////////////////////////////////
////modale deux/

const clostwo = document.getElementById("clostwo");
const fileInput = document.getElementById("file-input");
const valider= document.getElementById("valider");
const back= document.getElementById("back");
const modall = document.getElementById("modall");
const ajoutpictures = document.getElementById("ajoutpictures"); 
const onemodal = document.getElementById("one");
const preview = document.getElementById("preview");
const uploadButton = document.getElementById("upload-button");

console.log(clostwo)
console.log("preview =", preview);
document.addEventListener("DOMContentLoaded", () => {
  if (clostwo) {
    clostwo.addEventListener("click", (e) => {
      e.preventDefault();
      modall.classList.remove("active");
      console.log("Fermeture modale");
    });
  }
  if(back) {
    back.addEventListener("click", (e) => {
      e.preventDefault();
      ajoutpictures.classList.add("hidden");
      onemodal.classList.remove("hidden");
      console.log("Retour modale 1");
    });
  }
  if(uploadButton) {
    uploadButton.addEventListener("click", (e) => {
     fileInput.click();
      console.log("Upload button clicked");
    });
  };
}
);

/////////////////////////////////////////////////////
//const fileInputElement = document.getElementById("file-input");
const imagePreviewElement = document.getElementById("preview");
const iconupload = document.getElementById("icon-upload");
labelupload = document.querySelector(".labelupload");



fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviewElement.src = e.target.result;
      console.log("File loaded:", e.target.result);

      if (imagePreviewElement.src) {
        uploadButton.classList.add("hidden");
        imagePreviewElement.classList.remove("hidden");
        iconupload.classList.add("hidden");
        errorfichier.classList.add("hidden")

      }
    }
    reader.readAsDataURL(file);
  }
  console.log("Selected file:", file);
  });



const titleInput = document.getElementById("titre");
const categorySelect = document.getElementById("categorie");
const formulaire = document.getElementById("formulaire");
const errorfichier= document.getElementById("errorfichier");



 function resetAddForm(){
  formulaire.reset();
  fileInput.value="";
  imagePreviewElement.src="";
  errorfichier.classList.add("hidden")
  error.classList.add("hidden");
  imagePreviewElement.classList.remove("hidden");
  uploadButton.classList.remove("hidden");
  iconupload.classList.remove("hidden");
  }



formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("formulaire");

 const maximum = 15
 const file = fileInput.files[0];
 const title = titleInput.value;
 const category = Number(categorySelect.value);

   if(file.size>4 * 1024 *1024){
    alert("fichier trop lourd")
    return
   }

   if(allWorks.length>=15){
    alert("limite atteint")
    return
   }

  if (!file) {
    errorfichier.textContent = "Aucun fichier sélectionné";
    errorfichier.classList.remove("hidden");
    console.error("Aucun fichier sélectionné");
    return;
  }
  if (!title) {
    error.textContent = "Le titre est requis";
    error.classList.remove("hidden");
    console.error("Le titre est requis");
    return;
  }
  if (!category) {
    error.textContent = "La catégorie est requise";
    error.classList.remove("hidden");
    console.error("La catégorie est requise");
    return;
  }


  const formData = new FormData();
  formData.append("image", fileInput.files[0]);
  formData.append("title", title);
  formData.append("category", category);
  console.log("FormData prepared:", formData);


fetch("http://localhost:5678/api/works", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
  body:  formData
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi du formulaire");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Réponse du serveur:", data);
    allWorks.push(data);
    displayWorks(allWorks);
    displaymodalpictures(allWorks);
    ajoutpictures.classList.add("hidden");
    onemodal.classList.remove("hidden");

     resetAddForm();
     console.log(resetAddForm)
  })
  .catch((error) => {
    console.error("Erreur lors de l'envoi du formulaire:", error);
  });
});



///////////////////////////////////////
