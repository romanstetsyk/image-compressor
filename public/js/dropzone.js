Dropzone.autoDiscover = false;

let myDropzone = new Dropzone("#my-dropzone", {
  paramName: "myfile", // The name that will be used to transfer the file
  maxFilesize: 1, // MB
  dictDefaultMessage: "Click or drop files here to upload",
  addRemoveLinks: true,
  previewsContainer: "#previews",
  createImageThumbnails: false,
  previewTemplate: document.querySelector("#tmp").innerHTML,

  sending: (file, xhr, formData) => {
    formData.append("uuid", file.upload.uuid);
  },

  success: (file, response) => {
    console.log(file.previewElement);
    console.log(file);
    console.log(response);
    const previewElement = file.previewElement;
    previewElement.dataset.id = file.upload.uuid;

    previewElement.querySelector(".fileinfo").innerHTML = response.link;

    const refs = {
      newSize: previewElement.querySelector(".newSize"),
      newQuality: previewElement.querySelector(".newQuality"),
      downloadJpeg: previewElement.querySelector(".downloadJpeg"),
      dialog: previewElement.querySelector("dialog"),
      openDialogBtn: previewElement.querySelector(".compare"),
      changeQualityForm: previewElement.querySelector(".changeQuality"),
      saveDialogBtn: previewElement.querySelector(".save"),
      closeDialogBtn: previewElement.querySelector(".close"),
      img2: previewElement.querySelector("[data-img2]"),
    };

    const input = refs.changeQualityForm.querySelector("input");

    let currentQuality = response.quality;
    let currentSrc = response.jpegBase64;
    let currentSize = response.newSize;

    let qualityFromForm = response.quality;
    let srcFromForm = response.jpegBase64;
    let sizeFromForm = response.newSizel;

    refs.closeDialogBtn.addEventListener("click", () => {
      refs.dialog.returnValue = "";
      refs.dialog.close();
    });

    refs.openDialogBtn.addEventListener("click", () => {
      refs.dialog.showModal();
    });

    refs.saveDialogBtn.addEventListener("click", () => {
      refs.dialog.returnValue = "saved";
      refs.dialog.close();
      currentQuality = qualityFromForm;
      currentSrc = srcFromForm;
      currentSize = sizeFromForm;
      refs.newSize.innerHTML = (currentSize / 1024).toFixed(2) + " Kb";
      refs.newQuality.innerHTML = `${currentQuality} %`;
      refs.downloadJpeg.href = currentSrc;
    });

    refs.dialog.addEventListener("close", () => {
      refs.img2.src = currentSrc;
      input.value = currentQuality;
    });

    refs.changeQualityForm.addEventListener("submit", async e => {
      e.preventDefault();

      const res = await fetch("/optimize", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          filename: response.filename,
          quality: input.value,
        }),
      });
      const data = await res.json();

      qualityFromForm = data.quality;
      srcFromForm = data.jpegBase64;
      sizeFromForm = data.jpegInfo.size;
      refs.img2.src = data.jpegBase64;
    });
  },
});
